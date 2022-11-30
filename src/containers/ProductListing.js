import React, { useEffect } from "react";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import ProductComponent from './ProductComponent';
import { setProducts } from '../redux/actions/productActions';

const ProductListing = () => {
    const products = useSelector((state) => state);
    const dispatch = useDispatch();

    const fetchProducts = async () => {
        const response = await axios
            .get(`${process.env.REACT_APP_API}`)
            .catch((err) => {
                console.log("Err: ", err);
            });

        dispatch(setProducts(response.data));
    }
    
    useEffect(() => {
        fetchProducts();
    }, []);

    console.log("Products: ", products )

    return (
        <div style={{margin:'0 50px 10px 50px', overflowX:'hidden'}}>
            <ProductComponent />
        </div>
    )
}

export default ProductListing