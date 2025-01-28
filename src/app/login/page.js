'use client';
import axios from 'axios';
import { redirect } from 'next/navigation';
import React, { useState } from 'react';
import Link from 'next/link';
import { setCookie } from 'cookies-next';
import '../styles/login.scss';
const page = () => {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = await axios.post('http://localhost:80/login', { email, phone });
        if (data.data.message == 'success') {
            const token = data.data.token;
            setCookie('hyrio', token, { path: '/', maxAge: 60 * 60 * 24 });
            return redirect('/home');
        } else {
            return redirect('/login');
        }
    }
    return (
        <div className='first'>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='Enter your email' onChange={(e) => setEmail(e.target.value)} value={email} />
                <input type="text" placeholder='Enter your phone number' onChange={(e) => setPhone(e.target.value)} value={phone} />
                <button type='submit'>Login</button>
            </form>
            <Link href={'/register'} className='second'>New User</Link>
        </div>
    )
}

export default page
