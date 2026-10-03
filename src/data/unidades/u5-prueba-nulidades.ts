import { comp, leccion, op, ord, vf } from '../helpers';
import type { Unidad } from '../tipos';

export const U5: Unidad = {
  id: 'u5',
  numero: 5,
  titulo: 'Nulidades y medios de prueba',
  subtitulo: 'Cómo se prueba y qué pasa cuando se violan las formas',
  etapa: 'Medios de prueba',
  color: 'rosa',
  icono: '🔎',
  temas: [
    {
      articuloId: 'cppba-201',
      relacionados: ['cppba-202', 'cppba-203'],
      falloClave: {
        tribunal: 'CSJN y tribunales bonaerenses (línea reiterada)',
        caso: 'Principio de trascendencia: «no hay nulidad sin perjuicio»',
        resumen:
          'La jurisprudencia exige, para declarar una nulidad, que quien la plantea indique qué perjuicio concreto le causó el vicio y qué defensas se vio privado de oponer. La nulidad no se declara en el solo interés de la ley.',
        regla:
          'La nulidad es la última ratio: procede cuando el vicio produce un perjuicio real a una parte o afecta garantías constitucionales; si el acto puede subsanarse o cumplió su finalidad, se mantiene.',
        nota: 'Síntesis de una línea jurisprudencial consolidada; para un escrito, buscá precedentes concretos en JUBA (SCBA) y en la base de la CSJN.',
      },
      lecciones: [
        leccion({
          id: 'u5-a201-l1',
          titulo: 'Taxatividad de las nulidades',
          minutos: 3,
          intro: {
            titulo: 'Sólo es nulo lo que la ley dice',
            parrafos: [
              'El art. 201 fija el principio de taxatividad: un acto procesal es nulo sólo cuando no se observaron disposiciones que la ley prevé expresamente «bajo pena de nulidad».',
              'Ya viste varios ejemplos: la declaración del imputado sin defensor (art. 308) o el auto de prisión preventiva sin fundamentos (art. 158).',
            ],
            enLaPractica:
              'Antes de plantear una nulidad, buscá en el código la frase «bajo sanción (o pena) de nulidad» o una garantía constitucional afectada. Si no está, el planteo probablemente sea rechazado.',
          },
          foco: 'sólo cuando no se hubieran observado las disposiciones expresamente prescriptas bajo pena de nulidad',
          preguntas: [
            op(
              '¿Cuándo es nulo un acto procesal según el art. 201?',
              [
                'Cuando no se observaron disposiciones prescriptas expresamente bajo pena de nulidad',
                'Cuando a una parte no le gusta el resultado',
                'Siempre que tenga un error de tipeo',
                'Cuando lo pide la víctima',
              ],
              'Es el principio de taxatividad (o especificidad).',
            ),
            vf(
              'Cualquier error formal, por mínimo que sea, provoca la nulidad del acto.',
              false,
              'Falso. Rige la taxatividad y, además, se exige un perjuicio concreto.',
            ),
            comp(
              'Completá.',
              'Las nulidades se rigen por el principio de ___: sólo las que la ley prevé expresamente.',
              ['taxatividad', 'oportunidad', 'publicidad', 'inmediación'],
              'Taxatividad o especificidad: la ley enumera las causales.',
            ),
          ],
        }),
        leccion({
          id: 'u5-a201-l2',
          titulo: 'Nulidades generales y de oficio',
          minutos: 4,
          intro: {
            titulo: 'Las que siempre importan',
            parrafos: [
              'El art. 202 agrega nulidades de carácter general: las que afectan el nombramiento, capacidad y constitución del juez o fiscal; la intervención del juez, el Fiscal y la parte civil cuando es obligatoria; y la intervención, asistencia y representación del imputado.',
              'Cuando esas nulidades implican violación de normas constitucionales, deben declararse de oficio en cualquier estado y grado del proceso (art. 203). Las demás requieren planteo de parte en tiempo oportuno.',
            ],
            enLaPractica:
              'Si se descubre en el juicio que el imputado nunca tuvo defensor en un acto central de la IPP, el Tribunal debe declarar la nulidad aunque nadie la haya pedido.',
          },
          preguntas: [
            op(
              '¿Cuál de estos vicios es una nulidad de carácter general?',
              [
                'Falta de asistencia del imputado por su defensor en un acto en que es obligatoria',
                'Un error en la numeración de las fojas',
                'Una audiencia que empezó 10 minutos tarde',
                'Una notificación con una coma mal puesta',
              ],
              'La asistencia y representación del imputado está expresamente protegida por el art. 202.',
            ),
            vf(
              'Las nulidades que implican violación de normas constitucionales pueden declararse de oficio en cualquier estado del proceso.',
              true,
              'Verdadero, según el art. 203.',
            ),
            ord(
              'Ordená de la regla a la excepción:',
              [
                'Regla: sólo hay nulidad si la ley la prevé expresamente (art. 201)',
                'Nulidades generales en todo caso (art. 202)',
                'Declaración de oficio si afectan normas constitucionales (art. 203)',
              ],
              'Del principio de taxatividad a las nulidades absolutas, que operan aun sin pedido de parte.',
            ),
          ],
        }),
      ],
    },
    {
      articuloId: 'cppba-209',
      relacionados: ['cppba-210'],
      lecciones: [
        leccion({
          id: 'u5-a209-l1',
          titulo: 'Libertad probatoria',
          minutos: 3,
          intro: {
            titulo: 'Se puede probar por cualquier medio… lícito',
            parrafos: [
              'Todo hecho relacionado con el objeto del proceso puede probarse por cualquier medio de prueba: testigos, peritos, documentos, reconocimientos, registros de cámaras, informes de telefonía, etc.',
              'Incluso se pueden usar medios no previstos en el código, con tres límites: que no afecten la moral, no estén prohibidos por la ley y no violen garantías constitucionales.',
            ],
            enLaPractica:
              'Las imágenes del Centro de Monitoreo municipal o de una cámara de un comercio son prueba válida en una IPP bonaerense, aunque el código no las mencione expresamente.',
          },
          foco: 'pueden ser acreditados por cualquiera de los medios de prueba',
          preguntas: [
            vf(
              'Un video de una cámara de seguridad puede usarse como prueba aunque el CPPBA no regule expresamente ese medio.',
              true,
              'Verdadero: rige la libertad probatoria, con los límites de la ley y las garantías.',
            ),
            op(
              '¿Cuál es un límite a la libertad probatoria?',
              [
                'Que el medio no viole garantías constitucionales',
                'Que la prueba sea favorable al Fiscal',
                'Que sea un medio escrito',
                'Que lo autorice la víctima',
              ],
              'El art. 209 excluye medios que afecten la moral, estén prohibidos o violen garantías.',
            ),
            comp(
              'Completá.',
              'Se podrán utilizar otros medios siempre que no impliquen violación de ___.',
              ['garantías constitucionales', 'costumbres locales', 'plazos administrativos', 'normas de tránsito'],
              'Las garantías constitucionales son el límite infranqueable.',
            ),
          ],
        }),
        leccion({
          id: 'u5-a210-l1',
          titulo: 'Sana crítica',
          minutos: 3,
          intro: {
            titulo: 'Libertad para valorar, obligación de explicar',
            parrafos: [
              'Los jueces valoran la prueba según la sana crítica: no hay pruebas con valor fijado por ley (sistema de prueba tasada), pero tampoco pueden decidir por íntima convicción sin explicar.',
              'Deben razonar de acuerdo con la lógica, la experiencia y los conocimientos científicos, y exponer por qué creen a un testigo y no a otro.',
            ],
            enLaPractica:
              'En casación, una sentencia que no explica por qué descartó la versión del imputado puede anularse por arbitrariedad en la valoración de la prueba.',
          },
          preguntas: [
            op(
              '¿Qué exige la sana crítica?',
              [
                'Valorar libremente pero fundando el razonamiento en la lógica, la experiencia y la ciencia',
                'Contar cuántos testigos declararon de cada lado',
                'Aplicar un valor fijo a cada prueba',
                'Decidir por intuición sin explicar',
              ],
              'La sana crítica combina libertad de valoración con deber de motivación.',
            ),
            vf(
              'En el sistema de sana crítica, una confesión vale automáticamente como prueba plena.',
              false,
              'Falso. Ninguna prueba tiene valor tasado: también la confesión se valora con las demás pruebas.',
            ),
            ord(
              'Ordená los sistemas de valoración del más rígido al más libre:',
              ['Prueba tasada (legal)', 'Sana crítica racional', 'Íntima convicción'],
              'El CPPBA adopta la sana crítica, intermedia entre ambos extremos (la íntima convicción es propia del jurado popular).',
            ),
          ],
        }),
      ],
    },
    {
      articuloId: 'cppba-211',
      falloClave: {
        tribunal: 'CSJN y Corte Interamericana de Derechos Humanos',
        caso: '«Rayford» (CSJN, 1986) y «Fernández Prieto y Tumbeiro vs. Argentina» (Corte IDH, 2020)',
        resumen:
          'En «Rayford» la CSJN excluyó no sólo la prueba obtenida ilegalmente sino también la que derivaba de ella, salvo que existiera un cauce de investigación independiente. En «Fernández Prieto y Tumbeiro», la Corte IDH condenó a la Argentina por detenciones y requisas basadas en la «actitud sospechosa» de las personas, sin elementos objetivos.',
        regla:
          'La prueba obtenida con afectación de garantías y la que deriva directamente de ella carecen de eficacia (doctrina del «fruto del árbol venenoso»), salvo fuente independiente. Una requisa sin motivos objetivos previos es arbitraria.',
        nota: 'Síntesis didáctica (Fallos 308:733; Corte IDH, sentencia del 1/9/2020). Consultá los textos completos antes de citarlos.',
      },
      lecciones: [
        leccion({
          id: 'u5-a211-l1',
          titulo: 'Regla de exclusión',
          minutos: 4,
          intro: {
            titulo: 'El Estado no puede beneficiarse de su propio ilícito',
            parrafos: [
              'El art. 211 es breve y potente: carece de toda eficacia la prueba obtenida con afectación de garantías constitucionales.',
              'Eso alcanza también a la prueba derivada («fruto del árbol venenoso»): si un allanamiento ilegal lleva a encontrar un objeto, y ese objeto lleva a un testigo, todo el «árbol» queda contaminado.',
              'La excepción: si la misma prueba se habría obtenido por una fuente independiente y lícita, puede valorarse.',
            ],
            enLaPractica:
              'Requisas por «nerviosismo» o «actitud sospechosa» son planteos habituales de nulidad y exclusión ante los Juzgados de Garantías bonaerenses.',
          },
          foco: 'Carecerá de toda eficacia',
          preguntas: [
            op(
              'La policía entró a una casa sin orden ni urgencia y encontró un celular robado. ¿Qué pasa con esa prueba?',
              [
                'Carece de eficacia por violar la inviolabilidad del domicilio',
                'Es válida porque el celular era robado',
                'Es válida si el imputado no protesta en el momento',
                'Es válida si la víctima reconoce el celular',
              ],
              'El hallazgo no convalida el ingreso ilegal. Rige el art. 211 y el art. 18 CN.',
            ),
            vf(
              'La prueba que deriva directamente de una prueba ilícita también debe excluirse, salvo fuente independiente.',
              true,
              'Verdadero: es la doctrina del fruto del árbol venenoso («Rayford»).',
            ),
            op(
              '¿Qué es la «fuente independiente»?',
              [
                'Un cauce lícito de investigación que habría llevado a la misma prueba sin depender de la ilegalidad',
                'Un testigo que trabaja de forma independiente',
                'Una prueba aportada por la defensa',
                'Un perito de parte',
              ],
              'Si la prueba se obtiene por un camino autónomo y lícito, la exclusión no la alcanza.',
            ),
            comp(
              'Completá el art. 211.',
              'Carecerá de toda eficacia la prueba obtenida con afectación de ___.',
              ['garantías constitucionales', 'formalidades menores', 'horarios judiciales', 'reglamentos internos'],
              'La regla de exclusión protege las garantías constitucionales.',
            ),
          ],
        }),
      ],
    },
  ],
  caso: {
    id: 'caso-u5',
    titulo: 'La requisa por «nerviosismo»',
    rol: 'Defensa oficial',
    sede: 'Juzgado de Garantías · Departamento Judicial Mar del Plata (caso ficticio)',
    hechos: [
      'Kevin (20) caminaba por el centro de Mar del Plata. Dos policías lo detuvieron porque «se mostró nervioso al ver el patrullero». Lo requisaron sin testigos y le encontraron un celular con pedido de secuestro.',
      'Con ese dato fueron a su casa y su hermano de 15 años les abrió la puerta. Adentro encontraron otros dos celulares robados.',
    ],
    etapas: [
      {
        id: 'e1',
        momento: 'Análisis de la requisa',
        situacion: 'El acta policial dice textualmente: «se mostró nervioso y esquivo, por lo que se procedió a su requisa».',
        pregunta: '¿Qué planteo hacés?',
        opciones: [
          {
            texto: 'Nulidad de la requisa y exclusión del celular: el nerviosismo no es un motivo objetivo previo que justifique una requisa sin orden.',
            puntaje: 2,
            devolucion: 'Correcto. Es la línea de la Corte IDH en «Fernández Prieto y Tumbeiro» y de la regla de exclusión del art. 211.',
          },
          {
            texto: 'Ninguno: si encontraron un celular robado, la requisa estaba justificada.',
            puntaje: 0,
            devolucion: 'El resultado no convalida el procedimiento: los motivos deben existir ANTES de la requisa.',
          },
          {
            texto: 'Sólo pedir que se corrija el acta para agregar testigos.',
            puntaje: 0,
            devolucion: 'El problema no es formal: es la falta de causa legítima para afectar la libertad y la intimidad.',
          },
        ],
        normas: ['Art. 211 CPPBA', 'Arts. 219 a 225 CPPBA', 'Art. 18 CN'],
      },
      {
        id: 'e2',
        momento: 'El ingreso al domicilio',
        situacion: 'La policía sostiene que el hermano de Kevin «autorizó» el ingreso.',
        pregunta: '¿Qué sostenés?',
        opciones: [
          {
            texto: 'El ingreso es inválido: no hubo orden judicial y el consentimiento de un menor de 15 años, sin informarle su derecho a negarse, no es válido. Además, deriva de la requisa ilegal.',
            puntaje: 2,
            devolucion: 'Muy bien: doble vicio. Los celulares del domicilio son fruto del árbol venenoso.',
          },
          {
            texto: 'El ingreso es válido porque alguien abrió la puerta.',
            puntaje: 0,
            devolucion: 'Abrir la puerta no equivale a un consentimiento libre e informado para un registro.',
          },
          {
            texto: 'El ingreso es válido pero la prueba hay que «valorarla con cuidado».',
            puntaje: 1,
            devolucion: 'La prueba obtenida con afectación de garantías no se valora con cuidado: se excluye.',
          },
        ],
        normas: ['Art. 211 CPPBA', 'Art. 18 CN'],
      },
      {
        id: 'e3',
        momento: 'Oportunidad del planteo',
        situacion: 'Te preguntás cuándo y ante quién plantear las nulidades.',
        pregunta: '¿Cuál es la vía correcta?',
        opciones: [
          {
            texto: 'Plantearlas durante la IPP ante el Juez de Garantías y, si no prosperan, reeditar la cuestión de validez de los actos en la audiencia preliminar del juicio (art. 338).',
            puntaje: 2,
            devolucion: 'Correcto. Plantear temprano evita preclusiones; la audiencia preliminar permite discutir la validez constitucional de los actos de la IPP.',
          },
          {
            texto: 'Esperar a la sentencia y plantearlo directamente ante la Suprema Corte.',
            puntaje: 0,
            devolucion: 'Saltearías instancias y te arriesgarías a que se considere consentido el acto.',
          },
          {
            texto: 'Hacer una denuncia administrativa contra los policías y nada más.',
            puntaje: 1,
            devolucion: 'Puede hacerse, pero no resuelve la situación procesal de Kevin: la nulidad se plantea en el proceso.',
          },
        ],
        normas: ['Arts. 201 a 208 CPPBA', 'Art. 338 CPPBA'],
      },
      {
        id: 'e4',
        momento: 'Prueba independiente',
        situacion: 'Una de las víctimas había identificado a Kevin días antes en un video municipal, en una investigación iniciada por su denuncia y sin relación con la requisa.',
        pregunta: '¿Qué pasa con esa prueba?',
        opciones: [
          {
            texto: 'Puede valorarse: proviene de una fuente independiente y lícita.',
            puntaje: 2,
            devolucion: 'Exacto. La exclusión alcanza a lo derivado de la ilegalidad, no a cauces autónomos.',
          },
          {
            texto: 'También debe excluirse porque todo el caso está contaminado.',
            puntaje: 0,
            devolucion: 'La regla de exclusión no borra prueba que se obtuvo por un camino lícito e independiente.',
          },
          {
            texto: 'Sólo vale si Kevin la reconoce.',
            puntaje: 0,
            devolucion: 'Su validez no depende del reconocimiento del imputado.',
          },
        ],
        normas: ['Art. 211 CPPBA', 'Art. 210 CPPBA'],
      },
    ],
    cierre: {
      titulo: 'Garantías que filtran la prueba',
      texto:
        'Aplicaste la regla de exclusión con sus matices: requisas sin motivos objetivos, consentimientos inválidos, prueba derivada y fuente independiente. Es uno de los litigios más frecuentes en las audiencias de garantías.',
    },
  },
};
