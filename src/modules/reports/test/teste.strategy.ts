import prisma from '../../../infra/database/prisma.service'
import { IJsReportReport } from '../../../infra/jsreport/jsreport.report.interface'
import { JsreportService } from '../../../infra/jsreport/jsreport.service'
import { ReportStrategy } from '../../report-strategies/report.abstract.strategy'

import { IReport } from '../../report.interface'
import { ITesteDataset } from './teste.dataset.interface'

export class TesteStrategy implements ReportStrategy {
  constructor() {}

  async generate(report: IReport): Promise<Buffer> {
    const jsReport = new JsreportService()

    const prismaData = await prisma.atividade.findMany()

    const reportInfo: IJsReportReport<ITesteDataset> = {
      reportName: report.reportName,
      dataset: { ...prismaData }
    }
    return await jsReport.generate(reportInfo)
  }
}
