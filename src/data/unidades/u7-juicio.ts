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
              ['Oral y público, bajo sanción de nulidad', 'Escrito y reservado', 'Oral pero siempre secreto', 'Público pero escrito'],
              'Oralidad y publicidad son la regla del juicio.',
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
              ['público', 'imputado', 'fiscal', 'perito'],
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
              'Recibida la causa e integrado el tribunal, las partes tienen diez días para recusar y ofrecer prueba. En la audiencia preliminar (art. 338) se depura la prueba y se discuten las nulidades y la validez constitucional de los actos de la IPP.',
              'Luego viene el debate: apertura, declaración del imputado (si quiere), recepción de la prueba, alegatos finales y última palabra del imputado.',
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
                'Sí, si el hecho es grave',
                'Sí, si lo pide la víctima en el pasillo',
                'Sí, el tribunal puede agregar hechos de oficio',
              ],
              'Principio de congruencia: no se condena por hechos que no fueron objeto de acusación y defensa.',
            ),
            vf(
              'En la audiencia preliminar pueden discutirse nulidades y la validez de los actos de la IPP que se usarán en el debate.',
              true,
              'Verdadero: es una de sus funciones principales (art. 338).',
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
        nota: 'Síntesis didáctica. Hubo matices posteriores («Marcilese», 2002), pero «Mostaccio» retomó la doctrina «Tarifeño». Verificá los fallos antes de citarlos.',
      },
      lecciones: [
        leccion({
          id: 'u7-a371-l1',
          titulo: 'Las cinco cuestiones del veredicto',
          minutos: 4,
          intro: {
            titulo: 'Un orden lógico para decidir',
            parrafos: [
              'Terminado el debate, el tribunal delibera en sesión secreta (su quebrantamiento es causal de nulidad) y vota las cuestiones esenciales: 1) existencia del hecho en su exteriorización material; 2) participación de los procesados; 3) eximentes; 4) atenuantes; 5) agravantes.',
              'Cada cuestión depende de la anterior: si se resuelve negativamente la primera o la segunda, o afirmativamente la tercera, no se tratan las demás.',
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
              ['Pierden sentido: corresponde la absolución', 'Se votan igual para graduar la pena', 'Se envían al Fiscal', 'Se resuelven en casación'],
              'El orden es lógico y escalonado.',
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
          minutos: 3,
          intro: {
            titulo: 'Sin acusación no hay condena',
            parrafos: [
              'El veredicto puede ser absolutorio o condenatorio. Si es condenatorio, se dicta luego la sentencia con la pena (a veces en una audiencia separada: la cesura del juicio).',
              'Según la doctrina «Tarifeño»/«Mostaccio», si el Fiscal pide la absolución en el alegato y no hay otro acusador, el tribunal no puede condenar.',
              'Además, una reforma posterior a tu documento (Ley 14.543) estableció que los delitos con pena máxima superior a 15 años se juzgan, como regla, por jurados populares.',
            ],
          },
          preguntas: [
            op(
              'En el alegato, el Fiscal pide la absolución y no hay particular damnificado. ¿Puede el tribunal condenar?',
              ['No, según la doctrina «Tarifeño» y «Mostaccio»', 'Sí, si está convencido', 'Sí, pero con pena mínima', 'Sólo si la víctima está presente'],
              'Sin acusación sostenida no se cumplen las formas sustanciales del juicio.',
            ),
            comp(
              'Completá.',
              'La división del juicio en dos tramos —culpabilidad y pena— se llama ___.',
              ['cesura', 'abreviado', 'casación', 'probation'],
              'La cesura permite discutir la pena en una audiencia propia.',
            ),
            vf(
              'En la Provincia de Buenos Aires, un homicidio agravado con pena perpetua se juzga, como regla, por jurados.',
              true,
              'Verdadero: la pena máxima supera los 15 años, umbral de la Ley 14.543.',
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
              '¿Cuál de estos es un atenuante que el art. 41 CP menciona expresamente?',
              [
                'La miseria o la dificultad de ganarse el sustento propio y de los suyos',
                'Que el imputado sea famoso',
                'Que la víctima tenga antecedentes',
                'Que el juicio haya sido rápido',
              ],
              'El inc. 2 del art. 41 destaca la miseria y la dificultad de ganarse el sustento.',
            ),
            vf(
              'Que el imputado haya ejercido su derecho a no declarar puede valorarse como agravante.',
              false,
              'Falso. El ejercicio de un derecho constitucional no puede agravar la pena.',
            ),
            comp(
              'Completá el art. 41 CP.',
              'El juez deberá tomar conocimiento directo y ___ del sujeto, de la víctima y de las circunstancias del hecho.',
              ['de visu', 'por escrito', 'por teléfono', 'mediante peritos únicamente'],
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
        normas: ['Art. 342 y ss. CPPBA', 'Art. 18 CN'],
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
        situacion: 'Hay veredicto condenatorio. Nahuel no tiene antecedentes, trabaja desde los 15 años y mantiene a su hermana. Durante el juicio se negó a declarar.',
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
