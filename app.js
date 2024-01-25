const express = require('express');
const app = express();
const fs = require('fs');

const topicsFile = 'data/topics.json';
const topics = JSON.parse(fs.readFileSync(topicsFile));

app.use(express.static('client'));
app.use(express.json());

// gets a list of the data for each topic
app.get('/topics', function (request, response) {
    let data = [];

    for (const topic of topics) {
        const title = topic.title;
        const desc = topic.desc;
        const flashcardsCount = topic.flashcards.length;

        data = data.concat({ title, desc, flashcardsCount });
    }
    response.status(200).json(data);
});

// gets data for a single topic
app.get('/topic', function (request, response) {
    const title = request.query.title;

    // check if title is assigned a value
    if (!title) {
        return response.status(400).json({ error: 'Please enter a topic name.' });
    }

    for (const topic of topics) {
        if (title.toLowerCase() === topic.title.toLowerCase()) {
            const title = topic.title;
            const desc = topic.desc;
            const flashcardsCount = topic.flashcards.length;

            return response.status(200).json({ title, desc, flashcardsCount });
        }
    }

    return response.status(400).json({ error: 'Topic doesnt exist.' });
});

// gets a list of flashcards for the topic
app.get('/flashcards', function (request, response) {
    const title = request.query.title;

    // check if title is assigned a value
    if (!title) {
        return response.status(400).json({ error: 'Please enter a topic name.' });
    }

    for (const topic of topics) {
        if (title.toLowerCase() === topic.title.toLowerCase()) {
            return response.status(200).json(topic.flashcards);
        }
    }
    return response.status(400).json({ error: 'Topic doesnt exist.' });
});

// gets data for a single flashcard
app.get('/flashcard', function (request, response) {
    const title = request.query.title;
    const index = parseInt(request.query.index);

    // check if title is assigned a value
    if (!title) {
        return response.status(400).json({ error: 'Please enter a topic name.' });
    }

    // check if index is assigned a value
    if (index === undefined || index === null) {
        return response.status(400).json({ error: 'Please enter an index.' });
    }

    // check if index is assigned a number
    if (isNaN(index) || !Number.isInteger(index)) {
        return response.status(400).json({ error: 'Please enter index as an integer.' });
    }

    for (const topic of topics) {
        if (title.toLowerCase() === topic.title.toLowerCase()) {
            // check if index exists
            if (index > topic.flashcards.length - 1) {
                return response.status(400).json({ error: 'Index is out of range.' });
            }
            return response.status(200).json(topic.flashcards[index]);
        }
    }
    return response.status(400).json({ error: 'Topic doesnt exist.' });
});

// adds a new flashcard for the topic
app.post('/flashcard/new', function (request, response) {
    // get data out of request
    const title = request.body.title;
    const question = request.body['new-question'];
    const answer = request.body['new-answer'];

    // check if topic-name is assigned a value
    if (!title) {
        return response.status(400).json({ error: 'Please select a topic.' });
    }

    // check if new-question is assigned a value
    if (!question) {
        return response.status(400).json({ error: 'Please enter a question.' });
    }

    // check if new-answer is assigned a value
    if (!answer) {
        return response.status(400).json({ error: 'Please enter an answer.' });
    }

    const newFlashcard = { question, answer };
    const foundTopic = topics.find(topic => topic.title.toLowerCase() === title.toLowerCase());

    if (foundTopic) {
        foundTopic.flashcards.push(newFlashcard);

        fs.writeFileSync(topicsFile, JSON.stringify(topics));
        response.status(200).json({ message: 'OK', data: newFlashcard });
    } else {
        response.status(400).json({ error: "That topic doesn't exist." });
    }
});

// adds a new topic
app.post('/topic/new', function (request, response) {
    // get data out of request
    const title = request.body['new-title'];
    const desc = request.body['new-desc'];
    const flashcards = [];

    // check if new-title is assigned a value
    if (!title) {
        return response.status(400).json({ error: 'Please enter a topic name.' });
    }

    // check if new-desc is assigned a value
    if (!desc) {
        return response.status(400).json({ error: 'Please enter a description.' });
    }

    // check if the topic name already exists
    if (topics.some(topic => topic.title.toLowerCase() === title.toLowerCase())) {
        return response.status(400).json({ error: 'That topic name already exists.' });
    }

    const newTopic = { title, desc, flashcards };

    topics.push(newTopic);
    fs.writeFileSync(topicsFile, JSON.stringify(topics));

    response.status(200).json(newTopic);
});

module.exports = app;
