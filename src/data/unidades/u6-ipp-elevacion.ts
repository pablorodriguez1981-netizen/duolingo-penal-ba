import { comp, leccion, op, ord, vf } from '../helpers';
import type { Unidad } from '../tipos';

export const U6: Unidad = {
  id: 'u6',
  numero: 6,
  titulo: 'IPP y elevación a juicio',
  subtitulo: 'De la investigación a la acusación',
  etapa: 'Investigación Penal Preparatoria',
  color: 'turquesa',
  icono: '🧭',
  temas: [
    {
      articuloId: 'cppba-266',
      relacionados: ['cppba-56'],
      falloClave: {
        tribunal: 'Corte Suprema de Justicia de la Nación',
        caso: '«Llerena, Horacio Luis»',
        anio: '2005',
        resumen:
          'En un proceso correccional, el mismo juez que había investigado era luego quien juzgaba. La Corte entendió que esa acumulación de funciones afectaba la garantía de imparcialidad.',
        regla:
          'Quien investiga no debe juzgar. Por eso el modelo bonaerense separa al Fiscal (que investiga) del Juez de Garantías (que controla) y del tribunal de juicio (que decide).',
        nota: 'Síntesis didáctica (Fallos 328:1491). Verificá el fallo completo antes de citarlo.',
      },
      lecciones: [
        leccion({
          id: 'u6-a266-l1',
          titulo: 'Para qué sirve la IPP',
          minutos: 4,
          intro: {
            titulo: 'Cinco objetivos de la investigación',
            parrafos: [
              'La Investigación Penal Preparatoria no busca condenar: busca reunir lo necesario para decidir si hay un caso para llevar a juicio.',
              'Según el art. 266, debe: 1) comprobar si existe un hecho delictuoso; 2) establecer las circunstancias que lo califican, agravan, atenúan o justifican; 3) individualizar a autores y partícipes; 4) conocer las condiciones personales del imputado; y 5) comprobar la extensión del daño.',
              'Fijate que la IPP también busca lo que favorece al imputado (atenuantes, justificantes): es la objetividad del Fiscal en acción.',
            ],
            enLaPractica:
              'Al recibir una denuncia por lesiones, la UFI pide el informe médico (extensión del daño), cita testigos (autoría) y revisa si hubo una agresión previa de la víctima (posible legítima defensa).',
          },
          foco: 'La Investigación Penal Preparatoria tendrá por finalidad',
          preguntas: [
            ord(
              'Ordená las finalidades de la IPP como aparecen en el art. 266:',
              [
                'Comprobar si existe un hecho delictuoso',
                'Establecer las circunstancias que lo califican, agravan, atenúan o justifican',
                'Individualizar a autores y partícipes',
                'Verificar las condiciones personales del imputado',
                'Comprobar la extensión del daño',
              ],
              'Del hecho a las personas y, finalmente, al daño causado.',
            ),
            vf(
              'La IPP sólo busca pruebas en contra del imputado.',
              false,
              'Falso. También debe establecer circunstancias que atenúen o justifiquen el hecho.',
            ),
            op(
              '¿Cuál de estas NO es una finalidad de la IPP?',
              ['Dictar la sentencia condenatoria', 'Individualizar a los autores', 'Comprobar la extensión del daño', 'Comprobar si existió el hecho'],
              'La IPP prepara el juicio; la sentencia la dicta el tribunal de juicio.',
            ),
          ],
        }),
        leccion({
          id: 'u6-a266-l2',
          titulo: 'Quién hace qué en la IPP',
          minutos: 3,
          intro: {
            titulo: 'Fiscal, policía y Juez de Garantías',
            parrafos: [
              'El Fiscal dirige la IPP y a la Policía en función judicial. La Policía realiza las diligencias urgentes y las que el Fiscal le encarga.',
              'El Juez de Garantías no investiga: autoriza los actos que afectan derechos (allanamientos, intervenciones telefónicas, detenciones), resuelve la coerción y controla la legalidad.',
              'La defensa puede proponer diligencias y controlar la prueba.',
            ],
          },
          preguntas: [
            op(
              'El Fiscal necesita allanar un domicilio. ¿Quién lo autoriza?',
              ['El Juez de Garantías', 'El propio Fiscal', 'El comisario', 'La Cámara de Casación'],
              'Los actos que afectan garantías (domicilio, comunicaciones, libertad) requieren orden judicial.',
            ),
            comp(
              'Completá.',
              'El Juez de Garantías ___ la IPP: no la dirige.',
              ['controla', 'practica', 'acusa', 'sentencia'],
              'El control judicial es la contracara del poder investigador del Fiscal.',
            ),
            vf(
              'La defensa puede proponer diligencias durante la IPP.',
              true,
              'Verdadero. La IPP es contradictoria en la medida de lo posible; la defensa propone medidas y controla la prueba.',
            ),
          ],
        }),
      ],
    },
    {
      articuloId: 'cppba-282',
      relacionados: ['cppba-141'],
      lecciones: [
        leccion({
          id: 'u6-a282-l1',
          titulo: 'Duración de la IPP',
          minutos: 3,
          intro: {
            titulo: 'Cuatro meses (y prórrogas acotadas)',
            parrafos: [
              'La IPP debe practicarse en cuatro meses desde la detención o la declaración del imputado (art. 308).',
              'Si no alcanza, el propio Fiscal dispone la prórroga, en forma motivada y fundada, con conocimiento del Juez de Garantías: hasta dos meses más, según las causas de la demora. En casos excepcionales, justificados por su gravedad o difícil investigación, la prórroga puede llegar a seis meses.',
            ],
            enLaPractica:
              'Con detenido, la defensa controla los vencimientos (y el tope del art. 141): una prórroga sin motivación puede cuestionarse ante el Juez de Garantías.',
          },
          foco: 'en el plazo de cuatro (4) meses',
          preguntas: [
            comp(
              'Completá el art. 282.',
              'La Investigación Penal Preparatoria deberá practicarse en el plazo de ___ a contar de la detención o declaración del imputado.',
              ['cuatro (4) meses', 'dos (2) años', 'diez (10) días', 'un (1) mes'],
              'Cuatro meses es el plazo ordinario.',
            ),
            op(
              '¿Quién dispone la prórroga de la IPP?',
              ['El propio Fiscal, en forma motivada y con conocimiento del Juez de Garantías', 'La víctima', 'El Tribunal de Casación', 'La Policía'],
              'Según el art. 282, el Fiscal «dispondrá motivada y fundadamente su prórroga, con conocimiento del Juez de Garantías».',
            ),
            comp(
              'Completá.',
              'La prórroga ordinaria puede ser de hasta ___ más.',
              ['dos (2) meses', 'seis (6) meses', 'un (1) año', 'quince (15) días'],
              'Hasta dos meses; sólo en casos excepcionales, por gravedad o difícil investigación, hasta seis meses.',
            ),
            ord(
              'Ordená el cómputo de la IPP:',
              [
                'Detención o declaración del imputado',
                'Vencen los 4 meses ordinarios',
                'Prórroga motivada de hasta 2 meses',
                'En casos excepcionales, prórroga de hasta 6 meses',
              ],
              'La regla son 4 meses; las prórrogas deben motivarse y son cada vez más excepcionales.',
            ),
          ],
        }),
      ],
    },
    {
      articuloId: 'cppba-334',
      relacionados: ['cppba-335'],
      lecciones: [
        leccion({
          id: 'u6-a334-l1',
          titulo: 'La requisitoria fiscal',
          minutos: 4,
          intro: {
            titulo: 'La acusación que abre la puerta del juicio',
            parrafos: [
              'Si el Fiscal estima contar con elementos suficientes para ejercer la acción, formula por escrito su requisitoria de citación a juicio ante el Juez de Garantías (art. 334).',
              'Según el art. 335, debe contener, bajo sanción de nulidad: los datos del imputado, una relación clara, precisa, circunstanciada y específica del hecho, los fundamentos de la acusación y la calificación legal; y aclarar si debe juzgarlo un Tribunal o un Juez Correccional.',
              'La descripción del hecho es la base del principio de congruencia: no se podrá condenar por un hecho distinto.',
            ],
            enLaPractica:
              'Una requisitoria que dice sólo «el imputado robó», sin lugar, fecha, modo ni objeto, impide la defensa: puede pedirse su nulidad.',
          },
          foco: 'formular por escrito su requisitoria de citación a juicio',
          preguntas: [
            op(
              '¿Qué debe contener la requisitoria de elevación a juicio?',
              [
                'Datos del imputado, relación circunstanciada del hecho, fundamentos y calificación legal',
                'Sólo la calificación legal',
                'La pena que el juez debe imponer, sin fundamentos',
                'La declaración de la víctima transcripta',
              ],
              'Son los requisitos del art. 335, exigidos bajo sanción de nulidad.',
            ),
            vf(
              'Si el Fiscal no tiene elementos suficientes para acusar, igual debe requerir la elevación a juicio.',
              false,
              'Falso. El art. 334 condiciona la requisitoria a contar con elementos suficientes; si no los hay, por objetividad, debe pedir el sobreseimiento.',
            ),
            comp(
              'Completá el art. 335.',
              'La relación del hecho debe ser clara, precisa, ___ y específica.',
              ['circunstanciada', 'breve', 'secreta', 'verbal'],
              'Circunstanciada: con tiempo, lugar, modo y participación.',
            ),
          ],
        }),
      ],
    },
    {
      articuloId: 'cppba-336',
      relacionados: ['cppba-337'],
      lecciones: [
        leccion({
          id: 'u6-a336-l1',
          titulo: 'Oposición y elevación',
          minutos: 3,
          intro: {
            titulo: 'La defensa tiene 15 días',
            parrafos: [
              'Notificada la requisitoria, la defensa puede oponerse dentro de 15 días: pedir el sobreseimiento, el cambio de calificación legal u oponer excepciones.',
              'El Juez de Garantías resuelve en cinco días. Si rechaza la oposición, eleva la causa a juicio por auto, apelable por el defensor que se opuso. Si no hubo oposición, la causa pasa al tribunal de juicio por simple decreto (art. 337).',
            ],
            enLaPractica:
              'Si la prueba muestra legítima defensa (art. 34 inc. 6 CP), la defensa se opone a la elevación y pide el sobreseimiento por causa de justificación.',
          },
          foco: 'en el término de quince (15) días',
          preguntas: [
            comp(
              'Completá el art. 336.',
              'El defensor podrá, en el término de ___, oponerse instando al sobreseimiento o el cambio de calificación legal.',
              ['quince (15) días', 'tres (3) días', 'seis (6) meses', 'veinticuatro (24) horas'],
              'Quince días para preparar una oposición fundada.',
            ),
            op(
              '¿Qué puede pedir la defensa al oponerse?',
              ['El sobreseimiento, el cambio de calificación u oponer excepciones', 'La condena de la víctima', 'La prisión del Fiscal', 'La suspensión de la feria judicial'],
              'Son las pretensiones que prevé el art. 336.',
            ),
            op(
              '¿Quién resuelve la oposición y en qué plazo?',
              ['El Juez de Garantías, en cinco días', 'El Fiscal que acusó, en un mes', 'El Tribunal de Casación, en veinte días', 'La Policía, en el acto'],
              'Art. 337: el Juez de Garantías resuelve en cinco días; si rechaza la oposición, eleva la causa a juicio por auto.',
            ),
            vf(
              'Si la defensa no se opone, la causa se remite al tribunal de juicio por simple decreto.',
              true,
              'Verdadero, según el art. 337.',
            ),
            vf(
              'La legítima defensa (art. 34 inc. 6 CP) puede fundar un pedido de sobreseimiento.',
              true,
              'Verdadero: es una causa de justificación.',
            ),
          ],
        }),
      ],
    },
  ],
  caso: {
    id: 'caso-u6',
    titulo: 'Cuatro meses y contando',
    rol: 'Agente Fiscal',
    sede: 'UFI N.º 5 · Departamento Judicial La Plata (caso ficticio)',
    hechos: [
      'A la salida de un boliche de La Plata, Tomás golpeó a Iván, que sufrió una fractura con incapacidad laboral de más de un mes (lesiones graves, art. 90 CP).',
      'Tomás declaró hace cuatro meses: dice que Iván lo atacó primero con una botella.',
      'Vos llevás la investigación.',
    ],
    etapas: [
      {
        id: 'e1',
        momento: 'Vencimiento del plazo',
        situacion: 'Se cumplen 4 meses desde la declaración y falta la pericia médica definitiva y un video del local.',
        pregunta: '¿Qué hacés?',
        opciones: [
          {
            texto: 'Dispongo una prórroga motivada de hasta 2 meses, con conocimiento del Juez de Garantías, explicando qué diligencias faltan (art. 282).',
            puntaje: 2,
            devolucion: 'Correcto. En el CPPBA la prórroga la dispone el propio Fiscal, en forma motivada y fundada, con conocimiento del Juez de Garantías.',
          },
          {
            texto: 'Sigo investigando sin pedir nada: los plazos son orientativos.',
            puntaje: 0,
            devolucion: 'El plazo de la IPP es legal: vencido, hace falta una prórroga motivada; si no, se expone la validez de lo actuado.',
          },
          {
            texto: 'Archivo la causa porque se venció el plazo.',
            puntaje: 0,
            devolucion: 'El vencimiento no impone un archivo automático: corresponde pedir prórroga o resolver con lo que hay.',
          },
        ],
        normas: ['Art. 282 CPPBA'],
      },
      {
        id: 'e2',
        momento: 'El video del boliche',
        situacion: 'El video muestra que Iván levantó una botella contra Tomás antes del golpe.',
        pregunta: 'Como Fiscal objetivo, ¿qué hacés con esa prueba?',
        opciones: [
          {
            texto: 'La incorporo y evalúo si hubo legítima defensa (art. 34 inc. 6 CP): la IPP también busca lo que justifica el hecho (art. 266 inc. 2).',
            puntaje: 2,
            devolucion: 'Excelente: criterio objetivo (art. 56) y finalidad amplia de la IPP.',
          },
          {
            texto: 'No la agrego porque perjudica la acusación.',
            puntaje: 0,
            devolucion: 'Ocultar prueba favorable viola la objetividad del Fiscal y el derecho de defensa.',
          },
          {
            texto: 'La agrego pero sin analizarla.',
            puntaje: 1,
            devolucion: 'Incorporarla está bien, pero el Fiscal debe valorarla para decidir si acusa o pide el sobreseimiento.',
          },
        ],
        normas: ['Art. 56 CPPBA', 'Art. 266 CPPBA', 'Art. 34 inc. 6 CP'],
      },
      {
        id: 'e3',
        momento: 'Decisión final',
        situacion: 'El video también muestra que, ya desarmado y en el piso, Iván recibió varios golpes más de Tomás.',
        pregunta: '¿Qué requerimiento corresponde?',
        opciones: [
          {
            texto: 'Requisitoria de elevación a juicio con una relación circunstanciada del hecho y su calificación (art. 334), porque los golpes posteriores exceden la defensa.',
            puntaje: 2,
            devolucion: 'Bien. Cuando la agresión cesó, la necesidad de defenderse desaparece; los golpes posteriores pueden imputarse.',
          },
          {
            texto: 'Sobreseimiento total por legítima defensa.',
            puntaje: 1,
            devolucion: 'Puede discutirse para el primer golpe, pero los golpes posteriores, con Iván desarmado, no parecen necesarios.',
          },
          {
            texto: 'Una requisitoria que diga sólo «Tomás lesionó a Iván».',
            puntaje: 0,
            devolucion: 'Esa descripción no es circunstanciada y sería nula: impide la defensa.',
          },
        ],
        normas: ['Art. 334 CPPBA', 'Art. 90 CP', 'Art. 34 inc. 6 CP'],
      },
      {
        id: 'e4',
        momento: 'Oposición de la defensa',
        situacion: 'La defensa se opone dentro de los 15 días y pide el sobreseimiento.',
        pregunta: '¿Qué sigue?',
        opciones: [
          {
            texto: 'El Juez de Garantías resuelve la oposición y, si la rechaza, eleva la causa a juicio.',
            puntaje: 2,
            devolucion: 'Exacto: es el control jurisdiccional de la acusación. Resuelve en cinco días y el auto de elevación es apelable por el defensor (arts. 336 y 337).',
          },
          {
            texto: 'Como Fiscal, resuelvo yo la oposición.',
            puntaje: 0,
            devolucion: 'El Fiscal es parte: no puede decidir sobre la oposición a su propia acusación.',
          },
          {
            texto: 'La causa va directo al Tribunal de Casación.',
            puntaje: 0,
            devolucion: 'Casación revisa sentencias; la elevación la decide el Juez de Garantías.',
          },
        ],
        normas: ['Arts. 336 y 337 CPPBA'],
      },
    ],
    cierre: {
      titulo: 'Investigar con objetividad',
      texto:
        'Gestionaste los plazos de la IPP, valoraste prueba de descargo y formulaste una acusación precisa. Un Fiscal objetivo no «gana» cuando condena: cumple cuando aplica correctamente la ley.',
    },
  },
};
