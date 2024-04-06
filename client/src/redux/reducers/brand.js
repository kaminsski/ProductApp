
const brandReducer = (state={brands:[]},action) =>{
    switch (action.type) {
        case "GET_BRANDS":
            return {
                brands: action.payload
            }
        case "CREATE_BRAND":
            return {
                brands: [...state.brands ,action.payload]
            
            }    
        case "DELETE_BRAND":
            return {
                brands: [...state.brands.filter((post) => post._id !== action.payload)]
            
            }   

        case "UPDATE_BRAND":
            return {
                brands: [...state.brands.map(brand => brand._id === action.payload._id ? action.payload : brand)]
            
            }   
            
    
        default:
            return state;
    }
}

export default brandReducer