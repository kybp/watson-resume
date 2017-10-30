import axios from 'axios'
import * as bodyParser from 'body-parser'
import * as express from 'express'
import * as path from 'path'
import prepareQuery from './prepareQuery'
import prepareResponse from './prepareResponse'

// tslint:disable-next-line
const credentials = require('../config/credentials.json')

const port = process.env.PORT || 3000
const app = express()
app.use(express.static(path.resolve(__dirname, '..', 'public')))
app.use(bodyParser.json())

app.post('/analyze', (request, response) => {
  let prepared
  try {
    prepared = prepareQuery(request.body)
  } catch (error) {
    response.status(400).json({ status: 400, error: error.message })
    return
  }

  axios.post(`${credentials.url}`, prepared, {
    auth: credentials,
    params: { version: credentials.version },
  }).then(({ data }) => {
    response.status(200).json(prepareResponse(data, request.body.options))
  }).catch((error) => {
    response.status(500).json({ status: 500, error: 'An error occurred' })
  })
})

app.listen(port, () => {
  // tslint:disable-next-line
  console.log(`Listening on http://localhost:${port}`)
})
