/**
 * Epígrafes didácticos para los artículos del Código Penal (el código no los
 * trae) y avisos de vigencia: el PDF provisto está actualizado hasta 2009
 * aprox. (última reforma detectada: Ley 26.551), por lo que no refleja
 * reformas posteriores.
 */
export const AVISO_CP_GENERAL =
  'Texto literal del PDF provisto (Ley 11.179, T.O. 1984 actualizado; última reforma incluida: Ley 26.551 de 2009). Puede no reflejar reformas posteriores.';

export const META_CP: Record<string, { epigrafe: string; avisoVigencia?: string }> = {
  '1': { epigrafe: 'Ámbito de aplicación de la ley penal' },
  '2': { epigrafe: 'Ley penal más benigna' },
  '3': { epigrafe: 'Prisión preventiva: ley más favorable' },
  '5': { epigrafe: 'Clases de penas' },
  '26': { epigrafe: 'Condenación condicional' },
  '27 bis': { epigrafe: 'Reglas de conducta' },
  '34': { epigrafe: 'Inimputabilidad y causas de justificación' },
  '40': { epigrafe: 'Individualización de la pena' },
  '41': { epigrafe: 'Pautas para graduar la pena' },
  '42': { epigrafe: 'Tentativa' },
  '44': { epigrafe: 'Pena de la tentativa' },
  '45': { epigrafe: 'Autores, coautores e instigadores' },
  '46': { epigrafe: 'Partícipes secundarios' },
  '50': { epigrafe: 'Reincidencia' },
  '54': { epigrafe: 'Concurso ideal' },
  '55': { epigrafe: 'Concurso real' },
  '59': {
    epigrafe: 'Extinción de la acción penal',
    avisoVigencia:
      'La Ley 27.147 (2015) agregó tres causales: criterios de oportunidad, conciliación o reparación integral, y cumplimiento de la suspensión del juicio a prueba. El PDF provisto no las incluye.',
  },
  '62': { epigrafe: 'Prescripción de la acción penal' },
  '67': { epigrafe: 'Suspensión e interrupción de la prescripción' },
  '71': {
    epigrafe: 'Acciones de oficio',
    avisoVigencia:
      'La Ley 27.147 (2015) modificó este artículo: hoy comienza «Sin perjuicio de las reglas de disponibilidad de la acción penal previstas en la legislación procesal…». El PDF provisto no refleja esa reforma.',
  },
  '72': {
    epigrafe: 'Acciones dependientes de instancia privada',
    avisoVigencia:
      'Modificado con posterioridad al PDF provisto (entre otras, por la Ley 27.455 de 2018, para delitos contra la integridad sexual de menores). Verificá el texto vigente.',
  },
  '73': { epigrafe: 'Acciones privadas' },
  '76 bis': { epigrafe: 'Suspensión del juicio a prueba' },
  '76 ter': { epigrafe: 'Plazo y efectos de la probation' },
  '79': { epigrafe: 'Homicidio simple' },
  '80': {
    epigrafe: 'Homicidios agravados',
    avisoVigencia: 'La Ley 26.791 (2012) incorporó nuevos incisos (entre ellos, el femicidio). El PDF provisto no los incluye.',
  },
  '84': { epigrafe: 'Homicidio culposo' },
  '89': { epigrafe: 'Lesiones leves' },
  '90': { epigrafe: 'Lesiones graves' },
  '91': { epigrafe: 'Lesiones gravísimas' },
  '149 bis': { epigrafe: 'Amenazas' },
  '162': { epigrafe: 'Hurto' },
  '163': { epigrafe: 'Hurto agravado' },
  '164': { epigrafe: 'Robo' },
  '166': { epigrafe: 'Robo agravado' },
  '172': { epigrafe: 'Estafa' },
  '183': { epigrafe: 'Daño' },
  '277': { epigrafe: 'Encubrimiento' },
};
