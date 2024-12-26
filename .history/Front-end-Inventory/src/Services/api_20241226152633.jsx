import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/api",
  headers: {
    'Content-Type': 'application/json',
  },
});


// Interceptor para incluir el token en las solicitudes
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Obtener el token desde localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Función para registrar un usuario
export const registerUser = async (userData) => {
  try {
    console.log("Datos enviados para el registro:", userData);
    console.log('URL base de la API:', import.meta.env.VITE_API_URL); 
    const response = await api.post('/auth/register', userData);

    console.log('Datos de la respuesta:', response.data);

    // Guardar el token y el ID del usuario en localStorage si existen
    if (response.data) {
      if (response.data.accessToken) {
        localStorage.setItem('token', response.data.accessToken);
        console.log('Token guardado en localStorage:', localStorage.getItem('token'));
      }
      if (response.data.id) {
        localStorage.setItem('id', response.data.id);
        console.log('ID del usuario guardado en localStorage:', localStorage.getItem('id'));
      }
    }

    return response.data; // Devuelve la respuesta de la API
  } catch (error) {
    console.error('Error registrando al usuario:', error.response?.data || error.message);
    throw error;
  }
};

// Función para iniciar sesión
export const signInUser = async (userData) => {
  try {
    console.log("Datos enviados para iniciar sesión:", userData);

    const response = await api.post('/auth/login', userData);

    console.log('Respuesta del servidor:', response.data);

    // Guardar el token y el ID del usuario en localStorage si existen
    if (response.data) {
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        console.log('Token guardado en localStorage:', localStorage.getItem('token'));
      }
      if (response.data.id) {
        localStorage.setItem('id', response.data.id);
        console.log('ID del usuario guardado en localStorage:', localStorage.getItem('id'));
      }
    }

    return response.data; // Devuelve la respuesta de la API
  } catch (error) {
    console.error('Error al iniciar sesión:', error.response?.data || error.message);
    throw error;
  }
};

// Función para desloguearse
export const logoutUser = () => {
  try {
    // Elimina el token y el ID del usuario de localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    console.log('Usuario deslogueado correctamente.');

    // Opcional: redirigir al usuario a la página de inicio de sesión
    window.location.href = '/login'; // Asegúrate de que la ruta '/login' exista
  } catch (error) {
    console.error('Error al desloguearse:', error.message);
  }
};

// Función para crear un ítem
export const createItem = async (itemData) => {
  try {
    const id = localStorage.getItem('id'); // Obtener el ID del usuario desde localStorage
    if (!id) throw new Error('ID del usuario no encontrado en localStorage.');

    const dataWithid = {
      ...itemData,
      userName: id, // Asignar automáticamente el ID del usuario
    };

    console.log("este es lo que se envia a back")
    console.log(dataWithid)
    const response = await api.post('/items', dataWithid);
    console.log('Item creado:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al crear el ítem:', error.response?.data || error.message);
    throw error;
  }
};

export const getItems = async () => {
  try {
    const response = await api.get('/items'); // Usa la instancia configurada de api
    console.log('Datos recibidos de la API:', response.data);
    return response.data; // Devuelve los datos obtenidos
  } catch (error) {
    console.error('Error al obtener los ítems:', error.response?.data || error.message);
    throw error; // Maneja los errores correctamente
  }
};

export const getItemsById = async (id) => {
  try {
    console.log("id "+id)
    const response = await api.get('/items/'+id); // Usa la instancia configurada de api
    console.log('Datos recibidos de la API:', response.data);
    return response.data; // Devuelve los datos obtenidos
  } catch (error) {
    console.error('Error al obtener los ítems:', error.response?.data || error.message);
    throw error; // Maneja los errores correctamente
  }
};

export const updateItemById = async (id, itemData) => {
  try {
    console.log("Datos enviados para la actualización:", itemData);

    const response = await api.put(`/items/${id}`, itemData);

    console.log('Ítem actualizado:', response.data);

    return response.data; // Devuelve la respuesta de la API
  } catch (error) {
    console.error('Error al actualizar el ítem:', error.response?.data || error.message);
    throw error; // Maneja los errores correctamente
  }
};

// Función para eliminar un ítem por su ID
export const deleteItemById = async (id) => {
  try {
    console.log(`Eliminando ítem con ID: ${id}`);

    const response = await api.delete(`/items/${id}`);

    console.log('Ítem eliminado:', response.data);

    return response.data; // Devuelve la respuesta de la API
  } catch (error) {
    console.error('Error al eliminar el ítem:', error.response?.data || error.message);
    throw error; // Maneja los errores correctamente
  }
};



export default api;