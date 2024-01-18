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
    response.send(data);
});

// gets a list of flashcards for the topic
// will break if duplicate topicName's
app.get('/flashcards', function (request, response) {
    const topicName = request.query.topicName;

    for (const topic of topics) {
        if (topicName.toLowerCase() === topic.topicName.toLowerCase()) {
            response.send(topic.flashcards);
        }
    }
});

// adds a new flashcard for the topic
app.post('/flashcard/new', function (request, response) {
    // get data out of request
    console.log('Loaded post request');
    console.log(request.body);
    response.send(request.body);

    const topicName = request.body['topic-name'];
    const newQuestion = request.body['new-question'];
    const newAnswer = request.body['new-answer'];

    const newFlashcard = { question: newQuestion, answer: newAnswer };

    const foundTopic = topics.find(topic => topic.topicName.toLowerCase() === topicName.toLowerCase());

    if (foundTopic) {
        foundTopic.flashcards.push(newFlashcard);

        fs.writeFileSync(topicsFile, JSON.stringify(topics));
    } else {
        response.status(404).send('Topic not found.');
    }
});

app.post('/topic/new', function (request, response) {
    // get data out of request
    console.log('Loaded post request');
    console.log(request.body);

    if (!request.body['topic-name'].toLowerCase()) {
        response.status(400).json({ error: 'Bad Request', message: 'Missing required JSON body parameter: topic-name' });
    }

    const topicName = request.body['topic-name'].toLowerCase();

    if (topics.some(topic => topic.topicName === topicName)) {
        response.status(400).json({ error: 'Bad Request', message: 'That topic name already exists' });
    } else {
        const newTopic = { topicName, flashcards: [] };

        topics.push(newTopic);
        fs.writeFileSync(topicsFile, JSON.stringify(topics));
        response.status(200).json({ message: 'Topic added', data: newTopic });
    }
});

app.listen(8080);
