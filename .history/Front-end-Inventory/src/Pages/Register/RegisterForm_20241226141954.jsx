// src/components/RegisterForm.jsx
import React, { useState } from 'react';
import { registerUser } from '../../Services/api';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    nameUser: '',
    email: '',
    password: '',
    role:'admin'
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

    try {
      const response = await registerUser(formData);
      console.log(response);
      setSuccess(true);
    } catch (err) {
      setError('Hubo un problema al registrar el usuario.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Registro</h2>
      {success && <p>Registro exitoso!</p>}
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
        <button type="submit" disabled={loading}>
          {loading ? 'Registrando...' : 'Registrar'}
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;