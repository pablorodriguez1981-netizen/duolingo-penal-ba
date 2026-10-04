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
        nota: 'Síntesis didáctica (Fallos 328:1146). Es un fallo central para entender las reformas al régimen de coerción del CPPBA.',
      },
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
              ['La libertad del imputado', 'La detención del imputado', 'El arresto domiciliario', 'La prisión preventiva automática'],
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
              ['absolutamente', 'socialmente', 'mediáticamente', 'eventualmente'],
              '«Absolutamente indispensable»: un estándar muy exigente.',
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
                'Que la víctima esté de acuerdo con la medida',
                'Apariencia de responsabilidad',
                'Peligro cierto de frustración de los fines del proceso',
                'Proporcionalidad entre la medida y el objeto de tutela',
              ],
              'La opinión de la víctima puede ser oída, pero no es una condición legal de la medida.',
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
                'Que todos los imputados reciban la misma medida',
                'Que la medida sea proporcional al patrimonio',
                'Que se aplique la medida más dura disponible',
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
              'El art. 148 da pautas para evaluarlo: el arraigo (domicilio, familia, trabajo), la pena que se espera, la actitud frente al daño causado y el comportamiento en este u otros procesos (por ejemplo, rebeldías anteriores).',
              'Ninguna pauta funciona sola ni en abstracto: hay que analizarlas en el caso concreto.',
            ],
            enLaPractica:
              'Un imputado con domicilio verificado, empleo formal y que se presentó espontáneamente a la UFI tiene un fuerte argumento contra el peligro de fuga.',
          },
          foco: 'Para merituar acerca del peligro de fuga',
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
            comp(
              'Completá la pauta del inciso 2.',
              'Para el peligro de fuga se tiene en cuenta la ___ que se espera como resultado del procedimiento.',
              ['pena', 'indemnización', 'opinión pública', 'fecha del juicio'],
              'Una pena alta esperable puede incentivar la fuga, pero por sí sola no alcanza.',
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
                'Porque el imputado se cansa',
                'Porque la ley lo hace caducar a los 30 días',
                'Porque la víctima pierde interés',
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
                'Como agravantes de la pena',
                'Sólo para delitos de acción privada',
              ],
              'Sirven para fundar «fundadamente» la presunción de fuga o entorpecimiento en el caso concreto.',
            ),
            comp(
              'Completá.',
              'Puede valorarse si el imputado hubiere gozado de ___ anteriores.',
              ['excarcelaciones', 'vacaciones', 'licencias laborales', 'subsidios'],
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
              ['perseguido', 'investigado', 'citado', 'buscado por edictos'],
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
        caso: 'Informe 35/07 «Peirano Basso» (Uruguay)',
        anio: '2007',
        resumen:
          'La CIDH sistematizó los estándares de la prisión preventiva: es excepcional, debe fundarse en fines procesales concretos (fuga o entorpecimiento), respetar la proporcionalidad y revisarse periódicamente.',
        regla:
          'No puede fundarse la prisión preventiva sólo en la gravedad del delito o en la pena en expectativa: hace falta acreditar un riesgo procesal concreto en el caso.',
        nota: 'Síntesis didáctica. Los tribunales bonaerenses citan con frecuencia estos estándares al controlar prisiones preventivas.',
      },
      lecciones: [
        leccion({
          id: 'u3-a157-l1',
          titulo: 'Requisitos de la prisión preventiva',
          minutos: 4,
          intro: {
            titulo: 'Cuatro requisitos, todos juntos',
            parrafos: [
              'La detención se convierte en prisión preventiva sólo si se reúnen conjuntamente cuatro requisitos: 1) que esté justificada la existencia del delito; 2) que el imputado haya declarado (o se haya negado); 3) que haya elementos de convicción suficientes para sostener que probablemente es autor o partícipe; 4) que concurran peligros procesales.',
              'Si falta uno solo, no hay preventiva: corresponde la libertad o una medida menos gravosa.',
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
                'Peligros procesales que impiden la libertad',
              ],
              'Es el orden lógico: primero el hecho, después la persona, y por último el riesgo procesal.',
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
                'Sí, si el delito es grave',
                'Sólo si lo pide la víctima',
              ],
              'Los requisitos son conjuntos. Sin peligro procesal concreto no hay prisión preventiva.',
            ),
          ],
        }),
        leccion({
          id: 'u3-a157-l2',
          titulo: 'Alternativas menos gravosas',
          minutos: 3,
          intro: {
            titulo: 'Antes que la cárcel, otras opciones',
            parrafos: [
              'Si el peligro procesal puede evitarse con una medida menos gravosa, el juez debe preferirla (art. 159): presentaciones periódicas, prohibición de salir de un ámbito territorial o de acercarse a la víctima, arresto domiciliario o monitoreo electrónico, entre otras.',
              'Es la aplicación del principio de proporcionalidad y de la idea de «última ratio».',
            ],
            enLaPractica:
              'En un caso con riesgo de contacto con la víctima, una prohibición de acercamiento con tobillera electrónica puede neutralizar el peligro sin encarcelar.',
          },
          preguntas: [
            op(
              'El único riesgo es que el imputado contacte a la víctima. ¿Qué medida es la más adecuada?',
              [
                'Prohibición de contacto y acercamiento, con control electrónico si hace falta',
                'Prisión preventiva en una unidad penal',
                'Ninguna medida',
                'Incomunicación por tiempo indeterminado',
              ],
              'La medida debe ser idónea y la menos lesiva para neutralizar ese riesgo concreto.',
            ),
            comp(
              'Completá el art. 159.',
              'Si el peligro pudiera evitarse por otra medida ___ gravosa, el juez de garantías podrá imponer tales alternativas en lugar de la prisión.',
              ['menos', 'más', 'igualmente', 'nada'],
              'La alternativa menos gravosa debe preferirse si alcanza para neutralizar el peligro (art. 159).',
            ),
            vf(
              'El arresto domiciliario es una alternativa a la prisión preventiva.',
              true,
              'Verdadero: el art. 159 admite limitar la libertad a una vivienda, zona o región, incluso con control electrónico.',
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
              'El auto que decreta la prisión preventiva se dicta a solicitud del Agente Fiscal, dentro de los quince días (prorrogables por igual plazo) desde que se efectivizó la detención.',
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
              'El auto que decrete la prisión preventiva será dictado a solicitud del Agente Fiscal dentro del plazo de ___ prorrogables por igual plazo.',
              ['quince (15) días', 'cinco (5) días', 'treinta (30) días', 'veinticuatro (24) horas'],
              'Quince días desde que se efectivizó la detención, prorrogables por igual plazo.',
            ),
            op(
              '¿A pedido de quién se dicta el auto de prisión preventiva?',
              ['Del Agente Fiscal', 'De la víctima', 'Del juez, de oficio y sin pedido', 'De la Policía'],
              'El art. 158 lo dice expresamente: se dicta «a solicitud del Agente Fiscal» (coherente con el art. 146: las medidas se ordenan a pedido de parte).',
            ),
            op(
              '¿Qué debe expresar el auto?',
              [
                'Cuáles son los elementos de los que resultan acreditados el delito y su autor o partícipe',
                'La pena definitiva que se impondrá',
                'La opinión de la prensa sobre el caso',
                'El monto de la indemnización',
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
