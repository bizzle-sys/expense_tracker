import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';

import { Form, Toast } from 'react-bootstrap'
import {Button} from 'react-bootstrap'
import { CustomInput } from '../../components/CustomInput';
import { auth, db } from '../../firebase/Firebase-config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../register-login/userSlice';
import { useEffect } from 'react';


function Login() {
  const navigate = useNavigate()

  const [formDt, setFormDt] = useState({})
  const {user} = useSelector((state)=>state.userInfo)
  useEffect(()=>{user?.uid && navigate("/dashboard")},[user?.uid, navigate])
  const handleOnChange = e =>{
    const {name, value} = e.target
    setFormDt({
      ...formDt, [name]:value
    })
  }
  const handleOnSubmit = async e =>{
    e.preventDefault()
    const  {email, password} = formDt
    
    try{
      const respPending = signInWithEmailAndPassword(auth, email, password)
      toast.promise(respPending, {
        pending: "please wait"
      })
      const{}= await respPending
    }
    catch (error){
      toast.error(error.message)
    }
  }
  const inputfield = [{
label: "email", name: "email", type: "email" , placeholder: "email", required: true
},
{
    label: "password", name:"password", type: "password" , placeholder: "***", required: true
}
    
]
  return (
    <div className="form-container">
    <Form onSubmit={handleOnSubmit}  className='border p-5 rounded shadow-lg'>
        <h3>Join Us</h3>
        <hr />
               {inputfield.map((item, i) =>(<CustomInput onChange = {handleOnChange} key={i} {...item}/>))}
               
    
        <Button variant="primary" type="submit" >
        
    </Button>
  </Form>
  </div>
  )
}

export default Login
