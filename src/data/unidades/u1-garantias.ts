import { comp, leccion, op, ord, vf } from '../helpers';
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
      relacionados: ['cppba-3'],
      falloClave: {
        tribunal: 'Corte Suprema de Justicia de la Nación',
        caso: '«Polak, Federico Gabriel»',
        anio: '1998',
        resumen:
          'Un imputado había sido juzgado válidamente y, por un error que no le era atribuible, se anuló el juicio para hacerlo de nuevo. La Corte entendió que retrotraer el proceso a etapas ya cumplidas, cuando el imputado no causó el vicio, lo expone otra vez al riesgo de condena.',
        regla:
          'El non bis in ídem prohíbe no sólo una segunda pena, sino también un nuevo juicio y la renovación del riesgo de condena por el mismo hecho.',
        nota: 'Síntesis didáctica. Antes de citarlo en un escrito, consultá el fallo completo (Fallos 321:2826).',
      },
      lecciones: [
        leccion({
          id: 'u1-a1-l1',
          titulo: 'Juez natural y juicio previo',
          minutos: 3,
          intro: {
            titulo: '¿Quién puede juzgarte?',
            parrafos: [
              'El artículo 1 del CPPBA es la puerta de entrada al código: reúne las garantías que la Constitución reconoce a cualquier persona acusada de un delito.',
              'La primera es el juez natural: sólo pueden juzgarte los jueces designados de acuerdo con la Constitución de la Provincia y competentes según sus leyes. El art. 18 de la Constitución Nacional agrega que deben estar designados por ley ANTES del hecho: nadie puede armar un tribunal especial para un caso.',
              'La segunda es el juicio previo: para que haya pena tiene que haber antes un juicio con acusación, defensa, prueba y sentencia, fundado en una ley anterior al hecho y tramitado conforme al código.',
            ],
            enLaPractica:
              'Si una causa de Lomas de Zamora se asignara a un juzgado creado especialmente después del hecho para «ese» imputado, la defensa podría objetarlo por violar el juez natural.',
          },
          foco: 'Nadie podrá ser juzgado por otros jueces que los designados de acuerdo con la Constitución de la Provincia y competentes según sus leyes reglamentarias',
          preguntas: [
            op(
              '¿Qué exige la garantía del juez natural?',
              [
                'Que el juez haya sido designado conforme a la Constitución y sea competente según la ley',
                'Que el juez viva en el mismo barrio que el imputado',
                'Que el imputado elija a su juez',
                'Que el juez sea elegido por la víctima',
              ],
              'El art. 1 CPPBA exige jueces designados de acuerdo con la Constitución de la Provincia y competentes según sus leyes; el art. 18 CN agrega que deben estar designados por ley antes del hecho de la causa. Lo que se prohíbe son los tribunales «a medida».',
            ),
            vf(
              'Se puede aplicar una pena sin juicio si el imputado confiesa en la comisaría.',
              false,
              'Falso. Sin juicio previo no hay pena. Además, una «confesión» policial no reemplaza al proceso ni a la declaración ante el Fiscal con defensor.',
            ),
            comp(
              'Completá el artículo 1.',
              'Nadie podrá ser penado sin ___ fundado en ley anterior al hecho del proceso.',
              ['juicio previo', 'denuncia policial', 'pericia médica', 'orden de captura'],
              'Es la garantía de juicio previo: primero el juicio, después (si corresponde) la pena.',
            ),
            op(
              'Según el art. 1 CPPBA, ¿qué tiene que ser ANTERIOR al hecho del proceso?',
              ['La ley en que se funda el juicio', 'La denuncia', 'La sentencia', 'La detención'],
              'El art. 1 exige un juicio previo «fundado en ley anterior al hecho del proceso». Que también el juez exista antes del hecho surge del art. 18 de la Constitución Nacional.',
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
            ],
            enLaPractica:
              'Si un joven fue sobreseído definitivamente por un hurto y meses después otra UFI lo cita por el mismo episodio, la defensa plantea la excepción por falta de acción invocando el non bis in ídem.',
          },
          foco: 'ni considerado culpable mientras una sentencia firme no lo declare tal; ni perseguido penalmente más de una vez por el mismo hecho',
          preguntas: [
            op(
              '¿Hasta cuándo se presume la inocencia del imputado?',
              [
                'Hasta que una sentencia firme lo declare culpable',
                'Hasta que el Fiscal lo acusa',
                'Hasta que es detenido',
                'Hasta el veredicto del primer juicio, aunque se recurra',
              ],
              'La sentencia debe estar firme: mientras se pueda recurrir, sigue siendo inocente.',
            ),
            vf(
              'El non bis in ídem sólo impide una segunda condena; un segundo juicio por el mismo hecho estaría permitido.',
              false,
              'Falso. La garantía prohíbe la doble PERSECUCIÓN: ya el riesgo de un nuevo proceso por el mismo hecho está vedado.',
            ),
            op(
              'Martín fue sobreseído con resolución firme por un hurto. Otra fiscalía lo cita por el mismo hecho. ¿Qué corresponde?',
              [
                'Plantear que la acción no puede ejercerse otra vez (non bis in ídem)',
                'Que declare y explique lo mismo de nuevo',
                'Esperar al juicio para ver si lo condenan',
                'Pedir que se acumulen ambas causas',
              ],
              'El sobreseimiento firme cierra el caso con efecto de cosa juzgada. Volver a perseguirlo por el mismo hecho viola el art. 1.',
            ),
            comp(
              'Completá.',
              'Nadie podrá ser perseguido penalmente ___ por el mismo hecho.',
              ['más de una vez', 'sin abogado', 'de noche', 'sin denuncia'],
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
              'El favor rei manda que, ante la duda, se esté a lo más favorable al imputado. En la sentencia se traduce en el in dubio pro reo: si el tribunal no tiene certeza, absuelve.',
              'Y una regla muy práctica: si se viola una garantía pensada para proteger al imputado, ese error no puede usarse en su contra.',
            ],
            enLaPractica:
              'Si el único testigo del robo duda en el juicio («creo que era él, pero estaba oscuro»), el Tribunal en lo Criminal no puede condenar: la duda razonable obliga a absolver.',
          },
          foco: 'En caso de duda deberá estarse siempre a lo que sea más favorable al imputado.',
          preguntas: [
            vf(
              'Si al terminar el juicio los jueces dudan razonablemente sobre la autoría, deben absolver.',
              true,
              'Verdadero. Es el in dubio pro reo, derivado del favor rei del art. 1 CPPBA: la condena exige certeza.',
            ),
            op(
              '¿Qué significa «favor rei»?',
              [
                'Ante la duda, estar a lo más favorable al imputado',
                'Favorecer siempre a la víctima',
                'Que el rey decide en última instancia',
                'Que el fiscal tiene la última palabra',
              ],
              'Es un principio de interpretación y de valoración: la duda juega a favor del imputado.',
            ),
            op(
              'Se omitió notificar al imputado una audiencia, en violación de una garantía. ¿Puede el Fiscal invocar ese error para perjudicarlo?',
              [
                'No: la inobservancia de una garantía no puede hacerse valer en perjuicio del imputado',
                'Sí, si el error lo cometió el juez',
                'Sí, siempre que lo pida la víctima',
                'Depende de la gravedad del delito',
              ],
              'El último párrafo del art. 1 lo dice expresamente: las reglas de garantía protegen al imputado y no pueden volverse en su contra.',
            ),
            ord(
              'Ordená de la más general a la más específica estas manifestaciones del art. 1:',
              [
                'Defensa inviolable en todo el procedimiento',
                'Favor rei: ante la duda, lo más favorable al imputado',
                'In dubio pro reo: la duda sobre los hechos obliga a absolver',
              ],
              'La defensa inviolable es el marco general; el favor rei es una regla de interpretación; el in dubio pro reo es su aplicación concreta al momento de sentenciar.',
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
        nota: 'Síntesis didáctica (Fallos 272:188 y 300:1102). Verificá el texto completo antes de citarlo.',
      },
      lecciones: [
        leccion({
          id: 'u1-a2-l1',
          titulo: 'Plazo razonable',
          minutos: 3,
          intro: {
            titulo: 'Un proceso no puede durar para siempre',
            parrafos: [
              'Estar imputado genera angustia, gastos y estigma. Por eso el art. 2 reconoce el derecho a ser juzgado en un tiempo razonable y sin dilaciones indebidas.',
              'Para el código, el retardo en dictar sentencia y las dilaciones indebidas, cuando son reiteradas, no son un detalle: constituyen falta grave.',
              '¿Qué es «razonable»? No hay un número mágico: se mira la complejidad del caso, lo que hizo el imputado y lo que hicieron (o no) los fiscales y jueces.',
            ],
            enLaPractica:
              'En una causa simple por lesiones leves que quedó paralizada años en un despacho sin que nadie la impulsara, la defensa puede invocar la violación del plazo razonable.',
          },
          preguntas: [
            op(
              '¿Qué derecho reconoce el art. 2 del CPPBA?',
              [
                'A ser juzgado en un tiempo razonable y sin dilaciones indebidas',
                'A elegir la fecha del juicio',
                'A que el juicio dure exactamente un año',
                'A suspender el proceso cuando lo desee',
              ],
              'El art. 2 consagra el derecho a ser juzgado en un tiempo razonable (el «plazo razonable» del art. 8.1 de la Convención Americana).',
            ),
            vf(
              'El retardo en dictar sentencia y las dilaciones indebidas, cuando son reiteradas, constituyen falta grave.',
              true,
              'Verdadero: el art. 2 las califica expresamente como falta grave.',
            ),
            op(
              '¿Qué pautas se usan para medir si un plazo es razonable?',
              [
                'Complejidad del caso, conducta del imputado y conducta de las autoridades',
                'Sólo la cantidad de fojas del expediente',
                'La opinión de la víctima',
                'El horario del juzgado',
              ],
              'Son los criterios que emplean la Corte Interamericana y la CSJN para evaluar la duración del proceso.',
            ),
            comp(
              'Completá el art. 2.',
              'Toda persona sometida a proceso tendrá derecho a ser juzgada en un ___ y sin dilaciones indebidas.',
              ['tiempo razonable', 'plazo de diez días', 'tribunal federal', 'horario nocturno'],
              'El art. 2 habla de «tiempo razonable»: un estándar flexible que se analiza caso por caso.',
            ),
          ],
        }),
      ],
    },
    {
      articuloId: 'cppba-141',
      relacionados: ['cppba-2'],
      lecciones: [
        leccion({
          id: 'u1-a2-l2',
          titulo: 'Plazos fatales con detenido (art. 141)',
          minutos: 4,
          intro: {
            titulo: 'Cuando hay alguien preso, el reloj corre más fuerte',
            parrafos: [
              'Si el imputado está privado de su libertad, el código endurece los tiempos: los términos de la IPP y la duración total del proceso pasan a ser plazos fatales.',
              'Según el art. 141, en ese caso el proceso no puede durar más de 2 años, salvo casos de suma complejidad (muchos imputados, hechos muy complejos), donde se está al plazo razonable del art. 2, sujeto a la apreciación judicial.',
              'La idea central —más urgencia cuando hay una persona presa— es la que tenés que dominar.',
            ],
            enLaPractica:
              'Ante una prisión preventiva que se estira sin juicio a la vista, la defensa controla los plazos del art. 141 y del art. 282 (duración de la IPP) para pedir el cese de la detención.',
          },
          foco: 'el cual no podrá durar más de 2 años',
          preguntas: [
            op(
              'Según el art. 141, ¿cuándo se vuelven fatales los plazos de la IPP y del proceso?',
              [
                'Cuando el imputado está privado de su libertad',
                'Cuando la víctima lo solicita',
                'Cuando el delito es de acción privada',
                'Siempre, sin excepción',
              ],
              'La fatalidad de los plazos se vincula con la detención: la libertad no puede quedar restringida indefinidamente.',
            ),
            comp(
              'Completá la regla general del art. 141.',
              'Con imputado privado de libertad, el proceso no podrá durar más de ___.',
              ['dos (2) años', 'seis (6) meses', 'diez (10) años', 'cuatro (4) meses'],
              'Dos años es el tope general; la excepción son los casos de extrema complejidad.',
            ),
            vf(
              'En un caso de suma complejidad con muchos imputados puede aplicarse, en lugar del tope fijo, el plazo razonable del art. 2.',
              true,
              'Verdadero: la suma complejidad (pluralidad de imputados, naturaleza o circunstancias de los hechos) habilita a estar al plazo razonable, sujeto a la apreciación judicial.',
            ),
            op(
              '¿Qué es un plazo fatal?',
              [
                'Un plazo que vence sin prórroga y produce consecuencias automáticas',
                'Un plazo que sólo rige para delitos con muerte',
                'Un plazo que el juez puede ignorar',
                'Un plazo fijado por la víctima',
              ],
              'Fatal = improrrogable y con efecto automático al vencer.',
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
              ['La más benigna', 'La vigente al momento del hecho', 'La más severa', 'La que elija la víctima'],
              'El art. 2 CP manda aplicar siempre la más benigna, sea la del hecho, la intermedia o la del fallo.',
            ),
            vf(
              'Si la ley más benigna se dicta durante el cumplimiento de la condena, ya no se puede aplicar.',
              false,
              'Falso. El segundo párrafo del art. 2 CP dispone que la pena se limita a la establecida por la nueva ley.',
            ),
            comp(
              'Completá el art. 2 CP.',
              'En todos los casos del presente artículo, los efectos de la nueva ley se operarán ___.',
              ['de pleno derecho', 'a pedido de la víctima', 'sólo en casación', 'a los diez años'],
              '«De pleno derecho»: la ley más benigna rige automáticamente.',
            ),
            op(
              '¿Qué regla trae el art. 3 CP para la prisión preventiva?',
              [
                'Para su cómputo se aplica separadamente la ley más favorable al procesado',
                'No se computa nunca en la pena',
                'Se computa doble siempre',
                'Sólo se computa si hubo condena condicional',
              ],
              'El art. 3 CP aplica el principio de benignidad también al cómputo de la preventiva.',
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
            texto: 'Plantear la excepción por falta de acción invocando la cosa juzgada y el non bis in ídem (art. 1 CPPBA).',
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
        normas: ['Art. 1 CPPBA', 'Arts. 328 y ss. CPPBA (excepciones)'],
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
