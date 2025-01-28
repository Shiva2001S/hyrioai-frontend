'use client';
import '../styles/register.scss';
import axios from 'axios';
import { redirect } from 'next/navigation';
import React, { useState } from 'react';
import Link from 'next/link';
import { setCookie } from 'cookies-next';
const page = () => {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [isVerify, setIsverify] = useState(false);
    const [otp, setOtp] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await axios.post('http://localhost:80/register', { email, phone, otp });
        if (data.data.message == 'success') {
            setCookie('hyrio', data.data.token, { path: '/', maxAge: 60 * 60 * 24 });
            setIsverify(true);
            return redirect('/home');
        } else {
            return redirect('/register');
        }
    }

    const handleOtp = async (e) => {
        e.preventDefault();
        const data = await axios.post('http://localhost:80/getotp', { email, phone });
        setOtp(data.data.otp);
    }
    return (
        <div className='first'>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='Enter your email' onChange={(e) => setEmail(e.target.value)} value={email} />
                <input type="text" placeholder='Enter your phone number' onChange={(e) => setPhone(e.target.value)} value={phone} />
                <button type='submit'>Register</button>
            </form>
            <div>

                {
                    isVerify == false ? <input className='otp' type='text' placeholder='Enter otp' onChange={(e) => setOtp(e.target.value)} value={otp} /> : <h1>Number and Email is verified</h1>
                }
                {
                    isVerify == false ? <button className='btn1' onClick={handleOtp}>Get OTP</button> : ""
                }
            </div>
            <Link className='login' href={'/login'}>Login</Link>
        </div>
    )
}

export default page
