import { configureStore } from '@reduxjs/toolkit'
import userReducer from './pages/register-login/userSlice'
const Store =  configureStore({
  reducer: {
    user: userReducer,
  }
})
export default Store

