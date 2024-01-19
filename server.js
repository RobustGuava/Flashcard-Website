const express = require('express');
const app = express();
const fs = require('fs');

const topicsFile = 'data/topics.json';
const topics = JSON.parse(fs.readFileSync(topicsFile));

app.use(express.static('client'));
app.use(express.json());

// gets a list of all the topic names
app.get('/topics', function (request, response) {
    let data = [];

    for (const topic of topics) {
        data = data.concat(topic.topicName);
    }
    response.status(200).json(data);
});

// gets a list of flashcards for the topic
// will break if duplicate topicName's
app.get('/flashcards', function (request, response) {
    const topicName = request.query.topicName;

    for (const topic of topics) {
        if (topicName.toLowerCase() === topic.topicName.toLowerCase()) {
            return response.status(200).json(topic.flashcards);
        }
    }
});

// adds a new flashcard for the topic
app.post('/flashcard/new', function (request, response) {
    // get data out of request
    console.log('Loaded post request');
    console.log(request.body);

    const topicName = request.body['new-topic-name'].toLowerCase();
    const question = request.body['new-question'];
    const answer = request.body['new-answer'];

    // check if topic-name is assigned a value
    if (!topicName) {
        return response.status(400).json({ error: 'Missing or empty "topic-name" in the request body' });
    }

    // check if new-question is assigned a value
    if (!question) {
        return response.status(400).json({ error: 'Missing or empty "new-question" in the request body' });
    }

    // check if new-answer is assigned a value
    if (!answer) {
        return response.status(400).json({ error: 'Missing or empty "new-answer" in the request body' });
    }

    const newFlashcard = { question, answer };
    const foundTopic = topics.find(topic => topic.topicName === topicName);

    if (foundTopic) {
        foundTopic.flashcards.push(newFlashcard);

        fs.writeFileSync(topicsFile, JSON.stringify(topics));
        response.status(200).json({ message: 'OK', data: newFlashcard });
    } else {
        response.status(400).json({ error: "That topic doesn't exist" });
    }
});

app.post('/topic/new', function (request, response) {
    // get data out of request
    console.log('Loaded post request');
    console.log(request.body);

    const topicName = request.body['new-topic-name'].toLowerCase();

    // check if topic-name is assigned a value
    if (!topicName) {
        return response.status(400).json({ error: 'Missing or empty "new-topic-name" in the request body' });
    }

    // check if the topic name already exists
    if (topics.some(topic => topic.topicName === topicName)) {
        return response.status(400).json({ error: 'That topic name already exists' });
    }

    const newTopic = { topicName, flashcards: [] };

    topics.push(newTopic);
    fs.writeFileSync(topicsFile, JSON.stringify(topics));

    response.status(200).json(newTopic);
});

app.listen(8080);
