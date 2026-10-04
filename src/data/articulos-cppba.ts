import type { Articulo } from './tipos';

/**
 * Versiones actualizadas (de estudio) de los artículos del CPPBA que fueron
 * reformados después del documento importado.
 *
 * El texto literal de todo el código viene de src/data/codigos/cppba.json
 * (documento provisto: "texto actualizado con las modificaciones introducidas
 * por las Leyes 11.982 a 13.078", año 2003 aprox.). Estos seis artículos
 * cambiaron sustancialmente después; las lecciones enseñan la versión
 * actualizada y la tarjeta de lectura permite ver también el texto del
 * documento. Son versiones de estudio: cotejalas con el texto oficial vigente.
 */
const actualizado = (numero: string, epigrafe: string, ubicacion: string, texto: string, avisoVigencia: string): Articulo => ({
  id: `cppba-${numero.toLowerCase().replace(/\s+/g, '-')}`,
  codigo: 'CPPBA',
  numero,
  epigrafe,
  ubicacion,
  texto: texto
    .split('\n')
    .map((l) => l.trim())
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim(),
  fidelidad: 'referencia',
  avisoVigencia,
});

const COERCION = 'Libro I · Título VI · Medidas de coerción';

export const ARTICULOS_CPPBA: Articulo[] = [
  actualizado(
    '144',
    'Principio general (libertad durante el proceso)',
    `${COERCION} · Capítulo I · Normas generales`,
    `El imputado permanecerá en libertad durante la sustanciación del proceso penal, siempre que no se den los supuestos previstos en la ley para decidir lo contrario.

    La libertad personal y los demás derechos y garantías reconocidos a toda persona por la Constitución de la Provincia sólo podrán ser restringidos cuando fuere absolutamente indispensable para asegurar la averiguación de la verdad, el desarrollo del procedimiento y la aplicación de la ley.`,
    'Tu documento trae la versión de la Ley 12.278, de un solo párrafo. La Ley 13.449 (2006) agregó el segundo párrafo: la libertad sólo puede restringirse cuando sea absolutamente indispensable para los fines del proceso.',
  ),
  actualizado(
    '148',
    'Peligro de fuga y de entorpecimiento',
    `${COERCION} · Capítulo I · Normas generales`,
    `Para merituar acerca de los peligros de fuga y entorpecimiento probatorio podrá tenerse en cuenta la objetiva y provisional valoración de las características del hecho, la posibilidad de la declaración de reincidencia por delitos dolosos, las condiciones personales del imputado y si éste hubiere gozado de excarcelaciones anteriores que hicieren presumir fundadamente que intentará eludir la acción de la justicia o entorpecer las investigaciones.

    Para merituar acerca del peligro de fuga se tendrán en cuenta especialmente las siguientes circunstancias:

    1. Arraigo, determinado por el domicilio, residencia habitual, asiento de la familia y de sus negocios o trabajo, y las facilidades para abandonar el país o permanecer oculto.

    2. La pena que se espera como resultado del procedimiento.

    3. La importancia del daño resarcible y la actitud que el imputado adopta voluntariamente frente a él y a su persecución penal.

    4. El comportamiento del imputado durante el procedimiento, o en otro procedimiento anterior, en la medida en que indique su voluntad de someterse o no a la persecución penal.

    Para merituar acerca del peligro de entorpecimiento en la averiguación de la verdad se tendrá en cuenta la grave sospecha de que el imputado:

    1. Destruirá, modificará, ocultará, suprimirá o falsificará elementos de prueba.

    2. Influirá para que coimputados, testigos o peritos informen falsamente o se comporten de manera desleal o reticente.

    3. Inducirá a otros a realizar tales comportamientos.`,
    'En tu documento (Ley 12.278) el art. 148 establecía presunciones de peligro procesal «salvo prueba en contrario» (pena en expectativa, falta de residencia fija, comportamiento procesal). La Ley 13.449 (2006) lo reemplazó por las pautas de valoración que estudiás en estas lecciones.',
  ),
  actualizado(
    '157',
    'Prisión preventiva. Procedencia',
    `${COERCION} · Capítulo III · Prisión preventiva`,
    `La detención se convertirá en prisión preventiva cuando medien conjuntamente los siguientes requisitos:

    1. Que se encuentre justificada la existencia del delito.

    2. Que se haya recibido declaración al imputado en los términos del artículo 308, o se haya negado a prestarla.

    3. Que aparezcan elementos de convicción suficientes o indicios vehementes para sostener que el imputado sea probablemente autor o partícipe penalmente responsable del hecho.

    4. Que concurran los peligros procesales que impiden la libertad del imputado durante el proceso.`,
    'Tu documento (Ley 12.059) enumera sólo los tres primeros requisitos. Las reformas posteriores al régimen de coerción, en la línea del fallo «Verbitsky» (CSJN, 2005), exigieron expresamente la verificación de peligros procesales.',
  ),
  actualizado(
    '169',
    'Excarcelación. Procedencia',
    `${COERCION} · Capítulo V · Excarcelación y eximición de prisión`,
    `Podrá ser excarcelado, por alguna de las cauciones previstas en este Capítulo, todo imputado detenido cuando:

    1. El delito que se impute tenga prevista una pena cuyo máximo no supere los ocho (8) años de prisión o reclusión.

    2. En el caso de concurso real, la pena aplicable al mismo no supere los ocho (8) años de prisión o reclusión.

    3. El máximo de la pena fuere mayor a ocho (8) años, pero de las circunstancias del o de los hechos y de las características y antecedentes personales del procesado resultare probable que pueda aplicársele condena de ejecución condicional.

    4. Hubiere sido sobreseído por resolución no firme.

    5. Hubiere cumplido en detención o prisión preventiva el máximo de la pena prevista para el o los delitos que se le atribuyan.

    6. Hubiere cumplido en detención o prisión preventiva un tiempo que, de haber existido condena, le habría permitido obtener la libertad condicional, siempre que se hubieren observado los reglamentos carcelarios.`,
    'Tu documento trae la versión de la Ley 12.405 (2000), mucho más restrictiva: tope de 6 años y, además, probable condena condicional. Reformas posteriores (entre ellas, la Ley 14.128) volvieron a un régimen más amplio, con el tope de 8 años que estudiás acá. Esta versión resume los supuestos centrales: cotejá la numeración vigente.',
  ),
  actualizado(
    '171',
    'Excarcelación. Denegatoria',
    `${COERCION} · Capítulo V · Excarcelación y eximición de prisión`,
    `En ningún caso se concederá la excarcelación cuando hubiere indicios vehementes de que el imputado tratará de eludir la acción de la justicia o entorpecer la investigación. La eventual existencia de estos peligros procesales podrá inferirse de las circunstancias previstas en el artículo 148.`,
    'Tu documento (Ley 12.405) traía una larga lista de casos en que la excarcelación se denegaba automáticamente (armas, robo con violencia, participación de menores, etc.). Ese régimen fue cuestionado por la CSJN en «Verbitsky» (2005) y reemplazado por la Ley 13.449 (2006), que remite a la valoración de peligros concretos del art. 148.',
  ),
  actualizado(
    '395',
    'Juicio abreviado. Admisibilidad',
    'Libro III · Título II · Capítulo III · Juicio abreviado',
    `Si el Ministerio Público Fiscal estimare suficiente la imposición de una pena privativa de la libertad no mayor de quince (15) años, o de una pena no privativa de la libertad aun procedente en forma conjunta con aquélla, podrá solicitar que se proceda según las reglas del juicio abreviado. El imputado y su defensor también podrán solicitarlo.

    Para ello será necesario el acuerdo del Fiscal, del imputado y de su defensor, que deberá incluir la conformidad del imputado con la descripción del hecho, su participación y la calificación legal, y la pena solicitada.`,
    'Tu documento (Ley 12.059) fija el tope en ocho (8) años. Reformas posteriores lo elevaron a quince (15) años, que es el límite que estudiás en estas lecciones.',
  ),
];
