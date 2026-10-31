const request = require('supertest');
const app = require('../src/app');

beforeEach(() => app.resetData());

describe('Student API', () => {
  test('POST /students creates a student', async () => {
    const res = await request(app)
      .post('/students')
      .send({ name: 'Asha', email: 'asha@example.com', course: 'DevOps' });
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({ id: 1, name: 'Asha', course: 'DevOps' });
  });

  test('GET /students returns the list of students', async () => {
    await request(app).post('/students')
      .send({ name: 'Ravi', email: 'ravi@example.com', course: 'Cloud' });
    const res = await request(app).get('/students');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
  });

  test('POST /students with missing fields returns 400', async () => {
    const res = await request(app).post('/students').send({ name: 'NoEmail' });
    expect(res.status).toBe(400);
  });

  test('DELETE /students/:id removes the student', async () => {
    await request(app).post('/students')
      .send({ name: 'Maya', email: 'maya@example.com', course: 'Java' });
    const del = await request(app).delete('/students/1');
    expect(del.status).toBe(204);
    const get = await request(app).get('/students/1');
    expect(get.status).toBe(404);
  });
});
