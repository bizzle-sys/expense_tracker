import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { CustomInput } from '../../components/CustomInput';
import { ToastContainer, toast } from 'react-toastify';
import {createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from '../../firebase/Firebase-config';
import { Spinner } from 'react-bootstrap';
import { doc, setDoc } from "firebase/firestore"; 
import { useNavigate } from 'react-router-dom';


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
    const navigate = useNavigate()
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

    setIsLoading(true)
    
    
    
    createUserWithEmailAndPassword(auth, email, password)
  .then(async(userCredential) => {
    // Signed in 
    const user = userCredential.user;
    setIsLoading(false)

    updateProfile(user, {displayName: fromDt.fName})

    await setDoc(doc(db, "users", user.uid), {
        fName: fromDt.fName,
       lName: fromDt.lName,
        email: fromDt.email,
      });
       toast.success("good job")
      
      navigate('/dashboard')
    
    // ...
  })
  .catch((error) => {
    setIsLoading(false)
    let message 
    if (error.message.includes('auth/email-already-in-use')) {
        message = "user exists"
    }
    toast.error(message)
    // const errorCode = error.code;
    // const errorMessage = error.message;
    // ..
  })

  setFrmDt({})
        
    
    

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
