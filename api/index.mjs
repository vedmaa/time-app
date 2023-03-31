import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import {
  readRecords,
  insertRecord,
  deleteRecord,
} from './src/utils/records.mjs'

const PORT = process.env['TIMEAPP_PORT']

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.get('/', (_, res) => {
  res.send('Hello from the time saving service!')
})

app.get('/times', async (_, res) => {
  res.send(await readRecords())
})

app.post('/times', async (req, res) => {
  res.send(await insertRecord(req.body.time))
})

app.delete('/time/:id', async (req, res) => {
  res.send(await deleteRecord(req.params.id))
})

app.listen(PORT, () => {
  console.log(`Express web server is running at http://localhost:${PORT}`)
})
