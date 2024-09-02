import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [form, setForm] = useState({ blockHash: '', from: '', to: '',value: '', gas: '', poolId: '' });

  useEffect(() => {
    console.log('enters here useEffect admin/transactions');
    fetchTransactions();
  }, []);

  const fetchTransactions = () => {

    console.log(transactions);
    console.log('admin/transactions try fetch from: ');
    console.log(apiUrl + 'transactions');
    fetch(apiUrl + 'transactions')
      .then((res) => res.json())
      .then((data) => setTransactions(data))
      .catch((error) => console.error('Error fetching transactions:', error));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(apiUrl + 'transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then(() => {
        setForm({ blockHash: '', from: '', to: '',value: '', gas: '', poolId: '' });
        fetchTransactions(); // Refetch transactions after adding a new transaction
      })
      .catch((error) => console.error('Error creating transaction:', error));
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      try {
        const response = await fetch(apiUrl + `transactions/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setTransactions((prevTransactions) => prevTransactions.filter((transaction) => transaction.id !== id));
        } else {
          console.error('Failed to delete transaction');
        }
      } catch (error) {
        console.error('Error deleting transaction:', error);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">Manage Transactions</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex flex-wrap gap-4">
          <input type="text" name="blockHash" value={form.blockHash} onChange={handleChange} placeholder="BlockHash" className="border text-black border-gray-300 rounded-md p-2 w-full sm:w-auto" required />
          <input type="text" name="from" value={form.from} onChange={handleChange} placeholder="From" className="border text-black border-gray-300 rounded-md p-2 w-full sm:w-auto" required />
          <input type="text" name="to" value={form.to} onChange={handleChange} placeholder="To" className="border text-black border-gray-300 rounded-md p-2 w-full sm:w-auto" required />
          <input type="number" name="value" value={form.value} onChange={handleChange} placeholder="Value" className="border text-black border-gray-300 rounded-md p-2 w-full sm:w-auto" required />
          <input type="number" name="gas" value={form.gas} onChange={handleChange} placeholder="Gas" className="border text-black border-gray-300 rounded-md p-2 w-full sm:w-auto" required />
          <input type="number" name="poolId" value={form.poolId} onChange={handleChange} placeholder="Pool ID" className="border text-black border-gray-300 rounded-md p-2 w-full sm:w-auto" required />
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-4 py-2 focus:outline-none">Add Transaction</button>
        </div>
      </form>
      <ul className="divide-y divide-gray-200">
        {transactions.map((transaction) => (
          <li key={transaction.id} className="flex justify-between items-center py-4">
            <span className="text-lg font-medium">{transaction.from}</span>
            <span className="text-lg font-medium">{transaction.to}</span>
            <span className="text-lg font-medium">{transaction.value}</span>
            <button onClick={() => handleDelete(transaction.id)} className="text-red-500 hover:text-red-600 focus:outline-none">
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Transactions;

// Add serverSideTranslations to load translations
export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
