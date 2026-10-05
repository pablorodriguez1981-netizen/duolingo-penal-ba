#!/usr/bin/env python3
"""Resuelve el enlace al texto completo de fallos de la CSJN a partir de su
cita (tomo:página) usando el buscador oficial sjconsulta.csjn.gov.ar.

Uso (en GitHub Actions, que tiene salida a internet):
    python3 scripts/resolver-fallos-csjn.py fuentes/fallos-csjn.tsv salida/csjn
"""
import http.cookiejar
import json
import os
import sys
import urllib.request

BASE = 'https://sjconsulta.csjn.gov.ar/sjconsulta'
UA = 'Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 Chrome/126 Mobile Safari/537.36'

entrada, destino = sys.argv[1], sys.argv[2]
os.makedirs(destino, exist_ok=True)
estado = open(os.path.join(destino, 'estado.tsv'), 'w')
estado.write('nombre\ttomo\tpagina\tenlace\thttp\ttipo\tbytes\n')

for linea in open(entrada, encoding='utf-8'):
    if not linea.strip() or linea.startswith('#'):
        continue
    nombre, tomo, pagina = linea.rstrip('\n').split('\t')[:3]
    jar = http.cookiejar.CookieJar()
    web = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(jar))
    web.addheaders = [('User-Agent', UA), ('Accept-Language', 'es-AR,es')]
    try:
        web.open(f'{BASE}/consultaSumarios/buscarTomoPagina.html?tomo={tomo}&pagina={pagina}', timeout=60).read()
        datos = web.open(f'{BASE}/consultaSumarios/paginarSumarios.html?startIndex=0', timeout=60).read()
        open(os.path.join(destino, f'{nombre}.json'), 'wb').write(datos)
        sumarios = json.loads(datos)
    except Exception as e:  # noqa: BLE001
        estado.write(f'{nombre}\t{tomo}\t{pagina}\t-\tERR {e}\t-\t0\n')
        continue
    links = []
    for s in sumarios:
        if str(s.get('tomo')) == tomo and str(s.get('pagina')) == pagina and s.get('linkDocumento'):
            links.append(s['linkDocumento'])
    if not links:
        links = [s['linkDocumento'] for s in sumarios if s.get('linkDocumento')]
    if not links:
        estado.write(f'{nombre}\t{tomo}\t{pagina}\t-\tsin-enlace\t-\t0\n')
        continue
    enlace = BASE + links[0]
    try:
        r = web.open(enlace, timeout=90)
        cuerpo = r.read()
        tipo = r.headers.get('Content-Type', '-')
        ext = '.pdf' if cuerpo[:4] == b'%PDF' else '.html'
        open(os.path.join(destino, nombre + ext), 'wb').write(cuerpo)
        estado.write(f'{nombre}\t{tomo}\t{pagina}\t{enlace}\t{r.status}\t{tipo}\t{len(cuerpo)}\n')
    except Exception as e:  # noqa: BLE001
        estado.write(f'{nombre}\t{tomo}\t{pagina}\t{enlace}\tERR {e}\t-\t0\n')
estado.close()
print(open(os.path.join(destino, 'estado.tsv')).read())
