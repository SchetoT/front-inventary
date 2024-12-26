import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createItem } from '../../Services/api';
import ImageUpload from './ImageUpload';

const CreateItem = () => {
    const [userName, setUserName] = useState('');
    const [title, setTitle] = useState('');
    const [talle, setTalle] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [color, setColor] = useState('');
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    const handleImageChange = (selectedFile) => {
        setImage(selectedFile);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('userName', userName);
        formData.append('title', title);
        formData.append('talle', talle);
        formData.append('price', price);
        formData.append('category', category);
        formData.append('color', color);
        if (image) {
            formData.append('image', image);
        }

        try {
            const response = await createItem(formData);
            navigate('/items');
        } catch (error) {
            console.error('Error al crear el ítem:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Nombre de usuario" value={userName} onChange={(e) => setUserName(e.target.value)} />
            <input type="text" placeholder="Título" value={title} onChange={(e) => setTitle(e.target.value)} />
            <input type="text" placeholder="Talle" value={talle} onChange={(e) => setTalle(e.target.value)} />
            <input type="number" placeholder="Precio" value={price} onChange={(e) => setPrice(e.target.value)} />
            <input type="text" placeholder="Categoría" value={category} onChange={(e) => setCategory(e.target.value)} />
            <input type="text" placeholder="Color" value={color} onChange={(e) => setColor(e.target.value)} />
            <ImageUpload onImageChange={handleImageChange} />
            <button type="submit">Crear Ítem</button>
        </form>
    );
};

export default CreateItem;