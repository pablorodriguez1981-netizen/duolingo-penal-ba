import { ENLACES } from '../enlaces-fallos';
import { comp, leccion, op, vf } from '../helpers';
import type { Unidad } from '../tipos';

export const U1: Unidad = {
  id: 'u1',
  numero: 1,
  titulo: 'Garantías del proceso',
  subtitulo: 'Las reglas de juego que protegen a toda persona acusada',
  etapa: 'Principios y garantías',
  color: 'azul',
  icono: '🛡️',
  temas: [
    {
      articuloId: 'cppba-1',
      relacionados: ['cppba-3', 'cppba-22-bis'],
      falloClave: {
        tribunal: 'Corte Suprema de Justicia de la Nación',
        caso: '«Polak, Federico Gabriel»',
        anio: '1998',
        resumen:
          'Un imputado había sido juzgado válidamente y, por un error que no le era atribuible, se anuló el juicio para hacerlo de nuevo. La Corte entendió que retrotraer el proceso a etapas ya cumplidas, cuando el imputado no causó el vicio, lo expone otra vez al riesgo de condena.',
        regla:
          'El non bis in ídem prohíbe no sólo una segunda pena, sino también un nuevo juicio y la renovación del riesgo de condena por el mismo hecho.',
        nota: 'Síntesis didáctica (Fallos 321:2826, 15/10/1998).',
        enlaces: [ENLACES.polak],
        ambito: 'nacional',
      },
      fallosRelacionados: [
        {
          tribunal: 'Suprema Corte de Justicia de la Provincia de Buenos Aires',
          caso: '«Pitman y otros» (P. 137.668 y P. 137.671)',
          anio: '2024',
          resumen:
            'Un jurado de Mar del Plata declaró no culpables a tres acusados. Los particulares damnificados pidieron la nulidad del juicio y la Casación, por vía de queja, anuló el debate y el veredicto y ordenó un nuevo juicio con otro jurado. La SCBA revocó esa decisión y restableció el veredicto de no culpabilidad.',
          regla:
            'Anular un veredicto de no culpabilidad del jurado para hacer un nuevo juicio expone a los acusados a un nuevo riesgo de condena por el mismo hecho: lo prohíbe el non bis in ídem. La absolución derivada del veredicto del jurado es irrecurrible (art. 371 quater, ap. 7).',
          nota: 'Síntesis de la sentencia de marzo de 2024 (registrada el 21/3/2024).',
          enlaces: [ENLACES.scbaPitman],
          ambito: 'bonaerense',
        },
      ],
      lecciones: [
        leccion({
          id: 'u1-a1-l1',
          titulo: 'Juez natural y juicio previo',
          minutos: 4,
          intro: {
            titulo: '¿Quién puede juzgarte?',
            parrafos: [
              'El artículo 1 del CPPBA es la puerta de entrada al código: reúne las garantías que la Constitución reconoce a cualquier persona acusada de un delito.',
              'La primera es el juez natural: sólo pueden juzgarte los jueces designados de acuerdo con la Constitución de la Provincia y competentes según sus leyes. El art. 18 de la Constitución Nacional agrega que deben estar designados por ley ANTES del hecho: nadie puede armar un tribunal especial para un caso.',
              'La segunda es el juicio previo: para que haya pena tiene que haber antes un juicio, fundado en una ley anterior al hecho y tramitado conforme al código. Desde la Ley 14.543, el art. 1 también remite al juicio por jurados en causas criminales (art. 22 bis: delitos con pena máxima de más de 15 años).',
            ],
            enLaPractica:
              'Si una causa de Lomas de Zamora se asignara a un juzgado creado especialmente después del hecho para «ese» imputado, la defensa podría objetarlo por violar el juez natural.',
          },
          foco: 'Nadie podrá ser juzgado por otros jueces que los designados de acuerdo con la Constitución de la Provincia y competentes según sus leyes reglamentarias',
          preguntas: [
            op(
              '¿Qué exige la garantía del juez natural según el art. 1 CPPBA?',
              [
                'Jueces designados conforme a la Constitución provincial y competentes según sus leyes',
                'Que intervenga el juez del lugar donde vive el imputado',
                'Que la causa la resuelva el juez que la Suprema Corte designe para ese caso',
                'Que el imputado pueda elegir entre un juez técnico y un jurado en cualquier delito',
              ],
              'El art. 1 exige jueces designados de acuerdo con la Constitución de la Provincia y competentes según sus leyes; el art. 18 CN agrega que deben estar designados antes del hecho. La competencia territorial se fija por el lugar del hecho, no por el domicilio, y el jurado sólo rige en los delitos del art. 22 bis.',
            ),
            op(
              'Tras un homicidio muy mediático, se crea por ley un tribunal especial para juzgar sólo ese caso. ¿Qué garantía del art. 1 se afecta?',
              ['El juez natural', 'El non bis in ídem', 'El favor rei', 'La inviolabilidad de la defensa'],
              'Un tribunal armado después del hecho y «a medida» de una causa viola el juez natural. Las otras garantías existen, pero no son las que están en juego aquí.',
            ),
            comp(
              'Completá el artículo 1.',
              'Nadie podrá ser penado sin ___ fundado en ley anterior al hecho del proceso.',
              ['juicio previo', 'acusación fiscal', 'sentencia firme', 'investigación preparatoria'],
              'Es la garantía de juicio previo: primero el juicio, después (si corresponde) la pena. La «sentencia firme» aparece en otra parte del artículo, en el estado de inocencia.',
            ),
            op(
              '¿En qué causas interviene el Tribunal de jurados (art. 22 bis CPPBA)?',
              [
                'En delitos cuya pena máxima en abstracto exceda de quince (15) años',
                'En delitos cuya pena máxima supere los ocho (8) años',
                'En todos los delitos de competencia del Tribunal en lo Criminal',
                'Sólo en homicidios dolosos consumados',
              ],
              'El art. 22 bis atribuye al jurado los delitos con pena máxima en abstracto de más de 15 años (o un concurso en que alguno lo supere). Hasta 15 años, el Tribunal en lo Criminal es unipersonal salvo excepciones (art. 22).',
            ),
            vf(
              'El imputado puede renunciar al juicio por jurados incluso después de que quedó firme la requisitoria de elevación a juicio.',
              false,
              'Falso. La renuncia debe hacerse en el plazo del art. 336 y ratificarse ante el juez; una vez firme la requisitoria «no podrá renunciarse al juicio por jurados, bajo pena de nulidad» (art. 22 bis).',
            ),
          ],
        }),
        leccion({
          id: 'u1-a1-l2',
          titulo: 'Inocencia y non bis in ídem',
          minutos: 4,
          intro: {
            titulo: 'Inocente hasta la sentencia firme',
            parrafos: [
              'Mientras no haya una sentencia firme (es decir, que ya no puede recurrirse), el imputado es inocente. Por eso estar preso durante el proceso es la excepción y nunca puede funcionar como un castigo adelantado.',
              'El non bis in ídem impide perseguir a alguien dos veces por el mismo hecho. No importa si la primera vez terminó con condena, absolución o sobreseimiento firme: el Estado tuvo su oportunidad.',
              'En el juicio por jurados la garantía se ve con claridad: la sentencia absolutoria derivada de un veredicto de no culpabilidad es irrecurrible (art. 371 quater, ap. 7).',
            ],
            enLaPractica:
              'Si un joven fue sobreseído definitivamente por un hurto y meses después otra UFI lo cita por el mismo episodio, la defensa plantea la excepción de falta de acción (art. 328 inc. 2) invocando el non bis in ídem.',
          },
          foco: 'ni considerado culpable mientras una sentencia firme no lo declare tal; ni perseguido penalmente más de una vez por el mismo hecho',
          preguntas: [
            op(
              '¿Hasta cuándo rige el estado de inocencia?',
              [
                'Hasta que una sentencia firme declare la culpabilidad',
                'Hasta el veredicto de culpabilidad del jurado o del tribunal',
                'Hasta que el Tribunal de Casación confirma la condena',
                'Hasta que se dicta la prisión preventiva',
              ],
              'La sentencia debe estar firme. Un veredicto o una condena confirmada en Casación todavía pueden recurrirse (por ejemplo, ante la SCBA o la CSJN): mientras tanto, la persona sigue siendo inocente.',
            ),
            vf(
              'El non bis in ídem sólo impide una segunda condena; un segundo juicio por el mismo hecho estaría permitido.',
              false,
              'Falso. La garantía prohíbe la doble PERSECUCIÓN: ya el riesgo de un nuevo proceso por el mismo hecho está vedado (CSJN, «Polak»).',
            ),
            op(
              'Martín fue sobreseído con resolución firme por un hurto. Otra fiscalía lo cita por el mismo hecho. ¿Qué corresponde plantear?',
              [
                'La excepción de falta de acción por cosa juzgada (non bis in ídem)',
                'La nulidad de la citación porque no se notificó al defensor',
                'La suspensión del juicio a prueba',
                'La acumulación de ambas causas por conexión',
              ],
              'El sobreseimiento firme cierra el caso. La vía es la excepción de falta de acción (art. 328 inc. 2: la acción «no pudiera ser proseguida»). Las otras opciones aceptan que la persecución siga.',
            ),
            op(
              'Un jurado declaró «no culpable» a Lucas. El Fiscal quiere recurrir para que haya un nuevo juicio. ¿Qué establece el CPPBA?',
              [
                'La sentencia absolutoria derivada del veredicto de no culpabilidad es irrecurrible',
                'Puede recurrir en casación si el veredicto se apartó de la prueba',
                'Puede recurrir si el veredicto no fue unánime',
                'Puede pedir un nuevo jurado si el particular damnificado lo solicita',
              ],
              'Art. 371 quater, ap. 7: «La sentencia absolutoria derivada del veredicto de no culpabilidad del jurado es irrecurrible». El apartamiento de la prueba (art. 448 bis, inc. d) es motivo de recurso sólo contra la condena. La SCBA lo aplicó en «Pitman» (2024).',
            ),
            comp(
              'Completá.',
              'Nadie podrá ser perseguido penalmente ___ por el mismo hecho.',
              ['más de una vez', 'sin acusación fiscal', 'sin sentencia firme', 'fuera de su departamento judicial'],
              'Es la fórmula clásica del non bis in ídem.',
            ),
          ],
        }),
        leccion({
          id: 'u1-a1-l3',
          titulo: 'Defensa inviolable y favor rei',
          minutos: 4,
          intro: {
            titulo: 'La duda siempre favorece al imputado',
            parrafos: [
              'La defensa en juicio es inviolable: el imputado tiene derecho a ser oído, a tener abogado, a conocer la acusación y a ofrecer prueba.',
              'El favor rei manda que, ante la duda, se esté a lo más favorable al imputado. En la sentencia se traduce en el in dubio pro reo: si el tribunal no tiene certeza, absuelve. Y el art. 3 completa la idea: las normas que restringen derechos se interpretan restrictivamente.',
              'Dos reglas más del art. 1: si se viola una garantía pensada para proteger al imputado, ese error no puede usarse en su contra; y para imponer una medida de seguridad a un inimputable hay que respetar las reglas del juicio.',
            ],
            enLaPractica:
              'Si el único testigo del robo duda en el juicio («creo que era él, pero estaba oscuro»), el Tribunal en lo Criminal no puede condenar: la duda razonable obliga a absolver.',
          },
          foco: 'En caso de duda deberá estarse siempre a lo que sea más favorable al imputado.',
          preguntas: [
            op(
              'Al cerrar el debate, los jueces creen probable que Ana sea la autora, pero no están seguros. ¿Qué corresponde?',
              [
                'Absolver: la duda favorece a la imputada',
                'Condenar al mínimo de la escala penal',
                'Ordenar de oficio una instrucción suplementaria',
                'Condenar si el particular damnificado mantiene la acusación',
              ],
              'La condena exige certeza: la probabilidad no alcanza. Es el in dubio pro reo, derivado del favor rei del art. 1.',
            ),
            op(
              '¿Qué significa «favor rei»?',
              [
                'Ante la duda, estar a lo más favorable al imputado',
                'Ante la duda, el juez debe producir nuevas pruebas de oficio',
                'Ante la duda sobre la ley aplicable, rige la vigente al dictar el fallo',
                'Ante la duda, se sigue el dictamen del Fiscal por su criterio objetivo',
              ],
              'Es un principio de interpretación y de valoración: la duda juega a favor del imputado.',
            ),
            op(
              'Se omitió notificar al imputado una audiencia, en violación de una regla de garantía. ¿Puede el Fiscal invocar esa omisión para perjudicarlo?',
              [
                'No: una garantía establecida en su beneficio no puede hacerse valer en su perjuicio',
                'Sí, si la defensa no planteó la nulidad a tiempo',
                'Sí, porque la omisión no es imputable al Fiscal',
                'Sólo si el acto puede renovarse sin afectar la defensa',
              ],
              'El art. 1 lo dice expresamente: «La inobservancia de una regla de garantía establecida en beneficio del imputado no se podrá hacer valer en su perjuicio».',
            ),
            vf(
              'Para imponer una medida de seguridad a una persona inimputable (art. 34 inc. 1 CP) no hace falta respetar las reglas del juicio.',
              false,
              'Falso. El último párrafo del art. 1 exige la previa observancia de las normas del juicio (Libro III) para imponer medidas de seguridad.',
            ),
            op(
              'Una norma que limita la libertad durante el proceso admite dos lecturas. ¿Cómo debe interpretarse (art. 3)?',
              ['Restrictivamente', 'Extensivamente, para proteger a la víctima', 'Por analogía con el código federal', 'Según el criterio del Fiscal'],
              'El art. 3 manda interpretar restrictivamente toda disposición que coarte la libertad, restrinja derechos o establezca sanciones procesales o exclusiones probatorias.',
            ),
          ],
        }),
      ],
    },
    {
      articuloId: 'cppba-2',
      falloClave: {
        tribunal: 'Corte Suprema de Justicia de la Nación',
        caso: '«Mattei» (1968) y «Mozzatti» (1978)',
        resumen:
          'En «Mattei» la Corte afirmó que el imputado tiene derecho a obtener un pronunciamiento que, definiendo su situación, ponga fin del modo más rápido posible a la incertidumbre que implica el proceso. En «Mozzatti», frente a un proceso que llevaba alrededor de 25 años, declaró extinguida la acción porque la duración había desnaturalizado la garantía de defensa.',
        regla:
          'La duración irrazonable del proceso viola la defensa en juicio y puede llevar a ponerle fin. Se evalúa la complejidad del caso, la conducta del imputado y la de las autoridades.',
        nota: 'Síntesis didáctica (Fallos 272:188 y 300:1102).',
        enlaces: [ENLACES.mattei, ENLACES.mozzatti],
        ambito: 'nacional',
      },
      lecciones: [
        leccion({
          id: 'u1-a2-l1',
          titulo: 'Plazo razonable',
          minutos: 4,
          intro: {
            titulo: 'Un proceso no puede durar para siempre',
            parrafos: [
              'Estar imputado genera angustia, gastos y estigma. Por eso el art. 2 reconoce el derecho a ser juzgado en un tiempo razonable y sin dilaciones indebidas.',
              'Para el código, el retardo en dictar sentencia y las dilaciones indebidas, cuando son reiteradas, no son un detalle: constituyen falta grave.',
              '¿Qué es «razonable»? No hay un número mágico: se mira la complejidad del caso, lo que hizo el imputado y lo que hicieron (o no) los fiscales y jueces. Ojo: el tope de 2 años del art. 141 es otra cosa y rige sólo con imputado detenido.',
            ],
            enLaPractica:
              'En una causa simple por lesiones leves que quedó paralizada años en un despacho sin que nadie la impulsara, la defensa puede invocar la violación del plazo razonable.',
          },
          foco: 'Toda persona sometida a proceso tendrá derecho a ser juzgada en un tiempo razonable y sin dilaciones indebidas.',
          preguntas: [
            op(
              '¿Qué derecho reconoce el art. 2 del CPPBA?',
              [
                'A ser juzgado en un tiempo razonable y sin dilaciones indebidas',
                'A ser juzgado dentro de los dos años, aunque esté en libertad',
                'A que la IPP no supere los cuatro meses en ningún caso',
                'A que el juicio se fije dentro de los treinta días de la elevación',
              ],
              'El art. 2 consagra el plazo razonable (art. 8.1 CADH), un estándar flexible. Los 2 años son el tope del art. 141 con detenido, y los 4 meses, el plazo prorrogable de la IPP (art. 282).',
            ),
            vf(
              'El retardo en dictar sentencia y las dilaciones indebidas, cuando son reiteradas, constituyen falta grave.',
              true,
              'Verdadero: el art. 2 las califica expresamente como falta grave.',
            ),
            op(
              '¿Qué pautas se usan para medir si un plazo es razonable?',
              [
                'Complejidad del caso, actividad del imputado y conducta de las autoridades',
                'Gravedad del delito, pena en expectativa y alarma social',
                'Cantidad de imputados, de testigos y de fojas',
                'Sólo el tiempo transcurrido desde el hecho',
              ],
              'Son los criterios de la Corte Interamericana y de la CSJN. La gravedad del delito no justifica por sí sola un proceso eterno.',
            ),
            op(
              'Una causa por lesiones leves, con el imputado en libertad, lleva siete años sin actividad del Fiscal ni del juzgado. ¿Qué planteo es más sólido?',
              [
                'La violación del plazo razonable (art. 2 CPPBA y 8.1 CADH)',
                'El vencimiento del plazo fatal de dos años del art. 141',
                'La nulidad de la IPP por exceder los cuatro meses del art. 282',
                'La caducidad de la instancia por inactividad de la víctima',
              ],
              'El art. 141 exige que el imputado esté privado de libertad, y el plazo del art. 282 no genera nulidad automática. Lo que corresponde es invocar el plazo razonable («Mattei», «Mozzatti»).',
            ),
          ],
        }),
      ],
    },
    {
      articuloId: 'cppba-141',
      relacionados: ['cppba-2', 'cppba-282'],
      lecciones: [
        leccion({
          id: 'u1-a2-l2',
          titulo: 'Plazos fatales con detenido (art. 141)',
          minutos: 4,
          intro: {
            titulo: 'Cuando hay alguien preso, el reloj corre más fuerte',
            parrafos: [
              'Si el imputado está privado de su libertad, el código endurece los tiempos: los términos para completar la IPP y la duración total del proceso pasan a ser plazos fatales.',
              'Según el art. 141, en ese caso el proceso no puede durar más de dos años. En un caso de suma complejidad se está al plazo razonable del art. 2, sujeto a la apreciación judicial.',
              'Dos detalles prácticos: si se acumulan causas por conexión, los términos corren por separado desde la acumulación; y no se computa el tiempo de prueba fuera de la circunscripción, de los incidentes ni de los recursos.',
            ],
            enLaPractica:
              'Ante una prisión preventiva que se estira sin juicio a la vista, la defensa controla los plazos del art. 141 y del art. 282 (duración de la IPP) para pedir el cese de la detención.',
          },
          foco: 'el cual no podrá durar más de dos (2) años',
          preguntas: [
            op(
              'Según el art. 141, ¿cuándo se vuelven fatales los plazos de la IPP y del proceso?',
              [
                'Cuando el imputado está privado de su libertad',
                'Cuando el delito tiene una pena máxima superior a ocho años',
                'Cuando el Fiscal declara la causa compleja',
                'En toda causa, esté o no detenido el imputado',
              ],
              'La fatalidad de los plazos se vincula con la detención: la libertad no puede quedar restringida indefinidamente.',
            ),
            comp(
              'Completá la regla general del art. 141.',
              'Con imputado privado de libertad, el proceso no podrá durar más de ___.',
              ['dos (2) años', 'cuatro (4) meses', 'seis (6) meses', 'ocho (8) meses'],
              'Dos años es el tope general. Cuatro meses es el plazo de la IPP (art. 282), prorrogable hasta seis en casos excepcionales; ocho meses es el plazo para pedir una nueva audiencia del art. 168 bis.',
            ),
            vf(
              'En un caso de suma complejidad puede aplicarse, en lugar del tope fijo, el plazo razonable del art. 2.',
              true,
              'Verdadero: «En un caso de suma complejidad, deberá estarse al plazo razonable del artículo 2º», sujeto a la apreciación judicial.',
            ),
            op(
              '¿Qué tiempo NO se computa para los términos fatales?',
              ['El de los recursos', 'El de la investigación penal preparatoria', 'El de la prisión preventiva', 'El del juicio oral'],
              'El art. 141 excluye el tiempo de diligenciamiento de pruebas fuera de la circunscripción judicial, el de los incidentes y el de los recursos.',
            ),
            op(
              'Se acumulan dos causas por conexión. ¿Cómo corren los términos fatales?',
              [
                'Separadamente para cada causa, desde la acumulación',
                'Desde la primera detención, sumando ambas causas',
                'Se reinician desde cero para las dos causas',
                'Quedan suspendidos hasta que se unifique la pena',
              ],
              'Art. 141: «los términos fatales previstos correrán separadamente para cada causa a partir de la respectiva acumulación».',
            ),
          ],
        }),
      ],
    },
    {
      articuloId: 'cp-2',
      relacionados: ['cp-3'],
      lecciones: [
        leccion({
          id: 'u1-cp2-l1',
          titulo: 'Ley penal más benigna (CP)',
          minutos: 4,
          intro: {
            titulo: 'Si la ley cambia, se aplica la más favorable',
            parrafos: [
              'El Código Penal se conecta con las garantías procesales a través del art. 2: si entre el hecho y la sentencia (o durante la condena) cambia la ley, se aplica siempre la más benigna.',
              'La nueva ley más favorable opera «de pleno derecho»: no hace falta que el condenado lo pida para que rija, aunque en la práctica la defensa lo plantea.',
              'Y el art. 3 CP agrega que para computar la prisión preventiva se aplica, por separado, la ley más favorable al procesado.',
            ],
            enLaPractica:
              'Si una reforma reduce la pena de un delito mientras el juicio está en trámite en un Tribunal en lo Criminal bonaerense, el tribunal debe aplicar la escala nueva, más favorable.',
          },
          foco: 'se aplicará siempre la más benigna',
          preguntas: [
            op(
              'El hecho se cometió con una ley; al momento del fallo rige otra más benigna. ¿Cuál se aplica?',
              [
                'La más benigna',
                'La vigente al momento del hecho',
                'La vigente al momento del fallo, aunque fuera más gravosa',
                'La que resulte de promediar ambas escalas',
              ],
              'El art. 2 CP manda aplicar siempre la más benigna, sea la del hecho, la intermedia o la del fallo. No existe el «promedio» de escalas.',
            ),
            vf(
              'Si la ley más benigna se dicta durante el cumplimiento de la condena, ya no se puede aplicar.',
              false,
              'Falso. El segundo párrafo del art. 2 CP dispone que la pena se limita a la establecida por la nueva ley.',
            ),
            comp(
              'Completá el art. 2 CP.',
              'En todos los casos del presente artículo, los efectos de la nueva ley se operarán ___.',
              ['de pleno derecho', 'a pedido de parte', 'por resolución de la Cámara', 'desde que la sentencia quede firme'],
              '«De pleno derecho»: la ley más benigna rige automáticamente.',
            ),
            op(
              '¿Qué regla trae el art. 3 CP para la prisión preventiva?',
              [
                'Para su cómputo se aplica separadamente la ley más favorable al procesado',
                'Se computa según la ley vigente al momento del hecho',
                'Se computa según la ley vigente al dictarse la sentencia',
                'Se computa según la ley vigente al momento de la detención',
              ],
              'El art. 3 CP aplica el principio de benignidad también al cómputo de la preventiva, en forma separada.',
            ),
          ],
        }),
      ],
    },
  ],
  caso: {
    id: 'caso-u1',
    titulo: 'El hurto que volvió',
    rol: 'Defensa oficial',
    sede: 'Juzgado de Garantías · Departamento Judicial La Matanza (caso ficticio)',
    hechos: [
      'Martín (22) fue sobreseído en 2024, con resolución firme, en una causa por el hurto de una bicicleta (art. 162 CP): se probó que la bicicleta era suya.',
      'Un año después, el denunciante insiste ante otra UFI con una nueva denuncia por el mismo episodio. La fiscalía cita a Martín a declarar.',
      'Te toca asumir su defensa.',
    ],
    etapas: [
      {
        id: 'e1',
        momento: 'Primera entrevista con Martín',
        situacion: 'Martín te muestra la resolución de sobreseimiento firme y la nueva citación. El hecho, la fecha y la bicicleta son los mismos.',
        pregunta: '¿Qué estrategia elegís?',
        opciones: [
          {
            texto: 'Oponer la excepción de falta de acción invocando la cosa juzgada y el non bis in ídem (arts. 1 y 328 inc. 2 CPPBA).',
            puntaje: 2,
            devolucion:
              '¡Exacto! Hay identidad de persona, de hecho y de causa de persecución. El sobreseimiento firme impide un nuevo proceso: la garantía protege contra el riesgo mismo de volver a ser juzgado.',
          },
          {
            texto: 'Que declare y vuelva a explicar que la bicicleta es suya.',
            puntaje: 0,
            devolucion:
              'Declarar no es necesario y además legitima una persecución prohibida. El Estado ya agotó su oportunidad con el sobreseimiento firme.',
          },
          {
            texto: 'Esperar al juicio y plantear el non bis in ídem en el alegato final.',
            puntaje: 1,
            devolucion:
              'Llegarías tarde: el non bis in ídem prohíbe la doble persecución, no sólo la doble condena. Hay que plantearlo de inmediato para cortar el nuevo proceso.',
          },
        ],
        normas: ['Art. 1 CPPBA', 'Arts. 328 y 329 CPPBA (excepciones)'],
      },
      {
        id: 'e2',
        momento: 'Otra causa de Martín',
        situacion:
          'Martín tiene además un proceso en trámite por un delito cuya escala penal fue reducida por una ley sancionada después del hecho, antes de la sentencia.',
        pregunta: '¿Qué ley debe aplicar el tribunal?',
        opciones: [
          {
            texto: 'La ley nueva, por ser más benigna (art. 2 CP).',
            puntaje: 2,
            devolucion: 'Correcto. Se aplica siempre la más benigna, y sus efectos operan de pleno derecho.',
          },
          {
            texto: 'La vigente al momento del hecho, porque «la ley no es retroactiva».',
            puntaje: 0,
            devolucion:
              'La irretroactividad protege contra leyes más gravosas. La ley penal más benigna sí es retroactiva.',
          },
          {
            texto: 'La que resulte de promediar ambas escalas.',
            puntaje: 0,
            devolucion: 'No existe ese promedio: se aplica íntegramente la ley más benigna.',
          },
        ],
        normas: ['Art. 2 CP', 'Art. 9 CADH'],
      },
      {
        id: 'e3',
        momento: 'Juicio por la segunda causa',
        situacion:
          'En el debate, la única testigo dice: «Me parece que era él, pero estaba oscuro y lo vi de espaldas». No hay otra prueba de autoría.',
        pregunta: '¿Qué pedís en tu alegato?',
        opciones: [
          {
            texto: 'La absolución por aplicación del in dubio pro reo (favor rei, art. 1 CPPBA).',
            puntaje: 2,
            devolucion: 'Muy bien. Sin certeza sobre la autoría, la duda debe resolverse a favor del imputado.',
          },
          {
            texto: 'Una pena mínima, porque la testigo «algo» lo reconoció.',
            puntaje: 0,
            devolucion:
              'Pedir una pena mínima es conceder la autoría. La condena exige certeza; una identificación dubitativa no alcanza.',
          },
          {
            texto: 'Que se suspenda el juicio hasta que aparezca más prueba.',
            puntaje: 1,
            devolucion:
              'El proceso no puede quedar abierto indefinidamente a la espera de prueba de cargo (plazo razonable). La respuesta correcta es la absolución.',
          },
        ],
        normas: ['Art. 1 CPPBA', 'Art. 2 CPPBA'],
      },
    ],
    cierre: {
      titulo: 'Garantías en acción',
      texto:
        'Usaste tres herramientas del art. 1 CPPBA y del art. 2 CP: el non bis in ídem para frenar una persecución repetida, la ley penal más benigna y el in dubio pro reo. Son argumentos que aparecen todas las semanas en los juzgados bonaerenses.',
    },
  },
};
