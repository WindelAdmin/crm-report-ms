import { reportFactory } from './report.factory'
import { IReportService } from './report.service.interface'

export default class ReportService {
  async generateReport(reportInfo: IReportService): Promise<Buffer> {
    const strategy = reportFactory(reportInfo.reportName)
    return await strategy.generate(reportInfo)
  }
}
