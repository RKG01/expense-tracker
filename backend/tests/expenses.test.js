process.env.NODE_ENV = 'test';
const request = require('supertest');
const app = require('../server');

describe('Expense API', () => {

  it('should create a new expense', async () => {
    const expense = {
      amount: 100.50,
      category: 'Food',
      description: 'Lunch',
      date: '2023-05-01',
      requestId: 'test-request-1'
    };

    const res = await request(app)
      .post('/expenses')
      .send(expense)
      .expect(201);

    expect(res.body).toHaveProperty('id');
    expect(res.body.amount).toBe(100.50);
    expect(res.body.category).toBe('food');
  });

  it('should normalize category to lowercase and treat Food and food as same category', async () => {
    const first = {
      amount: 50,
      category: 'Food',
      description: 'Snack',
      date: '2023-05-02',
      requestId: 'test-request-2'
    };
    const second = {
      amount: 25,
      category: 'food',
      description: 'Coffee',
      date: '2023-05-03',
      requestId: 'test-request-3'
    };

    await request(app).post('/expenses').send(first).expect(201);
    await request(app).post('/expenses').send(second).expect(201);

    const res = await request(app).get('/expenses?category=Food').expect(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.every(exp => exp.category === 'food')).toBe(true);
  });

  it('should return 400 for invalid amount', async () => {
    const expense = {
      amount: -10,
      category: 'Food',
      description: 'Lunch',
      date: '2023-05-01',
      requestId: 'test-request-invalid'
    };

    await request(app)
      .post('/expenses')
      .send(expense)
      .expect(400);
  });

  it('should get expenses', async () => {
    const res = await request(app)
      .get('/expenses')
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should filter by category', async () => {
    const res = await request(app)
      .get('/expenses?category=Food')
      .expect(200);

    res.body.forEach(exp => {
      expect(exp.category).toBe('food');
    });
  });
});