import sys, zipfile, re
import xml.etree.ElementTree as ET
W = '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}'
z = zipfile.ZipFile(sys.argv[1])
doc = ET.fromstring(z.read('word/document.xml'))
# numeración automática (incisos)
num_fmt = {}
try:
    numx = ET.fromstring(z.read('word/numbering.xml'))
    abstract = {}
    for a in numx.findall(f'{W}abstractNum'):
        aid = a.get(f'{W}abstractNumId'); lv = {}
        for l in a.findall(f'{W}lvl'):
            ilvl = l.get(f'{W}ilvl')
            fmt = l.find(f'{W}numFmt'); txt = l.find(f'{W}lvlText'); start = l.find(f'{W}start')
            lv[ilvl] = (fmt.get(f'{W}val') if fmt is not None else 'decimal', txt.get(f'{W}val') if txt is not None else '%1.', int(start.get(f'{W}val')) if start is not None else 1)
        abstract[aid] = lv
    for n in numx.findall(f'{W}num'):
        nid = n.get(f'{W}numId'); a = n.find(f'{W}abstractNumId')
        if a is not None: num_fmt[nid] = abstract.get(a.get(f'{W}val'), {})
except KeyError:
    pass
contadores = {}
def letra(n): return chr(ord('a') + n - 1)
def romano(n):
    vals=[(10,'x'),(9,'ix'),(5,'v'),(4,'iv'),(1,'i')]; s=''
    for v,r in vals:
        while n>=v: s+=r; n-=v
    return s
def fmt_num(f, n):
    return {'decimal': str(n), 'lowerLetter': letra(n), 'upperLetter': letra(n).upper(), 'lowerRoman': romano(n), 'upperRoman': romano(n).upper(), 'bullet': '•', 'none': ''}.get(f, str(n))
out = []
for p in doc.iter(f'{W}p'):
    partes = []
    for el in p.iter():
        if el.tag == f'{W}t': partes.append(el.text or '')
        elif el.tag == f'{W}tab': partes.append(' ')
        elif el.tag in (f'{W}br', f'{W}cr'): partes.append('\n')
    texto = ''.join(partes)
    pre = ''
    numpr = p.find(f'{W}pPr/{W}numPr')
    if numpr is not None:
        ilvl = numpr.find(f'{W}ilvl'); nid = numpr.find(f'{W}numId')
        ilvl = ilvl.get(f'{W}val') if ilvl is not None else '0'; nid = nid.get(f'{W}val') if nid is not None else None
        if nid and nid != '0' and nid in num_fmt and ilvl in num_fmt[nid]:
            f, plantilla, inicio = num_fmt[nid][ilvl]
            k = (nid, ilvl); contadores[k] = contadores.get(k, inicio - 1) + 1
            # reinicia niveles inferiores
            for kk in list(contadores):
                if kk[0] == nid and int(kk[1]) > int(ilvl): del contadores[kk]
            pre = re.sub(r'%\d', fmt_num(f, contadores[k]), plantilla) + ' '
    linea = (pre + texto).strip()
    out.append(linea)
print('\n\n'.join(l for l in out if l))
