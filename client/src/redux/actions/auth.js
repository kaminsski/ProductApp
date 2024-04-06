
import axios from "axios"
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';



export const loadDataAction = () => {
    return {
      type: "LOAD_DATA"
    };
  };

  export const logoutAction = () => async(dispatch) => {
    try {


        dispatch({ type: "LOGOUT" });

        window.location = "/";
    } catch (error) {
        console.log(error);
    }
  };

export const registerAction = (authData) => async(dispatch) =>{
    try {
        const response = await axios.post("https://product-app-api.vercel.app//auth/register", authData);
        const data = await axios.post("https://product-app-api.vercel.app//cart",{ user: response.data._id })

        await dispatch({type:"CREATE_CART", payload: data.data});

        await dispatch({type:"REGISTER", payload: response.data});
        window.location = "/"

    } catch (error) {
        toast.error(error.response.data.message, {
            position:"top-right",
            autoClose:5000
        })
    }
};

export const loginAction = (authData) => async(dispatch) =>{
    try {
        const response = await axios.post("https://product-app-api.vercel.app//auth/login", authData);
        dispatch({type:"LOGIN", payload: response.data});
        window.location = "/"

    }  catch (error) {
        toast.error(error.response.data.msg, {
            position:"top-right",
            autoClose:5000
        });
    }
}
