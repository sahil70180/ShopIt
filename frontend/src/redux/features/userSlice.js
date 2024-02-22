// slice is a collection of reducer logic and actions for single feature for our app
import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    user : null,
    isAuthenticated : false
}
// creating user Slice
export const userSlice = createSlice({
    initialState,
    name : "userSlice",
    reducers : {
        setUser(state, action){
            state.user  = action.payload;
        },
        setIsAuthenticated(state, action){
            state.isAuthenticated = action.payload;
        } 
    }
})

export default userSlice.reducer;
export const  {setIsAuthenticated, setUser} = userSlice.actions