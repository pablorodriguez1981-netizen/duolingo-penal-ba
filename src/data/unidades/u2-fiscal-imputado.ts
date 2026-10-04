import { comp, leccion, op, ord, vf } from '../helpers';
import type { Unidad } from '../tipos';

export const U2: Unidad = {
  id: 'u2',
  numero: 2,
  titulo: 'Fiscal, imputado y declaración',
  subtitulo: 'Quién acusa, quién se defiende y cómo se declara',
  etapa: 'Sujetos del proceso',
  color: 'naranja',
  icono: '⚖️',
  temas: [
    {
      articuloId: 'cppba-56',
      relacionados: ['cp-71', 'cp-72'],
      lecciones: [
        leccion({
          id: 'u2-a56-l1',
          titulo: 'El Fiscal: acusa e investiga',
          minutos: 3,
          intro: {
            titulo: 'El motor de la acción penal',
            parrafos: [
              'En la Provincia de Buenos Aires rige un sistema acusatorio: quien investiga y acusa (el Ministerio Público Fiscal) no es quien decide (el juez).',
              'El art. 56 le asigna al Fiscal tres funciones: promover y ejercer la acción penal pública, dirigir a la Policía en función judicial y practicar la Investigación Penal Preparatoria (IPP).',
              'Los fiscales trabajan en Unidades Funcionales de Instrucción (UFI) de cada departamento judicial.',
            ],
            enLaPractica:
              'Cuando la policía de una comisaría de Quilmes detiene a alguien, inmediatamente da aviso a la UFI de turno: desde ese momento el Fiscal dirige la investigación.',
          },
          foco: 'promoverá y ejercerá la acción penal',
          preguntas: [
            op(
              '¿Quién practica la Investigación Penal Preparatoria en el CPPBA?',
              ['El Ministerio Público Fiscal', 'El Juez de Garantías', 'El Tribunal en lo Criminal', 'La víctima'],
              'El Fiscal investiga; el Juez de Garantías controla. Es la base del modelo acusatorio bonaerense.',
            ),
            ord(
              'Ordená las funciones del Fiscal según aparecen en el art. 56:',
              [
                'Promover y ejercer la acción penal pública',
                'Dirigir a la Policía en función judicial',
                'Practicar la Investigación Penal Preparatoria',
              ],
              'Ese es el orden del primer párrafo del art. 56.',
            ),
            vf(
              'En el CPPBA el mismo juez que investiga es el que después dicta la sentencia.',
              false,
              'Falso. Separar investigación y juzgamiento protege la imparcialidad: investiga el Fiscal, controla el Juez de Garantías y juzga otro tribunal.',
            ),
            op(
              '¿Qué dirige el Fiscal además de la IPP?',
              ['A la Policía en función judicial', 'Al Servicio Penitenciario', 'A la Defensoría oficial', 'A la Suprema Corte'],
              'La Policía, cuando actúa en una investigación penal, lo hace bajo la dirección del Fiscal.',
            ),
          ],
        }),
        leccion({
          id: 'u2-a56-l2',
          titulo: 'Objetividad del Fiscal',
          minutos: 3,
          intro: {
            titulo: 'Acusar no es perseguir a cualquier costo',
            parrafos: [
              'El Fiscal debe actuar con criterio objetivo: buscar la verdad, también lo que favorece al imputado.',
              'Por eso el art. 56 le exige formular sus requerimientos conforme a ese criterio «aún a favor del imputado» (por ejemplo, pidiendo el sobreseimiento o la absolución), y fundarlos de manera que se basten a sí mismos.',
              'Reformas posteriores a tu documento agregaron además criterios de oportunidad para archivar ciertos casos (art. 56 bis).',
            ],
            enLaPractica:
              'Si en el debate la prueba demuestra que el imputado actuó en legítima defensa, el Fiscal objetivo debe pedir la absolución aunque él mismo haya acusado.',
          },
          foco: 'adecuará sus actos a un criterio objetivo',
          preguntas: [
            vf(
              'El Fiscal debe pedir la absolución si la prueba favorece al imputado.',
              true,
              'Verdadero. El art. 56 le exige formular sus requerimientos conforme al criterio objetivo, «aún a favor del imputado».',
            ),
            comp(
              'Completá el art. 56.',
              'Adecuará sus actos a un criterio ___.',
              ['objetivo', 'punitivo', 'político', 'reservado'],
              'Objetividad: el Fiscal representa el interés de la sociedad en que se aplique correctamente la ley, no en condenar.',
            ),
            op(
              '¿Cómo deben ser los requerimientos del Fiscal?',
              ['Motivados, de manera que se basten a sí mismos', 'Verbales e informales', 'Secretos para la defensa', 'Idénticos en todas las causas'],
              'El art. 56 le exige formular motivadamente sus requerimientos y conclusiones, «de manera que se basten a sí mismos»: así la defensa puede contradecirlos y el juez controlarlos.',
            ),
          ],
        }),
      ],
    },
    {
      articuloId: 'cp-71',
      relacionados: ['cp-72'],
      lecciones: [
        leccion({
          id: 'u2-cp71-l1',
          titulo: 'Acciones públicas, de instancia y privadas',
          minutos: 4,
          intro: {
            titulo: '¿Quién puede poner en marcha el proceso?',
            parrafos: [
              'El Código Penal (arts. 71 a 73) clasifica las acciones. La regla es la acción pública: el Fiscal actúa de oficio.',
              'Algunas son dependientes de instancia privada (art. 72): hace falta la denuncia de la víctima para empezar, pero luego sigue de oficio. Ejemplo: lesiones leves.',
              'Otras son privadas: sólo la víctima las impulsa por querella (por ejemplo, calumnias e injurias).',
            ],
            enLaPractica:
              'En una pelea con lesiones leves (art. 89 CP), la UFI no puede avanzar si la víctima no insta la acción, salvo razones de seguridad o interés público.',
          },
          preguntas: [
            op(
              'Según el art. 71 CP, ¿cuál es la regla?',
              [
                'Las acciones penales se inician de oficio',
                'Todas las acciones requieren denuncia de la víctima',
                'Sólo se persiguen delitos con querella',
                'La policía decide qué delitos se persiguen',
              ],
              'La regla es la acción de oficio; las excepciones son las de instancia privada y las privadas.',
            ),
            op(
              '¿Qué tipo de acción nace de unas lesiones leves dolosas?',
              ['Dependiente de instancia privada', 'Privada', 'Pública de oficio sin excepción', 'Civil'],
              'El art. 72 inc. 2 CP incluye las lesiones leves, dolosas o culposas.',
            ),
            vf(
              'En los delitos dependientes de instancia privada se puede proceder de oficio cuando median razones de seguridad o interés público en las lesiones leves.',
              true,
              'Verdadero: el propio art. 72 CP prevé esa excepción para el inciso de lesiones leves.',
            ),
            comp(
              'Completá.',
              'En los delitos de acción privada, el proceso se impulsa mediante ___.',
              ['querella', 'requisitoria fiscal', 'denuncia anónima', 'orden policial'],
              'Las acciones privadas se ejercen por querella del agraviado (art. 8 y arts. 381 y ss. CPPBA).',
            ),
          ],
        }),
      ],
    },
    {
      articuloId: 'cppba-60',
      falloClave: {
        tribunal: 'Corte Interamericana de Derechos Humanos',
        caso: '«Bulacio vs. Argentina»',
        anio: '2003',
        resumen:
          'Walter Bulacio, de 17 años, murió tras ser detenido en una razzia policial en 1991 sin que se avisara al juez ni a su familia. La Corte IDH condenó a la Argentina y remarcó los deberes del Estado frente a toda persona detenida.',
        regla:
          'Toda persona detenida tiene derecho a ser informada de las razones de su detención, a que se notifique sin demora a un juez y a sus familiares, y a contar con asistencia letrada desde el primer momento.',
        nota: 'Síntesis didáctica. Consultá la sentencia completa en el sitio de la Corte IDH.',
      },
      lecciones: [
        leccion({
          id: 'u2-a60-l1',
          titulo: '¿Quién es imputado?',
          minutos: 3,
          intro: {
            titulo: 'Los derechos llegan antes que la indagatoria',
            parrafos: [
              'Para el CPPBA es imputado toda persona a la que, en cualquier acto o procedimiento, se la indique o detenga como autora o partícipe de un delito.',
              'La clave: los derechos se pueden ejercer desde el primer momento de la persecución, aunque todavía nadie le haya tomado declaración ni haya una resolución formal.',
            ],
            enLaPractica:
              'Un patrullero demora a un joven señalado por un vecino como el autor de un robo: ya es imputado, y ya puede exigir saber de qué se lo acusa y llamar a un abogado.',
          },
          foco: 'desde el primer momento de la persecución penal dirigida en su contra',
          preguntas: [
            vf(
              'Una persona recién adquiere la calidad de imputado cuando el juez lo declara formalmente.',
              false,
              'Falso. Basta con que se lo indique o detenga como autor o partícipe en cualquier acto o procedimiento.',
            ),
            op(
              '¿Desde cuándo puede el imputado ejercer sus derechos?',
              [
                'Desde el primer momento de la persecución penal en su contra',
                'Desde la elevación a juicio',
                'Desde que se dicta la prisión preventiva',
                'Desde la sentencia',
              ],
              'Es una regla amplia de protección: la defensa no espera a los actos formales.',
            ),
            comp(
              'Completá.',
              'Se considerará imputado a toda persona que en cualquier acto o procedimiento se lo indique o ___ como autor o partícipe de la comisión de un delito.',
              ['detenga', 'absuelva', 'indemnice', 'cite como testigo'],
              'Indicado o detenido: cualquiera de las dos situaciones activa sus derechos.',
            ),
          ],
        }),
        leccion({
          id: 'u2-a60-l2',
          titulo: 'Garantías mínimas del imputado',
          minutos: 4,
          intro: {
            titulo: 'El kit básico de derechos',
            parrafos: [
              'Desde la detención (o desde la primera diligencia, si el delito no admite detención), la autoridad debe informarle sus garantías mínimas: 1) saber sin demora, en un idioma que comprenda y en detalle, de qué se lo acusa; 2) comunicarse libremente con un abogado de su elección o con el Defensor Oficial; 3) que no está obligado a declarar contra sí mismo ni a confesarse culpable; 4) sus derechos frente al responsable civil y la aseguradora, si los hubiera.',
              'Si está detenido, puede presentar sus pedidos ante quien lo custodia, que debe comunicarlos de inmediato al órgano que interviene.',
            ],
            enLaPractica:
              'Si el imputado sólo habla guaraní, la declaración ante la UFI debe hacerse con intérprete. Sin él, el acto puede ser nulo.',
          },
          preguntas: [
            op(
              '¿Cuál de estos NO es un derecho del imputado?',
              [
                'Ser obligado a declarar bajo juramento de decir verdad',
                'Ser informado de la imputación en un idioma que comprenda',
                'Comunicarse libremente con un abogado de su elección',
                'Abstenerse de declarar',
              ],
              'El imputado nunca declara bajo juramento: hacerlo violaría la garantía contra la autoincriminación (art. 18 CN).',
            ),
            vf(
              'Si el imputado elige callar, el tribunal puede tomar ese silencio como indicio de culpabilidad.',
              false,
              'Falso. El art. 60 le garantiza que no está obligado a declarar contra sí mismo: su silencio no puede usarse como indicio de culpabilidad.',
            ),
            op(
              'Una persona no puede pagar un abogado. ¿Qué pasa?',
              [
                'Se le asigna un defensor oficial',
                'Declara sola',
                'Se suspende el proceso hasta que consiga dinero',
                'La víctima le paga el abogado',
              ],
              'El art. 60 inc. 2 le asegura el derecho a ser asistido y comunicarse con el Defensor Oficial si no tiene un abogado de confianza.',
            ),
            comp(
              'Completá.',
              'El imputado será informado ___, en un idioma que comprenda y en forma detallada, de la imputación.',
              ['sin demora', 'al final del juicio', 'por edictos', 'sólo si lo pide por escrito'],
              'La información debe ser inmediata, comprensible y detallada.',
            ),
          ],
        }),
      ],
    },
    {
      articuloId: 'cppba-308',
      falloClave: {
        tribunal: 'Corte Suprema de Justicia de la Nación',
        caso: '«Montenegro, Luciano Bernardino»',
        anio: '1981',
        resumen:
          'La condena se basaba en una confesión obtenida mediante apremios ilegales por la policía, que llevó a encontrar los objetos robados. La Corte dejó sin efecto la sentencia.',
        regla:
          'Una confesión obtenida bajo tormentos o apremios es inválida y no puede usarse como prueba: sería convertir al Estado en beneficiario de un hecho ilícito.',
        nota: 'Síntesis didáctica (Fallos 303:1938). Verificá el fallo completo antes de citarlo.',
      },
      lecciones: [
        leccion({
          id: 'u2-a308-l1',
          titulo: 'Cuándo y en qué plazo se declara',
          minutos: 3,
          intro: {
            titulo: 'La declaración del imputado',
            parrafos: [
              'Cuando existen elementos suficientes o indicios vehementes de un delito y motivo bastante para sospechar que una persona participó, el Fiscal debe recibirle declaración, previa notificación al defensor.',
              'Si está aprehendida o detenida, la regla es la inmediatez: a más tardar dentro de las 24 horas desde que se produjo la restricción de la libertad, prorrogables por otro tanto si el Fiscal no pudo recibirla o si el imputado lo pide para proponer defensor.',
              'En el sistema bonaerense la declaración la recibe el Fiscal; si el imputado lo pide motivadamente, puede declarar ante el Juez de Garantías.',
            ],
            enLaPractica:
              'Un aprehendido en flagrancia un viernes a la noche debe ser llevado ante la UFI para declarar dentro del plazo legal, aunque sea fin de semana: el turno no se interrumpe.',
          },
          foco: 'dentro de las veinticuatro (24) horas',
          preguntas: [
            op(
              '¿Quién recibe la declaración del imputado en el CPPBA?',
              ['El Agente Fiscal', 'El Juez de Garantías', 'El comisario', 'El Tribunal en lo Criminal'],
              'El art. 308 pone ese acto en cabeza del Fiscal, coherente con su rol de director de la IPP (salvo que el imputado pida motivadamente declarar ante el Juez de Garantías).',
            ),
            comp(
              'Completá el plazo para el detenido.',
              'Cuando el imputado se encuentre aprehendido o detenido, el acto deberá cumplirse inmediatamente o a más tardar dentro de las ___ desde el momento en que se produjo la restricción de la libertad.',
              ['veinticuatro (24) horas', 'setenta y dos (72) horas', 'diez (10) días', 'dos (2) horas'],
              'La regla es 24 horas desde la restricción de la libertad, prorrogables por otro tanto en los supuestos del art. 308.',
            ),
            vf(
              'Para citar a declarar al imputado basta una mera intuición del Fiscal.',
              false,
              'Falso. Se requieren elementos suficientes o indicios vehementes de la perpetración de un delito y motivo bastante para sospechar de su participación.',
            ),
          ],
        }),
        leccion({
          id: 'u2-a308-l2',
          titulo: 'Defensor presente y derecho al silencio',
          minutos: 4,
          intro: {
            titulo: 'Un acto de defensa, no de confesión',
            parrafos: [
              'La declaración del imputado es, ante todo, un medio de defensa: allí conoce el hecho y la prueba en su contra y decide si habla o calla.',
              'Debe recibirse previa notificación al defensor, bajo sanción de nulidad, y ningún interrogatorio puede tomarse en cuenta si el abogado no pudo asesorarlo sobre si le conviene declarar. Nunca bajo juramento, coacción, amenaza o engaño.',
              'Una «declaración» tomada por la policía sin defensor no vale como declaración del imputado.',
            ],
            enLaPractica:
              'Si en la comisaría le hacen firmar a un detenido una «declaración espontánea» autoincriminatoria sin abogado, la defensa pide su nulidad y exclusión.',
          },
          foco: 'previa notificación al Defensor bajo sanción de nulidad',
          preguntas: [
            op(
              '¿Qué pasa si se le recibe declaración sin notificar previamente al defensor?',
              ['Es nula', 'Es válida si el imputado firmó', 'Es válida si el delito es grave', 'Sólo genera una multa al Fiscal'],
              'El art. 308 exige la notificación previa al defensor bajo sanción de nulidad, y no vale ningún interrogatorio si el abogado no pudo asesorarlo.',
            ),
            vf(
              'El imputado declara bajo juramento de decir verdad.',
              false,
              'Falso. Exigirle juramento lo obligaría a autoincriminarse; está prohibido.',
            ),
            ord(
              'Ordená cómo se desarrolla la declaración:',
              [
                'Se notifica al defensor, que lo asesora antes del acto',
                'Se le informa el hecho atribuido y la prueba en su contra',
                'Se le hace saber que puede abstenerse de declarar',
                'El imputado decide si declara o calla',
              ],
              'Primero las garantías (defensor e información); después la decisión libre del imputado.',
            ),
            op(
              'Un comisario le promete a un detenido que «si confiesa se va a su casa». ¿Qué problema hay?',
              [
                'Es un medio prohibido para inducirlo a declarar contra su voluntad',
                'Ninguno, si el detenido acepta',
                'Sólo es problema si lo graba',
                'Ninguno, porque la policía puede negociar',
              ],
              'Promesas, amenazas o engaños para obtener declaraciones están prohibidos y vician el acto.',
            ),
          ],
        }),
      ],
    },
  ],
  caso: {
    id: 'caso-u2',
    titulo: 'La primera declaración',
    rol: 'Defensa oficial',
    sede: 'UFI de turno · Departamento Judicial Quilmes (caso ficticio)',
    hechos: [
      'Lucas (19) fue aprehendido a las 23:40 en Bernal, señalado por una mujer que dice que le arrebató el celular empujándola contra una pared.',
      'Lo trasladan a la comisaría. Vos sos la defensora oficial de turno.',
    ],
    etapas: [
      {
        id: 'e1',
        momento: 'Comisaría · 00:30 h',
        situacion: 'Un oficial le acerca a Lucas un papel para que firme una «declaración espontánea» donde reconoce el hecho. Todavía no habló con vos.',
        pregunta: '¿Qué le indicás a Lucas?',
        opciones: [
          {
            texto: 'Que no firme nada: la declaración válida se presta ante el Fiscal, con defensor presente (arts. 60 y 308).',
            puntaje: 2,
            devolucion:
              'Correcto. La policía no puede recibir declaración al imputado; una confesión sin defensor es nula y no puede valorarse.',
          },
          {
            texto: 'Que firme si lo que dice el papel es verdad, así colabora.',
            puntaje: 0,
            devolucion: 'Nunca. Sin defensor y ante la policía, ese acto viola sus garantías y podría usarse en su contra.',
          },
          {
            texto: 'Que firme, pero que después pida una copia.',
            puntaje: 0,
            devolucion: 'La copia no sana el vicio: el problema es firmar una autoincriminación sin asistencia letrada.',
          },
        ],
        normas: ['Art. 60 CPPBA', 'Art. 308 CPPBA', 'Art. 18 CN'],
      },
      {
        id: 'e2',
        momento: 'Domingo · 50 horas después',
        situacion: 'Lucas sigue detenido y todavía nadie de la UFI le recibió declaración. No hubo ningún pedido de prórroga fundado.',
        pregunta: '¿Qué hacés?',
        opciones: [
          {
            texto: 'Acudo al Juez de Garantías para que controle la legalidad de la detención por exceso del plazo del art. 308 (y, si hace falta, interpongo hábeas corpus).',
            puntaje: 2,
            devolucion:
              'Bien. Vencido el plazo legal (24 h, más una eventual prórroga), la detención se vuelve irregular y el Juez de Garantías debe intervenir.',
          },
          {
            texto: 'Espero: el lunes seguro lo llaman.',
            puntaje: 0,
            devolucion: 'La libertad no espera al lunes. El plazo corre también el fin de semana.',
          },
          {
            texto: 'Pido la nulidad de toda la causa y el sobreseimiento.',
            puntaje: 1,
            devolucion:
              'El exceso afecta la legitimidad de la detención, pero no borra automáticamente el hecho investigado. La vía es el control de la detención.',
          },
        ],
        normas: ['Art. 308 CPPBA', 'Arts. 405 y ss. CPPBA (hábeas corpus)'],
      },
      {
        id: 'e3',
        momento: 'Audiencia de declaración en la UFI',
        situacion: 'La Fiscal informa el hecho y menciona un video de una cámara municipal que todavía no está agregado a la causa.',
        pregunta: '¿Qué aconsejás?',
        opciones: [
          {
            texto: 'Que se abstenga de declarar por ahora, hasta conocer toda la prueba; su silencio no puede perjudicarlo.',
            puntaje: 2,
            devolucion:
              'Estrategia sólida. Puede declarar después cuantas veces quiera, cuando la defensa conozca el video.',
          },
          {
            texto: 'Que declare sí o sí, porque callar «lo hace quedar culpable».',
            puntaje: 0,
            devolucion: 'Falso: el silencio es un derecho y no genera presunción en su contra.',
          },
          {
            texto: 'Que declare solo, sin vos, para mostrar buena fe.',
            puntaje: 0,
            devolucion: 'La declaración sin defensor es nula. Además, lo deja sin asesoramiento.',
          },
        ],
        normas: ['Arts. 60 y 308 CPPBA'],
      },
      {
        id: 'e4',
        momento: 'Calificación legal',
        situacion: 'La Fiscal califica el hecho. Según la denuncia, hubo un empujón para quitarle el teléfono.',
        pregunta: 'Con esos hechos, ¿qué figura del Código Penal se discute?',
        opciones: [
          {
            texto: 'Robo simple (art. 164 CP): apoderamiento con violencia física en las personas.',
            puntaje: 2,
            devolucion:
              'Exacto. La violencia física para apoderarse convierte el hurto en robo. La defensa puede discutir si hubo realmente violencia (si no, sería hurto, art. 162).',
          },
          {
            texto: 'Hurto (art. 162 CP), porque el celular vale poco.',
            puntaje: 1,
            devolucion:
              'El valor de la cosa no define la figura. Si se prueba el empujón, hay violencia y la figura es robo; el hurto sería la hipótesis defensiva si no hubo violencia.',
          },
          {
            texto: 'Robo agravado por el uso de arma (art. 166 inc. 2 CP).',
            puntaje: 0,
            devolucion: 'No hubo ningún arma. La pared no es un arma en el sentido del art. 166.',
          },
        ],
        normas: ['Art. 162 CP', 'Art. 164 CP'],
      },
    ],
    cierre: {
      titulo: 'Defensa desde el minuto cero',
      texto:
        'Protegiste a Lucas desde la comisaría: sin declaración policial, con control del plazo de 24 horas, con un uso estratégico del silencio y con una discusión precisa de la calificación. Esa calificación (robo simple, máximo 6 años) será clave para su excarcelación y para una eventual probation.',
    },
  },
};
