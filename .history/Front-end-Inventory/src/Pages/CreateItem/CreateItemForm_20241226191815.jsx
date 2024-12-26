import React, { useState } from 'react';
import { createItem } from '../../Services/api';

const CreateItemForm = () => {
  const [formData, setFormData] = useState({
    userName: '', 
    title: '',
    talle: '',
    price: '',
    category: '',
    color: '',
    images: '', // Aquí se dejará de usar texto y pasaremos a ser un archivo
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({
        ...formData,
        [name]: files[0],  // Usamos el primer archivo del input de tipo "file"
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

    // Crear un objeto FormData
    const data = new FormData();
    // Agregar los campos del formulario al FormData
    for (let key in formData) {
      data.append(key, formData[key]);
    }

    try {
      // Usar la función `createItem` para enviar los datos con el archivo
      const response = await createItem(data);  // Usamos FormData en vez de objeto normal
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
        images: '', // Limpiar campo de imagen
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
            name="images"  // Aquí cambia a "file"
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
