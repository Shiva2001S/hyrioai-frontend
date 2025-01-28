'use client';
import '../styles/home.scss';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import React, { useState } from 'react'
const Item = ({ job, desc, exp, dat, senderMail }) => {
    const formattedDate = new Date(dat).toISOString().split('T')[0];
    const [email, setEmail] = useState('');
    const handleSubmit = async(e)=>{
        e.preventDefault(); 
        const token = getCookie('hyrio');
        const data = await axios.post('http://localhost:80/add', {email, token});
    }
    const sendUpdate = async (e) => {
        e.preventDefault(); 
        const data = await axios.post('http://localhost:80/notify', {senderMail, job, desc, exp, dat});
    }
    return (
        <div className='item'>
            <p>{job}</p>
            <p>{desc} </p>
            <p>{exp} </p>
            <p>{formattedDate} </p>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='enter candidate email' onChange={e => setEmail(e.target.value)} value={email} />
                <button type='submit'>Add email</button>
            </form>
            <button onClick={sendUpdate}>Send Notification</button>
        </div>
    )
}

export default Item
