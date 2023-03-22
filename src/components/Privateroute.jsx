import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export const Privateroute = ({children}) => {
    // bring data from redux store
    const {user} = useSelector((state)=>{
        return state.userInfo
    })
    console.log(user)
  return user ? children: <Navigate to ="/" replace />
}
