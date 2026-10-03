/**
 * Estructura del Código Procesal Penal de la Provincia de Buenos Aires
 * (Ley 11.922), según el índice provisto por el usuario. Se usa para:
 *  - generar los módulos dinámicos del mapa a medida que se avanza,
 *  - ubicar cada artículo dentro del código,
 *  - el explorador del código.
 */
export interface BloqueCPPBA {
  id: string;
  libro: string;
  titulo: string;
  capitulo?: string;
  desde: number;
  hasta: number;
  descripcion: string;
}

const LI = 'Libro I · Disposiciones generales';
const LII = 'Libro II · Investigación Penal Preparatoria';
const LIII = 'Libro III · Juicios';
const LIV = 'Libro IV · Impugnaciones';
const LV = 'Libro V · Ejecución';

export const ESTRUCTURA_CPPBA: BloqueCPPBA[] = [
  { id: 'l1t1', libro: LI, titulo: 'Título I · Garantías fundamentales, interpretación y aplicación de la ley', desde: 1, hasta: 5, descripcion: 'Juez natural, juicio previo, inocencia, non bis in ídem, defensa, favor rei, plazo razonable, interpretación restrictiva, validez temporal y normas prácticas.' },
  { id: 'l1t2c1', libro: LI, titulo: 'Título II · Acciones que nacen del delito', capitulo: 'Capítulo I · Acción penal', desde: 6, hasta: 11, descripcion: 'Acción pública, dependiente de instancia privada y privada; obstáculos constitucionales; cuestiones prejudiciales.' },
  { id: 'l1t2c2', libro: LI, titulo: 'Título II · Acciones que nacen del delito', capitulo: 'Capítulo II · Acción civil', desde: 12, hasta: 14, descripcion: 'Restitución y resarcimiento del daño dentro del proceso penal; casos especiales y oportunidad.' },
  { id: 'l1t3c1', libro: LI, titulo: 'Título III · El juez y los órganos jurisdiccionales', capitulo: 'Capítulo I · Jurisdicción', desde: 15, hasta: 18, descripcion: 'Extensión e improrrogabilidad de la jurisdicción, conflictos con otras jurisdicciones y unificación de penas.' },
  { id: 'l1t3c2', libro: LI, titulo: 'Título III · El juez y los órganos jurisdiccionales', capitulo: 'Capítulo II · Competencia', desde: 19, hasta: 34, descripcion: 'Órganos: Suprema Corte, Tribunal de Casación, Cámaras de Garantías, Tribunales en lo Criminal, Jueces de Garantías, Correccionales, de Ejecución y de Paz; reglas de materia, territorio y conexión.' },
  { id: 'l1t3c3', libro: LI, titulo: 'Título III · El juez y los órganos jurisdiccionales', capitulo: 'Capítulo III · Cuestiones de competencia, excusación y recusación', desde: 35, hasta: 55, descripcion: 'Inhibitoria y declinatoria, conflictos entre fiscales, motivos de excusación y recusación de jueces, fiscales y secretarios.' },
  { id: 'l1t4c1', libro: LI, titulo: 'Título IV · Partes y demás intervinientes', capitulo: 'Capítulo I · Ministerio Público Fiscal', desde: 56, hasta: 59, descripcion: 'Funciones, facultades, objetividad e investigación a cargo del Ministerio Público Fiscal.' },
  { id: 'l1t4c2', libro: LI, titulo: 'Título IV · Partes y demás intervinientes', capitulo: 'Capítulo II · El imputado', desde: 60, hasta: 64, descripcion: 'Derechos mínimos desde el primer momento, identificación e incapacidad mental del imputado.' },
  { id: 'l1t4c3', libro: LI, titulo: 'Título IV · Partes y demás intervinientes', capitulo: 'Capítulos III a V · Actor civil, civilmente demandado y asegurador', desde: 65, hasta: 76, descripcion: 'Constitución y facultades del actor civil, citación del civilmente demandado y del asegurador.' },
  { id: 'l1t4c6', libro: LI, titulo: 'Título IV · Partes y demás intervinientes', capitulo: 'Capítulos VI y VII · Particular damnificado y víctima', desde: 77, hasta: 88, descripcion: 'Derechos y facultades del particular damnificado; derechos de la víctima: trato digno e información.' },
  { id: 'l1t4c8', libro: LI, titulo: 'Título IV · Partes y demás intervinientes', capitulo: 'Capítulo VIII · Defensores y mandatarios', desde: 89, hasta: 98, descripcion: 'Defensa de confianza y oficial, abandono de la defensa y sanciones.' },
  { id: 'l1t5a', libro: LI, titulo: 'Título V · Actos procesales', capitulo: 'Capítulos I a IV · Formas, resoluciones y comunicaciones', desde: 99, hasta: 120, descripcion: 'Idioma, juramentos, declaraciones; sentencias, autos y decretos con su motivación; exhortos, oficios y actas.' },
  { id: 'l1t5b', libro: LI, titulo: 'Título V · Actos procesales', capitulo: 'Capítulos V y VI · Notificaciones y plazos', desde: 121, hasta: 143, descripcion: 'Notificaciones, citaciones y vistas; plazos procesales, continuidad y términos fatales con detenido.' },
  { id: 'l1t6c1', libro: LI, titulo: 'Título VI · Medidas de coerción', capitulo: 'Capítulo I · Normas generales', desde: 144, hasta: 148, descripcion: 'Principio de libertad durante el proceso, condiciones de las medidas y pautas de los peligros procesales.' },
  { id: 'l1t6c2', libro: LI, titulo: 'Título VI · Medidas de coerción', capitulo: 'Capítulo II · Coerción personal', desde: 149, hasta: 156, descripcion: 'Arresto, citación, detención, incomunicación, aprehensión y flagrancia.' },
  { id: 'l1t6c3', libro: LI, titulo: 'Título VI · Medidas de coerción', capitulo: 'Capítulo III · Prisión preventiva y alternativas', desde: 157, hasta: 160, descripcion: 'Procedencia y requisitos formales de la prisión preventiva; alternativas y sus modalidades.' },
  { id: 'l1t6c4', libro: LI, titulo: 'Título VI · Medidas de coerción', capitulo: 'Capítulo IV · Incidencias, morigeración y cese', desde: 161, hasta: 168, descripcion: 'Incidencias, atenuación de la coerción, cese, caducidad e internación provisional.' },
  { id: 'l1t6c5', libro: LI, titulo: 'Título VI · Medidas de coerción', capitulo: 'Capítulo V · Excarcelación y eximición de prisión', desde: 169, hasta: 196, descripcion: 'Excarcelación ordinaria y extraordinaria, eximición de prisión, cauciones y revocatoria.' },
  { id: 'l1t6c6', libro: LI, titulo: 'Título VI · Medidas de coerción', capitulo: 'Capítulo VI · Coerción real', desde: 197, hasta: 200, descripcion: 'Embargo e inhibición sobre bienes del imputado y del civilmente demandado.' },
  { id: 'l1t7', libro: LI, titulo: 'Título VII · Nulidades', desde: 201, hasta: 208, descripcion: 'Regla general, nulidades de carácter general, declaración de oficio, oportunidad de los planteos y efectos.' },
  { id: 'l1t8c1', libro: LI, titulo: 'Título VIII · Medios de prueba', capitulo: 'Capítulo I · Disposiciones generales', desde: 209, hasta: 211, descripcion: 'Libertad probatoria, sana crítica y exclusiones probatorias.' },
  { id: 'l1t8c2', libro: LI, titulo: 'Título VIII · Medios de prueba', capitulo: 'Capítulos II y III · Inspección, registro y requisa', desde: 212, hasta: 225, descripcion: 'Inspección, examen corporal y mental, reconstrucción del hecho, registro domiciliario, allanamiento y requisa personal.' },
  { id: 'l1t8c4', libro: LI, titulo: 'Título VIII · Medios de prueba', capitulo: 'Capítulo IV · Secuestro e interceptaciones', desde: 226, hasta: 231, descripcion: 'Secuestro, presentación de documentos, intercepción de comunicaciones y devolución.' },
  { id: 'l1t8c5', libro: LI, titulo: 'Título VIII · Medios de prueba', capitulo: 'Capítulo V · Testigos', desde: 232, hasta: 243, descripcion: 'Deber de declarar, prohibiciones y facultades de abstención por parentesco o secreto profesional.' },
  { id: 'l1t8c6', libro: LI, titulo: 'Título VIII · Medios de prueba', capitulo: 'Capítulos VI y VII · Peritos e intérpretes', desde: 244, hasta: 256, descripcion: 'Idoneidad de los peritos, dictamen, autopsia e intérpretes.' },
  { id: 'l1t8c8', libro: LI, titulo: 'Título VIII · Medios de prueba', capitulo: 'Capítulos VIII y IX · Reconocimientos y careos', desde: 257, hasta: 265, descripcion: 'Reconocimiento de personas y cosas; careos.' },
  { id: 'l2t1', libro: LII, titulo: 'Título I · Disposiciones generales de la IPP', desde: 266, hasta: 284, descripcion: 'Finalidad de la IPP, actuación del Fiscal, colaboración policial, actos irreproducibles, reserva y duración (4 meses prorrogables).' },
  { id: 'l2t2c1', libro: LII, titulo: 'Título II · Actos iniciales', capitulo: 'Capítulo I · Denuncia', desde: 285, hasta: 292, descripcion: 'Facultad y obligación de denunciar, forma y trámite.' },
  { id: 'l2t2c2', libro: LII, titulo: 'Título II · Actos iniciales', capitulo: 'Capítulos II y III · Policía y obstáculos constitucionales', desde: 293, hasta: 302, descripcion: 'Atribuciones de la Policía en función judicial; desafuero y antejuicio.' },
  { id: 'l2t3', libro: LII, titulo: 'Título III · Situación del imputado', desde: 303, hasta: 320, descripcion: 'Rebeldía; declaración del imputado con defensor, derecho al silencio y prohibición de coacción; libertad por falta de mérito.' },
  { id: 'l2t4', libro: LII, titulo: 'Título IV · Sobreseimiento', desde: 321, hasta: 327, descripcion: 'Oportunidad, alcance, procedencia y efectos del sobreseimiento.' },
  { id: 'l2t5', libro: LII, titulo: 'Título V · Excepciones', desde: 328, hasta: 333, descripcion: 'Falta de jurisdicción, competencia o acción; excepciones perentorias y dilatorias.' },
  { id: 'l2t6', libro: LII, titulo: 'Título VI · Elevación a juicio', desde: 334, hasta: 337, descripcion: 'Requerimiento fiscal, oposición de la defensa, cambio de calificación y resolución del Juez de Garantías.' },
  { id: 'l3t1a', libro: LIII, titulo: 'Título I · Procedimiento común', capitulo: 'Capítulo I · Actos preliminares', desde: 338, hasta: 341, descripcion: 'Audiencia preliminar, fijación del debate, unión o separación de juicios y sobreseimiento sobreviniente.' },
  { id: 'l3t1b', libro: LIII, titulo: 'Título I · Procedimiento común', capitulo: 'Capítulos II y III · Debate y acta', desde: 342, hasta: 370, descripcion: 'Oralidad, publicidad, continuidad, dirección de la audiencia, ampliación de la acusación, prueba, lecturas, alegatos y acta.' },
  { id: 'l3t1c', libro: LIII, titulo: 'Título I · Procedimiento común', capitulo: 'Capítulo IV · Veredicto y sentencia', desde: 371, hasta: 375, descripcion: 'Cuestiones esenciales del veredicto, cesura del juicio, lectura y sentencia.' },
  { id: 'l3t2a', libro: LIII, titulo: 'Título II · Procedimientos especiales', capitulo: 'Capítulos I y II · Correccional y acción privada', desde: 376, hasta: 394, descripcion: 'Juicio correccional; juicios por delitos de acción privada: querella, conciliación y debate.' },
  { id: 'l3t2b', libro: LIII, titulo: 'Título II · Procedimientos especiales', capitulo: 'Capítulos III y IV · Juicio abreviado y probation', desde: 395, hasta: 404, descripcion: 'Juicio abreviado por acuerdo de Fiscal, imputado y defensor; suspensión del proceso a prueba.' },
  { id: 'l3t2c', libro: LIII, titulo: 'Título II · Procedimientos especiales', capitulo: 'Capítulo V · Hábeas corpus', desde: 405, hasta: 420, descripcion: 'Procedencia, trámite y resolución del hábeas corpus.' },
  { id: 'l4t1', libro: LIV, titulo: 'Títulos I a III · Disposiciones generales, reposición y apelación', desde: 421, hasta: 447, descripcion: 'Recurribilidad, legitimación, efectos, reformatio in peius; reposición; apelación ante la Cámara de Garantías.' },
  { id: 'l4t4', libro: LIV, titulo: 'Título IV · Recurso de casación', desde: 448, hasta: 466, descripcion: 'Motivos, resoluciones recurribles, plazo de 20 días, trámite ante el Tribunal de Casación, anulación y reenvío.' },
  { id: 'l4t5', libro: LIV, titulo: 'Título V · Acción de revisión', desde: 467, hasta: 478, descripcion: 'Revisión en todo tiempo a favor del condenado: hechos nuevos, sentencias fraudulentas, ley más benigna.' },
  { id: 'l4t6', libro: LIV, titulo: 'Título VI · Recursos extraordinarios', desde: 479, hasta: 496, descripcion: 'Recursos de inconstitucionalidad, nulidad e inaplicabilidad de ley ante la Suprema Corte.' },
  { id: 'l5a', libro: LV, titulo: 'Títulos I y II · Ejecución penal', desde: 497, hasta: 516, descripcion: 'Juez de Ejecución, cómputo de pena, cumplimiento, salidas transitorias, detención domiciliaria y libertad condicional.' },
  { id: 'l5b', libro: LV, titulo: 'Títulos III a V · Medidas de seguridad, ejecución civil y costas', desde: 517, hasta: 535, descripcion: 'Medidas de seguridad, ejecución de condenas civiles, costas y honorarios.' },
];

export function bloqueDeArticulo(numero: string): BloqueCPPBA | undefined {
  const n = parseInt(numero, 10);
  return ESTRUCTURA_CPPBA.find((b) => n >= b.desde && n <= b.hasta);
}
