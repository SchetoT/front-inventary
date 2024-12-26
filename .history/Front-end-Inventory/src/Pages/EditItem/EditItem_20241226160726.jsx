import React, { useState } from 'react';
import { updateItemById } from '../../Services/api';


const EditItem = ({ item, onSave, onCancel }) => {
  const [editData, setEditData] = useState(item);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      await updateItemById(item._id, editData); // Llama a la API para actualizar el ítem
      onSave(editData); // Notifica al componente padre con los datos actualizados
    } catch (err) {
      console.error('Error al actualizar el ítem:', err);
      setError('Hubo un error al actualizar el ítem.');
    }
  };

  return (
    <div style={styles.form}>
      <h2>Editar Ítem</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <label>
        Title:
        <input
          type="text"
          name="title"
          value={editData.title}
          onChange={handleChange}
        />
      </label>
      <label>
        Talle:
        <input
          type="text"
          name="talle"
          value={editData.talle}
          onChange={handleChange}
        />
      </label>
      <label>
        Price:
        <input
          type="number"
          name="price"
          value={editData.price}
          onChange={handleChange}
        />
      </label>
      <label>
        Category:
        <input
          type="text"
          name="category"
          value={editData.category}
          onChange={handleChange}
        />
      </label>
      <label>
        Color:
        <input
          type="text"
          name="color"
          value={editData.color}
          onChange={handleChange}
        />
      </label>
      <label>
        Link Image:
        <input
          type="text"
          name="images"
          value={editData.images}
          onChange={handleChange}
        />
      </label>
      <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
        <button style={styles.button} onClick={handleSave}>Guardar Cambios</button>
        <button style={styles.buttonCancel} onClick={onCancel}>Cancelar</button>
      </div>
    </div>
  );
};

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    maxWidth: '400px',
    margin: '20px auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  buttonCancel: {
    padding: '10px 20px',
    backgroundColor: '#DC3545',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default EditItem;

