
const productReducer = (state={products:[]},action) =>{
    switch (action.type) {
       
        case "LOAD_DATA":
            const storedData = JSON.parse(localStorage.getItem("products"));
            return {
            ...state,
            products: storedData
      };  

      case "LOAD_DATA_FILTER":
        return {
        ...state,
        products: action.payload
  };  

        case "BRAND":
            localStorage.setItem("products", JSON.stringify(action.payload))

            return {
                
                products: action.payload
            }
        case "CATEGORY":
            localStorage.setItem("products", JSON.stringify(action.payload))

                return {
                    
                    products: action.payload
                }    
        case "GET_PRODUCTS":
                return {
                    products: action.payload
                }    
        case "NEW_PRODUCTS":
            return {
                products: action.payload
            }    
         

                    
    
        
    
        default:
            return state;
    }
}

export default productReducer