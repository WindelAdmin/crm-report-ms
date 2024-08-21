export interface ITesteDataset {
  id: number
  descricao: string
  dataAbertura: Date
  usuarioId: number | null
  interessadoId: number | null
  clienteId: number | null
  unidadeNegocioId: number | null
  oportunidadeId: number | null
  categoriaAtividade: string
  origemAtividade: string
  createdAt: Date | null
  updatedAt: Date | null
  dataEncerramento: Date | null
  dataVencimento: Date | null
  usuarioCriadorId: number | null
}
