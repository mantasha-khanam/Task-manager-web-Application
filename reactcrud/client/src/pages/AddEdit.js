import React, {useEffect, useState} from 'react'
import {useNavigate,useParams, Link} from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const initialState ={
    name:"",
    address:"",
    contactno:"",
    emailaddress:"",
}

export default function AddEdit() {
    const [state,setState]=useState(initialState);

    const{name,address,contactno,emailaddress}=state;
    const navigate=useNavigate();
    const handleSubmit=(e)=>{
        e.preventDefault();
        if(!name || !address || !contactno || !emailaddress) {
            toast.error("Please fill all fields");
        }
        else {
        axios
        .post("http://localhost:5000/api/post",{
            name,
            address,
            contactno,
            emailaddress,
        })
        .then(()=>{
            setState({name:"",address:"",contactno:"",emailaddress:""});
        })
        .catch((err)=>
            toast.error(err.response.data));
            setTimeout(()=>navigate("/"),500);
        }
    };
    
    const handleInputChange=(e)=>{
        const {name,value}=e.target;
        setState({...state, [name]:value});
    };
  return (
    <div>
      <h2>Add Edit</h2>
      <form style={{
        margin:"auto",
        padding:"15px",
        maxWidth:"400px",
        alignContent:"center"
      }} onSubmit={handleSubmit}>
        <label htmlFor='name'>Name</label>
        <input type="text" name="name" value={name} onChange={handleInputChange}/><br/><br/>
        <label htmlFor='address'>Address</label>
        <textarea name="address" onChange={handleInputChange} value={address}></textarea><br/><br/>
        <label htmlFor='contactno'>Contact No</label>
        <input type="number" name="contactno" onChange={handleInputChange} value={contactno}/><br/><br/>
        <label htmlFor='emailaddress'>Email Address</label>
        <input type="email" name="emailaddress" value={emailaddress} onChange={handleInputChange}/><br/><br/>
        <input type="submit"/><br/><br/>
        <Link to="/">
            <input type="button" value="Back"/>
        </Link>
      </form>
    </div>
  )
}
