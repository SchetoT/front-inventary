

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Para la navegación
import { getItems } from '../../Services/api';

const ItemView = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook de React Router para navegación

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await getItems(); // Llama a la API para obtener los ítems
        setItems(response);
      } catch (err) {
        console.error('Error al obtener los ítems:', err);
        setError('Hubo un error al cargar los ítems.');
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const handleItemClick = (id) => {
    console.log("id   "+id)
    navigate(`/items/${id}`); // Navega a la página de detalles del ítem
  };

  return (
    <div>
      <h2>Lista de Ítems</h2>
      {loading && <p>Cargando ítems...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && items.length === 0 && <p>No hay ítems disponibles.</p>}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {items.map((item) => (
          <div
            key={item._id}
            style={styles.card}
        
            onClick={() => handleItemClick(item._id)}// Agrega el manejador de clics
          >
            <h3>{item.title}</h3>
            <p><strong>Talle:</strong> {item.talle}</p>
            <p><strong>Precio:</strong> ${item.price}</p>
            <p><strong>Categoría:</strong> {item.category}</p>
            <p><strong>Color:</strong> {item.color}</p>
            {item.imageUrl && (
              <img
                src={item.imageUrl}
                alt={item.title}
                style={styles.image}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Estilos para las tarjetas
const styles = {
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '16px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    maxWidth: '250px',
    textAlign: 'center',
    cursor: 'pointer', // Cambia el cursor al pasar el mouse
    transition: 'transform 0.2s',
  },
  cardHover: {
    transform: 'scale(1.05)', // Efecto hover
  },
  image: {
    width: '100%',
    height: 'auto',
    marginTop: '10px',
    borderRadius: '8px',
  },
};

export default ItemView;
