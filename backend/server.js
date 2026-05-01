const express = require('express');
const cors = require('cors');
const expensesRouter = require('./routes/expenses');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/expenses', expensesRouter);

// Only listen if not in test
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;