import { IReportService } from '../../infra/report/report.service.interface'

export abstract class ReportStrategy {
  constructor() {}
  abstract generate(report: IReportService): Promise<Buffer>
}
