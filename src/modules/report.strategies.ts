import { ReportStrategy } from './report-strategies/report.abstract.strategy'
import { IReport } from './report.interface'
import { TesteStrategy } from './reports/test/teste.strategy'

export async function reportStrategies(reportData: IReport): Promise<Buffer> {
  let strategy: ReportStrategy
  switch (reportData.reportName) {
    case 'testReport':
      strategy = new TesteStrategy()
    default:
      strategy = new TesteStrategy()
  }
  return await strategy.generate(reportData)
}
