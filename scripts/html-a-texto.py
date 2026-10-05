#!/usr/bin/env python3
"""Convierte una página HTML de normativa (normas.gba.gob.ar, InfoLEG) a texto plano:
un párrafo por línea, separados por una línea en blanco."""
import html
import re
import sys

datos = open(sys.argv[1], 'rb').read()
for codificacion in ('utf-8', 'cp1252', 'latin-1'):
    try:
        s = datos.decode(codificacion)
        break
    except UnicodeDecodeError:
        continue

s = re.sub(r'(?is)<(script|style|head)\b.*?</\1>', ' ', s)
s = re.sub(r'\s+', ' ', s)  # en HTML los saltos de línea del código fuente no significan nada
s = re.sub(r'(?i)<br\s*/?>', '\n', s)
s = re.sub(r'(?i)</?(p|div|h[1-6]|li|tr|table|blockquote)\b[^>]*>', '\n\n', s)
s = re.sub(r'<[^>]+>', ' ', s)
s = html.unescape(s).replace('\xa0', ' ').replace('\r', '')
lineas = [re.sub(r'[ \t]+', ' ', l).strip() for l in s.split('\n')]
salida = []
for l in lineas:
    if l:
        salida.append(l)
    elif salida and salida[-1] != '':
        salida.append('')
sys.stdout.write('\n'.join(salida) + '\n')
