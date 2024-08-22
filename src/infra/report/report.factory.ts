import { ReportStrategy } from '../../modules/report-strategies/report.abstract.strategy'
import { TesteStrategy } from '../../modules/reports/test/teste.strategy'

export let strategiesList: Record<string, new () => ReportStrategy> = {}

export function reportFactory(reportName: string): ReportStrategy {
  const Strategy = strategiesList[reportName] || TesteStrategy
  return new Strategy()
}

export function registerStrategy(strategie: string): void {
  if (!strategiesList[strategie]) {
    strategiesList[strategie] = TesteStrategy
  }
}
