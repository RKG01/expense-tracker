function ExpenseList({ expenses }) {
  return (
    <table className="expense-list">
      <thead>
        <tr>
          <th>Date</th>
          <th>Category</th>
          <th>Description</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map(exp => (
          <tr key={exp.id}>
            <td>{exp.date}</td>
            <td>{exp.category}</td>
            <td>{exp.description}</td>
            <td>₹{exp.amount.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ExpenseList;