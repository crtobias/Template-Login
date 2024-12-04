import express from 'express'
import { register } from '../controllers/userRegister.js'
import { login } from '../controllers/userLogin.js'
import { verifyEmail } from '../controllers/verifyEmail.js'
import { reSendVerify } from '../controllers/reSendVerify.js'
import { sendEmailChangePassword } from '../controllers/passwordEmail.js'
import { changePassword } from '../controllers/changePassword.js'


const router = express.Router()

router.post('/send-email-password',sendEmailChangePassword)
router.get('/change-password', changePassword)

router.post('/create', register)
router.post('/login', login)
router.post('/verify', reSendVerify)


router.get('/verify-email', async (req, res) => {
  const { token } = req.query

  if (!token) {
    return res.status(400).json({ message: 'Token no proporcionado' })
  }

  try {
    await verifyEmail(token)
    res.status(200).json({ message: 'Correo electrónico verificado con éxito.' })
  } catch (error) {
    res.status(400).json({ message: 'Token inválido o expirado.' })
  }
})



export default router
