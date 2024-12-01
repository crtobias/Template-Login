import express from 'express'
import userRoutes from './userRoutes.js'
// import { verifyToken } from '../middlewares/auth.js'

const routes = express.Router()

routes.get('/', (req, res) => {
  res.json({ message: 'Bienvenido' })
})

routes.use('/users', userRoutes)

// ruta protegida
// router.get('/protected', verifyToken)

export default routes
