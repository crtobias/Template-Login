import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

// Configuración del transportador de Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD
  }
})

export const sendVerificationEmail = (email, verificationToken) => {
  const verifyUrl = `http://localhost:3000/users/verify-email?token=${verificationToken}`

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Verificación de correo electrónico',
    html: `<p>Haz clic en el siguiente enlace para verificar tu correo electrónico:</p><a href="${verifyUrl}">${verifyUrl}</a>`
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error al enviar correo:', error)
    } else {
      console.log('Correo enviado:', info.response)
    }
  })
}
