function Summary({ expenses }) {
  const summary = expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {});

  return (
    <div className="summary">
      <h2>Summary by Category</h2>
      <ul>
        {Object.entries(summary).map(([cat, total]) => (
          <li key={cat}>{cat}: ₹{total.toFixed(2)}</li>
        ))}
      </ul>
    </div>
  );
}

export default Summary;