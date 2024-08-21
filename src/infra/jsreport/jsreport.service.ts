import { readFileSync } from 'fs'
import JsReport from 'jsreport'
import { join } from 'path'
import { IJsReportReport } from './jsreport.report.interface'

export class JsreportService {
  jsreportInstance: JsReport.Reporter

  constructor() {
    this.jsreportInstance = JsReport({
      httpPort: 6667,
      logger: {
        silent: true
      },
      extensions: {
        'chrome-pdf': {
          timeout: 60000 * 5,
          launchOptions: {
            args: ['--no-sandbox']
          }
        }
      }
    })
  }

  async generate(report: IJsReportReport<any>): Promise<Buffer> {
    const templatePath = join(__dirname, '../../../', 'assets', report.reportName)
    const reportFiles = {
      template: readFileSync(templatePath + `/template.hbs`, 'utf8'),
      header: readFileSync(templatePath + `/header.hbs`, 'utf8'),
      helpers: readFileSync(templatePath + `/helpers.js`, 'utf8')
    }
    await this.jsreportInstance.init()
    const response = await this.jsreportInstance.render({
      template: {
        content: reportFiles.template,
        engine: 'handlebars',
        recipe: 'chrome-pdf',
        helpers: reportFiles.helpers,
        ...(reportFiles.header && {
          pdfOperations: [
            {
              renderForEveryPage: true,
              mergeWholeDocument: true,
              type: 'merge',
              template: {
                content: reportFiles.header,
                engine: 'handlebars',
                recipe: 'chrome-pdf',
                helpers: reportFiles.helpers,
                data: report
              }
            }
          ]
        })
      },
      data: report
    })
    const reportBuffer = response.content
    this.jsreportInstance.close()
    return reportBuffer
  }

  getInstance(): JsReport.Reporter {
    return this.jsreportInstance
  }
}
