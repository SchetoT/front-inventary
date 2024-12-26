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
    images: null, // Cambiar a archivo en lugar de texto
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === 'file') {
      setFormData({
        ...formData,
        [name]: files[0], // Guardamos el archivo
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const formDataToSend = new FormData(); // Usamos FormData para manejar archivos

    // Agregar los datos del formulario al FormData
    for (let key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const response = await createItem(formDataToSend); // Llamamos a la API
      console.log('Ítem creado:', response);
      setSuccess(true);

      setFormData({
        userName: '',
        title: '',
        talle: '',
        price: '',
        category: '',
        color: '',
        images: null, // Limpiamos el archivo
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
      <form onSubmit={handleSubmit} encType="multipart/form-data">
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
          <label>Imagen:</label>
          <input
            type="file"
            name="images"
            onChange={handleChange}
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
