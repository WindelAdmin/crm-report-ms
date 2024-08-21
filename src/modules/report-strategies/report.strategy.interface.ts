import { IReport } from '../report.interface'
import { ReportStrategy } from './report.abstract.strategy'

export interface IReportStrategy {
  generateReport(strategy: ReportStrategy, IReport: IReport): Buffer
}
