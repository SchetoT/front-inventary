// src/components/RegisterForm.jsx
import React, { useState } from 'react';
import { registerUser } from '../../Services/api';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    nameUser: '',
    email: '',
    password: '',
    role: 'admin', 
  });


  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);


    if (!formData.nameUser || !formData.email || !formData.password) {
      setError('Por favor, complete todos los campos.');
      setLoading(false);
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('El correo electrónico no es válido.');
      setLoading(false);
      return;
    }

    try {
      const response = await registerUser(formData);
      console.log(response); // Verifica la respuesta en la consola

      // Si todo es correcto, se muestra el mensaje de éxito
      setSuccess(true);
      setFormData({ nameUser: '', email: '', password: '', role: 'admin' }); // Limpiar formulario después del éxito
    } catch (err) {
      setError('Hubo un problema al registrar el usuario.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Registro</h2>
      
      {/* Mensaje de éxito */}
      {success && <p>¡Registro exitoso!</p>}
      
      {/* Mensaje de error */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="nameUser"
            value={formData.nameUser}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        {/* Si quieres permitir que el usuario seleccione su rol */}
        <div>
          <label>Role:</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleInputChange}
          >
            <option value="user">Usuario</option>
            <option value="admin">Administrador</option>
          </select>
        </div>

        {/* Botón de envío */}
        <button type="submit" disabled={loading}>
          {loading ? 'Registrando...' : 'Registrar'}
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
