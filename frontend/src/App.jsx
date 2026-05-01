import { useState, useEffect } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Summary from './components/Summary';
import './App.css';

const API_BASE = import.meta.env.VITE_API_BASE || '';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sortByDate, setSortByDate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchExpenses();
  }, []);

  useEffect(() => {
    let filtered = expenses;
    if (categoryFilter) {
      filtered = expenses.filter(exp => exp.category === categoryFilter);
    }
    if (sortByDate) {
      filtered = [...filtered].sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    setFilteredExpenses(filtered);
  }, [expenses, categoryFilter, sortByDate]);

  const fetchExpenses = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_BASE}/expenses`);
      if (!response.ok) throw new Error('Failed to fetch expenses');
      const data = await response.json();
      setExpenses(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addExpense = async (expense) => {
    setError('');
    try {
      const response = await fetch(`${API_BASE}/expenses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(expense),
      });
      if (!response.ok) throw new Error('Failed to add expense');
      const newExpense = await response.json();
      setExpenses(prev => [...prev, newExpense]);
    } catch (err) {
      setError(err.message);
    }
  };

  const categories = [...new Set(expenses.map(exp => exp.category))];

  const total = filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div className="app">
      <h1>Expense Tracker</h1>
      <ExpenseForm onAddExpense={addExpense} />
      {error && <p className="error">{error}</p>}
      <div className="controls">
        <div>
          <label htmlFor="filter">Filter by Category:</label>
          <select id="filter" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
            <option value="">All Categories</option>
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>
        <button onClick={() => setSortByDate(!sortByDate)}>
          Sort by Date {sortByDate ? '(Newest First)' : '(Default)'}
        </button>
      </div>
      {loading ? <p>Loading...</p> : <ExpenseList expenses={filteredExpenses} />}
      <Summary expenses={filteredExpenses} />
      <div className="total">Total: ₹{total.toFixed(2)}</div>
    </div>
  );
}

export default App;