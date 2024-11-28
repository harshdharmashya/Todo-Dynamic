import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function Form() {
    const [formdata, setformdata] = useState({});
    const [name, setname] = useState('');
    const [address, setaddress] = useState('');
    const [type, settype] = useState('IT');
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            name: name,
            type: type,
            address: address,
        };
        setformdata(data);
        axios.post('http://127.0.0.1:8000/mainpage/v1/company/', data)
            .then((res) => {
                console.log('Data posted successfully:', res.data);
                setname('');
                setaddress('');
                settype('IT');
            })
            .catch((error) => {
                console.log('Error posting data:', error);
            });
    }
    
    return (
        <div>
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
                        onChange={(e) =>setaddress(e.target.value)}
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