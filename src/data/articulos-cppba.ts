import type { Articulo } from './tipos';

/**
 * Versión de estudio de los artículos centrales del CPPBA (Ley 11.922).
 *
 * IMPORTANTE: estos textos son de REFERENCIA (fidelidad: 'referencia'). Se
 * redactaron siguiendo el articulado y sus reformas, pero no fueron cotejados
 * contra el texto oficial vigente. Cuando se importa el PDF oficial con
 *   node scripts/importar-codigo.mjs --codigo CPPBA --pdf <archivo>
 * la app muestra automáticamente el texto oficial en lugar de éste.
 */
const ref = (
  numero: string,
  epigrafe: string,
  ubicacion: string,
  texto: string,
  avisoVigencia?: string,
): Articulo => ({
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

const L1T1 = 'Libro I · Título I · Garantías fundamentales';
const L1T4 = 'Libro I · Título IV · Partes y demás intervinientes';
const L1T5 = 'Libro I · Título V · Actos procesales';
const L1T6 = 'Libro I · Título VI · Medidas de coerción';
const L1T7 = 'Libro I · Título VII · Nulidades';
const L1T8 = 'Libro I · Título VIII · Medios de prueba';
const L2 = 'Libro II · Investigación Penal Preparatoria';
const L3 = 'Libro III · Juicios';
const L4 = 'Libro IV · Impugnaciones';

export const ARTICULOS_CPPBA: Articulo[] = [
  ref(
    '1',
    'Juez natural. Juicio previo. Principio de inocencia. Non bis in ídem. Inviolabilidad de la defensa. Favor rei',
    L1T1,
    `Nadie podrá ser juzgado por otros jueces que los instituidos por la ley antes del hecho y designados de acuerdo con la Constitución de la Provincia; ni penado sin juicio previo fundado en ley anterior al hecho del proceso; ni considerado culpable mientras una sentencia firme no lo declare tal; ni perseguido penalmente más de una vez por el mismo hecho.

    Es inviolable la defensa de la persona y de los derechos en el procedimiento.

    En caso de duda deberá estarse siempre a lo que sea más favorable al imputado.

    La inobservancia de una regla de garantía establecida en beneficio del imputado no podrá hacerse valer en su perjuicio.`,
  ),
  ref(
    '2',
    'Duración del proceso',
    L1T1,
    `Toda persona sometida a proceso tendrá derecho a ser juzgada en un plazo razonable y sin dilaciones indebidas.

    El retardo en dictar resoluciones y las dilaciones indebidas, cuando fueren reiteradas, constituirán falta grave.`,
  ),
  ref(
    '3',
    'Interpretación restrictiva',
    L1T1,
    `Toda disposición legal que coarte la libertad personal, restrinja los derechos de la persona, limite el ejercicio de un derecho atribuido por este Código o establezca sanciones procesales, deberá ser interpretada restrictivamente.`,
  ),
  ref(
    '141',
    'Plazos fatales',
    `${L1T5} · Capítulo VI · Plazos`,
    `Si el imputado se encontrare privado de su libertad, los términos para completar la Investigación Penal Preparatoria y la duración total del proceso serán fatales.

    En tal caso el proceso no podrá durar más de dos (2) años, salvo que por la extrema complejidad de la causa —en razón de la pluralidad de imputados o de la naturaleza y circunstancias de los hechos— deba estarse al plazo razonable previsto en el artículo 2, conforme a la apreciación judicial.`,
    'La redacción de este artículo fue modificada por distintas reformas (entre ellas, la Ley 12.405). Cotejá la versión vigente antes de citarlo.',
  ),
  ref(
    '56',
    'Ministerio Público Fiscal. Funciones',
    `${L1T4} · Capítulo I · Ministerio Público Fiscal`,
    `El Ministerio Público Fiscal promoverá y ejercerá la acción penal de carácter público, en la forma establecida por la ley, dirigirá a la Policía en función judicial y practicará la Investigación Penal Preparatoria.

    Adecuará sus actos a un criterio objetivo, debiendo requerir el sobreseimiento o la absolución del imputado cuando corresponda, y formulará en forma motivada y específica sus requerimientos y conclusiones.

    Podrá proceder al archivo de las actuaciones en los supuestos y con los recaudos que establece este Código.`,
  ),
  ref(
    '60',
    'Imputado. Derechos',
    `${L1T4} · Capítulo II · El imputado`,
    `Se considerará imputado a toda persona que, en cualquier acto o procedimiento, sea señalada o detenida como autor o partícipe de un delito. Los derechos que este Código acuerda al imputado podrán hacerse valer desde el primer momento de la persecución penal dirigida en su contra.

    La autoridad interviniente deberá hacerle saber que goza, entre otras, de las siguientes garantías mínimas:

    1. Ser informado sin demora, en un idioma que comprenda y en forma detallada, de la naturaleza y causa de la imputación formulada en su contra.

    2. Ser asistido desde el primer momento por un defensor de su confianza o, en su defecto, por un defensor oficial, y comunicarse libre y privadamente con él.

    3. Abstenerse de declarar, sin que su silencio implique presunción en su contra, y declarar cuantas veces quiera.

    4. No ser sometido a técnicas o métodos que afecten su voluntad o su libertad de decidir.

    5. Ser asistido gratuitamente por un intérprete si no comprende o no habla el idioma nacional.`,
  ),
  ref(
    '308',
    'Declaración del imputado',
    `${L2} · Título III · Situación del imputado`,
    `Cuando hubiere motivos suficientes para sospechar que una persona ha participado en la comisión de un delito, el Agente Fiscal procederá a recibirle declaración.

    Si el imputado se encontrare aprehendido o detenido, la declaración deberá recibírsele inmediatamente o, a más tardar, dentro de las veinticuatro (24) horas desde que fue puesto a disposición del Fiscal. Este plazo podrá prorrogarse por otro igual cuando el Fiscal no hubiere podido recibirla o cuando lo pidiere el imputado para proponer defensor.

    La declaración se recibirá con la presencia del defensor, bajo sanción de nulidad.

    El imputado podrá abstenerse de declarar. En ningún caso se le requerirá juramento o promesa de decir verdad, ni se ejercerá contra él coacción o amenaza, ni se usará medio alguno para obligarlo, inducirlo o determinarlo a declarar contra su voluntad.`,
  ),
  ref(
    '144',
    'Principio general (libertad durante el proceso)',
    `${L1T6} · Capítulo I · Normas generales`,
    `El imputado permanecerá en libertad durante la sustanciación del proceso penal, siempre que no se den los supuestos previstos en la ley para decidir lo contrario.

    La libertad personal y los demás derechos y garantías reconocidos a toda persona por la Constitución de la Provincia sólo podrán ser restringidos cuando fuere absolutamente indispensable para asegurar la averiguación de la verdad, el desarrollo del procedimiento y la aplicación de la ley.`,
  ),
  ref(
    '146',
    'Condiciones de las medidas de coerción',
    `${L1T6} · Capítulo I · Normas generales`,
    `El órgano judicial podrá ordenar, a pedido de parte, medidas de coerción personal o real cuando se den las siguientes condiciones:

    1. Apariencia de responsabilidad del titular del derecho a afectar.

    2. Verificación de peligro cierto de frustración de los fines del proceso, si no se adopta la medida.

    3. Proporcionalidad entre la medida y el objeto de tutela.

    4. Exigencia de contracautela, cuando se trate de medidas de coerción real.`,
  ),
  ref(
    '148',
    'Peligro de fuga y de entorpecimiento',
    `${L1T6} · Capítulo I · Normas generales`,
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
  ),
  ref(
    '153',
    'Aprehensión',
    `${L1T6} · Capítulo II · Coerción personal`,
    `Los funcionarios y auxiliares de la Policía tienen el deber de aprehender a quien sea sorprendido en flagrancia en la comisión de un delito de acción pública sancionado con pena privativa de la libertad, a quien intentare un delito en el momento de disponerse a cometerlo y a quien fugare estando legalmente detenido.

    Excepcionalmente podrán aprehender a la persona contra la cual existan indicios vehementes de culpabilidad y peligro inminente de fuga o de serio entorpecimiento de la investigación, al solo efecto de conducirla de inmediato ante la autoridad judicial competente.

    En todos los casos se dará inmediato aviso al Fiscal y al Juez de Garantías.`,
  ),
  ref(
    '154',
    'Flagrancia',
    `${L1T6} · Capítulo II · Coerción personal`,
    `Se considera que hay flagrancia cuando el autor del hecho es sorprendido en el momento de cometerlo o inmediatamente después, o mientras es perseguido por la fuerza pública, el ofendido o el clamor público, o mientras tiene objetos o presenta rastros que hagan presumir vehementemente que acaba de participar en un delito.`,
  ),
  ref(
    '157',
    'Prisión preventiva. Procedencia',
    `${L1T6} · Capítulo III · Prisión preventiva`,
    `La detención se convertirá en prisión preventiva cuando medien conjuntamente los siguientes requisitos:

    1. Que se encuentre justificada la existencia del delito.

    2. Que se haya recibido declaración al imputado en los términos del artículo 308, o se haya negado a prestarla.

    3. Que aparezcan elementos de convicción suficientes o indicios vehementes para sostener que el imputado sea probablemente autor o partícipe penalmente responsable del hecho.

    4. Que concurran los peligros procesales que impiden la libertad del imputado durante el proceso.`,
  ),
  ref(
    '158',
    'Prisión preventiva. Requisitos formales',
    `${L1T6} · Capítulo III · Prisión preventiva`,
    `La resolución que imponga la prisión preventiva deberá ser fundada y contener, bajo sanción de nulidad:

    1. Los datos personales del imputado o, si se ignoraren, los que sirvan para identificarlo.

    2. Una sucinta enunciación de los hechos.

    3. Los fundamentos de la decisión, con la indicación concreta de los elementos de convicción y de los peligros procesales que la justifican.

    4. La calificación legal del delito, con cita de las disposiciones aplicables.

    5. La parte resolutiva.`,
  ),
  ref(
    '159',
    'Alternativas a la prisión preventiva',
    `${L1T6} · Capítulo III · Prisión preventiva`,
    `Siempre que el peligro de fuga o de entorpecimiento probatorio pudiera razonablemente evitarse por aplicación de otra medida menos gravosa para el imputado, o de alguna técnica o sistema electrónico que permita controlar que no se excedan los límites impuestos a la libertad ambulatoria, el juez impondrá tales alternativas en lugar de la prisión preventiva, pudiendo establecer las condiciones que estime necesarias.

    Entre otras, podrán disponerse: la obligación de someterse al cuidado o vigilancia de una persona o institución; la presentación periódica ante la autoridad; la prohibición de salir de un ámbito territorial; la prohibición de concurrir a determinados lugares o de comunicarse con determinadas personas; el arresto domiciliario; y la vigilancia mediante dispositivos electrónicos.`,
  ),
  ref(
    '169',
    'Excarcelación. Procedencia',
    `${L1T6} · Capítulo V · Excarcelación y eximición de prisión`,
    `Podrá ser excarcelado, por alguna de las cauciones previstas en este Capítulo, todo imputado detenido cuando:

    1. El delito que se impute tenga prevista una pena cuyo máximo no supere los ocho (8) años de prisión o reclusión.

    2. En el caso de concurso real, la pena aplicable al mismo no supere los ocho (8) años de prisión o reclusión.

    3. El máximo de la pena fuere mayor a ocho (8) años, pero de las circunstancias del o de los hechos y de las características y antecedentes personales del procesado resultare probable que pueda aplicársele condena de ejecución condicional.

    4. Hubiere sido sobreseído por resolución no firme.

    5. Hubiere cumplido en detención o prisión preventiva el máximo de la pena prevista para el o los delitos que se le atribuyan.

    6. Hubiere cumplido en detención o prisión preventiva un tiempo que, de haber existido condena, le habría permitido obtener la libertad condicional, siempre que se hubieren observado los reglamentos carcelarios.`,
    'Los incisos del art. 169 fueron reformulados varias veces (p. ej., Leyes 13.943, 14.128 y 14.434). Esta versión resume los supuestos centrales: cotejá la numeración vigente.',
  ),
  ref(
    '171',
    'Excarcelación. Denegatoria',
    `${L1T6} · Capítulo V · Excarcelación y eximición de prisión`,
    `En ningún caso se concederá la excarcelación cuando hubiere indicios vehementes de que el imputado tratará de eludir la acción de la justicia o entorpecer la investigación. La eventual existencia de estos peligros procesales podrá inferirse de las circunstancias previstas en el artículo 148.`,
  ),
  ref(
    '185',
    'Eximición de prisión',
    `${L1T6} · Capítulo V · Excarcelación y eximición de prisión`,
    `Toda persona que considere que puede ser imputada de un delito, en causa penal determinada, cualquiera sea el estado en que ésta se encuentre, podrá, por sí o por terceros, solicitar al órgano judicial competente su eximición de prisión.

    La solicitud tramitará por incidente separado y deberá resolverse en forma fundada en el plazo que este Código establece.`,
  ),
  ref(
    '201',
    'Nulidades. Principio general',
    L1T7,
    `Los actos procesales serán nulos sólo cuando no se hubieran observado las disposiciones expresamente prescriptas bajo pena de nulidad.`,
  ),
  ref(
    '202',
    'Nulidades de carácter general',
    L1T7,
    `Además, se entenderá siempre prescripta bajo pena de nulidad la observancia de las disposiciones concernientes a:

    1. El nombramiento, capacidad y constitución del Juez, Tribunal o representante del Ministerio Público Fiscal.

    2. La intervención del Juez, del Ministerio Público Fiscal y de la parte civil en el procedimiento, y su participación en los actos en que ella sea obligatoria.

    3. La intervención, asistencia y representación del imputado, en los casos y formas que la ley establece.`,
  ),
  ref(
    '203',
    'Declaración de oficio',
    L1T7,
    `Las nulidades previstas en el artículo anterior que impliquen violación de normas constitucionales, o cuando así se establezca expresamente, deberán ser declaradas de oficio en cualquier estado y grado del proceso. Las demás sólo podrán declararse a instancia de parte, en las oportunidades que este Código establece.`,
  ),
  ref(
    '209',
    'Libertad probatoria',
    `${L1T8} · Capítulo I · Disposiciones generales`,
    `Todos los hechos y circunstancias relacionados con el objeto del proceso pueden ser acreditados por cualquiera de los medios de prueba, salvo las excepciones previstas por las leyes.

    Además de los medios de prueba establecidos en este Código, se podrán utilizar otros siempre que no afecten la moral, no se hallen expresamente prohibidos por la ley ni impliquen violación de derechos o garantías constitucionales.`,
  ),
  ref(
    '210',
    'Sana crítica',
    `${L1T8} · Capítulo I · Disposiciones generales`,
    `Para la valoración de la prueba, los jueces formarán su convicción de acuerdo con las reglas de la sana crítica: la lógica, la experiencia y los conocimientos científicos, debiendo fundar razonadamente sus conclusiones.`,
  ),
  ref(
    '211',
    'Exclusiones probatorias',
    `${L1T8} · Capítulo I · Disposiciones generales`,
    `Carecerá de toda eficacia la actividad probatoria cumplida y la prueba obtenida con afectación de garantías constitucionales.`,
  ),
  ref(
    '266',
    'Investigación Penal Preparatoria. Finalidad',
    `${L2} · Título I · Disposiciones generales`,
    `La Investigación Penal Preparatoria tendrá por finalidad:

    1. Comprobar, mediante las diligencias conducentes al descubrimiento de la verdad, si existe un hecho delictuoso.

    2. Establecer las circunstancias que lo califiquen, agraven, atenúen, justifiquen o influyan en la punibilidad.

    3. Individualizar a los autores y partícipes del hecho investigado.

    4. Verificar la edad, educación, costumbres, condiciones de vida, medios de subsistencia y antecedentes del imputado; el estado y desarrollo de sus facultades mentales, las condiciones en que actuó y los motivos que hubieran podido determinarlo a delinquir.

    5. Comprobar la extensión del daño causado por el delito.`,
  ),
  ref(
    '282',
    'Duración de la Investigación Penal Preparatoria',
    `${L2} · Título I · Disposiciones generales`,
    `La Investigación Penal Preparatoria deberá practicarse en el término de cuatro (4) meses a contar de la detención o declaración del imputado.

    Si resultare insuficiente, el Fiscal podrá solicitar prórroga al Juez de Garantías, quien podrá acordarla por otro período igual, según las causas de la demora y la naturaleza de la investigación. En los casos de suma gravedad y de muy difícil investigación, la prórroga otorgada podrá exceder excepcionalmente dicho plazo.`,
  ),
  ref(
    '334',
    'Elevación a juicio. Requisitoria',
    `${L2} · Título VI · Elevación a juicio`,
    `El Agente Fiscal formulará por escrito el requerimiento de citación a juicio cuando, habiéndose recibido declaración al imputado, estimare contar con elementos suficientes para sostener la acusación y no correspondiere la aplicación de criterios de oportunidad ni de las reglas de abreviación del proceso.

    El requerimiento deberá contener, bajo sanción de nulidad, los datos personales del imputado o los que sirvan para identificarlo, una relación clara, precisa y circunstanciada del hecho, los fundamentos de la acusación y la calificación legal.`,
  ),
  ref(
    '336',
    'Elevación a juicio. Oposición',
    `${L2} · Título VI · Elevación a juicio`,
    `Las conclusiones del requerimiento fiscal serán notificadas al defensor del imputado, quien podrá, en el plazo de quince (15) días, oponerse instando el sobreseimiento o el cambio de calificación legal.

    Las cuestiones planteadas serán resueltas por el Juez de Garantías, quien dispondrá, en su caso, la elevación de la causa a juicio.`,
  ),
  ref(
    '338',
    'Audiencia preliminar',
    `${L3} · Título I · Procedimiento común`,
    `Recibida la causa, el órgano de juicio notificará a las partes, que dentro del plazo que fija este Código podrán ofrecer la prueba que pretendan producir en el debate e interponer las recusaciones que estimen pertinentes.

    En una audiencia preliminar se tratarán, entre otras cuestiones, la admisibilidad de la prueba ofrecida, las instrucciones, las nulidades y la validez constitucional de los actos de la Investigación Penal Preparatoria que deban ser utilizados en el debate.`,
  ),
  ref(
    '342',
    'Oralidad y publicidad',
    `${L3} · Título I · Capítulo II · Debate`,
    `El debate será oral y público, bajo sanción de nulidad.

    El Tribunal podrá resolver, aun de oficio, que se realice total o parcialmente a puertas cerradas cuando la publicidad afecte la moral pública, la intimidad de alguna de las partes o de las víctimas, el orden público o la seguridad.

    La resolución será fundada, se hará constar en el acta y será irrecurrible. Desaparecida la causa de la clausura, se deberá permitir el acceso al público.`,
  ),
  ref(
    '371',
    'Veredicto. Cuestiones',
    `${L3} · Título I · Capítulo IV · Veredicto y sentencia`,
    `Terminado el debate, los jueces deliberarán en sesión secreta y plantearán y votarán las cuestiones esenciales en el siguiente orden:

    1. La existencia del hecho en su exteriorización.

    2. La participación del procesado en el mismo.

    3. La existencia de eximentes.

    4. La verificación de atenuantes.

    5. La concurrencia de agravantes.

    Las cuestiones se resolverán por mayoría de votos, valorándose las pruebas según las reglas de la sana crítica. El veredicto será absolutorio o condenatorio y, en este último caso, se dictará sentencia conforme a las reglas que este Código establece.`,
    'Desde la Ley 14.543 los delitos cuya pena máxima en abstracto supere los 15 años se juzgan, como regla, por jurados populares, que se rigen por reglas propias de veredicto.',
  ),
  ref(
    '395',
    'Juicio abreviado. Admisibilidad',
    `${L3} · Título II · Capítulo III · Juicio abreviado`,
    `Si el Ministerio Público Fiscal estimare suficiente la imposición de una pena privativa de la libertad no mayor de quince (15) años, o de una pena no privativa de la libertad aun procedente en forma conjunta con aquélla, podrá solicitar que se proceda según las reglas del juicio abreviado. El imputado y su defensor también podrán solicitarlo.

    Para ello será necesario el acuerdo del Fiscal, del imputado y de su defensor, que deberá incluir la conformidad del imputado con la descripción del hecho, su participación y la calificación legal, y la pena solicitada.`,
    'El texto original (y algunas versiones antiguas que circulan) fijaba el tope en 8 años; las reformas posteriores lo elevaron a 15.',
  ),
  ref(
    '448',
    'Recurso de casación. Motivos',
    `${L4} · Título IV · Recurso de casación`,
    `El recurso de casación podrá fundarse en:

    1. La inobservancia o errónea aplicación de la ley sustantiva o de la doctrina jurisprudencial.

    2. La inobservancia de las normas procesales establecidas bajo pena de inadmisibilidad, caducidad o nulidad, siempre que, salvo en los casos de nulidad absoluta, el recurrente haya reclamado oportunamente su subsanación o hecho protesta de recurrir en casación.

    El recurso se interpondrá ante el órgano que dictó la resolución, por escrito fundado, dentro del plazo de veinte (20) días.`,
  ),
];
