import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'



const prisma = new PrismaClient()

export const verifyEmail = async (token) => {
  try {
    console.log(`Verificación de email: token recibido -> ${token}`)

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    console.log('Token decodificado:', decoded)

    if (!decoded.id) {
      throw new Error('El token no contiene un id válido')
    }

    const user = await prisma.user.update({
      where: { id: decoded.id },
      data: { status: 'VERIFIED' }
    })

    console.log('Correo verificado con éxito:', user)
    return { success: true, message: 'Correo verificado correctamente' }
  } catch (error) {
    console.error('Error en la verificación del token:', error)
    return { success: false, message: 'Token inválido o expirado' }
  }
}

export const verifyEmailController = async (req, res) => {
  const { token } = req.query;

  if (!token) {
    return res.status(400).json({ message: 'Token no proporcionado' });
  }

  try {
    await verifyEmail(token);
    return res.status(200).json({ message: 'Correo electrónico verificado con éxito.' });
  } catch (error) {
    return res.status(400).json({ message: 'Token inválido o expirado.' });
  }
};