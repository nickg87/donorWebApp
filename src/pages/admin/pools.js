// pages/admin/pools.js
import { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;

const Pools = () => {
  const [pools, setPools] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', active: true, type: '' });

  useEffect(() => {
    console.log(pools);
    console.log('admin/pools try fetch from: ');
    console.log(apiUrl + 'pools');
    fetch(apiUrl + 'pools')
      .then((res) => res.json())
      .then((data) => setPools(data))
      .catch((error) => console.error('Error fetching pools:', error));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(apiUrl + 'pools', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((newPool) => {

        const newSet = { ...form, id: newPool.id };
        setPools((prevPools) => [...prevPools, newSet]);
        console.log(pools);
        console.log(newSet);
        setForm({ title: '', description: '', active: true, type: '' });
      })
      .catch((error) => console.error('Error creating pool:', error));
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this pool?")) {
      try {
        const response = await fetch(apiUrl + `pools/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setPools((prevPools) => prevPools.filter((pool) => pool.id !== id));
        } else {
          console.error('Failed to delete pool');
        }
      } catch (error) {
        console.error('Error deleting pool:', error);
      }
    }
  };


  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Manage Pools</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input type="text" name="title" value={form.title} onChange={handleChange} placeholder="Title" className="block w-full px-4 py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" required />
        <input type="text" name="description" value={form.description} onChange={handleChange} placeholder="Description" className="block w-full mt-2 px-4 py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" required />
        <input type="text" name="type" value={form.type} onChange={handleChange} placeholder="Type" className="block w-full mt-2 px-4 py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" />
        <label className="block mt-2 text-sm text-gray-700">
          <input type="checkbox" name="active" checked={form.active} onChange={() => setForm({ ...form, active: !form.active })} className="mr-2 rounded" />
          Active
        </label>
        <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50">
          Add Pool
        </button>
      </form>

      {pools !== undefined &&
        pools.length> 0 &&
      <ul className="divide-y divide-gray-200">
        {pools.map((pool) => (
          <li key={pool.id} id={'pool-' + pool.id} className="flex justify-between items-center py-4">
            <div className="flex flex-col" style={{maxWidth:'80', flex:'1 auto'}}>
              <span className="text-lg font-medium">{pool.id}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-medium">{pool.title}</span>
              <span className="text-sm text-gray-500">{pool.description}</span>
            </div>
            <div className="flex items-center space-x-2">

              <button
                className={`text-${pool.active ? 'green' : 'red'}-500 hover:text-${pool.active ? 'green' : 'red'}-600 focus:outline-none`}>
                <FontAwesomeIcon icon={pool.active ? faCheck : faTimes}/>
              </button>

              <button onClick={() => handleDelete(pool.id)}
                      className="text-red-500 hover:text-red-600 focus:outline-none">
                <FontAwesomeIcon icon={faTrashAlt}/>
              </button>
            </div>
          </li>
        ))}
      </ul>}

    </div>
  );
};

export default Pools;
