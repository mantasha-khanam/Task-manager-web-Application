import React, {useState, useEffect} from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import { Toast } from 'react-toastify';
import axios from 'axios';

export default function Home() {
    const [data,setData] = useState([]);
    const loadData=async()=>{
        const response= await axios.get("http://localhost:5000/api/get");
        setData(response.data);
    }
    useEffect(()=>{
        loadData();
    },[]);
    const deleteUser=(id)=>{
        if(window.confirm("Are you sure?")){
          axios.delete(`http://localhost:5000/delete/${id}`);
          setTimeout(()=>loadData(),500);
        }
    };
  return (
    <div>
      <h2>Home</h2>
      <Link to="/addUser">
        <button >Add New User</button>
      </Link>
      <br/><br/>
      <table border="1" style={{margin:"0 auto", width:"80%"}}>
        <thead>
        <tr>
            <th style={{textAlign:'center'}}>Id</th>
            <th style={{textAlign:'center'}}>Name</th>
            <th style={{textAlign:'center'}}>Address</th>
            <th style={{textAlign:'center'}}>Contact No</th>
            <th style={{textAlign:'center'}}>Email Address</th>
            <th style={{textAlign:'center'}}>Delete</th>
        </tr>
        </thead>
        <tbody>
            {data.map((item,index)=>{
                return(
                    <tr key={item.id}>
                        <th scope='row'>{index+1}</th>
                        <td>{item.name}</td>
                        <td>{item.address}</td>
                        <td>{item.contactno}</td>
                        <td>{item.emailaddress}</td>
                        
                        <td>
                           <button onClick={()=>deleteUser(item.id)}>Delete</button>
                          
                        </td>
                    </tr>
                );
            })}
        </tbody>
      </table>
    </div>
  )
}
