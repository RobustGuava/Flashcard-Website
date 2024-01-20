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
        topicName = topic.topicName
        topicDesc = topic.topicDesc
        numFlashcards = topic.flashcards.length

        data = data.concat({ topicName, topicDesc, numFlashcards });
    }
    response.status(200).json(data);
});

// gets a list of flashcards for the topic
app.get('/flashcards', function (request, response) {
    const topicName = request.query.topicName.toLowerCase();

    // check if topic-name is assigned a value
    if (!topicName) {
        return response.status(400).json({ error: 'Please select a topic.' });
    }

    for (const topic of topics) {
        if (topicName === topic.topicName) {
            return response.status(200).json(topic.flashcards);
        }
    }
});

// adds a new flashcard for the topic
app.post('/flashcard/new', function (request, response) {
    // get data out of request
    console.log('Loaded post request');
    console.log(request.body);

    const topicName = request.body['topic-name'].toLowerCase();
    const question = request.body['new-question'];
    const answer = request.body['new-answer'];

    // check if topic-name is assigned a value
    if (!topicName) {
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
    const foundTopic = topics.find(topic => topic.topicName === topicName);

    if (foundTopic) {
        foundTopic.flashcards.push(newFlashcard);

        fs.writeFileSync(topicsFile, JSON.stringify(topics));
        response.status(200).json({ message: 'OK', data: newFlashcard });
    } else {
        response.status(400).json({ error: "That topic doesn't exist." });
    }
});

app.post('/topic/new', function (request, response) {
    // get data out of request
    console.log('Loaded post request');
    console.log(request.body);

    const topicName = request.body['new-topic-name'].toLowerCase();
    const topicDesc = request.body['new-topic-desc'];

    // check if new-topic-name is assigned a value
    if (!topicName) {
        return response.status(400).json({ error: 'Please select a topic.' });
    }

    // check if new-topic-desc is assigned a value
    if (!topicDesc) {
        return response.status(400).json({ error: 'Please enter a description.' });
    }

    // check if the topic name already exists
    if (topics.some(topic => topic.topicName === topicName)) {
        return response.status(400).json({ error: 'That topic name already exists.' });
    }

    const newTopic = { topicName, topicDesc, flashcards: [] };

    topics.push(newTopic);
    fs.writeFileSync(topicsFile, JSON.stringify(topics));

    response.status(200).json(newTopic);
});

app.listen(8080);
