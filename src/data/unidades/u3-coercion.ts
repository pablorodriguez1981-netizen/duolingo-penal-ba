import { ENLACES } from '../enlaces-fallos';
import { comp, leccion, op, ord, vf } from '../helpers';
import type { Unidad } from '../tipos';

export const U3: Unidad = {
  id: 'u3',
  numero: 3,
  titulo: 'Medidas de coerción y prisión preventiva',
  subtitulo: 'Cuándo se puede restringir la libertad durante el proceso',
  etapa: 'Medidas cautelares',
  color: 'violeta',
  icono: '🔐',
  temas: [
    {
      articuloId: 'cppba-144',
      relacionados: ['cppba-3'],
      falloClave: {
        tribunal: 'Corte Suprema de Justicia de la Nación',
        caso: '«Verbitsky, Horacio s/ hábeas corpus»',
        anio: '2005',
        resumen:
          'Ante la sobrepoblación de detenidos en comisarías y cárceles bonaerenses, el CELS presentó un hábeas corpus colectivo. La Corte fijó estándares mínimos de detención y exhortó a la Provincia a adecuar su legislación sobre excarcelación y prisión preventiva a los estándares constitucionales e internacionales.',
        regla:
          'La prisión preventiva es excepcional y sólo cautelar; las condiciones de detención deben respetar la dignidad humana. Las normas provinciales deben ajustarse a la Constitución y a los tratados.',
        nota: 'Síntesis didáctica (Fallos 328:1146, 3/5/2005). Es un fallo central para entender las reformas al régimen de coerción del CPPBA.',
        enlaces: [ENLACES.verbitsky],
        ambito: 'nacional',
      },
      fallosRelacionados: [
        {
          tribunal: 'Suprema Corte de Justicia de la Provincia de Buenos Aires',
          caso: '«Verbitsky» · ejecución del fallo de la Corte (P. 83.909)',
          anio: '2022',
          resumen:
            'Después de que la CSJN reclamara en 2021 que se ejecutara efectivamente su sentencia de 2005, la SCBA puso en marcha un programa de cumplimiento con medidas concretas para revertir el «estado de cosas inconstitucional» de las personas privadas de libertad en la Provincia.',
          regla:
            'Los jueces deben revisar periódicamente la situación de cada persona detenida y preferir medidas menos lesivas cuando el caso lo permita (arts. 159, 160, 163 y 168 bis); la prisión preventiva no puede funcionar como pena anticipada; no pueden alojarse en comisarías menores, embarazadas ni enfermos; y deben priorizarse los juicios de quienes llevan más tiempo en prisión preventiva.',
          nota: 'Síntesis de la resolución del 3/5/2022.',
          enlaces: [ENLACES.scbaVerbitsky2022],
          ambito: 'bonaerense',
        },
      ],
      lecciones: [
        leccion({
          id: 'u3-a144-l1',
          titulo: 'La libertad es la regla',
          minutos: 3,
          intro: {
            titulo: 'Principio general: libertad durante el proceso',
            parrafos: [
              'Por el principio de inocencia, el imputado transita el proceso en libertad. El art. 144 lo dice sin vueltas: permanecerá libre, salvo que se den los supuestos que la ley prevé para decidir lo contrario.',
              'La libertad sólo puede restringirse cuando sea absolutamente indispensable para tres fines: averiguar la verdad, desarrollar el procedimiento y aplicar la ley.',
              'Y como toda norma que restringe la libertad, se interpreta en forma restrictiva (art. 3 CPPBA).',
            ],
            enLaPractica:
              'Cuando la UFI pide una detención, el Juez de Garantías debe partir de la libertad y exigir que el Fiscal demuestre por qué es indispensable restringirla.',
          },
          foco: 'El imputado permanecerá en libertad durante la sustanciación del proceso penal',
          preguntas: [
            op(
              '¿Cuál es la regla durante el proceso penal según el art. 144?',
              ['La libertad del imputado', 'La detención hasta que preste declaración', 'La libertad bajo caución en todos los casos', 'La detención cuando el delito es grave'],
              'La regla es la libertad; las medidas de coerción son la excepción.',
            ),
            ord(
              'Ordená los fines que pueden justificar restringir la libertad (art. 144):',
              ['Asegurar la averiguación de la verdad', 'Asegurar el desarrollo del procedimiento', 'Asegurar la aplicación de la ley'],
              'Los tres fines son procesales. Ninguno es castigar o calmar a la opinión pública.',
            ),
            vf(
              'Se puede detener a un imputado durante el proceso para que «empiece a pagar» por el delito.',
              false,
              'Falso. Eso sería una pena anticipada, contraria al principio de inocencia.',
            ),
            comp(
              'Completá el art. 144.',
              'La libertad sólo podrá ser restringida cuando fuere ___ indispensable.',
              ['absolutamente', 'razonablemente', 'estrictamente', 'prudencialmente'],
              'La letra es «absolutamente indispensable»: un estándar más exigente que «razonable» o «prudencial».',
            ),
          ],
        }),
      ],
    },
    {
      articuloId: 'cppba-146',
      lecciones: [
        leccion({
          id: 'u3-a146-l1',
          titulo: 'Condiciones de toda medida de coerción',
          minutos: 4,
          intro: {
            titulo: 'Los cuatro filtros (art. 146)',
            parrafos: [
              'Antes de ordenar cualquier medida de coerción, el juez verifica condiciones que vienen del derecho cautelar:',
              '1) Apariencia de responsabilidad: indicios serios de que el imputado participó. 2) Peligro cierto de frustración del proceso si no se adopta la medida. 3) Proporcionalidad entre la medida y lo que se quiere proteger. 4) Contracautela, cuando la medida la piden el particular damnificado o el actor civil.',
              'Y la medida se ordena a pedido de parte: el juez no actúa por iniciativa propia.',
            ],
            enLaPractica:
              'Encarcelar preventivamente por un delito que, aun con condena, terminaría con una pena en suspenso, es desproporcionado: la cautela no puede ser más grave que la eventual pena.',
          },
          preguntas: [
            op(
              '¿Cuál de estas NO es una condición del art. 146?',
              [
                'Que la víctima preste conformidad con la medida',
                'Apariencia de responsabilidad',
                'Peligro cierto de frustración de los fines del proceso',
                'Proporcionalidad entre la medida y el objeto de tutela',
              ],
              'La víctima puede ser oída (por ejemplo, en la audiencia del art. 168 bis), pero su conformidad no es una condición legal. La contracautela, en cambio, sí se exige cuando la medida la pide el particular damnificado o el actor civil.',
            ),
            vf(
              'El Juez de Garantías puede imponer una medida de coerción de oficio, sin pedido de nadie.',
              false,
              'Falso. El art. 146 exige pedido de parte: es coherente con el sistema acusatorio.',
            ),
            op(
              '¿Qué significa «proporcionalidad» en materia cautelar?',
              [
                'Que la medida no sea más gravosa que lo necesario ni que la pena esperable',
                'Que dure lo mismo que el mínimo de la escala penal',
                'Que guarde relación con la magnitud del daño a la víctima',
                'Que sea idéntica para todos los coimputados',
              ],
              'La proporcionalidad impide que la cautela supere el reproche que se espera al final del proceso.',
            ),
          ],
        }),
      ],
    },
    {
      articuloId: 'cppba-148',
      relacionados: ['cppba-171'],
      lecciones: [
        leccion({
          id: 'u3-a148-l1',
          titulo: 'Peligro de fuga',
          minutos: 4,
          intro: {
            titulo: '¿Se va a escapar?',
            parrafos: [
              'Los peligros procesales son la única razón válida para encarcelar durante el proceso. El primero es el peligro de fuga.',
              'El art. 148 da pautas para evaluarlo: el arraigo en el país (domicilio, familia, trabajo; dar un domicilio inexacto puede ser un indicio de fuga), la pena que se espera, la actitud frente al daño y a la víctima, y el comportamiento en este u otros procesos (por ejemplo, rebeldías anteriores).',
              'Ninguna pauta funciona sola ni en abstracto: hay que analizarlas en el caso concreto.',
            ],
            enLaPractica:
              'Un imputado con domicilio verificado, empleo formal y que se presentó espontáneamente a la UFI tiene un fuerte argumento contra el peligro de fuga.',
          },
          foco: 'Para merituar sobre el peligro de fuga se tendrán en cuenta especialmente las siguientes circunstancias',
          preguntas: [
            op(
              '¿Cuál de estos datos REDUCE el peligro de fuga?',
              [
                'Domicilio fijo, familia a cargo y trabajo estable',
                'Haber estado prófugo en otra causa',
                'Tener pasaporte y pasajes al exterior',
                'Haber dado un domicilio falso',
              ],
              'El arraigo (domicilio, familia, trabajo) es la pauta central del inc. 1 del art. 148.',
            ),
            vf(
              'Haber sido declarado rebelde en un proceso anterior puede valorarse para el peligro de fuga.',
              true,
              'Verdadero: el comportamiento en otro procedimiento anterior indica la voluntad de someterse o no al proceso.',
            ),
            vf(
              'Que el imputado haya dado un domicilio inexacto puede configurar un indicio de fuga.',
              true,
              'Verdadero: el inc. 1 del art. 148 lo prevé expresamente al regular el arraigo.',
            ),
            comp(
              'Completá la pauta del inciso 2.',
              'Para el peligro de fuga se tiene en cuenta la ___ que se espera como resultado del procedimiento.',
              ['pena', 'caución', 'reparación', 'audiencia'],
              'Una pena alta esperable puede incentivar la fuga, pero por sí sola no alcanza: debe combinarse con datos concretos del caso.',
            ),
          ],
        }),
        leccion({
          id: 'u3-a148-l2',
          titulo: 'Peligro de entorpecimiento',
          minutos: 3,
          intro: {
            titulo: '¿Va a obstaculizar la investigación?',
            parrafos: [
              'El segundo peligro procesal es el entorpecimiento probatorio. Requiere una grave sospecha, basada en datos concretos, de que el imputado destruirá o falsificará prueba, influirá sobre coimputados, testigos o peritos, o inducirá a otros a hacerlo.',
              'Este peligro suele disminuir a medida que avanza la investigación: una vez que la prueba está asegurada, ya no hay qué entorpecer.',
            ],
            enLaPractica:
              'Si el imputado llamó a la víctima para que «retire la denuncia», hay un indicio concreto de entorpecimiento que el Fiscal puede invocar.',
          },
          preguntas: [
            ord(
              'Ordená las conductas que integran el peligro de entorpecimiento como aparecen en el art. 148:',
              [
                'Destruir, modificar, ocultar o falsificar elementos de prueba',
                'Influir sobre coimputados, testigos o peritos',
                'Inducir a otros a realizar esos comportamientos',
              ],
              'Primero la prueba material, después las personas, y por último la inducción a terceros.',
            ),
            vf(
              'El peligro de entorpecimiento puede fundarse en una sospecha genérica de que «podría» influir en testigos.',
              false,
              'Falso. Hace falta una grave sospecha basada en circunstancias concretas del caso.',
            ),
            op(
              '¿Por qué el peligro de entorpecimiento suele disminuir con el tiempo?',
              [
                'Porque una vez asegurada la prueba ya no hay qué entorpecer',
                'Porque caduca al vencer los cuatro meses de la IPP',
                'Porque sólo puede invocarse antes de la declaración del imputado',
                'Porque después del primer mes se presume a favor del imputado',
              ],
              'Cuando la prueba ya fue recolectada (pericias, testimonios), el riesgo de obstrucción es menor.',
            ),
          ],
        }),
        leccion({
          id: 'u3-a148-l3',
          titulo: 'Pautas generales y sus límites',
          minutos: 3,
          intro: {
            titulo: 'Gravedad del hecho: ¿alcanza?',
            parrafos: [
              'El primer párrafo del art. 148 permite valorar también las características del hecho, la posible reincidencia, las condiciones personales y si el imputado gozó de excarcelaciones anteriores.',
              'Pero la jurisprudencia es clara: esas pautas sirven para presumir un peligro, no para reemplazarlo. La sola gravedad del delito o la «alarma social» no justifican una prisión preventiva.',
            ],
            enLaPractica:
              'Si un Fiscal pide la preventiva «por la conmoción social que generó el hecho», la defensa responde que la alarma social no es un peligro procesal.',
          },
          preguntas: [
            vf(
              'La «alarma social» o la repercusión mediática de un caso es un peligro procesal que justifica la prisión preventiva.',
              false,
              'Falso. Los únicos peligros procesales son la fuga y el entorpecimiento; la alarma social no está entre ellos.',
            ),
            op(
              '¿Cómo deben usarse las pautas del primer párrafo del art. 148 (características del hecho, reincidencia, etc.)?',
              [
                'Como indicios para evaluar un peligro concreto, no como presunciones automáticas',
                'Como causales automáticas de prisión preventiva',
                'Como presunciones que el imputado debe desvirtuar',
                'Como pautas que sólo rigen para reincidentes',
              ],
              'Sirven para fundar «fundadamente» la presunción de fuga o entorpecimiento en el caso concreto.',
            ),
            comp(
              'Completá.',
              'Puede valorarse si el imputado hubiere gozado de ___ anteriores.',
              ['excarcelaciones', 'suspensiones de juicio a prueba', 'condenas condicionales', 'morigeraciones'],
              'Haber incumplido excarcelaciones anteriores puede indicar falta de voluntad de someterse al proceso.',
            ),
          ],
        }),
      ],
    },
    {
      articuloId: 'cppba-154',
      relacionados: ['cppba-153'],
      lecciones: [
        leccion({
          id: 'u3-a154-l1',
          titulo: 'Flagrancia y aprehensión',
          minutos: 4,
          intro: {
            titulo: 'Detener sin orden judicial',
            parrafos: [
              'Como regla, privar de la libertad requiere orden judicial. La excepción más importante es la flagrancia: la policía (y en ciertos casos un particular) puede aprehender sin orden.',
              'Hay flagrancia cuando el autor es sorprendido cometiendo el hecho o inmediatamente después; mientras es perseguido por la fuerza pública, el ofendido o el público; o mientras tiene objetos o presenta rastros que hagan presumir que acaba de participar en un delito.',
              'El aprehendido debe quedar de inmediato a disposición de la autoridad judicial: desde la restricción de la libertad corren las 24 horas del art. 308 para recibirle declaración.',
            ],
            enLaPractica:
              'En la Provincia, muchos casos de flagrancia tramitan por un procedimiento especial más rápido, con audiencias orales ante el Juez de Garantías.',
          },
          foco: 'es sorprendido en el momento de cometerlo o inmediatamente después',
          preguntas: [
            op(
              '¿Cuál de estas situaciones NO es flagrancia?',
              [
                'Detener a alguien una semana después porque «tiene cara conocida»',
                'Sorprenderlo mientras rompe la vidriera',
                'Detenerlo mientras huye perseguido por la víctima',
                'Encontrarlo segundos después con el objeto robado en la mano',
              ],
              'La flagrancia exige inmediatez entre el hecho y la aprehensión. Una semana después ya no hay flagrancia.',
            ),
            ord(
              'Ordená cronológicamente un procedimiento por flagrancia:',
              [
                'La policía sorprende al autor cometiendo el hecho',
                'Lo aprehende sin orden judicial',
                'Lo pone de inmediato a disposición de la autoridad judicial',
                'El Fiscal le recibe declaración en el plazo legal',
              ],
              'La aprehensión sin orden es excepcional y debe ser inmediatamente controlada por la autoridad judicial.',
            ),
            vf(
              'En flagrancia, la policía puede mantener al aprehendido sin avisar al Fiscal hasta terminar el sumario.',
              false,
              'Falso. El aprehendido debe quedar de inmediato a disposición de la autoridad judicial; además, desde la restricción de la libertad corre el plazo de 24 horas del art. 308.',
            ),
            comp(
              'Completá la definición del art. 154.',
              'También hay flagrancia mientras es ___ por la fuerza pública, el ofendido o el público.',
              ['perseguido', 'identificado', 'señalado', 'buscado'],
              'La persecución ininterrumpida mantiene la flagrancia.',
            ),
            vf(
              'Si el delito es de instancia privada y quien puede promover la acción no denuncia en el acto, el aprehendido debe ser liberado.',
              true,
              'Verdadero: lo dice el último párrafo del art. 153. Sin la instancia de la víctima no puede seguir la persecución.',
            ),
          ],
        }),
      ],
    },
    {
      articuloId: 'cppba-157',
      relacionados: ['cppba-158', 'cppba-159'],
      falloClave: {
        tribunal: 'Comisión Interamericana de Derechos Humanos',
        caso: 'Informe 86/09 «Peirano Basso» (Uruguay)',
        anio: '2009',
        resumen:
          'La CIDH sistematizó los estándares de la prisión preventiva: es excepcional, debe fundarse en fines procesales concretos (fuga o entorpecimiento), respetar la proporcionalidad y revisarse periódicamente.',
        regla:
          'No puede fundarse la prisión preventiva sólo en la gravedad del delito o en la pena en expectativa: hace falta acreditar un riesgo procesal concreto en el caso.',
        nota: 'Síntesis didáctica del informe de fondo (adoptado como Informe 35/07 y publicado como 86/09). Los tribunales bonaerenses citan con frecuencia estos estándares.',
        enlaces: [ENLACES.peiranoBasso],
        ambito: 'interamericano',
      },
      lecciones: [
        leccion({
          id: 'u3-a157-l1',
          titulo: 'Requisitos de la prisión preventiva',
          minutos: 4,
          intro: {
            titulo: 'Cuatro requisitos, todos juntos',
            parrafos: [
              'La detención se convierte en prisión preventiva sólo si se reúnen conjuntamente cuatro requisitos: 1) que esté justificada la existencia del delito; 2) que el imputado haya declarado (o se haya negado); 3) que haya elementos de convicción suficientes o indicios vehementes de que probablemente es autor o partícipe; 4) que concurran los presupuestos del art. 171 para denegar la excarcelación, es decir, peligros procesales.',
              'Si falta uno solo, no hay preventiva: corresponde la libertad o una medida menos gravosa. Antes de resolver, el juez fija una audiencia oral y pública si una parte la pide o si él lo decide (art. 168 bis).',
            ],
            enLaPractica:
              'El Juez de Garantías bonaerense resuelve la preventiva a pedido del Fiscal, muchas veces en audiencia oral, y su decisión es apelable ante la Cámara de Garantías.',
          },
          foco: 'cuando medien conjuntamente los siguientes requisitos',
          preguntas: [
            ord(
              'Ordená los requisitos de la prisión preventiva según el art. 157:',
              [
                'Existencia del delito justificada',
                'Declaración del imputado recibida (o negativa a prestarla)',
                'Elementos de convicción suficientes sobre su probable autoría o participación',
                'Presupuestos del art. 171 para denegar la excarcelación',
              ],
              'Es el orden del art. 157: primero el hecho, después la persona, y por último el riesgo procesal (remisión al art. 171).',
            ),
            vf(
              'Puede dictarse prisión preventiva sin haber recibido declaración al imputado ni haberle dado la oportunidad de hacerlo.',
              false,
              'Falso. La declaración (o la negativa a prestarla) es requisito del inc. 2: garantiza que el imputado haya podido defenderse antes.',
            ),
            op(
              'Hay prueba sólida del hecho y de la autoría, pero el imputado tiene arraigo y la prueba ya está asegurada. ¿Procede la preventiva?',
              [
                'No: falta el peligro procesal',
                'Sí: alcanza con la prueba del hecho y la autoría',
                'Sí, si la pena en expectativa supera ocho años',
                'Sí, si el particular damnificado lo pide',
              ],
              'Los requisitos son conjuntos. Sin peligro procesal concreto (inc. 4, remisión al art. 171) no hay prisión preventiva.',
            ),
            op(
              '¿Qué prevé el art. 168 bis antes de resolver la prisión preventiva?',
              [
                'Una audiencia oral y pública, a pedido de parte o por decisión del juez, notificada con 48 horas',
                'Una vista escrita a la defensa por cinco días',
                'Una audiencia reservada en la que no participa la víctima',
                'Ninguna audiencia: el juez decide sobre el expediente',
              ],
              'En la audiencia hablan, en ese orden y hasta 15 minutos cada uno, el Fiscal, la víctima o particular damnificado, la defensa y el imputado. A los ocho meses sin debate puede pedirse una nueva.',
            ),
          ],
        }),
      ],
    },
    {
      articuloId: 'cppba-159',
      relacionados: ['cppba-163', 'cppba-160'],
      lecciones: [
        leccion({
          id: 'u3-a157-l2',
          titulo: 'Alternativas a la prisión preventiva',
          minutos: 5,
          intro: {
            titulo: 'Antes que la cárcel, otras opciones',
            parrafos: [
              'El art. 159 obliga al juez («impondrá») a usar alternativas en lugar de la prisión cuando se trate de personas mayores de 70 años, con una enfermedad incurable en período terminal, embarazadas o con hijos menores de 5 años, siempre que el peligro pueda evitarse con una medida menos gravosa o con control electrónico.',
              'Fuera de esos casos, el art. 163 permite morigerar la coerción en forma excepcional, previa vista al Fiscal, si el peligro puede evitarse con una medida menos gravosa (prisión domiciliaria, salidas laborales, internación terapéutica). La víctima debe ser informada y puede pedir ser oída.',
              'Y el art. 160 enumera condiciones para la libertad: presentaciones periódicas, prohibición de salir de un ámbito o de comunicarse con ciertas personas, caución, entre otras.',
            ],
            enLaPractica:
              'En un caso con riesgo de contacto con la víctima, una prohibición de acercamiento con tobillera electrónica puede neutralizar el peligro sin encarcelar.',
          },
          foco: 'el juez de garantías impondrá tales alternativas en lugar de la prisión',
          preguntas: [
            op(
              'El único riesgo es que el imputado contacte a la víctima. ¿Qué medida es la más adecuada?',
              [
                'Prohibición de comunicarse con la víctima, con control si hace falta',
                'Prisión preventiva en una unidad penal',
                'Caución real elevada',
                'Presentaciones semanales en la comisaría, sin otra restricción',
              ],
              'La medida debe ser idónea y la menos lesiva para neutralizar ese riesgo concreto.',
            ),
            op(
              'Una imputada embarazada tiene un riesgo de fuga que puede neutralizarse con monitoreo electrónico. ¿Qué debe hacer el juez?',
              [
                'Imponer la alternativa en lugar de la prisión: el art. 159 dice «impondrá»',
                'Elegir libremente entre la prisión preventiva y la alternativa',
                'Dictar la preventiva y evaluar después una morigeración',
                'Concederla sólo si el Fiscal presta conformidad',
              ],
              'Para mayores de 70 años, enfermos terminales, embarazadas o madres de hijos menores de 5 años, si el peligro puede evitarse con una medida menos gravosa, la alternativa es obligatoria.',
            ),
            comp(
              'Completá el art. 159.',
              'Siempre que el peligro de fuga o de entorpecimiento probatorio pudiera razonablemente evitarse por aplicación de otra medida ___ gravosa para el imputado.',
              ['menos', 'igualmente', 'proporcionalmente', 'más'],
              'La alternativa menos gravosa se impone si alcanza para neutralizar el peligro.',
            ),
            op(
              'Un imputado de 40 años, sin hijos pequeños, pide una morigeración. ¿Qué norma la habilita?',
              [
                'El art. 163: excepcionalmente, previa vista al Fiscal, si una medida menos gravosa evita el peligro',
                'El art. 159, que rige para cualquier imputado',
                'Ninguna: sólo procede para los casos del art. 159',
                'El art. 169, como una forma de excarcelación',
              ],
              'El art. 163 (Ley 15.232) admite la morigeración fuera de los supuestos del art. 159, en forma excepcional y fundada; la resolución es apelable y se informa a la víctima.',
            ),
            vf(
              'La prisión domiciliaria con control es una de las formas de atenuar la coerción.',
              true,
              'Verdadero: el art. 163 la enumera junto con el encarcelamiento con salidas y el ingreso en una institución educadora o terapéutica.',
            ),
          ],
        }),
      ],
    },
    {
      articuloId: 'cppba-158',
      lecciones: [
        leccion({
          id: 'u3-a158-l1',
          titulo: 'El auto de prisión preventiva',
          minutos: 3,
          intro: {
            titulo: 'Plazo y contenido del auto',
            parrafos: [
              'El Fiscal debe pedir la prisión preventiva dentro de los quince días (prorrogables por igual plazo) desde que se efectivizó la detención, y el juez dicta el auto dentro del quinto día de esa solicitud.',
              'Según el art. 158, el auto debe: 1) expresar cuáles son los elementos que acreditan el delito y su autor o partícipe; 2) si toma en cuenta la declaración del imputado, extraer la parte pertinente; 3) si se apoya en testimonios o pericias, mencionar sintéticamente lo que resulta de ellos; 4) si usa otros elementos probatorios, señalar cuáles son y cómo resultan acreditados.',
              'Es decir: no alcanza con afirmar que hay prueba; hay que mostrarla.',
            ],
            enLaPractica:
              'Al apelar una preventiva ante la Cámara de Garantías, la defensa revisa punto por punto si el auto explica de qué prueba surgen el hecho y la autoría, y si se dictó dentro del plazo.',
          },
          foco: 'dentro del plazo de quince (15) días prorrogables por igual plazo',
          preguntas: [
            comp(
              'Completá el art. 158.',
              'La solicitud del Agente Fiscal debe presentarse dentro del plazo de ___ prorrogables por igual plazo, a contar de la detención.',
              ['quince (15) días', 'cinco (5) días', 'diez (10) días', 'treinta (30) días'],
              'Quince días desde que se efectivizó la detención, prorrogables por igual plazo. Los cinco días son el plazo del juez para resolver.',
            ),
            op(
              'El Fiscal pidió la prisión preventiva. ¿En qué plazo debe dictarse el auto?',
              ['Dentro del quinto día de la solicitud', 'Dentro de las 24 horas', 'Dentro de los quince días de la solicitud', 'Antes de la elevación a juicio, sin plazo fijo'],
              'Art. 158: el auto «será dictado dentro del quinto día de la solicitud del Agente Fiscal».',
            ),
            op(
              '¿A pedido de quién se dicta el auto de prisión preventiva?',
              ['Del Agente Fiscal', 'Del Juez de Garantías, de oficio', 'Del Fiscal General departamental', 'De la Policía que intervino'],
              'El art. 158 lo dice expresamente: se dicta «a solicitud del Agente Fiscal» (coherente con el art. 146: las medidas se ordenan a pedido de parte).',
            ),
            op(
              '¿Qué debe expresar el auto?',
              [
                'Cuáles son los elementos de los que resultan acreditados el delito y su autor o partícipe',
                'La pena que se impondrá en la sentencia',
                'La calificación definitiva que regirá en el juicio',
                'El monto de la caución para excarcelarlo',
              ],
              'Es el inc. 1 del art. 158. La pena se fija recién en la sentencia.',
            ),
            vf(
              'Si el auto se apoya en declaraciones testimoniales, basta con citarlas sin decir qué surge de ellas.',
              false,
              'Falso. El art. 158 inc. 3 exige mencionar sintéticamente lo que resulta de las pruebas testimoniales o periciales.',
            ),
          ],
        }),
      ],
    },
  ],
  caso: {
    id: 'caso-u3',
    titulo: 'Flagrancia en la estación',
    rol: 'Juez/a de Garantías',
    sede: 'Juzgado de Garantías · Departamento Judicial Lomas de Zamora (caso ficticio)',
    hechos: [
      'Diego (34) fue aprehendido en la estación de Banfield por un policía que lo persiguió sin perderlo de vista, segundos después de que arrebatara una billetera.',
      'Tiene domicilio verificado, trabaja en una verdulería del barrio, tiene dos hijos y no registra antecedentes. Declaró ante la UFI asistido por su defensor.',
      'El Fiscal te pide la prisión preventiva. Vos decidís.',
    ],
    etapas: [
      {
        id: 'e1',
        momento: 'Control de la aprehensión',
        situacion: 'La defensa plantea que Diego fue detenido sin orden judicial.',
        pregunta: '¿La aprehensión fue legítima?',
        opciones: [
          {
            texto: 'Sí: fue perseguido inmediatamente después del hecho por la fuerza pública; hay flagrancia (arts. 153 y 154).',
            puntaje: 2,
            devolucion: 'Correcto. La persecución inmediata e ininterrumpida configura flagrancia y habilita la aprehensión sin orden.',
          },
          {
            texto: 'No: toda detención requiere orden judicial previa.',
            puntaje: 0,
            devolucion: 'La flagrancia es justamente la excepción a la orden judicial previa.',
          },
          {
            texto: 'Sólo habría sido legítima si la hacía la víctima.',
            puntaje: 0,
            devolucion: 'La policía tiene el deber de aprehender en flagrancia; los particulares, la facultad.',
          },
        ],
        normas: ['Arts. 153 y 154 CPPBA'],
      },
      {
        id: 'e2',
        momento: 'Pedido de preventiva',
        situacion: 'El Fiscal funda su pedido en «la gravedad del hecho y la alarma social que generan los robos en la estación».',
        pregunta: '¿Cómo resolvés?',
        opciones: [
          {
            texto: 'Rechazo el pedido: la alarma social no es un peligro procesal y Diego tiene arraigo; no se acreditó riesgo de fuga ni de entorpecimiento.',
            puntaje: 2,
            devolucion: 'Muy bien. Faltan los peligros procesales concretos (arts. 144, 148 y 157 inc. 4).',
          },
          {
            texto: 'Hago lugar: los robos en la estación son un problema grave.',
            puntaje: 0,
            devolucion: 'Eso convertiría la preventiva en una herramienta de política de seguridad, ajena a sus fines procesales.',
          },
          {
            texto: 'Hago lugar por 30 días, «para que reflexione».',
            puntaje: 0,
            devolucion: 'Sería una pena anticipada, prohibida por el principio de inocencia.',
          },
        ],
        normas: ['Art. 144 CPPBA', 'Art. 148 CPPBA', 'Art. 157 CPPBA'],
      },
      {
        id: 'e3',
        momento: 'Nueva prueba',
        situacion: 'Dos días después, la víctima declara que Diego la llamó por teléfono para pedirle que «no siga con la denuncia».',
        pregunta: '¿Qué medida es la más adecuada?',
        opciones: [
          {
            texto: 'Impongo prohibición de contacto con la víctima y presentaciones periódicas (art. 159), advirtiendo que su incumplimiento puede llevar a una medida más grave.',
            puntaje: 2,
            devolucion: 'Excelente. Hay un indicio concreto de entorpecimiento, pero una medida menos gravosa puede neutralizarlo.',
          },
          {
            texto: 'Dicto prisión preventiva de inmediato.',
            puntaje: 1,
            devolucion: 'El riesgo existe, pero si una alternativa lo neutraliza, el juez debe preferirla (art. 159).',
          },
          {
            texto: 'No hago nada: llamar a la víctima no es relevante.',
            puntaje: 0,
            devolucion: 'Influir sobre la víctima o testigos es exactamente el peligro de entorpecimiento del art. 148.',
          },
        ],
        normas: ['Art. 148 CPPBA', 'Art. 159 CPPBA'],
      },
    ],
    cierre: {
      titulo: 'Coerción con límites',
      texto:
        'Controlaste la aprehensión, exigiste peligros procesales concretos y elegiste la medida menos gravosa capaz de neutralizar el riesgo. Así trabaja un Juez de Garantías: la libertad es la regla y la coerción, la excepción fundada.',
    },
  },
};
