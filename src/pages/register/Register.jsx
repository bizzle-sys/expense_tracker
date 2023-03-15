import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { CustomInput } from '../../components/CustomInput';
import { ToastContainer, toast } from 'react-toastify';
import {createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase/Firebase-config';
import { Spinner } from 'react-bootstrap';
const inputfield = [{
    label: "first name", name: "fName" , placeholder: "sam", required: true
},
{
    label: "last name", name: "lName" , placeholder: "smith", required: true
},
{
    label: "email", name: "email", type: "email" , placeholder: "email", required: true
},
{
    label: "password", name:"password", type: "password" , placeholder: "***", required: true
},
{
    label: "confirm password", name:"confirmpassword",type: "password" , placeholder: "***", required: true,
}
    
]

function Register() {
    // local states
    const [fromDt, setFrmDt] = useState ({})
    const [error, setError] = useState ("")
    const [isLoading, setIsLoading] = useState(false)



const handleOnChange = (e) =>{
    const {name, value} = e.target   
if (name === "password"){
    
    setError ("")
    value.length < 6 && setError("password is too short")

    !/[0-9]/.test(value) && setError ("Must include number")
    !/[A-Z]/.test(value) && setError ("Must include uppercase")
    !/[a-z]/.test(value) && setError ("Must include lowercase")
}

    setFrmDt ({
        ...fromDt, 
        [name]: value,
    })
}

const handleOnSubmit = e =>{
    e.preventDefault()
    const {confirmpassword, password, email} = fromDt

    if (confirmpassword !== password) {
    return toast.error("passwrod do not match")
    } 
    toast.success("good job")

    setIsLoading(true)
    
    
    
    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    console.log(userCredential)
    // const user = userCredential.user;
    setIsLoading(false)
    // ...
  })
  .catch((error) => {
    // const errorCode = error.code;
    // const errorMessage = error.message;
    // ..
  });
        
    
    

    console.log(fromDt)
}
  return (
    
    
    <div className="form-container">
    <Form onSubmit={handleOnSubmit}  className='border p-5 rounded shadow-lg'>
        <h3>Join Us</h3>
        <hr />
               {inputfield.map((item, i) =>(<CustomInput onChange = {handleOnChange} key={i} {...item}/>))}
               <div className="p3 mb-4">
                <Form.Text>
                    password should meet criteria

                    {error &&
                    <ul>
                        <li className='text-danger'>
                            {error}
                        </li>
                    </ul>
                    }
                   
                </Form.Text>
               </div>
    
        
   

  
    <Button variant="primary" type="submit" disabled= {error}>
        {isLoading ? <Spinner animation='border'/> : "Submit"}
    </Button>
  </Form>
  </div>
  )
}

export default Register
