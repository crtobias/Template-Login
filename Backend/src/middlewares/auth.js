// middleware/auth.js
import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
  // Se asume que el token se pasa en el header Authorization como "Bearer <token>"
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    return res.status(403).json({ error: 'Token no proporcionado' })
  }

  try {
    // Verificamos el token usando jwt.verify
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // Si el token es válido, podemos pasar la información decodificada a la siguiente función (middleware o ruta)
    req.user = decoded // Esto almacena la información del usuario decodificado
    next() // Continuamos con la siguiente función/middleware
  } catch (err) {
    // Si el token no es válido o ha expirado, respondemos con un error
    console.error('Error al verificar el token:', err.message)
    return res.status(401).json({ error: 'Token inválido o expirado' })
  }
}
