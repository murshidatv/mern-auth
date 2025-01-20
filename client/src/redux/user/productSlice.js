
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    currentProduct : null,
    loading:false,
    error:false
}

const productSlice = createSlice({
    name : 'product',
    initialState,
    reducers:{
        addProduct:(state)=>{
            state.loading=true
        },
        addProductSuccess:(state,action)=>{
            state.currentProduct=action.payload;
            state.loading=false;
            state.error=false
        },
        addProductFailure:(state,action)=>{
            state.loading=false;
            state.error=action.payload
        },
       
    }
})

export const {
    
    addProductStart,
    addProductSuccess,
    addProductFailure,
   
}=productSlice.actions;
export default productSlice.reducer;