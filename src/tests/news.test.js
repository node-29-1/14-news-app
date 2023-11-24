const request = require('supertest');
const app = require('../app');
require('../models');

let id;
let token;

beforeAll(async() => {
    const user = {
        email: 'test@gmail.com',
        password: 'test1234'
    }
    const res = await request(app).post('/users/login').send(user);
    token = res.body.token;
});

test('GET /news', async () => {
    const res = await request(app).get('/news');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /news', async () => {
    const news = {
        headline: 'test headline',
        lead: 'test lead',
        author: 'test author',
        body: 'test body',
    }
    const res = await request(app)
        .post('/news')
        .send(news)
        .set('Authorization', `Bearer ${token}`)
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.headline).toBe(news.headline);
});

test('DELETE /news/:id', async () => {
    const res = await request(app)
        .delete(`/news/${id}`)
        .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(204);
});
