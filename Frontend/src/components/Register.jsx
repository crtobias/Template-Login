import { useState } from 'react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    // Hacemos la solicitud POST a la ruta que mencionaste
    const response = await fetch('http://localhost:3000/users/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        rol: 'user', // Asumimos que el rol por defecto es 'user'
        status: 'PENDING', // 'PENDING' hasta que el correo sea verificado
      }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log('Usuario registrado correctamente', data.token);
      // Aquí podrías mostrar un mensaje o redirigir al usuario a otra página
    } else {
      console.error('Error al registrar usuario', data);
    }
  };

  return (
    <form onSubmit={handleRegisterSubmit}>
      <div>
        <h2>Register</h2>
        <label htmlFor="name">Nombre</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="email">Correo Electrónico</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Contraseña</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Registrar</button>
    </form>
  );
};

export default Register;
