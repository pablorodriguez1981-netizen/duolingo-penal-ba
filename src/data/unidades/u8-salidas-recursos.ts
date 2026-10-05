import { ENLACES } from '../enlaces-fallos';
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
      relacionados: ['cppba-396', 'cppba-398', 'cppba-399'],
      fallosRelacionados: [
        {
          tribunal: 'Tribunal de Casación Penal de la Provincia de Buenos Aires (Sala V)',
          caso: '«Agüero» (causa 133.216)',
          anio: '2024',
          resumen:
            'Un Tribunal en lo Criminal de Florencio Varela condenó en juicio abreviado por tenencia de estupefacientes con fines de comercialización y robo con arma de fuego. La Casación recordó que la sentencia del abreviado no es una mera homologación del acuerdo: el imputado renuncia al debate y a interrogar a los testigos, pero no a una sentencia fundada. Anuló parcialmente la condena por falta de fundamentos sobre la autoría del robo y reenvió para un nuevo pronunciamiento.',
          regla:
            'En el juicio abreviado bonaerense el imputado no admite los hechos: el juez debe explicar con las evidencias reunidas por qué tiene por probados el hecho y la autoría, y esa sentencia puede revisarse en casación (art. 401).',
          nota: 'Síntesis de la sentencia del 24/9/2024.',
          enlaces: [ENLACES.tcpAguero],
          ambito: 'bonaerense',
        },
      ],
      lecciones: [
        leccion({
          id: 'u8-a395-l1',
          titulo: 'Juicio abreviado: cuándo procede',
          minutos: 4,
          intro: {
            titulo: 'Un acuerdo que evita el debate',
            parrafos: [
              'Si el Fiscal estima suficiente una pena privativa de libertad no mayor de 15 años (o una pena no privativa, aun conjunta), puede proponer el juicio abreviado. El imputado y su defensor también pueden pedirlo.',
              'Hace falta acuerdo de los tres: Fiscal, imputado y defensor. El Fiscal pide pena y el imputado y su defensor prestan conformidad con ella y con la calificación (art. 396).',
              'La víctima, aunque no sea particular damnificado, es convocada a dar su opinión y el juez la tiene en cuenta (Ley 15.232). El acuerdo puede hacerse hasta 30 días antes de la audiencia de debate (art. 397).',
            ],
            enLaPractica:
              'En los departamentos judiciales bonaerenses, una gran parte de las condenas se dicta por juicio abreviado. Por eso es clave que la defensa explique al imputado qué está firmando.',
          },
          foco: 'no mayor de quince (15) años',
          preguntas: [
            comp(
              'Completá el art. 395.',
              'Procede si el Fiscal estima suficiente una pena privativa de la libertad no mayor de ___.',
              ['quince (15) años', 'ocho (8) años', 'diez (10) años', 'seis (6) años'],
              'El tope vigente es de 15 años (Ley 13.943); en la redacción original eran 8.',
            ),
            op(
              '¿Quiénes deben estar de acuerdo para el juicio abreviado?',
              [
                'El Fiscal, el imputado y su defensor',
                'El Fiscal, el imputado, el defensor y la víctima',
                'El imputado y su defensor, con homologación del Juez de Garantías',
                'El Fiscal y el defensor, aunque el imputado no participe',
              ],
              'Sin el acuerdo de los tres, no hay abreviado. La víctima es convocada a opinar y el juez considera lo que diga, pero no integra el acuerdo.',
            ),
            vf(
              'Sólo el Fiscal puede proponer el juicio abreviado.',
              false,
              'Falso. El imputado y su defensor también pueden solicitarlo.',
            ),
            vf(
              'La víctima debe ser convocada a opinar sobre el acuerdo aunque no se haya constituido como particular damnificado.',
              true,
              'Verdadero (art. 396, Ley 15.232). Si no quiere concurrir, se le notifica la decisión.',
            ),
          ],
        }),
        leccion({
          id: 'u8-a395-l2',
          titulo: 'Límites del abreviado',
          minutos: 4,
          intro: {
            titulo: 'El techo es la pena acordada',
            parrafos: [
              'Formalizado el acuerdo, el juez toma contacto de visu con el imputado y le explica las consecuencias. Sólo puede desestimarlo si la voluntad del imputado estaba viciada o si hay una discrepancia insalvable con la calificación (resolución inimpugnable); si no, lo admite (art. 398).',
              'Si lo admite, dicta sentencia en cinco días, fundada en las evidencias recibidas antes del acuerdo. Puede absolver, pero no puede imponer una pena superior a la pedida, ni empeorar el modo de ejecución acordado, ni agregar reglas no convenidas (art. 399).',
              'Si el acuerdo se desestima, nada de lo que admitió el imputado puede usarse en su contra. Contra la sentencia procede casación (criminal) o apelación (correccional), art. 401.',
            ],
          },
          preguntas: [
            op(
              'El Fiscal pidió 3 años y el imputado prestó conformidad. ¿Puede el tribunal imponer 4?',
              ['No: no puede superar la pena solicitada por el Fiscal', 'Sí, si la calificación acordada era errónea', 'Sí, si la víctima se opuso al acuerdo', 'Sólo si el imputado es reincidente'],
              'Art. 399: «No se podrá imponer una pena superior a la pena solicitada por el Agente Fiscal».',
            ),
            vf(
              'En un juicio abreviado el tribunal puede absolver.',
              true,
              'Verdadero: el art. 399 lo prevé expresamente («se podrá absolver al imputado cuando así correspondiere»).',
            ),
            ord(
              'Ordená el trámite del abreviado:',
              [
                'Acuerdo de Fiscal, imputado y defensor sobre pena y calificación',
                'El juez toma contacto de visu con el imputado',
                'El juez admite el acuerdo (o lo desestima en los casos del art. 398)',
                'Sentencia en cinco días, sin superar la pena pedida por el Fiscal',
              ],
              'Es el trámite de los arts. 396 a 399.',
            ),
            op(
              '¿Cuándo puede el juez desestimar el acuerdo de juicio abreviado?',
              [
                'Si la voluntad del imputado estaba viciada o hay discrepancia insalvable con la calificación',
                'Si considera que la pena acordada es demasiado baja',
                'Si la víctima se opone en la audiencia',
                'Si prefiere escuchar a los testigos en un debate',
              ],
              'El art. 398 (Ley 13.943) limita la desestimación a esos dos supuestos, y esa resolución es inimpugnable.',
            ),
            vf(
              'Como hubo acuerdo, la sentencia del juicio abreviado no necesita explicar por qué se tiene por probada la autoría.',
              false,
              'Falso. No es una mera homologación: debe fundarse en las evidencias reunidas y puede anularse por falta de fundamentos (TCP, Sala V, «Agüero», 2024).',
            ),
            vf(
              'Si el tribunal desestima el juicio abreviado, las admisiones del imputado pueden usarse en su contra en el juicio común.',
              false,
              'Falso. El art. 398 dispone que ninguna conformidad o admisión podrá tomarse en su contra como reconocimiento de culpabilidad.',
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
        nota: 'Síntesis didáctica (Fallos 331:858, 23/4/2008, y 336:392, 23/4/2013).',
        enlaces: [ENLACES.acosta, ENLACES.gongora],
        ambito: 'nacional',
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
                'No: el máximo supera los 3 años (tesis restrictiva)',
                'Sí, aunque el Fiscal se oponga',
                'Sí, pero sólo si reconoce el hecho',
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
              'El art. 76 bis CP excluye la probation cuando un funcionario público participó en el delito en ejercicio de sus funciones, respecto de delitos reprimidos con inhabilitación y de los ilícitos del Código Aduanero (Ley 22.415) y del Régimen Penal Tributario (Ley 24.769).',
              'La jurisprudencia de la CSJN («Góngora») agregó que no procede en casos de violencia contra la mujer.',
              'Si el imputado cumple, se extingue la acción; si comete un delito o incumple reglas, se hace el juicio. Y si el juicio se hace por un nuevo delito, la pena que se imponga no podrá dejarse en suspenso (art. 76 ter).',
            ],
          },
          preguntas: [
            op(
              '¿En cuál de estos casos NO procede la probation según el art. 76 bis CP?',
              [
                'Un funcionario público que participó del delito en ejercicio de sus funciones',
                'Un hurto cometido junto con un coimputado mayor de edad',
                'Unas lesiones leves en las que la víctima rechaza la reparación ofrecida',
                'Un concurso real de delitos con máximo de 3 años',
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
              ['Se extingue la acción penal', 'Se lo condena con pena en suspenso', 'Se archiva la causa, que puede reabrirse por 3 años', 'Se lo sobresee, pero queda registrado como antecedente condenatorio'],
              'Es el efecto previsto en el art. 76 ter CP (y una causal de extinción del art. 59 inc. 7).',
            ),
            vf(
              'Los delitos del Régimen Penal Tributario (Ley 24.769) admiten la suspensión del juicio a prueba.',
              false,
              'Falso: el último párrafo del art. 76 bis los excluye, igual que a los del Código Aduanero (Ley 22.415).',
            ),
            vf(
              'Si se revoca la probation porque el imputado cometió un nuevo delito, la pena que se le imponga podrá dejarse en suspenso.',
              false,
              'Falso. El art. 76 ter dispone que en ese caso la pena no podrá ser dejada en suspenso.',
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
        nota: 'Síntesis didáctica (Fallos 328:3399, 20/9/2005). El Tribunal de Casación bonaerense aplica esta revisión amplia.',
        enlaces: [ENLACES.casal],
        ambito: 'nacional',
      },
      lecciones: [
        leccion({
          id: 'u8-a448-l1',
          titulo: 'Motivos de casación',
          minutos: 4,
          intro: {
            titulo: 'La revisión de la sentencia',
            parrafos: [
              'El recurso de casación procede contra sentencias definitivas y ciertos autos que ponen fin a la acción o a la pena (art. 450), y lo resuelve el Tribunal de Casación Penal.',
              'Motivos del art. 448: 1) inobservancia o errónea aplicación de un precepto legal o de la doctrina jurisprudencial (si es un defecto del procedimiento, hay que haber reclamado su subsanación o hecho protesta de recurrir); 2) nuevos hechos o elementos de prueba que evidencien que el hecho no existió o que el imputado no lo cometió.',
              'Plazo (art. 451): escrito fundado dentro de 20 días de notificada la resolución, manifestando la intención de recurrir dentro de los primeros 7 días. El trámite no puede exceder seis meses desde el sorteo de la Sala (prorrogables por otros seis en casos complejos), y lo resuelven dos jueces.',
              'En el juicio por jurados, la defensa recurre la condena también por los motivos del art. 448 bis (por ejemplo, instrucciones que condicionaron al jurado o un veredicto que se aparta manifiestamente de la prueba); el Fiscal no puede recurrir (art. 452).',
            ],
            enLaPractica:
              'Si un Tribunal en lo Criminal aplicó la agravante de arma (art. 166 inc. 2 CP) a un objeto que no lo era, la defensa recurre en casación por errónea aplicación de un precepto legal.',
          },
          foco: 'Inobservancia o errónea aplicación de un precepto legal o de la doctrina jurisprudencial',
          preguntas: [
            op(
              '¿Ante qué tribunal se resuelve el recurso de casación en la Provincia?',
              ['Tribunal de Casación Penal', 'Cámara de Apelación y Garantías', 'Suprema Corte de Justicia provincial', 'Tribunal en lo Criminal en pleno'],
              'El Tribunal de Casación Penal bonaerense es el órgano de casación.',
            ),
            comp(
              'Completá el art. 451.',
              'La presentación del recurso de casación deberá ser efectuada dentro del plazo de ___ de notificada la resolución judicial.',
              ['veinte (20) días', 'siete (7) días', 'diez (10) días', 'quince (15) días'],
              'Veinte días, bajo sanción de inadmisibilidad.',
            ),
            op(
              'El tribunal calificó como robo un hecho sin violencia ni fuerza. ¿Qué motivo de casación corresponde?',
              [
                'Inobservancia o errónea aplicación de un precepto legal (art. 448 inc. 1)',
                'Nuevos hechos o elementos de prueba (art. 448 inc. 2)',
                'Apartamiento manifiesto de la prueba (art. 448 bis inc. d)',
                'Apelación ante la Cámara de Garantías',
              ],
              'Encuadrar mal el hecho en el Código Penal es una errónea aplicación de un precepto legal.',
            ),
            vf(
              'Quien quiere recurrir en casación debe manifestar su intención de hacerlo dentro de los primeros 7 días del plazo.',
              true,
              'Verdadero: según el art. 451, si no lo manifiesta, la resolución se reputa firme y consentida a su respecto.',
            ),
            op(
              'Un jurado declaró culpable al imputado. ¿Puede la defensa recurrir?',
              [
                'Sí, en casación, también por los motivos especiales del art. 448 bis',
                'No: el veredicto del jurado es irrecurrible',
                'Sólo ante la Suprema Corte provincial',
                'Sólo si el veredicto no fue unánime',
              ],
              'El veredicto es irrecurrible, pero la sentencia condenatoria derivada de él se recurre en casación (arts. 371 quater ap. 7, 448 bis y 454).',
            ),
            vf(
              'En el juicio por jurados, el Fiscal puede recurrir en casación la sentencia absolutoria.',
              false,
              'Falso: «En el procedimiento de juicio por jurados, el Ministerio Público Fiscal carece de legitimación para recurrir» (art. 452).',
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
              ['El art. 8.2.h de la Convención Americana', 'El art. 8.1 de la Convención Americana', 'El art. 7.5 de la Convención Americana', 'El art. 18 de la Constitución Nacional'],
              'El art. 8.2.h CADH (y el 14.5 del PIDCP) garantiza el derecho de recurrir el fallo ante un juez o tribunal superior. El 8.1 consagra el plazo razonable y el juez imparcial; el 7.5, el plazo de la prisión preventiva.',
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
            texto: 'Recurso de casación ante el Tribunal de Casación Penal por errónea aplicación de un precepto legal (art. 166 en lugar de 164), en 20 días y manifestando la intención de recurrir en los primeros 7.',
            puntaje: 2,
            devolucion: 'Correcto: el error de calificación es una errónea aplicación de un precepto legal (art. 448 inc. 1); plazos del art. 451.',
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
