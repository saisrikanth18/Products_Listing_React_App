import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeSelectedProduct, selectedProduct } from "../redux/actions/productActions";
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const ProductDetail = () => {
    let navigate = useNavigate();
    const product = useSelector((state) => state.product);
    const { thumbnail, title, price, category, description, discountPercentage, rating, stock, brand } = product;
    const { productId } = useParams();
    const dispatch = useDispatch();
    console.log(product)

    const fetchProductDetails = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API}/${productId}`)
            .catch((err) => {
                console.log("Err ", err);
            });

        dispatch(selectedProduct(response.data));
    }

    useEffect(() => {
        if (productId && productId !== "") fetchProductDetails();
        return () => {
            dispatch(removeSelectedProduct());
        }
    }, [productId]);


    return (
        <div>
            <div style={{ margin: '50px' }}>
            <Button style={{ marginTop: '20px' }} variant="contained" color="primary" onClick={() => { navigate(-1) }}>
                Go Back
            </Button>
                {Object.keys(product).length === 0 ? (
                    <div>...Loading</div>
                ) : (
                    <div className="ui placeholder segment">
                        <div className="ui two column stackable grid">
                            <div className="ui vertical divider"></div>
                            <div className="middle aligned row">
                                <div className="column lp">
                                    <img style={{height:'100%', width:'100%'}} className="ui fluid image" src={thumbnail} />
                                </div>
                                <div className="column rp">
                                    <h3 className="ui brown block header center aligned">{category}</h3>
                                    <h1>{title}</h1>
                                    <p>{description}</p>
                                    <h2>
                                        <a className="ui teal tag label">Price : $ {price}</a>
                                    </h2>
                                    <div class="ui divider"></div>
                                    <p>Discount : {discountPercentage} %</p>
                                    <p>Rating : {rating}</p>
                                    <p>Stock : {stock}</p>
                                    <p>Brand : {brand}</p>
                                    <div className="ui vertical animated button" tabIndex="0">
                                        <div className="hidden content">
                                            <i className="shop icon"></i>
                                        </div>
                                        <div className="visible content">Add to Cart</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProductDetail