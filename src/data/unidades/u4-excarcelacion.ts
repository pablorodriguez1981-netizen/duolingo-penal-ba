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
        nota: 'Síntesis didáctica (Fallos 321:3630). En la misma línea, el plenario «Díaz Bessone» (Cámara Federal de Casación, 2008) sostuvo que la pena en expectativa no basta por sí sola para denegar la libertad.',
      },
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
              ['El imputado que ya se encuentra detenido', 'Quien todavía no fue detenido', 'Sólo el condenado con sentencia firme', 'La víctima'],
              'La excarcelación presupone una detención. Quien aún no está detenido pide la eximición de prisión.',
            ),
            vf(
              'Si el imputado es excarcelado, la causa penal queda terminada.',
              false,
              'Falso. El proceso sigue; sólo cambia la situación de libertad del imputado.',
            ),
            comp(
              'Completá.',
              'El excarcelado debe prestar una ___ que asegure que se presentará al proceso.',
              ['caución', 'confesión', 'indemnización', 'declaración jurada patrimonial'],
              'La caución puede ser juratoria, personal o real.',
            ),
            op(
              'Una persona se entera de que la investigan por una causa determinada y teme ser detenida. ¿Qué puede pedir?',
              ['La eximición de prisión', 'La excarcelación', 'La casación', 'El juicio abreviado'],
              'El art. 185 permite pedir la eximición de prisión a quien considera que puede ser imputado en una causa determinada.',
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
              'En el concurso real (varios hechos), se mira la pena aplicable al concurso, que tampoco debe superar los ocho años.',
              'Por eso la calificación legal que elige el Fiscal es tan importante: cambia la escala y, con ella, la libertad.',
            ],
            enLaPractica:
              'Un robo simple (art. 164 CP: 1 mes a 6 años) entra en el inciso 1; un robo con arma (art. 166 inc. 2: 5 a 15 años) no.',
          },
          foco: 'cuyo máximo no supere los ocho (8) años de prisión o reclusión',
          preguntas: [
            op(
              'Imputación por robo simple (art. 164 CP: un mes a seis años). ¿Entra en el inc. 1 del art. 169?',
              ['Sí, porque el máximo (6 años) no supera los 8', 'No, porque el mínimo es muy bajo', 'No, el robo nunca es excarcelable', 'Sólo si la víctima consiente'],
              'Se compara el MÁXIMO de la escala con el tope de 8 años.',
            ),
            op(
              'Imputación por robo con arma (art. 166 inc. 2 CP: cinco a quince años). ¿Entra en el inc. 1?',
              ['No, porque el máximo (15) supera los 8 años', 'Sí, porque el mínimo es menor a 8', 'Sí, siempre', 'Depende del valor de lo robado'],
              'El máximo de 15 años supera el tope del inc. 1. Habrá que analizar otros incisos (por ejemplo, el de la condena condicional probable).',
            ),
            comp(
              'Completá el inciso 1.',
              'Procede cuando el delito tenga prevista una pena cuyo máximo no supere los ___ de prisión o reclusión.',
              ['ocho (8) años', 'tres (3) años', 'quince (15) años', 'veinticinco (25) años'],
              'El tope es de ocho años en el máximo de la escala.',
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
              ['El art. 26 CP', 'El art. 79 CP', 'El art. 2 CP', 'El art. 166 CP'],
              'El art. 26 CP: primera condena a prisión que no exceda de tres años.',
            ),
            comp(
              'Completá el art. 26 CP.',
              'En los casos de primera condena a pena de prisión que no exceda de ___, el tribunal podrá dejar en suspenso su cumplimiento.',
              ['tres años', 'seis años', 'ocho años', 'un año'],
              'Tres años es el límite de la condenación condicional.',
            ),
            op(
              'Robo con arma de fuego apta (escala de 6 años y 8 meses a 20 años). ¿Puede invocarse el inc. 3?',
              [
                'No: el mínimo supera 3 años, así que la condena condicional es imposible',
                'Sí: el máximo es alto, pero eso no importa',
                'Sí, si el imputado no tiene antecedentes',
                'Sí, siempre que pague una caución alta',
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
          titulo: 'Sobreseimiento y agotamiento',
          minutos: 3,
          intro: {
            titulo: 'Cuando el tiempo o la causa ya no justifican el encierro',
            parrafos: [
              'Otros supuestos del art. 169 atienden a situaciones en que la detención perdió sentido: si el imputado fue sobreseído aunque la resolución no esté firme; si ya cumplió en detención el máximo de la pena prevista; o si estuvo preso un tiempo que, de haber sido condenado, le habría permitido la libertad condicional (respetando los reglamentos carcelarios).',
              'Son reglas de proporcionalidad: la prisión preventiva nunca puede durar más que la pena posible.',
            ],
          },
          preguntas: [
            vf(
              'Si el imputado ya estuvo detenido el máximo de la pena prevista para el delito, debe recuperar su libertad.',
              true,
              'Verdadero. Seguir detenido superaría cualquier condena posible: es desproporcionado.',
            ),
            op(
              'El imputado fue sobreseído pero el Fiscal apeló. ¿Puede ser excarcelado?',
              ['Sí: el sobreseimiento no firme habilita la excarcelación', 'No, hasta que la Cámara resuelva', 'No, nunca', 'Sólo si la víctima lo acepta'],
              'El sobreseimiento, aun no firme, debilita al extremo el fundamento de la detención.',
            ),
            ord(
              'Ordená de menor a mayor exigencia temporal estos supuestos de agotamiento:',
              [
                'Tiempo de detención que habría permitido la libertad condicional',
                'Tiempo de detención igual al máximo de la pena prevista',
              ],
              'La libertad condicional se obtiene antes del agotamiento total de la pena (por ejemplo, a los 2/3 en penas de más de 3 años, art. 13 CP).',
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
              'Esos peligros pueden inferirse de las circunstancias del art. 148 (arraigo, pena esperada, comportamiento procesal, etc.).',
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
                'Que el delito sea de acción pública',
                'Que la víctima se oponga',
                'Que el imputado no tenga dinero para la caución',
              ],
              'El art. 171 se basa en los peligros procesales, no en la opinión de la víctima ni en la capacidad económica.',
            ),
            vf(
              'Un delito con pena máxima de 2 años es siempre excarcelable, aunque el imputado tenga varias fugas previas.',
              false,
              'Falso. Los indicios vehementes de fuga permiten denegar la excarcelación aun en delitos leves.',
            ),
            comp(
              'Completá.',
              'La existencia de los peligros procesales podrá inferirse de las circunstancias previstas en el artículo ___.',
              ['148', '308', '26 del CP', '395'],
              'El art. 171 remite a las pautas del art. 148.',
            ),
            op(
              'Una ley declara «inexcarcelable» un delito sólo por su tipo, sin mirar el caso. ¿Qué dijo la CSJN en un supuesto así?',
              [
                'Es inconstitucional: hay que verificar peligros procesales concretos («Nápoli»)',
                'Es válida, porque el legislador decide',
                'Es válida si la pena supera 8 años',
                'Es válida sólo para mayores de 21 años',
              ],
              'En «Nápoli» (1998) la Corte invalidó la exclusión de la excarcelación por la sola naturaleza del delito.',
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
                'Que ocurra de noche',
                'Que haya más de un autor',
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
