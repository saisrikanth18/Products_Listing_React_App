import { ActionTypes } from "../constants/action-types";
import axios from 'axios';

export const setProducts = (products) => {
    return {
        type: ActionTypes.SET_PRODUCTS,
        payload: products,
    };
};

export const selectedProduct = (product) => {
    return {
        type: ActionTypes.SELECTED_PRODUCT,
        payload: product,
    };
};


export const removeSelectedProduct = (product) => {
    return {
        type: ActionTypes.REMOVE_SELECTED_PRODUCT,
        payload: product,
    };
};


export const loadProducts = () => {
    return function (dispatch) {
        axios.get(`${process.env.REACT_APP_API}`)
            .then((resp) => {
                console.log("reps ", resp);
                dispatch(setProducts(resp.data));
            })
            .catch((error) => console.log(error));
    }
}


const productAdded = () => ({
    type: ActionTypes.ADD_PRODUCT,
});

export const addProduct = (product) => {
    return function (dispatch) {
        axios.post(`${process.env.REACT_APP_API}`, product)
            .then((resp) => {
                console.log("reps ", resp);
                dispatch(productAdded());
            })
            .catch((error) => console.log(error));
    }
}


const productDeleted = () => ({
    type: ActionTypes.DELETE_PRODUCT,
});

export const deleteProduct = (id) => {
    return function (dispatch) {
        axios.delete(`${process.env.REACT_APP_API}/${id}`)
            .then((resp) => {
                console.log("reps ", resp);
                dispatch(productDeleted());
                dispatch(loadProducts());
            })
            .catch((error) => console.log(error));
    }
}