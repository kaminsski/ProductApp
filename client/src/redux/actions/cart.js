import axios from "axios"

export const loadCartAction = () => {
    return {
      type: "LOAD_CART"
    };
  };

export const getCartAction = (id) => async(dispatch) =>{
    try {
        const response = await axios.get(`https://product-app-api.vercel.app/cart/${id}`)
        dispatch({type:"GET_CART", payload: response.data})
    } catch (error) {
        console.log(error);
    }
}

export const deleteCartAction = (id) => async(dispatch) =>{
    try {
        await axios.delete(`http://localhost:5002/deletepost/${id}`)

        dispatch({type:"DELETE_CART", payload: id})


    } catch (error) {
        console.log(error);
    }
}

export const createCartAction = (user) => async(dispatch) =>{
    try {
        const data = await axios.post("https://product-app-api.vercel.app/cart",user)
        dispatch({type:"CREATE_CART", payload: data.data})
    } catch (error) {
        console.log(error);
    }
}

export const updateCartAction = (id,postData) => async(dispatch) =>{
    try {
        const data = await axios.put(`https://product-app-api.vercel.app/cart/${id}`, postData)
        dispatch({type:"UPDATE_CART", payload: data.data})
    } catch (error) {
        console.log(error);
    }
}