import express from 'express'

import router from '../../modules/report.router'

const app = express()

const appPort = process.env.PORT || 3336
app.use(express.json())

app.use('/', router)

app.listen(appPort, () => {
  console.clear()

  console.log(`server running http://localhost:${appPort}/report`)
})
