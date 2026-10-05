import { ENLACES } from '../enlaces-fallos';
import { comp, leccion, op, ord, vf } from '../helpers';
import type { Unidad } from '../tipos';

export const U4: Unidad = {
  id: 'u4',
  numero: 4,
  titulo: 'Excarcelación y eximición de prisión',
  subtitulo: 'Recuperar (o conservar) la libertad durante el proceso',
  etapa: 'Medidas cautelares',
  color: 'verde',
  icono: '🗝️',
  temas: [
    {
      articuloId: 'cppba-169',
      relacionados: ['cp-26'],
      falloClave: {
        tribunal: 'Corte Suprema de Justicia de la Nación',
        caso: '«Nápoli, Erika Elizabeth y otros»',
        anio: '1998',
        resumen:
          'Una ley había excluido de la excarcelación a los imputados de ciertos delitos, sólo por el tipo de delito. La Corte la declaró inconstitucional.',
        regla:
          'El legislador no puede convertir determinados delitos en «inexcarcelables» en abstracto: la restricción de la libertad durante el proceso debe apoyarse en la verificación de peligros procesales en el caso concreto.',
        nota: 'Síntesis didáctica (Fallos 321:3630, 22/12/1998). En la misma línea, el plenario «Díaz Bessone» (Cámara Federal de Casación, 2008) sostuvo que la pena en expectativa no basta por sí sola para denegar la libertad.',
        enlaces: [ENLACES.napoli],
        ambito: 'nacional',
      },
      fallosRelacionados: [
        {
          tribunal: 'Suprema Corte de Justicia de la Provincia de Buenos Aires',
          caso: '«Carrascosa» (P. 125.776)',
          anio: '2016',
          resumen:
            'Un imputado condenado a prisión perpetua por sentencia no firme llevaba más de cinco años en prisión preventiva (morigerada) y reclamaba su cese por exceso del plazo razonable. La SCBA rechazó el recurso por insuficiente: la defensa no rebatió todos los fundamentos de la Casación, que había valorado el avance de la causa (condenas en dos instancias), su complejidad, la gravedad del hecho y la pena en expectativa junto con las pautas del art. 148.',
          regla:
            'La razonabilidad de la prisión preventiva se mide en el caso concreto: grado de avance del proceso (incluida una condena no firme), complejidad, naturaleza del hecho y pena en expectativa, como indicadores del peligro de fuga del art. 148. Si cambia la situación (por ejemplo, se revoca la condena), puede volver a pedirse.',
          nota: 'Síntesis de la sentencia del 1/6/2016 (rechazo por mayoría de fundamentos). Contrastala con «Nápoli»: la pena en expectativa sirve como indicio en el caso, nunca como regla abstracta.',
          enlaces: [ENLACES.scbaCarrascosa],
          ambito: 'bonaerense',
        },
      ],
      lecciones: [
        leccion({
          id: 'u4-a169-l1',
          titulo: '¿Qué es la excarcelación?',
          minutos: 3,
          intro: {
            titulo: 'De la detención a la libertad caucionada',
            parrafos: [
              'La excarcelación es el instituto por el cual el imputado que ya está detenido recupera su libertad mientras sigue el proceso, prestando una caución (juratoria, personal o real).',
              'No es un «perdón» ni significa que la causa termina: el proceso continúa y el imputado debe presentarse cada vez que lo citen.',
              'Su primo es la eximición de prisión (art. 185): se pide ANTES de ser detenido.',
            ],
            enLaPractica:
              'El pedido de excarcelación se presenta ante el Juez de Garantías, tramita por incidente y la resolución es apelable ante la Cámara de Garantías.',
          },
          preguntas: [
            op(
              '¿Quién puede pedir la excarcelación?',
              ['El imputado que se encuentra detenido', 'Quien teme ser detenido en una causa determinada', 'El condenado con sentencia firme', 'El imputado citado a declarar en libertad'],
              'La excarcelación presupone una detención. Quien todavía no está detenido pide la eximición de prisión (art. 185); el condenado con sentencia firme, en cambio, discute su libertad en la ejecución (libertad condicional).',
            ),
            vf(
              'Si el imputado es excarcelado, la causa penal queda terminada.',
              false,
              'Falso. El proceso sigue; sólo cambia la situación de libertad del imputado.',
            ),
            comp(
              'Completá.',
              'El excarcelado debe prestar una ___ que asegure que se presentará al proceso.',
              ['caución', 'contracautela', 'reparación del daño', 'declaración indagatoria'],
              'La caución puede ser juratoria, personal o real. La contracautela es otra cosa: la presta el particular damnificado o el actor civil que pide una medida (art. 146 inc. 4).',
            ),
            op(
              'Una persona se entera de que la investigan por una causa determinada y teme ser detenida. ¿Qué puede pedir?',
              ['La eximición de prisión', 'La excarcelación', 'Un hábeas corpus preventivo', 'La suspensión del juicio a prueba'],
              'El art. 185 permite pedir la eximición de prisión a toda persona que se considere imputada en una causa penal determinada; se resuelve en tres días. El hábeas corpus procede contra restricciones o amenazas ilegales o arbitrarias, no contra una investigación regular.',
            ),
          ],
        }),
        leccion({
          id: 'u4-a169-l2',
          titulo: 'La pena en juego: hasta 8 años',
          minutos: 4,
          intro: {
            titulo: 'Inciso 1: el máximo de la escala',
            parrafos: [
              'El primer supuesto mira la escala penal en abstracto: procede la excarcelación si el delito imputado tiene una pena cuyo máximo no supere los ocho años de prisión o reclusión.',
              'En el concurso real (varios hechos), se mira la pena aplicable al concurso, que tampoco debe superar los ocho años (inc. 2).',
              'Por eso la calificación legal que elige el Fiscal es tan importante: cambia la escala y, con ella, la libertad. Ojo: en delitos con violencia mediante armas de fuego o con intervención de menores de 18 años, se toma la escala que resulta de los arts. 41 bis y 41 quater CP.',
            ],
            enLaPractica:
              'Un robo simple (art. 164 CP: 1 mes a 6 años) entra en el inciso 1; un robo con arma (art. 166 inc. 2: 5 a 15 años) no.',
          },
          foco: 'cuyo máximo no supere los ocho (8) años de prisión o reclusión',
          preguntas: [
            op(
              'Imputación por robo simple (art. 164 CP: un mes a seis años). ¿Entra en el inc. 1 del art. 169?',
              ['Sí: el máximo (6 años) no supera los 8', 'No: hubo violencia en las personas', 'Sólo si es probable una condena condicional', 'Sólo si el Fiscal presta conformidad'],
              'Se compara el MÁXIMO de la escala con el tope de 8 años. La condena condicional probable es otro supuesto (inc. 3), para cuando el máximo supera los 8.',
            ),
            op(
              'Imputación por robo con arma (art. 166 inc. 2 CP: cinco a quince años). ¿Entra en el inc. 1?',
              ['No: el máximo (15) supera los 8 años', 'Sí: el mínimo (5) es menor a 8', 'Sí, si el imputado no tiene antecedentes', 'Depende de que el arma sea de fuego'],
              'El máximo de 15 años supera el tope del inc. 1. Habrá que analizar otros incisos (por ejemplo, el de la condena condicional probable).',
            ),
            comp(
              'Completá el inciso 1.',
              'Procede cuando el delito tenga prevista una pena cuyo máximo no supere los ___ de prisión o reclusión.',
              ['ocho (8) años', 'seis (6) años', 'tres (3) años', 'quince (15) años'],
              'El tope vigente es de ocho años en el máximo de la escala (Ley 14.128; antes eran seis).',
            ),
            op(
              'Dos hurtos en concurso real (art. 162 CP: máximo 2 años cada uno). ¿Procede la excarcelación por la escala?',
              [
                'Sí: la pena aplicable al concurso (máximo 4 años) no supera los 8 (inc. 2)',
                'No: el concurso real no es excarcelable',
                'Sólo si cada hecho, por separado, no supera 3 años',
                'Se toma sólo el delito más grave y se ignora el otro',
              ],
              'En el concurso real el máximo se forma sumando los máximos (art. 55 CP): 2 + 2 = 4 años, por debajo del tope de 8 del inc. 2.',
            ),
            op(
              'En delitos cometidos con violencia mediante armas de fuego, ¿qué escala se usa para resolver la excarcelación?',
              [
                'La que resulta de aplicar los arts. 41 bis y 41 quater del CP',
                'La del delito sin agravantes',
                'La de la tentativa del delito',
                'La mitad del máximo previsto',
              ],
              'Es el párrafo final del art. 169 (también para delitos con intervención de menores de 18 años).',
            ),
            vf(
              'Para el inciso 1 se mira el mínimo de la escala penal.',
              false,
              'Falso: se mira el máximo de la escala en abstracto.',
            ),
          ],
        }),
        leccion({
          id: 'u4-a169-l3',
          titulo: 'Condena condicional probable',
          minutos: 4,
          intro: {
            titulo: 'Inciso 3: el pronóstico de pena',
            parrafos: [
              'Aunque el máximo supere los ocho años, la excarcelación procede si es probable que, en caso de condena, se aplique una condena de ejecución condicional (en suspenso).',
              'Para eso hay que mirar el art. 26 del Código Penal: la condena condicional cabe en la primera condena a prisión que no exceda de tres años.',
              'Entonces la pregunta clave es: ¿el mínimo de la escala permite una pena de 3 años o menos? ¿Es su primera condena? ¿Las circunstancias del hecho y personales lo hacen probable?',
            ],
            enLaPractica:
              'Robo con arma de utilería (art. 166 último párrafo: 3 a 10 años): el mínimo es 3, así que una primera condena podría ser en suspenso. El inc. 3 es la puerta de la defensa.',
          },
          foco: 'resultare probable que pueda aplicársele condena de ejecución condicional',
          preguntas: [
            op(
              '¿Qué artículo del Código Penal define cuándo cabe la condena de ejecución condicional?',
              ['El art. 26 CP', 'El art. 27 bis CP', 'El art. 76 bis CP', 'El art. 13 CP'],
              'El art. 26 CP: primera condena a prisión que no exceda de tres años. El 27 bis regula las reglas de conducta, el 76 bis la probation y el 13 la libertad condicional.',
            ),
            comp(
              'Completá el art. 26 CP.',
              'En los casos de primera condena a pena de prisión que no exceda de ___, el tribunal podrá dejar en suspenso su cumplimiento.',
              ['tres años', 'dos años', 'cuatro años', 'seis años'],
              'Tres años es el límite de la condenación condicional.',
            ),
            op(
              'Robo con arma de fuego apta (escala de 6 años y 8 meses a 20 años). ¿Puede invocarse el inc. 3?',
              [
                'No: el mínimo supera 3 años, así que la condena condicional es imposible',
                'Sí: para el inc. 3 sólo importa el máximo',
                'Sí, si el imputado no tiene antecedentes',
                'Sí, si ofrece una caución real',
              ],
              'Si el mínimo de la escala supera 3 años, ninguna condena podrá ser en suspenso: el inc. 3 queda descartado.',
            ),
            vf(
              'El inciso 3 exige analizar las circunstancias del hecho y las características y antecedentes personales del imputado.',
              true,
              'Verdadero. No basta con la escala: el pronóstico de condena condicional se apoya en el caso concreto.',
            ),
          ],
        }),
        leccion({
          id: 'u4-a169-l4',
          titulo: 'Sobreseimiento, agotamiento y plazo razonable',
          minutos: 4,
          intro: {
            titulo: 'Cuando el tiempo o la causa ya no justifican el encierro',
            parrafos: [
              'Otros incisos del art. 169 atienden a situaciones en que la detención perdió sentido: sobreseimiento no firme (inc. 4); haber agotado en detención el máximo de la pena según la calificación del requerimiento de citación a juicio (inc. 5); estar en condiciones de obtener la libertad condicional o asistida (inc. 6); o una sentencia no firme absolutoria, en suspenso, ya agotada o que permite la libertad condicional (incs. 8 a 10).',
              'Y el inc. 11 recoge el plazo razonable: procede si la prisión preventiva excede el plazo del art. 7.5 de la Convención Americana, teniendo en cuenta la gravedad del delito, la pena probable y la complejidad del proceso.',
              'Son reglas de proporcionalidad: la prisión preventiva nunca puede durar más que la pena posible.',
            ],
          },
          foco: 'excede el plazo razonable a que se refiere el artículo 7º inciso 5) de la Convención Americana de Derechos Humanos',
          preguntas: [
            vf(
              'Si el imputado ya estuvo detenido el máximo de la pena prevista para el delito, debe recuperar su libertad.',
              true,
              'Verdadero. Seguir detenido superaría cualquier condena posible: es desproporcionado.',
            ),
            op(
              'El imputado fue sobreseído pero el Fiscal apeló. ¿Puede ser excarcelado?',
              ['Sí: el sobreseimiento no firme habilita la excarcelación (inc. 4)', 'No, hasta que la Cámara resuelva la apelación', 'Sólo si el delito tiene pena máxima de hasta 8 años', 'Sólo si el Fiscal desiste de la apelación'],
              'El sobreseimiento, aun no firme, debilita al extremo el fundamento de la detención.',
            ),
            ord(
              'Ordená de menor a mayor exigencia temporal estos supuestos de agotamiento:',
              [
                'Tiempo de detención que habría permitido la libertad condicional',
                'Tiempo de detención igual al máximo de la pena prevista',
              ],
              'La libertad condicional se obtiene antes del agotamiento total de la pena (por ejemplo, a los 2/3 en penas temporales de más de 3 años, art. 13 CP).',
            ),
            op(
              'Un hombre lleva cuatro años en prisión preventiva por un hecho simple, sin fecha de juicio a la vista. ¿Qué inciso del art. 169 invocás?',
              [
                'El inc. 11: la preventiva excede el plazo razonable (art. 7.5 CADH)',
                'El inc. 1, porque pasó mucho tiempo desde el hecho',
                'El inc. 4, por equiparación al sobreseimiento',
                'Ninguno: el plazo razonable sólo se discute en casación',
              ],
              'El inc. 11 permite excarcelar cuando la prisión preventiva excede el plazo razonable, valorando gravedad, pena probable y complejidad. También corresponde revisar los plazos fatales del art. 141.',
            ),
          ],
        }),
      ],
    },
    {
      articuloId: 'cppba-171',
      relacionados: ['cppba-148'],
      lecciones: [
        leccion({
          id: 'u4-a171-l1',
          titulo: 'Denegatoria: peligros procesales',
          minutos: 4,
          intro: {
            titulo: 'El límite de la excarcelación',
            parrafos: [
              'Aunque se cumpla algún inciso del art. 169, la excarcelación se deniega si hay indicios vehementes de que el imputado tratará de eludir la acción de la justicia o entorpecer la investigación (art. 171).',
              'Esos peligros pueden inferirse de las circunstancias del art. 148 (arraigo, pena esperada, comportamiento procesal, etc.). Además, en casos de tenencia o portación ilegítima de arma de fuego, el juez puede considerar que concurren si el imputado intentó eludir a la policía, evadir un control o resistirse al procedimiento.',
              'Al revés también vale: si el delito tiene una pena alta, la defensa puede igualmente discutir la libertad demostrando que no hay peligros concretos.',
            ],
            enLaPractica:
              'Un imputado de hurto (máximo 2 años) que ya se fugó en otras dos causas puede ver denegada su excarcelación pese a la pena baja: hay indicios vehementes de fuga.',
          },
          foco: 'indicios vehementes de que el imputado tratará de eludir la acción de la justicia o entorpecer la investigación',
          preguntas: [
            op(
              '¿Qué exige el art. 171 para denegar la excarcelación?',
              [
                'Indicios vehementes de fuga o de entorpecimiento de la investigación',
                'Que la pena máxima supere los ocho años',
                'Que el imputado registre antecedentes penales',
                'Que la víctima se oponga en la audiencia',
              ],
              'El art. 171 se basa en los peligros procesales. La pena, los antecedentes o la oposición de la víctima pueden ser datos a valorar, pero no bastan por sí solos.',
            ),
            vf(
              'Un delito con pena máxima de 2 años es siempre excarcelable, aunque el imputado tenga varias fugas previas.',
              false,
              'Falso. Los indicios vehementes de fuga permiten denegar la excarcelación aun en delitos leves.',
            ),
            comp(
              'Completá.',
              'La existencia de los peligros procesales podrá inferirse de las circunstancias previstas en el artículo ___.',
              ['148', '146', '157', '163'],
              'El art. 171 remite a las pautas del art. 148.',
            ),
            op(
              'Una ley declara «inexcarcelable» un delito sólo por su tipo, sin mirar el caso. ¿Qué dijo la CSJN en un supuesto así?',
              [
                'Es inconstitucional: hay que verificar peligros procesales concretos («Nápoli»)',
                'Es válida, porque el legislador decide',
                'Es válida si la pena supera 8 años',
                'Es válida si la ley prevé otra caución',
              ],
              'En «Nápoli» (1998) la Corte invalidó la exclusión de la excarcelación por la sola naturaleza del delito.',
            ),
            op(
              'Detienen a un hombre que portaba sin autorización un arma de fuego y que intentó escapar de un control policial. ¿Qué permite el art. 171?',
              [
                'Que el juez considere que hay peligro procesal y deniegue la excarcelación',
                'Nada: la portación tiene pena baja, así que la excarcelación es obligatoria',
                'Dictar la prisión preventiva sin audiencia ni pedido fiscal',
                'Denegarla sólo si el arma estaba cargada',
              ],
              'El segundo párrafo del art. 171 (Ley 14.517) autoriza a considerar que concurren los peligros procesales cuando, en esos supuestos, el imputado intentó eludir el accionar policial, evadir un control o resistirse al procedimiento.',
            ),
          ],
        }),
      ],
    },
    {
      articuloId: 'cp-166',
      relacionados: ['cp-164', 'cp-162'],
      lecciones: [
        leccion({
          id: 'u4-cp166-l1',
          titulo: 'Hurto, robo y robo agravado (CP)',
          minutos: 5,
          intro: {
            titulo: 'Las figuras que más llegan a las UFI',
            parrafos: [
              'Hurto (art. 162 CP): apoderarse ilegítimamente de una cosa mueble ajena. Pena: 1 mes a 2 años.',
              'Robo (art. 164 CP): lo mismo, pero con fuerza en las cosas o violencia física en las personas. Pena: 1 mes a 6 años.',
              'Robo agravado (art. 166 CP): 5 a 15 años si hay lesiones graves o gravísimas por la violencia, o si se usan armas (o en despoblado y en banda). Con arma de fuego, la escala sube un tercio; con arma de fuego no apta o de utilería, baja a 3 a 10 años.',
            ],
            enLaPractica:
              'Estas escalas deciden, en la práctica, si el imputado queda libre (art. 169), si puede pedir probation (art. 76 bis CP) y si cabe un juicio abreviado.',
          },
          preguntas: [
            op(
              '¿Qué diferencia al robo del hurto?',
              [
                'La fuerza en las cosas o la violencia física en las personas',
                'El valor de lo sustraído',
                'Que la víctima esté presente',
                'Que intervenga más de un autor',
              ],
              'El art. 164 CP agrega la fuerza o violencia al apoderamiento ilegítimo del art. 162.',
            ),
            ord(
              'Ordená de menor a mayor pena máxima:',
              ['Hurto (art. 162)', 'Robo simple (art. 164)', 'Robo con arma de utilería (art. 166, último párrafo)', 'Robo con arma (art. 166 inc. 2)'],
              'Máximos: 2, 6, 10 y 15 años (y más aún con arma de fuego apta).',
            ),
            comp(
              'Completá el art. 164 CP.',
              'Será reprimido con prisión de un mes a ___, el que se apoderare ilegítimamente de una cosa mueble con fuerza en las cosas o con violencia física en las personas.',
              ['seis años', 'dos años', 'quince años', 'tres años'],
              'El robo simple tiene una escala de un mes a seis años.',
            ),
            vf(
              'Según el art. 166 CP, si el arma de fuego utilizada no puede tenerse por apta para el disparo, la pena es de tres a diez años.',
              true,
              'Verdadero: es el último párrafo del art. 166 (también para armas de utilería).',
            ),
          ],
        }),
      ],
    },
  ],
  caso: {
    id: 'caso-u4',
    titulo: 'El arma de utilería',
    rol: 'Defensa particular',
    sede: 'Juzgado de Garantías · Departamento Judicial San Martín (caso ficticio)',
    hechos: [
      'Sofía (26) está detenida, imputada de robar una mochila amenazando a la víctima con una réplica de pistola. La pericia confirmó que era un arma de utilería.',
      'No tiene antecedentes, vive con su madre y estudia enfermería. El Fiscal calificó el hecho como robo con arma de utilería (art. 166, último párrafo, CP).',
    ],
    etapas: [
      {
        id: 'e1',
        momento: 'Escrito de excarcelación',
        situacion: 'Tenés que elegir en qué inciso del art. 169 apoyar el pedido.',
        pregunta: '¿Cuál es el fundamento más sólido?',
        opciones: [
          {
            texto: 'El inc. 3: el máximo (10 años) supera los 8, pero el mínimo (3 años) y su falta de antecedentes hacen probable una condena condicional (art. 26 CP).',
            puntaje: 2,
            devolucion: 'Excelente lectura combinada CPPBA + CP. Es el camino técnico correcto.',
          },
          {
            texto: 'El inc. 1, porque el delito tiene una pena «baja».',
            puntaje: 0,
            devolucion: 'El inc. 1 exige un máximo de hasta 8 años; aquí el máximo es 10.',
          },
          {
            texto: 'Ninguno: el robo con arma nunca es excarcelable.',
            puntaje: 0,
            devolucion: 'No existen delitos inexcarcelables en abstracto («Nápoli»). Además, el inc. 3 encaja.',
          },
        ],
        normas: ['Art. 169 CPPBA', 'Art. 26 CP', 'Art. 166 CP'],
      },
      {
        id: 'e2',
        momento: 'Contestación del Fiscal',
        situacion: 'El Fiscal se opone: dice que «no se verificó el domicilio» de Sofía.',
        pregunta: '¿Cómo respondés?',
        opciones: [
          {
            texto: 'Ofrezco acreditar el arraigo: constatación del domicilio, certificado de alumna regular y testimonio de su madre (art. 148 inc. 1).',
            puntaje: 2,
            devolucion: 'Bien. Convertís la objeción en prueba de arraigo, que es la pauta central contra el peligro de fuga.',
          },
          {
            texto: 'Respondo que el domicilio es irrelevante.',
            puntaje: 0,
            devolucion: 'Es muy relevante: el arraigo es la primera pauta del art. 148.',
          },
          {
            texto: 'Desisto del pedido hasta el juicio.',
            puntaje: 0,
            devolucion: 'Dejarías a Sofía presa sin necesidad. La objeción se resuelve acreditando el arraigo.',
          },
        ],
        normas: ['Art. 148 CPPBA', 'Art. 171 CPPBA'],
      },
      {
        id: 'e3',
        momento: 'Resolución',
        situacion: 'El Juez concede la excarcelación. Falta fijar la caución. Sofía no tiene ingresos propios.',
        pregunta: '¿Qué caución pedís?',
        opciones: [
          {
            texto: 'Una caución juratoria (o personal razonable), acorde a su situación económica.',
            puntaje: 2,
            devolucion: 'Correcto. La caución no puede ser de imposible cumplimiento: si no, la libertad concedida sería ilusoria.',
          },
          {
            texto: 'Una caución real de varios millones de pesos, para mostrar seriedad.',
            puntaje: 0,
            devolucion: 'Una caución inalcanzable equivale a negar la excarcelación por razones económicas.',
          },
          {
            texto: 'Ninguna: que salga sin compromiso alguno.',
            puntaje: 1,
            devolucion: 'La excarcelación requiere alguna caución; la juratoria es la menos gravosa.',
          },
        ],
        normas: ['Arts. 169 a 196 CPPBA'],
      },
      {
        id: 'e4',
        momento: 'Variante del caso',
        situacion: 'Imaginá que la pericia hubiera concluido que el arma era de fuego y apta para el disparo.',
        pregunta: '¿Qué cambia?',
        opciones: [
          {
            texto: 'La escala sube un tercio (6 años y 8 meses a 20): el inc. 3 queda descartado y sólo puede discutirse la ausencia de peligros procesales y medidas alternativas.',
            puntaje: 2,
            devolucion: 'Exacto. Con un mínimo superior a 3 años la condena condicional es imposible, pero la libertad sigue dependiendo de los peligros concretos.',
          },
          {
            texto: 'Nada: el inc. 3 sigue aplicando.',
            puntaje: 0,
            devolucion: 'Con un mínimo de 6 años y 8 meses no hay condena condicional posible.',
          },
          {
            texto: 'El delito pasa a ser automáticamente inexcarcelable.',
            puntaje: 0,
            devolucion: 'La gravedad no sustituye el análisis de los peligros procesales concretos.',
          },
        ],
        normas: ['Art. 166 CP', 'Arts. 159 y 171 CPPBA'],
      },
    ],
    cierre: {
      titulo: 'Libertad bien argumentada',
      texto:
        'Combinaste el CPPBA con el Código Penal: la escala del art. 166, el pronóstico de condena condicional del art. 26 y el análisis de arraigo del art. 148. Así se litiga una excarcelación en los juzgados de garantías bonaerenses.',
    },
  },
};
