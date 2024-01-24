'use strict';

const request = require('supertest');
const app = require('./app');

describe('Tests for topic entity', () => {
    test('GET /topics succeeds', () => {
        return request(app)
	    .get('/topics')
	    .expect(200);
    });

    test('GET /topics returns JSON', () => {
        return request(app)
	    .get('/topics')
	    .expect('Content-type', /json/);
    });

    test('GET /topics to include Topic 1', () => {
        return request(app)
	    .get('/topics')
	    .expect(/Topic 1/);
    });

    test('POST /topic/new succeeds', () => {
        const params = { 'new-title': 'Physics', 'new-desc': 'Description' };
        return request(app)
        .post('/topic/new')
        .send(params)
	    .expect(200);
    });

    test('POST /topic/new fails for duplicate title paramter', () => {
        const params = { 'new-title': 'Maths', 'new-desc': 'Description' };
        return request(app)
        .post('/topic/new')
        .send(params)
	    .expect(400);
    });

    test('POST /topic/new fails for empty title paramter', () => {
        const params = { 'new-title': '', 'new-desc': 'Description' };
        return request(app)
        .post('/topic/new')
        .send(params)
	    .expect(400);
    });

    test('POST /topic/new fails for missing title paramter', () => {
        const params = { 'new-desc': 'Description' };
        return request(app)
        .post('/topic/new')
        .send(params)
	    .expect(400);
    });

    test('POST /topic/new fails for missing new-desc paramter', () => {
        const params = { 'new-title': 'Computer Science' };
        return request(app)
        .post('/topic/new')
        .send(params)
	    .expect(400);
    });
});

describe('Tests for flashcard entity', () => {
    test('GET /flashcards succeeds', () => {
        const query = { title: 'Topic 1'}
        return request(app)
	    .get('/flashcards')
        .query(query)
	    .expect(200);
    });

    test('GET /flashcards returns JSON', () => {
        const query = { title: 'Topic 1'}
        return request(app)
	    .get('/flashcards')
        .query(query)
	    .expect('Content-type', /json/);
    });

    test('GET /flashcards fails for empty title paramter', () => {
        const query = { title: ''}
        return request(app)
	    .get('/flashcards')
        .query(query)
	    .expect(400);
    });

    test('GET /flashcards fails for missing title paramter', () => {
        const query = {}
        return request(app)
	    .get('/flashcards')
        .query(query)
	    .expect(400);
    });

    test('GET /flashcards fails for non-existant title paramter', () => {
        const query = { title: 'Philosophy' }
        return request(app)
	    .get('/flashcards')
        .query(query)
	    .expect(400);
    });

    test('POST /flashcard/new succeeds', () => {
        const params = { title: 'Physics', 'new-question': 'Test question?', 'new-answer': 'Test answer.' };
        return request(app)
        .post('/flashcard/new')
        .send(params)
	    .expect(200);
    });

    test('POST /flashcard/new fails for empty title paramter', () => {
        const params = { title: '', 'new-question': 'Test question?', 'new-answer': 'Test answer.' };
        return request(app)
        .post('/flashcard/new')
        .send(params)
	    .expect(400);
    });

    test('POST /flashcard/new fails for empty new-question paramter', () => {
        const params = { title: 'Physics', 'new-question': '', 'new-answer': 'Test answer.' };
        return request(app)
        .post('/flashcard/new')
        .send(params)
	    .expect(400);
    });

    test('POST /flashcard/new fails for empty new-answer paramter', () => {
        const params = { title: 'Physics', 'new-question': 'Test question?', 'new-answer': '' };
        return request(app)
        .post('/flashcard/new')
        .send(params)
	    .expect(400);
    });

    test('POST /flashcard/new fails for missing title paramter', () => {
        const params = { 'new-question': 'Test question?', 'new-answer': 'Test answer.' };
        return request(app)
        .post('/flashcard/new')
        .send(params)
	    .expect(400);
    });

    test('POST /flashcard/new fails for missing new-question paramter', () => {
        const params = { title: 'Physics', 'new-answer': 'Test answer.' };
        return request(app)
        .post('/flashcard/new')
        .send(params)
	    .expect(400);
    });

    test('POST /flashcard/new fails for missing new-answer paramter', () => {
        const params = { title: 'Physics', 'new-question': 'Test question?' };
        return request(app)
        .post('/flashcard/new')
        .send(params)
	    .expect(400);
    });

    test('POST /flashcard/new fails for non-existant title paramter', () => {
        const params = { 'new-question': 'Test question?', 'new-answer': 'Test answer.' };
        return request(app)
        .post('/flashcard/new')
        .send(params)
	    .expect(400);
    });

    test('POST /flashcard/new fails for non-existant new-question parameter', () => {
        const params = { title: 'Philosophy', 'new-answer': 'Test answer.' };
        return request(app)
        .post('/flashcard/new')
        .send(params)
	    .expect(400);
    });

    test('POST /flashcard/new fails for non-existant new-answer perameter', () => {
        const params = { title: 'Philosophy', 'new-question': 'Test question?' };
        return request(app)
        .post('/flashcard/new')
        .send(params)
	    .expect(400);
    });
});
