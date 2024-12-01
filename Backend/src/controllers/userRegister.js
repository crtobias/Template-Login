import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import { generateToken } from '../jwt.js'
import { sendVerificationEmail } from '../email.js'

const saltRounds = 10
const prisma = new PrismaClient()

export const register = async (req, res) => {
  const { email, password, name } = req.body

  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [
        { email },
        { name }
      ]
    }
  })

  if (existingUser) {
    console.log('usuario en uso')
    return res.status(400).json({ error: 'Este correo electrónico o nombre ya está en uso.' })
  }

  const hashedPassword = await bcrypt.hash(password, saltRounds)

  const newUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      rol: 'user',
      name
    }
  })

  const token = generateToken({ id: newUser.id, rol: newUser.rol }, '1h')

  sendVerificationEmail(newUser.email, token)

  res.status(201).json({ message: 'Usuario creado correctamente , inicie sesion y verifique su email', token })
  console.log('creado')
}
