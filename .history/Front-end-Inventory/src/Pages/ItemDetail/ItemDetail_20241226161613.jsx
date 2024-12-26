import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { logoutUser, getItemsById, deleteItemById } from '../../Services/api';
import EditItem from '../EditItem/EditItem';

const ItemDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const itemData = await getItemsById(id);
        setItem(itemData);
      } catch (err) {
        console.error('Error al obtener el ítem:', err);
        setError('Hubo un error al cargar los detalles del ítem.');
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSave = (updatedItem) => {
    setItem(updatedItem);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleDelete = async () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este ítem?')) {
      try {
        await deleteItemById(id);
        alert('Ítem eliminado exitosamente.');
        navigate('/items');
      } catch (err) {
        console.error('Error al eliminar el ítem:', err);
        setError('Hubo un error al eliminar el ítem.');
      }
    }
  };

  return (
    <div>
      <h1>Detalles del Ítem</h1>
      <button onClick={handleLogout}>Cerrar sesión</button>
      {loading && <p>Cargando detalles del ítem...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {/* Condicional crucial: Renderiza EditItem SOLO si item existe */}
      {!loading && item && (
        <>
          {!isEditing ? (
            <div style={styles.card}>
              <h2>{item.title}</h2>
              <p><strong>Talle:</strong> {item.talle}</p>
              <p><strong>Precio:</strong> ${item.price}</p>
              <p><strong>Categoría:</strong> {item.category}</p>
              <p><strong>Color:</strong> {item.color}</p>
              {item.imageUrl && (
                <img src={item.imageUrl} alt={item.title} style={styles.image} />
              )}
              <button style={styles.button} onClick={handleEditClick}>Editar Ítem</button>
              <button style={styles.deleteButton} onClick={handleDelete}>Eliminar Ítem</button>
            </div>
          ) : (
            <EditItem item={item} onSave={handleSave} onCancel={handleCancel} />
          )}
        </>
      )}
    </div>
  );
};

// ... (estilos)

export default ItemDetail;