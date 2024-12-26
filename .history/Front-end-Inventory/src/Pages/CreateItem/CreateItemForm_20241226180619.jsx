import React, { useState } from 'react';
import { createItem } from '../../Services/api';

const CreateItemForm = () => {
  const [formData, setFormData] = useState({
    userName: '', // ID del usuario
    title: '',
    talle: '',
    price: '',
    category: '',
    color: '',
    images: '', // Nuevo campo para el link de la imagesn
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
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
      // Usar la función `createItem` para enviar los datos
      const response = await createItem(formData);
      console.log('Ítem creado:', response);
      setSuccess(true);

      // Limpiar el formulario después de enviar
      setFormData({
        userName: '',
        title: '',
        talle: '',
        price: '',
        category: '',
        color: '',
        images: '',
      });
    } catch (err) {
      console.error('Error al crear el ítem:', err);
      setError('Hubo un error al crear el ítem. Verifica los datos e intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Crear Ítem</h2>
      {success && <p style={{ color: 'green' }}>Ítem creado exitosamente.</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        
        <div>
          <label>Título:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Talle:</label>
          <input
            type="text"
            name="talle"
            value={formData.talle}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Precio:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Categoría:</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Color:</label>
          <input
            type="text"
            name="color"
            value={formData.color}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Link de la imagen:</label>
          <input
            type="text"
            name="images"
            value={formData.images}
            onChange={handleChange}
            placeholder="https://example.com/images.jpg"
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Creando Ítem...' : 'Crear Ítem'}
        </button>
      </form>
    </div>
  );
};

export default CreateItemForm;