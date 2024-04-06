import {applyMiddleware, combineReducers, createStore} from "redux"
import {composeWithDevTools} from "@redux-devtools/extension"
import {thunk} from "redux-thunk"
import authReducer from "./reducers/auth"
import authFormReducer from "./reducers/authForm"
import brandReducer from "./reducers/brand"
import categoryReducer from "./reducers/category"
import colorReducer from "./reducers/color"
import productReducer from "./reducers/product"
import cartReducer from "./reducers/cart"

const intialState = {

}

const reducers = combineReducers({
    auth :authReducer,
    authForm: authFormReducer,
    brands : brandReducer,
    categories: categoryReducer,
    colors: colorReducer,
    products:productReducer,
    cart:cartReducer

   

})
const store = createStore(reducers, intialState, composeWithDevTools(applyMiddleware(thunk)))

export default store