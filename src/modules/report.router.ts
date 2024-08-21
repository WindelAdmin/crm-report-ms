import { Router } from 'express'
import apiKeyAuthGuard from '../infra/auth/apiKeyAuthGuard'
import { reportStrategies } from './report.strategies'

const router = Router()

router.get('/report', apiKeyAuthGuard, async (req, res) => {
  const reportName = req.body.reportName
  const filters = req.body.filters

  try {
    const buffer: Buffer = await reportStrategies({ reportName, filters })

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline; filename=relatorio.pdf',
      'Content-Length': buffer.length
    })
    res.end(buffer)
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: error })
  }
})

export default router
