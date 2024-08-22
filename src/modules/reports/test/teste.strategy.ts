import prisma from '../../../infra/database/prisma.service'
import { IJsReportReport } from '../../../infra/report/jsreport/jsreport.report.interface'
import { JsreportService } from '../../../infra/report/jsreport/jsreport.service'
import { registerStrategy } from '../../../infra/report/report.factory'
import { ReportStrategy } from '../../report-strategies/report.abstract.strategy'
import { ITesteDataset } from './teste.dataset.interface'
import { ITesteReport } from './teste.report.interface'

export class TesteStrategy implements ReportStrategy {
  constructor() {
    registerStrategy('testeStrategy')
  }
  async generate(report: ITesteReport): Promise<Buffer> {
    const jsReport = new JsreportService()
    const prismaData = await prisma.atividade.findMany()
    const reportDataset: IJsReportReport<ITesteDataset> = {
      reportName: report.reportName,
      dataset: { ...prismaData }
    }
    return await jsReport.generate(reportDataset)
  }
}
