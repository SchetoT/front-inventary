import React, { useEffect, useState } from 'react';
import { updateItemById } from '../../Services/api';


const EditItem = ({ item, onSave, onCancel }) => {
  const [editData, setEditData] = useState({}); // Inicializa con un objeto vacío

  useEffect(() => {
    if (item) {
      setEditData(item);
    }
  }, [item]); // Actualiza editData cuando cambia item

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await updateItemById(item._id, editData); // item._id ya será seguro aquí
      onSave(editData);
    } catch (err) {
      console.error('Error al actualizar el ítem:', err);
    }
  };

  if (!item) {
    return <p>Cargando datos del ítem...</p>; 
  }

  return (
    <div style={styles.form}>
      <h2>Editar Ítem</h2>
      <label>
        Title:
        <input
          type="text"
          name="title"
          value={editData.title || ''} // Valor por defecto para title
          onChange={handleChange}
        />
      </label>
      <label>
        Talle:
        <input
          type="text"
          name="talle"
          value={editData.talle || ''} // Valor por defecto para talle
          onChange={handleChange}
        />
      </label>
      <label>
        Price:
        <input
          type="number"
          name="price"
          value={editData.price || ''} // Valor por defecto para price
          onChange={handleChange}
        />
      </label>
      <label>
        Category:
        <input
          type="text"
          name="category"
          value={editData.category || ''} // Valor por defecto para category
          onChange={handleChange}
        />
      </label>
      <label>
        Color:
        <input
          type="text"
          name="color"
          value={editData.color || ''} // Valor por defecto para color
          onChange={handleChange}
        />
      </label>
      <label>
        Link Image:
        <input
          type="text"
          name="images"
          value={editData.images || ''} // Valor por defecto para images
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

