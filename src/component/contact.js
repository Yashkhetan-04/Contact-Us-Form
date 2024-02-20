import React from "react";
import './contact.css';
import { useState } from "react";
const Contact = () => {
    
    const [user , setUser] = useState({
        name:"",
        email:"",
        message:"",
    })

    const getUserInput = (e) => {
       let  name = e.target.name;
        let value = e.target.value;

        setUser({...user, [name]:value})
    }

    const UploadDataToFirebase = async (e) => {
        e.preventDefault();

        const {name , email , message} = user;

        if(name && email && message){

            const res = await fetch("https://contact-us-form-4c629-default-rtdb.firebaseio.com/Contact-Us.json" , {
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify({
                    name,
                    email,
                    message,
                })
    
            })
    
            if(res){
                setUser({
                    name:"",
                    email:"",
                    message:""
                })
                alert("Data Stored Successfully");
            }
        }
        else{
            alert("Fill all the inputs");
        }
    }

    return(
        <div class="container">
        <h1>CONTACT US</h1>

        <form action="" method="POST">
            <div class="form-group">
                <input type="text" name="name" placeholder="Enter name" value={user.name} onChange={getUserInput} required/>
            </div>
            <div class="form-group">
                <input type="email" name="email" placeholder="Enter email" value={user.email} onChange={getUserInput} required/>
            </div>
            <div class="form-group">
                 <textarea cols="" rows="5" name="message" placeholder="Enter your Message..." value={user.message} onChange={getUserInput} required></textarea>
            </div>

            <input id="btn" type="submit" value="Send" onClick={UploadDataToFirebase} />

        </form>
    </div>
    )
}

export default Contact;