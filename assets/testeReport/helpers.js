var dataContext
var data = []
function isTypeDocument(documentType, value) {
  return value === documentType
}
function setDataContext(contex) {
  dataContext = contex
  data = dataContext.data
}
