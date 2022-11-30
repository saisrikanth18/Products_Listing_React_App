import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addProduct } from '../redux/actions/productActions';

const AddProduct = () => {
    let navigate = useNavigate();
    let dispatch = useDispatch();

    const [state, setState] = useState({
        title: "",
        description: "",
        price: "",
        discountPercentage: "",
        rating: "",
        stock: "",
        brand: "",
        category: "",
        thumbnail: "",
        images: [],
    });
    const [error, setError] = useState("");

    const { description, title, price, discountPercentage, rating, stock, brand, category, thumbnail, images } = state;

    const handleInputChange = (e) => {
        let { name, value } = e.target;
        setState({ ...state, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!description || !title || !price || !discountPercentage || !rating || !stock || !brand || !category || !thumbnail || !images) {
            setError("Please enter all input fields")
        } else {
            dispatch(addProduct(state));
            navigate('/');
            setError("");
        }
    }

    return (
        <div style={{ textAlign:'center' }}>
            <Button
                style={{ width: '100px', marginTop: '20px' }}
                variant="contained"
                color="secondary"
                onClick={() => { navigate(-1) }}
            >
                Go Back
            </Button>
            <h2>Add New Product</h2>
            {error && <h3 style={{ color: 'red' }}>{error}</h3>}
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '65ch' },
                }}
                noValidate
                autoComplete="off"
                style={{ marginTop: 50}}
                onSubmit={handleSubmit}
            >
                <TextField id="outlined-basic" label="title" variant="outlined" value={title} name="title" type="text" onChange={handleInputChange} />
                <br />
                <TextField id="outlined-basic" label="description" variant="outlined" value={description} name="description" type="text" onChange={handleInputChange} />
                <br />
                <TextField id="outlined-basic" label="price" variant="outlined" value={price} name="price" type="number" onChange={handleInputChange} />
                <br />
                <TextField id="outlined-basic" label="discountPercentage" variant="outlined" value={discountPercentage} name="discountPercentage" type="number" onChange={handleInputChange} />
                <br />
                <TextField id="outlined-basic" label="rating" variant="outlined" value={rating} name="rating" type="number" onChange={handleInputChange} />
                <br />
                <TextField id="outlined-basic" label="stock" variant="outlined" value={stock} name="stock" type="number" onChange={handleInputChange} />
                <br />
                <TextField id="outlined-basic" label="brand" variant="outlined" value={brand} name="brand" type="text" onChange={handleInputChange} />
                <br />
                <TextField id="outlined-basic" label="category" variant="outlined" value={category} name="category" type="text" onChange={handleInputChange} />
                <br />
                <TextField id="outlined-basic" label="thumbnail URL" variant="outlined" value={thumbnail} name="thumbnail" type="url" onChange={handleInputChange} />
                <br />
                <TextField id="outlined-basic" label="image URL" variant="outlined" value={images} name="images" type="url" onChange={handleInputChange} />
                <br />

                <Button
                    style={{ width: '100px' }}
                    variant="contained"
                    color="primary"
                    type="submit"
                >
                    Submit
                </Button>
            </Box>
        </div>
    )
}

export default AddProduct;