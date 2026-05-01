import { useState } from 'react';

function ExpenseForm({ onAddExpense }) {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    const requestId = crypto.randomUUID();
    try {
      await onAddExpense({
        amount: parseFloat(amount),
        category: category.trim().toLowerCase(),
        description,
        date,
        requestId,
      });
      setAmount('');
      setCategory('');
      setDescription('');
      setDate('');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="expense-form">
      <div>
        <label htmlFor="amount">Amount (₹)</label>
        <input
          id="amount"
          type="number"
          placeholder="e.g., 100.50"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          min="0.01"
          step="0.01"
        />
      </div>
      <div>
        <label htmlFor="category">Category</label>
        <input
          id="category"
          type="text"
          placeholder="e.g., Food, Transport"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <input
          id="description"
          type="text"
          placeholder="Brief description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <button type="submit" disabled={submitting}>
        {submitting ? 'Adding...' : 'Add Expense'}
      </button>
    </form>
  );
}

export default ExpenseForm;