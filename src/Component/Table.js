import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";

export default function Table() {

    const [apidatashow, setApidatashow] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://127.0.0.1:8000/mainpage/v1/company/${id}/`)
            setApidatashow(apidatashow.filter(data => data.id !== id));
        } catch (error) {
            console.log(error.message)
        }
    }
    const fetchData = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/mainpage/v1/company/');
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const result = await response.json();
            setApidatashow(result)
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchData();
    }, [apidatashow]);
    return (
        <div>
            <h1>{error}</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">address</th>
                        <th scope="col">type</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {apidatashow.length > 0 && apidatashow.map((datab, i) => (
                        <tr>
                            <th scope="row" key={i}>{i}</th>
                            <td>{datab.name}</td>
                            <td>{datab.address}</td>
                            <td>{datab.type}</td>
                            <td>
                                <Link to={`/Table/${datab.company_id}`} state={datab}><button>Edit</button></Link>
                                <button onClick={() => handleDelete(datab.company_id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
