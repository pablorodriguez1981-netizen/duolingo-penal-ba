import { ENLACES } from '../enlaces-fallos';
import { comp, leccion, op, ord, vf } from '../helpers';
import type { Unidad } from '../tipos';

export const U7: Unidad = {
  id: 'u7',
  numero: 7,
  titulo: 'Juicio oral y veredicto',
  subtitulo: 'El debate, la decisión y la pena',
  etapa: 'Juicio oral y debate',
  color: 'amarillo',
  icono: '🏛️',
  temas: [
    {
      articuloId: 'cppba-342',
      relacionados: ['cppba-338'],
      lecciones: [
        leccion({
          id: 'u7-a342-l1',
          titulo: 'Oralidad y publicidad',
          minutos: 3,
          intro: {
            titulo: 'El corazón del proceso',
            parrafos: [
              'El debate es oral y público, bajo sanción de nulidad. La prueba se produce frente a los jueces, que escuchan directamente a testigos y peritos (inmediación), y las partes pueden contradecirla.',
              'La publicidad permite el control ciudadano. Pero el tribunal puede resolver que el debate sea total o parcialmente a puertas cerradas cuando la publicidad pudiere afectar el normal desarrollo del juicio, la moral, la intimidad de la víctima o de un testigo, o por razones de seguridad. En caso de duda, siempre se está por la publicidad, y la prensa no puede ser excluida fuera de esos supuestos.',
            ],
            enLaPractica:
              'En un juicio con una víctima menor de edad, el Tribunal en lo Criminal puede cerrar la sala sólo durante su declaración y reabrirla después.',
          },
          foco: 'El debate será oral y público, bajo sanción de nulidad',
          preguntas: [
            op(
              '¿Cómo debe ser el debate según el art. 342?',
              [
                'Oral y público, bajo sanción de nulidad',
                'Oral y público, salvo que el imputado pida reserva',
                'Oral, y público sólo si lo autoriza la víctima',
                'Público, con lectura de las declaraciones de la IPP',
              ],
              'Oralidad y publicidad son la regla del juicio; las excepciones son las del propio art. 342, resueltas por el tribunal.',
            ),
            vf(
              'El tribunal puede ordenar que una parte del debate se haga a puertas cerradas para proteger la intimidad de una víctima.',
              true,
              'Verdadero: la intimidad de la víctima o de un testigo es una de las causales del art. 342.',
            ),
            vf(
              'En caso de duda, debe estarse por la publicidad del debate.',
              true,
              'Verdadero: lo dice expresamente el art. 342.',
            ),
            comp(
              'Completá.',
              'Desaparecido el motivo de la resolución, se permitirá el acceso del ___.',
              ['público', 'imputado', 'jurado', 'particular damnificado'],
              'La clausura dura sólo lo necesario.',
            ),
          ],
        }),
        leccion({
          id: 'u7-a342-l2',
          titulo: 'Del ofrecimiento de prueba a los alegatos',
          minutos: 4,
          intro: {
            titulo: 'El recorrido del juicio común',
            parrafos: [
              'Recibida la causa e integrado el tribunal, las partes tienen diez días para recusar, ofrecer prueba y decir si quieren una audiencia preliminar (art. 338). Si alguna la pide (y siempre en el juicio por jurados), allí se depura la prueba, se discuten las nulidades y la validez constitucional de los actos de la IPP no resueltas antes, y pueden acordarse estipulaciones probatorias.',
              'Luego viene el debate: apertura, declaración del imputado (si quiere), recepción de la prueba (primero la de la acusación, art. 357), alegatos finales y última palabra del imputado, que se le pregunta bajo sanción de nulidad (art. 368).',
              'Si en el debate surge un hecho nuevo que integra el delito, el Fiscal puede ampliar la acusación, pero respetando el derecho de defensa (principio de congruencia).',
            ],
          },
          preguntas: [
            ord(
              'Ordená las etapas del juicio común:',
              [
                'Ofrecimiento de prueba',
                'Audiencia preliminar',
                'Recepción de la prueba en el debate',
                'Alegatos finales',
                'Última palabra del imputado',
              ],
              'Después de la última palabra, los jueces pasan a deliberar el veredicto.',
            ),
            op(
              'En el debate aparece un hecho que no estaba en la acusación. ¿Puede el tribunal condenar por él directamente?',
              [
                'No: el Fiscal debe ampliar la acusación y la defensa debe poder ejercer su derecho',
                'Sí, si el hecho surge claramente de la prueba',
                'Sí, si el particular damnificado lo incluye en su alegato',
                'Sí, si la calificación no cambia',
              ],
              'Principio de congruencia: no se condena por hechos que no fueron objeto de acusación y defensa.',
            ),
            vf(
              'En la audiencia preliminar pueden discutirse nulidades y la validez de los actos de la IPP que se usarán en el debate.',
              true,
              'Verdadero, siempre que esas cuestiones no se hayan planteado y resuelto en la IPP (art. 338 inc. 2).',
            ),
            op(
              'Si el juicio es por jurados, la audiencia preliminar del art. 338 es…',
              ['Obligatoria', 'Facultativa, sólo a pedido de parte', 'Reemplazada por la audiencia del art. 168 bis', 'Prohibida, para no contaminar al jurado'],
              'Art. 338: «Cuando el juicio sea por jurados, esta audiencia será obligatoria». En el juicio técnico se hace si una parte la pide.',
            ),
            vf(
              'Las partes pueden acordar estipulaciones probatorias sobre hechos en los que no haya controversia sustantiva.',
              true,
              'Verdadero (art. 338 inc. 6). El juez las autoriza si no implican renuncia de derechos constitucionales.',
            ),
          ],
        }),
      ],
    },
    {
      articuloId: 'cppba-358',
      relacionados: ['cppba-360', 'cppba-368'],
      lecciones: [
        leccion({
          id: 'u7-a358-l1',
          titulo: 'El imputado en el debate (art. 358)',
          minutos: 4,
          intro: {
            titulo: 'Declarar es un derecho… y quien declara puede ser preguntado',
            parrafos: [
              'Durante el debate el imputado puede declarar todas las veces que quiera, siempre que se refiera a su defensa. Puede hablar con su defensor sin que se suspenda la audiencia, pero no mientras declara ni antes de responder una pregunta.',
              'La Ley 15.004 (2017) reformó el último párrafo: si el imputado decide hablar, queda sometido al interrogatorio de su abogado defensor y de las partes contrarias. Antes, el texto sólo mencionaba a las partes contrarias.',
              'Así, el defensor puede guiar la declaración con preguntas, como hace con sus testigos (art. 360). Pero declarar sigue siendo voluntario: el imputado puede callar y su silencio no lo perjudica.',
            ],
            enLaPractica:
              'En un juicio en Morón, la defensa ofrece que el imputado declare y lo interroga primero para ordenar su relato; después pueden preguntarle el Fiscal y el particular damnificado.',
          },
          foco: 'Al hacer uso de la palabra, el imputado queda sometido al interrogatorio de su abogado defensor y de las partes contrarias.',
          preguntas: [
            op(
              'Según el art. 358 vigente, cuando el imputado declara en el debate, ¿quiénes pueden interrogarlo?',
              [
                'Su abogado defensor y las partes contrarias',
                'Sólo las partes contrarias',
                'Sólo el Presidente del tribunal',
                'Nadie: su declaración no admite preguntas',
              ],
              'La Ley 15.004 agregó al defensor: «queda sometido al interrogatorio de su abogado defensor y de las partes contrarias».',
            ),
            vf(
              'El imputado puede consultar a su defensor mientras está respondiendo una pregunta del Fiscal.',
              false,
              'Falso. Puede hablar con su defensor durante la audiencia, pero no durante su declaración ni antes de responder preguntas; en esos momentos nadie puede sugerirle nada.',
            ),
            op(
              'El defensor quiere que el imputado declare para explicar por qué estaba en el lugar del hecho. ¿Cómo se organiza según la reforma?',
              [
                'El defensor puede interrogarlo y luego preguntan las partes contrarias',
                'El imputado debe hacer un relato libre, sin preguntas de su defensor',
                'Debe declarar bajo juramento, como un testigo',
                'Sólo puede leer una declaración escrita por su defensor',
              ],
              'El imputado nunca jura (art. 310) y no pueden leerse memoriales; pero desde la Ley 15.004 su propio defensor puede interrogarlo.',
            ),
            vf(
              'Si el imputado se niega a declarar en el debate, ese silencio puede usarse como indicio en su contra.',
              false,
              'Falso. Declarar es un derecho, no un deber (art. 18 CN y art. 310 CPPBA). En el juicio por jurados, el juez debe explicarles el alcance constitucional de la negativa a declarar (art. 371 ter).',
            ),
            comp(
              'Completá el art. 368.',
              'En último término, el Presidente preguntará a la persona imputada, bajo sanción de ___, si tiene algo que manifestar.',
              ['nulidad', 'caducidad', 'inadmisibilidad', 'preclusión'],
              'La «última palabra» del imputado es una garantía: omitirla anula el debate.',
            ),
          ],
        }),
      ],
    },
    {
      articuloId: 'cppba-371',
      falloClave: {
        tribunal: 'Corte Suprema de Justicia de la Nación',
        caso: '«Tarifeño» (1989) y «Mostaccio» (2004)',
        resumen:
          'En ambos casos el Fiscal, al alegar, pidió la absolución, y aun así el tribunal condenó. La Corte dejó sin efecto las condenas.',
        regla:
          'Si el acusador público no mantiene la acusación en el alegato final (y no hay otro acusador que la sostenga), el tribunal no puede condenar: se violarían las formas sustanciales del juicio (acusación, defensa, prueba y sentencia).',
        nota: 'Síntesis didáctica (Mostaccio: Fallos 327:120, 17/2/2004). Hubo matices («Marcilese», 2002), pero «Mostaccio» retomó la doctrina «Tarifeño».',
        enlaces: [ENLACES.mostaccio],
        ambito: 'nacional',
      },
      fallosRelacionados: [
        {
          tribunal: 'Tribunal de Casación Penal de la Provincia de Buenos Aires (Sala IV)',
          caso: '«Guerendiain» (causa 76.889)',
          anio: '2016',
          resumen:
            'En un juicio por jurados en San Martín, el jurado quedó estancado (9 votos por la culpabilidad). El juez, sin preguntar antes al Fiscal si iba a continuar con la acusación, entregó un nuevo formulario y el jurado volvió a deliberar hasta condenar. La Casación anuló el veredicto y la sentencia y ordenó un nuevo juicio.',
          regla:
            'Ante un jurado estancado (art. 371 quater, ap. 2), preguntarle al Fiscal si mantiene la acusación no es una facultad del juez sino un deber que deriva del sistema acusatorio: sin acusación vigente no puede volver a deliberarse ni condenarse.',
          nota: 'Síntesis de la sentencia del 27/9/2016.',
          enlaces: [ENLACES.tcpGuerendiain],
          ambito: 'bonaerense',
        },
      ],
      lecciones: [
        leccion({
          id: 'u7-a371-l1',
          titulo: 'Las cinco cuestiones del veredicto',
          minutos: 4,
          intro: {
            titulo: 'Un orden lógico para decidir',
            parrafos: [
              'Terminado el debate, el tribunal delibera en sesión secreta (su quebrantamiento es causal de nulidad) y vota las cuestiones esenciales: 1) existencia del hecho en su exteriorización; 2) participación de los procesados; 3) eximentes; 4) atenuantes; 5) agravantes.',
              'Cada cuestión depende de la anterior: si se resuelve negativamente la primera o la segunda, o afirmativamente la tercera, no se tratan las demás. Eximentes, atenuantes y agravantes se plantean si fueron discutidas; de oficio, sólo las que favorecen al imputado.',
              'La resolución debe exponer en forma clara, lógica y completa los hechos probados, la valoración de la prueba y por qué se descartan las pruebas decisivas contrarias.',
              'Si el veredicto es absolutorio, se ordena la libertad del imputado y el cese de las restricciones.',
            ],
            enLaPractica:
              'Las sentencias de los Tribunales en lo Criminal bonaerenses se estructuran siguiendo estas cuestiones: «Primera cuestión: ¿Está probada la existencia del hecho…?»',
          },
          foco: 'El Tribunal procederá a plantear y votar las cuestiones esenciales referidas a',
          preguntas: [
            ord(
              'Ordená las cuestiones del veredicto (art. 371):',
              [
                'Existencia del hecho',
                'Participación del procesado',
                'Existencia de eximentes',
                'Verificación de atenuantes',
                'Concurrencia de agravantes',
              ],
              'Del hecho a la persona y, recién después, a las circunstancias que modifican la responsabilidad.',
            ),
            op(
              'Si el tribunal concluye que el hecho no existió, ¿qué pasa con las demás cuestiones?',
              ['No se tratan: corresponde la absolución', 'Se votan igual, para dejar constancia', 'Se tratan sólo las eximentes', 'Se suspende la deliberación hasta nueva prueba'],
              'El orden es lógico y escalonado: resuelta negativamente la primera cuestión, no se tratan las demás.',
            ),
            op(
              'Al deliberar, el tribunal advierte una agravante que nadie discutió en el debate. ¿Puede plantearla?',
              [
                'No: de oficio sólo puede introducir cuestiones a favor del imputado',
                'Sí, si surge con claridad de la prueba',
                'Sí, si después le corre vista al Fiscal',
                'Sí, siempre que no supere la pena pedida',
              ],
              'Art. 371: esas cuestiones se plantean si fueron discutidas o si el tribunal las encuentra pertinentes, «en este último caso siempre que fueran en favor del imputado».',
            ),
            vf(
              'Si el tribunal resuelve que hubo una eximente (tercera cuestión), no trata atenuantes ni agravantes.',
              true,
              'Verdadero: el art. 371 dispone que, resuelta afirmativamente la tercera cuestión, no se tratan las demás.',
            ),
          ],
        }),
        leccion({
          id: 'u7-a371-l2',
          titulo: 'Acusación, veredicto y jurados',
          minutos: 5,
          intro: {
            titulo: 'Sin acusación no hay condena',
            parrafos: [
              'El veredicto puede ser absolutorio o condenatorio. Si es condenatorio, se dicta luego la sentencia con la pena (a veces en una audiencia separada: la cesura del juicio).',
              'Según la doctrina «Tarifeño»/«Mostaccio», si el Fiscal pide la absolución en el alegato y no hay otro acusador, el tribunal no puede condenar.',
              'Desde la Ley 14.543, los delitos con pena máxima superior a 15 años se juzgan, como regla, por jurados. El veredicto de culpabilidad exige al menos 10 votos de 12 (unanimidad si corresponde pena perpetua). Si el jurado queda estancado, el juez debe preguntarle al Fiscal si continúa con la acusación (art. 371 quater).',
            ],
          },
          preguntas: [
            op(
              'En el alegato, el Fiscal pide la absolución y no hay particular damnificado. ¿Puede el tribunal condenar?',
              ['No: sin acusación sostenida no puede condenar', 'Sí, si la prueba es contundente', 'Sí, pero sólo con la pena mínima', 'Sí, si el Fiscal General revoca el pedido'],
              'Sin acusación sostenida no se cumplen las formas sustanciales del juicio.',
            ),
            comp(
              'Completá.',
              'La división del juicio en dos tramos —culpabilidad y pena— se llama ___.',
              ['cesura', 'deliberación', 'veredicto', 'reenvío'],
              'La cesura permite discutir la pena en una audiencia propia.',
            ),
            vf(
              'En la Provincia de Buenos Aires, un homicidio agravado con pena perpetua se juzga, como regla, por jurados.',
              true,
              'Verdadero: la pena máxima supera los 15 años, umbral del art. 22 bis (Ley 14.543). El imputado puede renunciar al jurado en el plazo del art. 336.',
            ),
            op(
              '¿Cuántos votos exige un veredicto de culpabilidad del jurado (art. 371 quater)?',
              [
                'Al menos 10 de 12; unanimidad si corresponde pena perpetua',
                'Mayoría simple: 7 de 12',
                'Unanimidad en todos los casos',
                'Al menos 8 de 12',
              ],
              'Diez votos como mínimo; si el delito tiene prevista prisión o reclusión perpetua, unanimidad. Con más de 8 votos pero menos de los exigidos, el jurado se declara estancado.',
            ),
            op(
              'El jurado se declara estancado. ¿Qué debe hacer el juez antes de que vuelva a deliberar?',
              [
                'Preguntarle al Fiscal si continuará con la acusación',
                'Entregar un nuevo formulario y ordenar otra votación',
                'Disolver el jurado y condenar con el voto mayoritario',
                'Absolver de inmediato al acusado',
              ],
              'Es un deber, no una facultad (TCP, «Guerendiain», 2016). Si el Fiscal no sigue, se absuelve (salvo que el particular damnificado sostenga la acusación); si sigue, el jurado vuelve a deliberar.',
            ),
          ],
        }),
      ],
    },
    {
      articuloId: 'cp-41',
      relacionados: ['cp-40'],
      lecciones: [
        leccion({
          id: 'u7-cp41-l1',
          titulo: 'Cómo se gradúa la pena (CP)',
          minutos: 4,
          intro: {
            titulo: 'Dentro de la escala, ¿cuánto?',
            parrafos: [
              'Cuando la pena es divisible (por ejemplo, 5 a 15 años), el tribunal fija el monto según atenuantes y agravantes (art. 40 CP), siguiendo las pautas del art. 41 CP.',
              'El art. 41 mira el hecho (naturaleza de la acción, medios, daño y peligro causados) y la persona (edad, educación, conducta precedente, motivos —especialmente la miseria—, participación, reincidencias, vínculos y circunstancias de tiempo, lugar, modo y ocasión).',
              'Y exige que el juez tome conocimiento directo y de visu del imputado y la víctima.',
            ],
            enLaPractica:
              'En la audiencia de cesura, la defensa acredita trabajo, estudios y contención familiar como atenuantes; el Fiscal, la extensión del daño como agravante.',
          },
          foco: 'especialmente la miseria o la dificultad de ganarse el sustento propio necesario y el de los suyos',
          preguntas: [
            op(
              '¿Qué circunstancia menciona expresamente el art. 41 CP al valorar los motivos del delito?',
              [
                'La miseria o la dificultad de ganarse el sustento propio y de los suyos',
                'El arrepentimiento expresado en la última palabra',
                'La reparación del daño antes del juicio',
                'La duración del proceso hasta la sentencia',
              ],
              'El inc. 2 del art. 41 destaca «especialmente la miseria o la dificultad de ganarse el sustento». Las otras pueden alegarse dentro de las pautas generales, pero no están nombradas así en la norma.',
            ),
            vf(
              'Que el imputado haya ejercido su derecho a no declarar puede valorarse como agravante.',
              false,
              'Falso. El ejercicio de un derecho constitucional no puede agravar la pena.',
            ),
            comp(
              'Completá el art. 41 CP.',
              'El juez deberá tomar conocimiento directo y ___ del sujeto, de la víctima y de las circunstancias del hecho.',
              ['de visu', 'por informes', 'mediante peritos', 'por las constancias de la causa'],
              'El conocimiento «de visu» exige contacto directo del juez con las personas.',
            ),
          ],
        }),
      ],
    },
  ],
  caso: {
    id: 'caso-u7',
    titulo: 'El debate',
    rol: 'Juez/a del Tribunal en lo Criminal',
    sede: 'Tribunal en lo Criminal · Departamento Judicial Morón (caso ficticio)',
    hechos: [
      'Se juzga a Nahuel (23) por robo con arma blanca (art. 166 inc. 2 CP: 5 a 15 años). Como el máximo no supera los 15 años, lo juzga un tribunal técnico.',
      'La víctima tiene 16 años. Vos integrás el tribunal.',
    ],
    etapas: [
      {
        id: 'e1',
        momento: 'Apertura del debate',
        situacion: 'Un canal de noticias pide filmar todo el juicio. La víctima, por medio de su madre, pide declarar sin público.',
        pregunta: '¿Qué resolvés?',
        opciones: [
          {
            texto: 'El debate es público, pero dispongo puertas cerradas durante la declaración de la víctima para proteger su intimidad (art. 342), por resolución fundada.',
            puntaje: 2,
            devolucion: 'Equilibrio correcto entre publicidad y protección de la víctima menor de edad.',
          },
          {
            texto: 'Todo el juicio a puertas cerradas, para evitar a la prensa.',
            puntaje: 1,
            devolucion: 'La clausura debe limitarse a lo necesario; cerrar todo el juicio excede el fundamento.',
          },
          {
            texto: 'Juicio totalmente público y filmado, incluida la víctima.',
            puntaje: 0,
            devolucion: 'Ignora la intimidad de una víctima menor, causal expresa de restricción.',
          },
        ],
        normas: ['Art. 342 CPPBA'],
      },
      {
        id: 'e2',
        momento: 'Durante la prueba',
        situacion: 'Un testigo dice que Nahuel además amenazó a otra persona esa noche, hecho que no figura en la acusación.',
        pregunta: '¿Puede incluirse en la condena?',
        opciones: [
          {
            texto: 'Sólo si el Fiscal amplía la acusación conforme al código y la defensa puede ejercer su derecho sobre ese hecho.',
            puntaje: 2,
            devolucion: 'Correcto: principio de congruencia y derecho de defensa.',
          },
          {
            texto: 'Sí, el tribunal puede agregarlo de oficio.',
            puntaje: 0,
            devolucion: 'El tribunal no acusa: eso rompería la imparcialidad y la congruencia.',
          },
          {
            texto: 'Sí, si el testigo es creíble.',
            puntaje: 0,
            devolucion: 'La credibilidad del testigo no sustituye la acusación formal.',
          },
        ],
        normas: ['Art. 359 CPPBA (ampliación de la acusación)', 'Art. 18 CN'],
      },
      {
        id: 'e2b',
        momento: 'Declaración del imputado',
        situacion:
          'La defensa anuncia que, si Nahuel decide declarar, quiere interrogarlo ella primero. El Fiscal se opone: sostiene que el imputado sólo puede hacer un relato libre y responder preguntas de la parte contraria.',
        pregunta: '¿Cómo resolvés?',
        opciones: [
          {
            texto: 'Autorizo: desde la Ley 15.004, al declarar el imputado queda sometido al interrogatorio de su abogado defensor y de las partes contrarias (art. 358).',
            puntaje: 2,
            devolucion: 'Correcto. Es la reforma del último párrafo del art. 358. Declarar sigue siendo voluntario.',
          },
          {
            texto: 'Rechazo: el defensor no puede preguntarle a su propio defendido.',
            puntaje: 0,
            devolucion: 'Ese era el texto anterior a la reforma. Hoy el art. 358 incluye expresamente al defensor.',
          },
          {
            texto: 'Autorizo, pero bajo juramento de decir verdad, como cualquier testigo.',
            puntaje: 0,
            devolucion: 'El imputado nunca declara bajo juramento (art. 310): sería obligarlo a autoincriminarse.',
          },
        ],
        normas: ['Art. 358 CPPBA (Ley 15.004)', 'Art. 310 CPPBA'],
      },
      {
        id: 'e3',
        momento: 'Deliberación',
        situacion: 'Ya en sesión secreta, tus colegas quieren empezar discutiendo la pena.',
        pregunta: '¿Qué cuestión se trata primero?',
        opciones: [
          {
            texto: 'La existencia del hecho en su exteriorización (art. 371).',
            puntaje: 2,
            devolucion: 'Exacto. Después la participación, eximentes, atenuantes y agravantes.',
          },
          {
            texto: 'La pena, para ganar tiempo.',
            puntaje: 0,
            devolucion: 'La pena presupone hecho y participación probados.',
          },
          {
            texto: 'Los agravantes.',
            puntaje: 0,
            devolucion: 'Los agravantes son la última cuestión.',
          },
        ],
        normas: ['Art. 371 CPPBA'],
      },
      {
        id: 'e4',
        momento: 'Cesura: la pena',
        situacion: 'Hay veredicto condenatorio. Nahuel no tiene antecedentes, trabaja desde los 15 años y mantiene a su hermana. Finalmente decidió no declarar en el juicio.',
        pregunta: '¿Cómo valorás esos datos?',
        opciones: [
          {
            texto: 'La falta de antecedentes y su situación laboral y familiar son atenuantes (art. 41 CP); su silencio no puede valorarse en su contra.',
            puntaje: 2,
            devolucion: 'Muy bien: pautas del art. 41 y respeto por el derecho a no declarar.',
          },
          {
            texto: 'El silencio demuestra falta de arrepentimiento: agravante.',
            puntaje: 0,
            devolucion: 'El ejercicio de un derecho no puede agravar la pena.',
          },
          {
            texto: 'Impongo el máximo porque los robos son frecuentes.',
            puntaje: 0,
            devolucion: 'La pena se individualiza según el hecho y la persona, no según estadísticas generales.',
          },
        ],
        normas: ['Arts. 40 y 41 CP', 'Art. 18 CN'],
      },
    ],
    cierre: {
      titulo: 'Juzgar con método',
      texto:
        'Aplicaste publicidad con límites, congruencia, el orden lógico del veredicto y las pautas de individualización de la pena. Así se construye una sentencia que resiste el control en casación.',
    },
  },
};
