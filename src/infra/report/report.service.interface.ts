export interface IReportService {
  reportName: string
  filters: any
  user: { email: string; name: string }
}
