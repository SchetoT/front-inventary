import React, { useEffect, useState } from 'react';
import { getItems, deleteItemById } from '../Items'; // Asumiendo que tienes estas funciones para obtener y eliminar ítems
import { Link } from 'react-router-dom';

const Items = () => {
  const [items, setItems] = useState([]);
  const [searchId, setSearchId] = useState('');
  
  useEffect(() => {
    // Cargar todos los ítems cuando el componente se monte
    const fetchItems = async () => {
      try {
        const data = await getItems();
        setItems(data);
      } catch (error) {
        console.error('Error al obtener los ítems:', error);
      }
    };
    fetchItems();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteItemById(id); // Eliminar ítem
      setItems(items.filter(item => item.id !== id)); // Actualizar el estado para eliminarlo de la vista
    } catch (error) {
      console.error('Error al eliminar el ítem:', error);
    }
  };

  const handleSearch = async () => {
    if (searchId) {
      try {
        const item = await getItemsById(searchId); // Función para obtener un ítem por su ID
        setItems([item]); // Mostrar solo el ítem encontrado
      } catch (error) {
        console.error('Error al buscar el ítem:', error);
      }
    }
  };

  return (
    <div>
      <h2>Todos los Ítems</h2>
      <div>
        <input 
          type="text" 
          placeholder="Buscar por ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <button onClick={handleSearch}>Buscar</button>
      </div>
      <div>
        <Link to="/createitem">Crear un nuevo ítem</Link>
      </div>
      <ul>
        {items.length > 0 ? (
          items.map(item => (
            <li key={item.id}>
              {item.name}
              <button onClick={() => handleDelete(item.id)}>Eliminar</button>
            </li>
          ))
        ) : (
          <p>No hay ítems disponibles.</p>
        )}
      </ul>
    </div>
  );
};

export default Items;
