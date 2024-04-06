const authFormReducer = (state={authForm:true}, action) => {
    switch (action.type) {
        case "FORM":
            
            return {authForm:  action.payload}
            
     
            
            
    
        default:
            return state
    }
}
export default authFormReducer