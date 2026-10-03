import { comp, leccion, op, ord, vf } from '../helpers';
import type { Unidad } from '../tipos';

export const U8: Unidad = {
  id: 'u8',
  numero: 8,
  titulo: 'Abreviado, probation y casación',
  subtitulo: 'Salidas alternativas y revisión de la sentencia',
  etapa: 'Procedimientos especiales y recursos',
  color: 'rojo',
  icono: '🚀',
  temas: [
    {
      articuloId: 'cppba-395',
      lecciones: [
        leccion({
          id: 'u8-a395-l1',
          titulo: 'Juicio abreviado: cuándo procede',
          minutos: 4,
          intro: {
            titulo: 'Un acuerdo que evita el debate',
            parrafos: [
              'Si el Fiscal estima suficiente una pena privativa de libertad no mayor de 15 años (o una pena no privativa, aun conjunta), puede proponer el juicio abreviado. El imputado y su defensor también pueden pedirlo.',
              'Hace falta acuerdo de los tres: Fiscal, imputado y defensor. El imputado presta conformidad con el hecho, su participación, la calificación y la pena.',
              'Ojo con versiones viejas del código: el tope original era menor (8 años) y fue elevado a 15.',
            ],
            enLaPractica:
              'En los departamentos judiciales bonaerenses, una gran parte de las condenas se dicta por juicio abreviado. Por eso es clave que la defensa explique al imputado qué está firmando.',
          },
          foco: 'no mayor de quince (15) años',
          preguntas: [
            comp(
              'Completá el art. 395.',
              'Procede si el Fiscal estima suficiente una pena privativa de la libertad no mayor de ___.',
              ['quince (15) años', 'tres (3) años', 'ocho (8) años', 'veinticinco (25) años'],
              'El tope actual es de 15 años (versiones antiguas del código decían 8).',
            ),
            op(
              '¿Quiénes deben estar de acuerdo para el juicio abreviado?',
              ['El Fiscal, el imputado y su defensor', 'Sólo el Fiscal', 'Sólo la víctima y el juez', 'El imputado y la víctima'],
              'Sin el acuerdo de los tres, no hay abreviado.',
            ),
            vf(
              'Sólo el Fiscal puede proponer el juicio abreviado.',
              false,
              'Falso. El imputado y su defensor también pueden solicitarlo.',
            ),
          ],
        }),
        leccion({
          id: 'u8-a395-l2',
          titulo: 'Límites del abreviado',
          minutos: 3,
          intro: {
            titulo: 'El techo es la pena acordada',
            parrafos: [
              'El tribunal controla el acuerdo: verifica que el imputado lo prestó libremente y conociendo sus consecuencias, y puede rechazarlo si no corresponde.',
              'Si lo admite, dicta sentencia sobre la base de la prueba reunida en la IPP. Puede absolver, pero si condena no puede imponer una pena mayor que la acordada.',
              'El imputado renuncia al debate oral, pero no a recurrir la sentencia.',
            ],
          },
          preguntas: [
            op(
              'El acuerdo fija 3 años de prisión. ¿Puede el tribunal imponer 4?',
              ['No: no puede superar la pena acordada', 'Sí, si lo considera justo', 'Sí, si la víctima lo pide', 'Sí, sumando un año por cada agravante'],
              'La pena acordada funciona como techo.',
            ),
            vf(
              'En un juicio abreviado el tribunal puede absolver.',
              true,
              'Verdadero: el acuerdo no obliga a condenar si la prueba no lo sostiene.',
            ),
            ord(
              'Ordená el trámite del abreviado:',
              [
                'Acuerdo entre Fiscal, imputado y defensor',
                'Audiencia de conocimiento personal del imputado',
                'El tribunal admite o rechaza el acuerdo',
                'Sentencia, que no puede superar la pena acordada',
              ],
              'El control judicial de la voluntad del imputado es esencial.',
            ),
          ],
        }),
      ],
    },
    {
      articuloId: 'cp-76-bis',
      relacionados: ['cp-76-ter', 'cp-27-bis'],
      falloClave: {
        tribunal: 'Corte Suprema de Justicia de la Nación',
        caso: '«Acosta» (2008) y «Góngora» (2013)',
        resumen:
          'En «Acosta», la Corte adoptó la tesis amplia: la probation no se limita a delitos con máximo de 3 años, sino que alcanza también a aquellos en los que podría aplicarse condena condicional (art. 76 bis, 4.º párrafo). En «Góngora», sostuvo que en casos de violencia contra la mujer no procede la suspensión del juicio a prueba, por el compromiso internacional de juzgarlos (Convención de Belém do Pará).',
        regla:
          'Tesis amplia: procede si cabe una condena en suspenso. Excepción relevante: delitos de violencia de género («Góngora»).',
        nota: 'Síntesis didáctica (Fallos 331:858 y 336:392). Verificá los fallos completos antes de citarlos.',
      },
      lecciones: [
        leccion({
          id: 'u8-cp76-l1',
          titulo: 'Suspensión del juicio a prueba',
          minutos: 4,
          intro: {
            titulo: 'Probation: cumplir reglas en lugar de ir a juicio',
            parrafos: [
              'El art. 76 bis CP permite al imputado de un delito de acción pública pedir la suspensión del juicio a prueba si la pena máxima no excede de 3 años (también en concurso).',
              'Además, el 4.º párrafo la habilita cuando las circunstancias permitirían dejar en suspenso la condena, con consentimiento del Fiscal. Es la base de la «tesis amplia» (fallo «Acosta»).',
              'El imputado ofrece reparar el daño en la medida de lo posible (sin que eso implique confesión). Si cumple las reglas de conducta durante 1 a 3 años, se extingue la acción penal.',
            ],
            enLaPractica:
              'En un robo simple (1 mes a 6 años) de un imputado sin antecedentes, la defensa pide la probation por el 4.º párrafo: el mínimo permite una condena en suspenso.',
          },
          foco: 'cuyo máximo no exceda de tres años',
          preguntas: [
            op(
              'Robo simple (1 mes a 6 años), imputado sin antecedentes. ¿Puede pedir la probation?',
              [
                'Sí, por el 4.º párrafo del art. 76 bis (tesis amplia), si cabe condena en suspenso y el Fiscal consiente',
                'No, porque el máximo supera los 3 años',
                'No, el robo nunca admite probation',
                'Sí, pero sólo si confiesa',
              ],
              'La tesis amplia («Acosta») permite la probation cuando sería posible una condena condicional.',
            ),
            vf(
              'Ofrecer reparar el daño implica confesar el delito.',
              false,
              'Falso: el art. 76 bis CP aclara que el ofrecimiento no implica confesión ni reconocimiento de responsabilidad civil.',
            ),
            comp(
              'Completá el art. 76 ter CP.',
              'El tiempo de la suspensión será fijado por el Tribunal entre ___, según la gravedad del delito.',
              ['uno y tres años', 'seis meses y un año', 'cinco y diez años', 'dos y cuatro años'],
              'Entre uno y tres años (dos a cuatro es el plazo de las reglas de la condena condicional, art. 27 bis).',
            ),
          ],
        }),
        leccion({
          id: 'u8-cp76-l2',
          titulo: 'Cuándo NO procede la probation',
          minutos: 3,
          intro: {
            titulo: 'Exclusiones legales y jurisprudenciales',
            parrafos: [
              'El art. 76 bis CP excluye la probation cuando un funcionario público participó en el delito en ejercicio de sus funciones, y respecto de delitos reprimidos con inhabilitación.',
              'La jurisprudencia de la CSJN («Góngora») agregó que no procede en casos de violencia contra la mujer.',
              'Si el imputado cumple, se extingue la acción; si comete un delito o incumple reglas, se hace el juicio.',
            ],
          },
          preguntas: [
            op(
              '¿En cuál de estos casos NO procede la probation según el art. 76 bis CP?',
              [
                'Un funcionario público que participó del delito en ejercicio de sus funciones',
                'Un hurto simple cometido por un estudiante sin antecedentes',
                'Unas lesiones leves con ofrecimiento de reparación',
                'Un daño a un auto estacionado',
              ],
              'Es una exclusión expresa del art. 76 bis CP.',
            ),
            vf(
              'Según «Góngora», la probation no procede en casos de violencia contra la mujer.',
              true,
              'Verdadero: la Corte lo fundó en la Convención de Belém do Pará.',
            ),
            op(
              '¿Qué pasa si el imputado cumple todas las condiciones durante el plazo fijado?',
              ['Se extingue la acción penal', 'Se lo condena con pena en suspenso', 'Se lo declara reincidente', 'Se reabre la IPP'],
              'Es el efecto previsto en el art. 76 ter CP.',
            ),
          ],
        }),
      ],
    },
    {
      articuloId: 'cppba-448',
      falloClave: {
        tribunal: 'Corte Suprema de Justicia de la Nación',
        caso: '«Casal, Matías Eugenio»',
        anio: '2005',
        resumen:
          'Se discutía si casación sólo podía revisar «cuestiones de derecho» o también los hechos y la prueba. La Corte sostuvo que el recurso de casación debe garantizar el derecho al recurso del art. 8.2.h de la CADH.',
        regla:
          'Teoría del «máximo de rendimiento»: el tribunal de casación debe revisar todo lo que pueda revisar, incluidos hechos y prueba, salvo lo que dependa exclusivamente de la inmediación del juicio.',
        nota: 'Síntesis didáctica (Fallos 328:3399). El Tribunal de Casación bonaerense aplica esta revisión amplia.',
      },
      lecciones: [
        leccion({
          id: 'u8-a448-l1',
          titulo: 'Motivos de casación',
          minutos: 4,
          intro: {
            titulo: 'La revisión de la sentencia',
            parrafos: [
              'El recurso de casación se dirige contra sentencias definitivas y se resuelve en el Tribunal de Casación Penal de la Provincia.',
              'Motivos clásicos: 1) inobservancia o errónea aplicación de la ley sustantiva (por ejemplo, calificar como robo un hurto) o de la doctrina jurisprudencial; 2) inobservancia de normas procesales previstas bajo pena de inadmisibilidad, caducidad o nulidad, con reclamo oportuno de subsanación (salvo nulidades absolutas).',
              'Se interpone por escrito fundado dentro de 20 días.',
            ],
            enLaPractica:
              'Si un Tribunal en lo Criminal aplicó la agravante de arma (art. 166 inc. 2) a un objeto que no lo era, la defensa recurre en casación por errónea aplicación de la ley sustantiva.',
          },
          foco: 'La inobservancia o errónea aplicación de la ley sustantiva',
          preguntas: [
            op(
              '¿Ante qué tribunal se resuelve el recurso de casación en la Provincia?',
              ['Tribunal de Casación Penal', 'Cámara de Garantías', 'Juez de Garantías', 'Juzgado de Paz'],
              'El Tribunal de Casación Penal bonaerense es el órgano de casación.',
            ),
            comp(
              'Completá.',
              'El recurso de casación se interpone dentro del plazo de ___.',
              ['veinte (20) días', 'tres (3) días', 'seis (6) meses', 'un (1) año'],
              'Veinte días desde la notificación de la sentencia.',
            ),
            op(
              'El tribunal calificó como robo un hecho sin violencia ni fuerza. ¿Qué motivo de casación corresponde?',
              [
                'Errónea aplicación de la ley sustantiva',
                'Inobservancia de normas procesales',
                'Revisión por hecho nuevo',
                'Recusación',
              ],
              'Encuadrar mal el hecho en el Código Penal es un error de derecho sustantivo.',
            ),
          ],
        }),
        leccion({
          id: 'u8-a448-l2',
          titulo: 'Revisión amplia: «Casal»',
          minutos: 3,
          intro: {
            titulo: 'Casación también mira hechos y prueba',
            parrafos: [
              'Tradicionalmente se decía que casación sólo controlaba el derecho. Desde «Casal» (2005), el recurso debe permitir una revisión integral de la condena: hechos, prueba y derecho.',
              'El único límite es lo que depende de la inmediación (por ejemplo, la impresión directa que causó un testigo en la sala), aunque incluso eso debe estar razonablemente explicado en la sentencia.',
            ],
          },
          preguntas: [
            vf(
              'Según «Casal», el tribunal de casación puede revisar la valoración de la prueba.',
              true,
              'Verdadero: es la teoría del máximo de rendimiento.',
            ),
            op(
              '¿Qué norma internacional fundamenta el derecho al recurso amplio?',
              ['El art. 8.2.h de la Convención Americana', 'El art. 2 del Código Penal', 'El art. 1 de la Ley de Tránsito', 'El art. 395 CPPBA'],
              'El art. 8.2.h CADH garantiza el derecho de recurrir el fallo ante un juez o tribunal superior.',
            ),
            ord(
              'Ordená la vía recursiva típica contra una condena en la Provincia:',
              [
                'Sentencia del Tribunal en lo Criminal',
                'Recurso de casación ante el Tribunal de Casación Penal',
                'Recursos extraordinarios ante la Suprema Corte (SCBA)',
                'Recurso extraordinario federal ante la CSJN',
              ],
              'De la instancia de juicio a la Corte Suprema nacional, pasando por Casación y la SCBA.',
            ),
          ],
        }),
      ],
    },
  ],
  caso: {
    id: 'caso-u8',
    titulo: 'Tres caminos',
    rol: 'Defensa oficial',
    sede: 'Departamento Judicial Quilmes (caso ficticio)',
    hechos: [
      'Volvemos con Lucas (19), imputado de robo simple (art. 164 CP) por arrebatar un celular con un empujón. No tiene antecedentes, estudia y trabaja.',
      'La víctima recuperó el teléfono, pero tuvo gastos médicos menores.',
    ],
    etapas: [
      {
        id: 'e1',
        momento: 'Antes del juicio',
        situacion: 'Analizás las salidas alternativas.',
        pregunta: '¿Qué pedís primero?',
        opciones: [
          {
            texto: 'Suspensión del juicio a prueba por el 4.º párrafo del art. 76 bis CP (tesis amplia, «Acosta»), ofreciendo reparar los gastos médicos.',
            puntaje: 2,
            devolucion: 'Excelente: el mínimo del robo simple permite una condena en suspenso, y Lucas no tiene antecedentes.',
          },
          {
            texto: 'Nada: la probation sólo procede si el máximo es de 3 años.',
            puntaje: 0,
            devolucion: 'Esa es la tesis restrictiva, superada por la CSJN en «Acosta».',
          },
          {
            texto: 'Ir directo a juicio oral.',
            puntaje: 1,
            devolucion: 'Es posible, pero dejarías pasar una salida que evita la condena y extingue la acción.',
          },
        ],
        normas: ['Art. 76 bis CP', 'Art. 404 CPPBA'],
      },
      {
        id: 'e2',
        momento: 'Respuesta del Fiscal',
        situacion: 'El Fiscal se opone con una fórmula genérica: «por razones de política criminal».',
        pregunta: '¿Cómo respondés?',
        opciones: [
          {
            texto: 'Planteo que la oposición fiscal debe ser fundada en las circunstancias del caso; una negativa genérica es arbitraria y el juez debe controlar su razonabilidad.',
            puntaje: 2,
            devolucion: 'Bien. El consentimiento fiscal exigido por el 4.º párrafo no puede ejercerse en forma inmotivada (art. 56: requerimientos motivados).',
          },
          {
            texto: 'Acepto: el Fiscal no tiene que explicar nada.',
            puntaje: 0,
            devolucion: 'El Fiscal debe formular sus requerimientos en forma motivada.',
          },
          {
            texto: 'Pido que decida la víctima.',
            puntaje: 0,
            devolucion: 'La víctima puede aceptar o no la reparación, pero no decide la procedencia de la probation.',
          },
        ],
        normas: ['Art. 76 bis CP', 'Art. 56 CPPBA'],
      },
      {
        id: 'e3',
        momento: 'Plan B: abreviado',
        situacion: 'La probation es rechazada. El Fiscal ofrece un juicio abreviado: 2 años de prisión en suspenso.',
        pregunta: '¿Qué le explicás a Lucas?',
        opciones: [
          {
            texto: 'Que el acuerdo implica renunciar al debate y aceptar el hecho y la calificación; que el tribunal no puede superar la pena pactada y que puede rechazar el acuerdo o incluso absolver.',
            puntaje: 2,
            devolucion: 'Explicación completa: la conformidad debe ser libre e informada.',
          },
          {
            texto: 'Que firme rápido porque «es un trámite».',
            puntaje: 0,
            devolucion: 'El abreviado termina en una condena: Lucas debe entender lo que acepta.',
          },
          {
            texto: 'Que el tribunal podría ponerle más pena si quiere.',
            puntaje: 0,
            devolucion: 'Falso: la pena acordada es el techo.',
          },
        ],
        normas: ['Arts. 395 y ss. CPPBA'],
      },
      {
        id: 'e4',
        momento: 'Otro final posible',
        situacion: 'Supongamos que Lucas no aceptó, fue a juicio y lo condenaron a 4 años como autor de robo con arma, aunque nunca hubo un arma.',
        pregunta: '¿Qué recurso interponés?',
        opciones: [
          {
            texto: 'Recurso de casación ante el Tribunal de Casación Penal, dentro de 20 días, por errónea aplicación de la ley sustantiva (art. 166 en lugar de 164).',
            puntaje: 2,
            devolucion: 'Correcto: error de calificación = ley sustantiva mal aplicada (art. 448).',
          },
          {
            texto: 'Apelación ante la Cámara de Garantías.',
            puntaje: 0,
            devolucion: 'La Cámara de Garantías revisa resoluciones de la IPP, no sentencias de juicio.',
          },
          {
            texto: 'Recurso directo ante la Corte Suprema de la Nación.',
            puntaje: 0,
            devolucion: 'Hay que agotar antes las instancias provinciales (Casación y SCBA).',
          },
        ],
        normas: ['Art. 448 CPPBA', 'Arts. 164 y 166 CP'],
      },
    ],
    cierre: {
      titulo: 'Estrategia completa',
      texto:
        'Recorriste las tres grandes salidas: probation (CP), juicio abreviado (CPPBA) y casación. Combinar el código de fondo con el procesal es lo que define una buena estrategia de defensa en la Provincia.',
    },
  },
};
