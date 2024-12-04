

import { PrismaClient } from '@prisma/client'
import { generateToken } from '../jwt.js'
import { sendVerificationEmail } from '../email.js'

const prisma = new PrismaClient()

export const reSendVerify = async (req, res) => {
  const { email } = req.body

  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [
        { email }
      ]
    }
  })

  console.log(existingUser.status)

  if (existingUser) {
      
    const token = generateToken({ id: existingUser.id, rol: existingUser.rol }, '1h')
    sendVerificationEmail(email, token)
    console.log('verificacion enviada')
    return res.status(200).json({ error: 'Se envio el correo de verificacion' })

  } else {
    return res.status(400).json({ error: 'No se encontro el correo electronico' })
  }
}
