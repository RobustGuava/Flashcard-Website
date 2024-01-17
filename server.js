const express = require('express');
const app = express();
const fs = require('fs');

const topicsFile = 'data/topics.json';
const topics = JSON.parse(fs.readFileSync(topicsFile));

app.use(express.static('client'));
app.use(express.json());

// gets a list of all the topic names
app.get('/topics', function (request, response) {
    let topicList = [];

    for (const topic of topics) {
        topicList = topicList.concat(topic.topicName);
    }
    response.send(topicList);
});

// gets a list of flashcards for the topic
// will break if duplicate topicName's
app.get('/flashcards/', function (request, response) {
    const topicName = request.query.topicName;

    for (const topic of topics) {
        if (topicName.toLowerCase() == topic.topicName.toLowerCase()) {
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
    response.send(request.body);

    const topicName = request.body['topic-name'];
    const topicNameLowerCase = topicName.toLowerCase()

    const newTopic = { topicName: topicNameLowerCase, flashcards: [] }
    console.log(newTopic)

    topics.push(newTopic)
    fs.writeFileSync(topicsFile, JSON.stringify(topics));
});

app.listen(8080);
