
const colorReducer = (state={colors:[]},action) =>{
    switch (action.type) {
        case "GET_COLOR":
            return {
                colors: action.payload
            }
        case "CREATE_COLOR":
            return {
                colors: [...state.brands ,action.payload]
            
            }    
        case "DELETE_COLOR":
            return {
                colors: [...state.brands.filter((post) => post._id !== action.payload)]
            
            }   

        case "UPDATE_COLOR":
            return {
                colors: [...state.brands.map(color => color._id === action.payload._id ? action.payload : color)]
            
            }   
            
    
        default:
            return state;
    }
}

export default colorReducer