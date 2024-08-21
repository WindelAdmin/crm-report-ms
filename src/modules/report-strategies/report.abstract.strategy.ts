import { IReport } from '../report.interface'

export abstract class ReportStrategy {
  constructor() {}
  abstract generate(report: IReport): Promise<Buffer>
}
