'use client';
import axios from 'axios';
import { getCookie, deleteCookie } from 'cookies-next';
import React, { useEffect, useState } from 'react'
import Item from '../components/Item';
import '../styles/home.scss';
import { redirect } from 'next/navigation';

const page = () => {
  const [arr, setArr] = useState([]);
  useEffect(() => {
    console.log("yes");

    axios.get('http://localhost:80/data').then((data) => {
      if (data.data.message == 'success') {
        setArr([...data.data.jobs]);
        console.log(arr);

      }
    });
  }, []);
  const [job, setJob] = useState('');
  const [desc, setDesc] = useState('');
  const [exp, setExp] = useState('');
  const [dat, setDat] = useState('');
  const handleSubmit = async () => {
    const tok = getCookie('hyrio');
    const data = await axios.post('http://localhost:80/post', { job, desc, exp, dat, tok });
    if (data.data.success == 'success') {
      setArr(data.data.jobs);
    }
  }
  const handleExp = (e) => {
    setExp(e.target.value);
  }
  const handleLogout = () => {
    deleteCookie('hyrio');
    return redirect('/login');
  }
  return (
    <div>
      <div className='frmpar'>
        <form className='frm' onSubmit={handleSubmit}>
          <input type="text" placeholder='Enter job title' onChange={e => setJob(e.target.value)} value={job} />
          <textarea className='desc' placeholder='Enter job description' onChange={e => setDesc(e.target.value)} value={desc} id="" cols="30" rows="10"></textarea>
          <select name="" id="" onChange={(e) => handleExp(e)}>
            <option value="Select">Select</option>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
          <input type='date' onChange={e => { setDat(e.target.value) }} value={dat} />
          <button className='btn' type='submit'>Post Job</button>
        </form>
        <button className='logout' onClick={handleLogout}>LogOut</button>
      </div>
      {arr.length > 0 ?
        arr.map((i) => (
          <Item key={i._id} job={i.job} desc={i.desc} exp={i.exp} dat={i.dat} senderMail={i.email} />
        )) : ""
      }
    </div>
  )
}

export default page
