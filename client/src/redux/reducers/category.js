
const categoryReducer = (state={categories:[]},action) =>{
    switch (action.type) {
        case "GET_CATEGORY":
            return {
                categories: action.payload
            }
        case "CREATE_CATEGORY":
            return {
                categories: [...state.brands ,action.payload]
            
            }    
        case "DELETE_CATEGORY":
            return {
                categories: [...state.brands.filter((post) => post._id !== action.payload)]
            
            }   

        case "UPDATE_CATEGORY":
            return {
                categories: [...state.brands.map(category => category._id === action.payload._id ? action.payload : category)]
            
            }   
            
    
        default:
            return state;
    }
}

export default categoryReducer