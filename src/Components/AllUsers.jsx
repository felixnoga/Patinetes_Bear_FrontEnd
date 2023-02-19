import axios from 'axios';
import usersAPI from '../services/usersAPI'
import React, { useState, useEffect } from 'react'


const AllUsers = () => {

    const [ users, setUsers] = useState([]);

    useEffect(() => {
        const getAllUser = async() => {
           const response = await usersAPI.getAllUser();
           console.log(response);
           setUsers(response)
        }
        getAllUser();
    }, [])

    
    return (
        <div>
        
        <h1>User</h1>
        {users.map((user,i )=> (
            <li key={user.user_id}>
            {user.email}
            {user.user_name}
            </li>
        ))}
        </div>
    )
}

export default AllUsers;