import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importamos useNavigate para la redirección
import { signInUser } from '../../Services/api'; // Asegúrate de que la función signInUser esté bien configurada

const SignInForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate(); // Usamos el hook de navegación

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
      const response = await signInUser(formData); // Realizamos el login con la función que tengas configurada
      console.log('Respuesta del servidor:', response);

      // Si el login es exitoso, redirigimos al usuario a la página de items
      setSuccess(true);
      navigate('/items'); // Cambia '/items' si es necesario

    } catch (err) {
      setError('Error al iniciar sesión. Verifique sus credenciales.');
      console.error('Error al iniciar sesión:', err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      {success && <p>Inicio de sesión exitoso!</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
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
          <label>Contraseña:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Iniciando...' : 'Iniciar Sesión'}
        </button>
      </form>
    </div>
  );
};

export default SignInForm;
