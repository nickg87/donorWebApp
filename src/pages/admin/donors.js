import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const Donors = () => {
  const [donors, setDonors] = useState([]);
  const [form, setForm] = useState({ address: '', amount: '', fee: '', poolId: '' });

  useEffect(() => {
    fetchDonors();
  }, []);

  const fetchDonors = () => {
    fetch('http://localhost:5001/api/donors')
      .then((res) => res.json())
      .then((data) => setDonors(data))
      .catch((error) => console.error('Error fetching donors:', error));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:5001/api/donors', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then(() => {
        setForm({ address: '', amount: '', fee: '', poolId: '' });
        fetchDonors(); // Refetch donors after adding a new donor
      })
      .catch((error) => console.error('Error creating donor:', error));
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this donor?")) {
      try {
        const response = await fetch(`http://localhost:5001/api/donors/${id}`, {
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
          <input type="text" name="address" value={form.address} onChange={handleChange} placeholder="Address" className="border border-gray-300 rounded-md p-2 w-full sm:w-auto" required />
          <input type="number" name="amount" value={form.amount} onChange={handleChange} placeholder="Amount" className="border border-gray-300 rounded-md p-2 w-full sm:w-auto" required />
          <input type="number" name="fee" value={form.fee} onChange={handleChange} placeholder="Fee" className="border border-gray-300 rounded-md p-2 w-full sm:w-auto" required />
          <input type="number" name="poolId" value={form.poolId} onChange={handleChange} placeholder="Pool ID" className="border border-gray-300 rounded-md p-2 w-full sm:w-auto" required />
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-4 py-2 focus:outline-none">Add Donor</button>
        </div>
      </form>
      <ul className="divide-y divide-gray-200">
        {donors.map((donor) => (
          <li key={donor.id} className="flex justify-between items-center py-4">
            <span className="text-lg font-medium">{donor.address}</span>
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
