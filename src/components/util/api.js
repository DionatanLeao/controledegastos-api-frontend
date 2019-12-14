const API = process.env.API

export default {
  CATEGORIA: API + '/categorias',
  CATEGORIA_FILTRAR_POR_TEXTO: API + '/categorias/filtrarPorTexto',
  PESSOA: API + '/pessoas',
  LANCAMENTO: API + '/lancamentos',
  LANCAMENTO_FILTRAR_POR_TEXTO: API + '/lancamentos/filtrarPorTexto'
}
