### Guia Login EndPoint
*nota : todos los endpoints de user estan en /users*
##### /send-email-password

recibe por body un newPassword y email y si todo esta bien envia un email de confirmacion para cambiar la contrasena
##### /create

recibe por body email , name , password busca si existe y si no existe y todo esta en orden lo crea con estado pendiente y envia un mail de verificacion al email de la persona para verificar la cuenta
##### /login

recibe por body email , password , name busca a la persona por email o name y ve si esta bien el password y si esta verificado el usuario , si todo esta en orden devuelve un token con id y rol
##### /verify 

recibe un email por body lo busca y envia un mail para verificarlo y poder usar la cuenta
##### nota

los endpoint que no estan aca son porque son para uso interno del servidor y no deben ser usador por el front-end

para crear un usuario usar http://localhost:3000/users/create y enviar por body {email , password , name}
