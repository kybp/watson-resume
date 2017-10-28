import axios from 'axios'
import * as bodyParser from 'body-parser'
import * as express from 'express'
import * as path from 'path'

// tslint:disable-next-line
const credentials = require('./config/credentials.json')

const port = process.env.PORT || 3000
const app = express()
app.use(express.static(path.resolve(__dirname, 'public')))
app.use(bodyParser.json())

app.post('/analyze', (request, response) => {
  axios.post(`${credentials.url}`, request.body, {
    auth: credentials,
    params: { version: '2017-02-27' },
  }).then(({ data }) => {
    response.status(200).json(data)
  }).catch((error) => {
    if (error.response) {
      response.status(error.response.status).json(error.response.data)
    } else {
      response.status(500).json({ status: 500, error: 'An error occurred' })
    }
  })
})

app.listen(port, () => {
  // tslint:disable-next-line
  console.log(`Listening on http://localhost:${port}`)
})
