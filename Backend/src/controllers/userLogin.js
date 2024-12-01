import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import { generateToken } from '../jwt.js'

const prisma = new PrismaClient()

const validatePassword = async (x, y) => {
  const isMatch = await bcrypt.compare(x, y)
  if (isMatch) {
    return true
  } else {
    return false
  }
}

function validateStatus (status) {
  if (status === 'PENDING') {
    return false
  } else {
    return true
  }
}

export const login = async (req, res) => {
  const { email, password, name } = req.body

  if (!email && !name) {
    return res.status(400).json({ message: 'Se necesita un email o un nombre de usuario' })
  }

  if (email) {
    const existingEmail = await prisma.user.findUnique({ where: { email }, select: { password: true, rol: true, status: true } })
    if (!existingEmail) {
      return res.status(404).json({ message: 'No se encontro el usuario' })
    } else {
      if (await validatePassword(password, existingEmail.password)) {
        if (validateStatus(existingEmail.status)) {
          const token = generateToken({ id: existingEmail.id, rol: existingEmail.rol }, '1h')
          res.status(200).json({ message: 'Login ', token })
        } else {
          res.status(401).json({ message: 'usuario no verificado' })
        }
      } else {
        res.status(401).json({ message: 'Contraseña incorrecta' })
      }
    }
  } else if (name) {
    const existingUser = await prisma.user.findUnique({ where: { name }, select: { password: true, rol: true, status: true } })
    if (!existingUser) {
      return res.status(404).json({ message: 'No se encontro el usuario' })
    } else {
      if (await validatePassword(password, existingUser.password)) {
        if (validateStatus(existingUser.status)) {
          const token = generateToken({ id: existingUser.id, rol: existingUser.rol }, '1h')
          res.status(200).json({ message: 'Login ', token })
        } else {
          res.status(401).json({ message: 'usuario no verificado' })
        }
      } else {
        res.status(401).json({ message: 'Contraseña incorrecta' })
      }
    }
  } else {
    res.status(201).json({ message: 'se nesecita email o name' })
  }
}
