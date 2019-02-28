import express from 'express'
import bodyParser from 'body-parser'
import config from './config/config'
import datasource from './config/datasource'
import chatsRouter from './routes/messages'
import botsRouter from './routes/bots'

const app = express()
app.config = config
app.datasource = datasource(app)

app.set('port', 7000)

app.use(bodyParser.json())

chatsRouter(app)
botsRouter(app)

export default app
