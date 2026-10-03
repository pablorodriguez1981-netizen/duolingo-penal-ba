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
            titulo: 'Cuatro meses (prorrogables)',
            parrafos: [
              'La IPP debe practicarse en cuatro meses desde la detención o la declaración del imputado.',
              'Si no alcanza, el Fiscal pide prórroga al Juez de Garantías, que puede concederla por otro período igual según las causas de la demora. En casos de suma gravedad y muy difícil investigación, excepcionalmente puede extenderse más.',
            ],
            enLaPractica:
              'Con detenido, la defensa controla el vencimiento de los 4 meses: si no hay prórroga fundada, puede reclamar ante el Juez de Garantías.',
          },
          foco: 'en el término de cuatro (4) meses',
          preguntas: [
            comp(
              'Completá el art. 282.',
              'La IPP deberá practicarse en el término de ___ a contar de la detención o declaración del imputado.',
              ['cuatro (4) meses', 'dos (2) años', 'diez (10) días', 'un (1) mes'],
              'Cuatro meses es el plazo ordinario.',
            ),
            op(
              '¿Quién concede la prórroga de la IPP?',
              ['El Juez de Garantías, a pedido del Fiscal', 'El Fiscal General', 'La víctima', 'El Tribunal de Casación'],
              'El Fiscal la solicita y el Juez de Garantías decide según las causas de la demora.',
            ),
            ord(
              'Ordená el cómputo de la IPP:',
              [
                'Detención o declaración del imputado',
                'Vencen los 4 meses ordinarios',
                'Prórroga por otro período igual (si se justifica)',
                'Prórroga excepcional en casos de suma gravedad',
              ],
              'La regla son 4 meses; las prórrogas deben justificarse y son cada vez más excepcionales.',
            ),
          ],
        }),
      ],
    },
    {
      articuloId: 'cppba-334',
      relacionados: ['cppba-336'],
      lecciones: [
        leccion({
          id: 'u6-a334-l1',
          titulo: 'La requisitoria fiscal',
          minutos: 4,
          intro: {
            titulo: 'La acusación que abre la puerta del juicio',
            parrafos: [
              'Cuando el Fiscal considera que tiene elementos suficientes —y no corresponde un criterio de oportunidad ni un procedimiento abreviado—, formula por escrito el requerimiento de citación a juicio.',
              'Debe contener, bajo sanción de nulidad: datos del imputado, una relación clara, precisa y circunstanciada del hecho, los fundamentos de la acusación y la calificación legal.',
              'La descripción del hecho es la base del principio de congruencia: no se podrá condenar por un hecho distinto.',
            ],
            enLaPractica:
              'Una requisitoria que dice sólo «el imputado robó» sin indicar lugar, fecha, modo y objeto impide la defensa: la defensa puede pedir su nulidad.',
          },
          foco: 'una relación clara, precisa y circunstanciada del hecho',
          preguntas: [
            op(
              '¿Qué debe contener la requisitoria de elevación a juicio?',
              [
                'Datos del imputado, relación circunstanciada del hecho, fundamentos y calificación legal',
                'Sólo la calificación legal',
                'La pena que el juez debe imponer, sin fundamentos',
                'La declaración de la víctima transcripta',
              ],
              'Son los requisitos del art. 334, exigidos bajo sanción de nulidad.',
            ),
            vf(
              'Si el Fiscal no tiene elementos suficientes para acusar, igual debe requerir la elevación a juicio.',
              false,
              'Falso. Si no hay mérito, por objetividad, debe pedir el sobreseimiento o, si corresponde, archivar.',
            ),
            comp(
              'Completá.',
              'La relación del hecho debe ser clara, precisa y ___.',
              ['circunstanciada', 'breve', 'secreta', 'verbal'],
              'Circunstanciada: con tiempo, lugar, modo y participación.',
            ),
          ],
        }),
        leccion({
          id: 'u6-a336-l1',
          titulo: 'Oposición y elevación',
          minutos: 3,
          intro: {
            titulo: 'La defensa tiene 15 días',
            parrafos: [
              'Notificada la requisitoria, la defensa puede oponerse dentro de 15 días, pidiendo el sobreseimiento o un cambio de calificación.',
              'El Juez de Garantías resuelve: si rechaza la oposición, dispone la elevación a juicio; si la acepta, puede sobreseer o modificar la calificación.',
            ],
            enLaPractica:
              'Si la prueba muestra legítima defensa (art. 34 inc. 6 CP), la defensa se opone a la elevación y pide el sobreseimiento por causa de justificación.',
          },
          foco: 'en el plazo de quince (15) días',
          preguntas: [
            comp(
              'Completá.',
              'La defensa puede oponerse a la requisitoria en el plazo de ___.',
              ['quince (15) días', 'tres (3) días', 'seis (6) meses', 'veinticuatro (24) horas'],
              'Quince días para preparar una oposición fundada.',
            ),
            op(
              '¿Qué puede pedir la defensa al oponerse?',
              ['El sobreseimiento o el cambio de calificación legal', 'La condena de la víctima', 'La prisión del Fiscal', 'La suspensión de la feria judicial'],
              'Son las dos pretensiones típicas de la oposición.',
            ),
            op(
              '¿Quién resuelve la oposición?',
              ['El Juez de Garantías', 'El Fiscal que acusó', 'El Tribunal de Casación', 'La Policía'],
              'El Juez de Garantías controla la acusación antes de que el caso vaya a juicio.',
            ),
            vf(
              'La legítima defensa (art. 34 inc. 6 CP) puede fundar un pedido de sobreseimiento.',
              true,
              'Verdadero: es una causa de justificación, y el sobreseimiento procede cuando media una causa de justificación.',
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
            texto: 'Pido prórroga fundada al Juez de Garantías, explicando qué diligencias faltan (art. 282).',
            puntaje: 2,
            devolucion: 'Correcto. La prórroga debe pedirse y justificarse ante el Juez de Garantías.',
          },
          {
            texto: 'Sigo investigando sin pedir nada: los plazos son orientativos.',
            puntaje: 0,
            devolucion: 'El plazo de la IPP es legal; investigar sin prórroga expone la validez de lo actuado.',
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
            devolucion: 'Exacto: es el control jurisdiccional de la acusación (art. 336/337).',
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
