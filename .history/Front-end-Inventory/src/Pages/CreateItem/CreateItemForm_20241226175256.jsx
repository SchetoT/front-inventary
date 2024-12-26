import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createItem } from '../../Services/api';
import ImageUpload from '.../'; // Importa el componente

const CreateItem = () => {
    const [formData, setFormData] = useState({
        userName: '',
        title: '',
        talle: '',
        price: '',
        category: '',
        color: '',
    });
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (selectedFile) => {
        setImage(selectedFile);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        for (const key in formData) {
            data.append(key, formData[key]);
        }
        if (image) {
            data.append('image', image);
        }

        try {
            await createItem(data);
            navigate('/items');
        } catch (error) {
            console.error('Error al crear el ítem:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="userName" placeholder="Nombre de usuario" value={formData.userName} onChange={handleChange} />
            <input type="text" name="title" placeholder="Título" value={formData.title} onChange={handleChange} />
            <input type="text" name="talle" placeholder="Talle" value={formData.talle} onChange={handleChange} />
            <input type="number" name="price" placeholder="Precio" value={formData.price} onChange={handleChange} />
            <input type="text" name="category" placeholder="Categoría" value={formData.category} onChange={handleChange} />
            <input type="text" name="color" placeholder="Color" value={formData.color} onChange={handleChange} />
            <ImageUpload onImageChange={handleImageChange} />
            <button type="submit">Crear Ítem</button>
        </form>
    );
};

export default CreateItem;