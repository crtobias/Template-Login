import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const verifyEmail = async (token) => {
  try {
    console.log(`Verificación de email: token recibido -> ${token}`)

    // Verificar y decodificar el token JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    console.log('Token decodificado:', decoded)

    if (!decoded.id) {
      throw new Error('El token no contiene un id válido')
    }

    // Actualizar el estado del usuario a 'VERIFIED'
    const user = await prisma.user.update({
      where: { id: decoded.id }, // Usar decoded.id en lugar de decoded.userId
      data: { status: 'VERIFIED' } // Cambiar el estado a 'VERIFIED'
    })

    console.log('Correo verificado con éxito:', user)
    return { success: true, message: 'Correo verificado correctamente' }
  } catch (error) {
    console.error('Error en la verificación del token:', error)
    return { success: false, message: 'Token inválido o expirado' }
  }
}
