import { Router } from 'express'
import apiKeyAuthGuard from '../infra/auth/apiKeyAuthGuard'
import ReportService from '../infra/report/report.service'
import { IReportService } from '../infra/report/report.service.interface'

const router = Router()

router.get('/report', apiKeyAuthGuard, async (req, res, next) => {
  const reportInfo: IReportService = {
    filters: req.body.filters,
    reportName: req.body.reportName,
    user: {
      email: req.body.user.email,
      name: req.body.user.name
    }
  }
  try {
    const reportService = new ReportService()
    const buffer = await reportService.generateReport(reportInfo)

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline; filename=relatorio.pdf',
      'Content-Length': buffer.length
    })
    res.end(buffer)
  } catch (error) {
    next(error)
  }
})

export default router
