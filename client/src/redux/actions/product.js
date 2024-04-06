import axios from "axios"

export const getProductFilteredAction = (data) => async(dispatch) =>{
    try {
        dispatch({type:"LOAD_DATA_FILTER", payload: data})
    } catch (error) {
        console.log(error);
    }
}

export const loadProductDataAction = () => {
    return {
      type: "LOAD_DATA"
    };
  };
export const getProductByBrandAction = (id) => async(dispatch) =>{
    try {
        const data = await axios.get(`https://product-app-api.vercel.app/product/${id}`)
        dispatch({type:"BRAND", payload: data.data})
    } catch (error) {
        console.log(error);
    }
}

export const getProductByCategoryAction = (id) => async(dispatch) =>{
    try {
        const data = await axios.get(`https://product-app-api.vercel.app/product/category/${id}`)
        dispatch({type:"CATEGORY", payload: data.data})
    } catch (error) {
        console.log(error);
    }
}

export const getProductsAction = () => async(dispatch) =>{
    try {
        const data = await axios.get("https://product-app-api.vercel.app/product")
        dispatch({type:"GET_PRODUCTS", payload: data.data})
    } catch (error) {
        console.log(error);
    }
}

export const getNewProductsAction = () => async(dispatch) =>{
    try {
        const data = await axios.get("https://product-app-api.vercel.app/product/newProduct")
        dispatch({type:"NEW_PRODUCTS", payload: data.data})
    } catch (error) {
        console.log(error);
    }
}

