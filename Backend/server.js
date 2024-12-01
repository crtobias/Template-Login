import express from 'express'
import routes from './src/routes/index.js'
import dotenv from 'dotenv'
import cors from 'cors'
import errorHandler from './src/middlewares/errorHandler.js'

dotenv.config()

const PORT = process.env.PORT || 3000

const app = express()

// json
app.use(express.json())
// cors
app.use(cors())
// manejo de errores
app.use(errorHandler)
// registro de rutas
app.use('/', routes)

app.listen(PORT, () => {
  console.log(`Escuchando en ${PORT}`)
})
