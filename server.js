const express = require("express");
const app = express();
const fs = require("fs");
app.use(express.static("client"));



app.get("/fact", function (request, response) {
    const rawFacts = fs.readFileSync("facts.json");
    const facts = JSON.parse(rawFacts);

    const factNumber = parseInt(request.query.n);
    response.send(facts[factNumber].text);
});

app.get("/facts/", function (request, response) {
    const tag = request.query.tag;
    const results = [];

    const rawFacts = fs.readFileSync("facts.json");
    const facts = JSON.parse(rawFacts);

    for (const fact of facts) {
        if (fact.tags.includes(tag)) {
            results.push(fact.text);
        }
    }
    response.send(results);
});

app.get("/tags", function (request, response) {
    let tags = [];

    const rawFacts = fs.readFileSync("facts.json");
    const facts = JSON.parse(rawFacts);
    
    for (const fact of facts) {
        tags = tags.concat(fact.tags);
    }
    const tagSet = new Set(tags);
    response.send([...tagSet]);
});

app.listen(8080);
