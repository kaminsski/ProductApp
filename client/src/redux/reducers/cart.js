
const cartReducer = (state={cart:[]},action) =>{
    switch (action.type) {
        case "LOAD_CART":
            const storedData = JSON.parse(localStorage.getItem("cart"));
            return {
                ...state,
                cart: storedData || [] 
        }

        case "GET_CART":
            return {
                cart: action.payload
            }
        case "CREATE_CART":
            
            return {
                cart: [...state.cart ,action.payload]
            
            }    
        case "DELETE_CART":
            return {
                cart: [...state.cart.filter((post) => post._id !== action.payload)]
            
            }   

        case "UPDATE_CART":
            localStorage.setItem("cart", JSON.stringify(action.payload))

            return {
                cart: [...state.cart.map(cart => cart._id === action.payload._id ? action.payload : cart)]
            
            }   
            
    
        default:
            return state;
    }
}

export default cartReducer