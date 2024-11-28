import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function Edit() {
  const [formdata, setformdata] = useState({});

  const uselocation = useLocation();
  const currentdata = uselocation.state
  console.log(currentdata)
  const [name, setname] = useState(`${currentdata.name}`);
  const [address, setaddress] = useState(`${currentdata.address}`);
  const [type, settype] = useState(`${currentdata.type}`);

  const usenavigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      // react state = backend field name
      name: name,
      type: type,
      address: address,
    };
    setformdata(data);
    axios.put(`http://127.0.0.1:8000/mainpage/v1/company/${currentdata.company_id}/`, data)
      .then((res) => {
        console.log('data edit successfully:', res.data);

      })
      .catch((error) => {
        console.log('Error posting data:', error);
      });
    usenavigate('/')
  }

  return (
    <div className='container mt-5'>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
          <input
            type='text'
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={name}
            onChange={(e) => setname(e.target.value)}
          />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Address</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputPassword1"
            value={address}
            onChange={(e) => setaddress(e.target.value)}
          />
        </div>
        <select
          className="mb-3"
          value={type}
          onChange={(e) => settype(e.target.value)}
        >
          <option value="IT">IT</option>
          <option value="Non-IT">Non-IT</option>
        </select> <br /> <br />
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}
