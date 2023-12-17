const express = require("express");
const app = express();
app.use(express.static("client"));

const facts = [
    { text: "Played for St Kilda", tags: ["geography", "history"] },
    { text: "Was born in 1929", tags: ["history"] },
    { text: "Is not famous for cookery", tags: ["friday"] }
];

app.get("/fact", function (request, response) {
    const factNumber = parseInt(request.query.n);
    response.send(facts[factNumber].text);
});

app.get("/facts/", function (request, response) {
    const tag = request.query.tag;
    const results = [];
    for (const fact of facts) {
        if (fact.tags.includes(tag)) {
            results.push(fact.text);
        }
    }
    response.send(results);
});

app.get("/tags", function (request, response) {
    let tags = [];
    for (const fact of facts) {
        tags = tags.concat(fact.tags);
    }
    const tagSet = new Set(tags);
    response.send([...tagSet]);
});

app.listen(8080);
