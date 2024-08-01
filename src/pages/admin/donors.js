import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;

const Donors = () => {
  const [donors, setDonors] = useState([]);
  const [form, setForm] = useState({ blockHash: '', from: '', to: '',value: '', gas: '', poolId: '' });

  useEffect(() => {
    fetchDonors();
  }, []);

  const fetchDonors = () => {
    fetch(apiUrl + 'donors')
      .then((res) => res.json())
      .then((data) => setDonors(data))
      .catch((error) => console.error('Error fetching donors:', error));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(apiUrl + 'donors', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then(() => {
        setForm({ blockHash: '', from: '', to: '',value: '', gas: '', poolId: '' });
        fetchDonors(); // Refetch donors after adding a new donor
      })
      .catch((error) => console.error('Error creating donor:', error));
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this donor?")) {
      try {
        const response = await fetch(apiUrl + `donors/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setDonors((prevDonors) => prevDonors.filter((donor) => donor.id !== id));
        } else {
          console.error('Failed to delete donor');
        }
      } catch (error) {
        console.error('Error deleting donor:', error);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">Manage Donors</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex flex-wrap gap-4">
          <input type="text" name="blockHash" value={form.blockHash} onChange={handleChange} placeholder="BlockHash" className="border text-black border-gray-300 rounded-md p-2 w-full sm:w-auto" required />
          <input type="text" name="from" value={form.from} onChange={handleChange} placeholder="From" className="border text-black border-gray-300 rounded-md p-2 w-full sm:w-auto" required />
          <input type="text" name="to" value={form.to} onChange={handleChange} placeholder="To" className="border text-black border-gray-300 rounded-md p-2 w-full sm:w-auto" required />
          <input type="number" name="value" value={form.value} onChange={handleChange} placeholder="Value" className="border text-black border-gray-300 rounded-md p-2 w-full sm:w-auto" required />
          <input type="number" name="gas" value={form.gas} onChange={handleChange} placeholder="Gas" className="border text-black border-gray-300 rounded-md p-2 w-full sm:w-auto" required />
          <input type="number" name="poolId" value={form.poolId} onChange={handleChange} placeholder="Pool ID" className="border text-black border-gray-300 rounded-md p-2 w-full sm:w-auto" required />
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-4 py-2 focus:outline-none">Add Donor</button>
        </div>
      </form>
      <ul className="divide-y divide-gray-200">
        {donors.map((donor) => (
          <li key={donor.id} className="flex justify-between items-center py-4">
            <span className="text-lg font-medium">{donor.from}</span>
            <span className="text-lg font-medium">{donor.to}</span>
            <span className="text-lg font-medium">{donor.value}</span>
            <button onClick={() => handleDelete(donor.id)} className="text-red-500 hover:text-red-600 focus:outline-none">
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Donors;
