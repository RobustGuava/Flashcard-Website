const express = require('express');
const app = express();
const fs = require('fs');
app.use(express.static('client'));

app.get('/fact', function (request, response) {
    const rawFacts = fs.readFileSync('facts.json');
    const facts = JSON.parse(rawFacts);

    const factNumber = parseInt(request.query.n);
    response.send(facts[factNumber].text);
});

app.get('/facts/', function (request, response) {
    const tag = request.query.tag;
    const results = [];

    const rawFacts = fs.readFileSync('facts.json');
    const facts = JSON.parse(rawFacts);

    for (const fact of facts) {
        if (fact.tags.includes(tag)) {
            results.push(fact.text);
        }
    }
    response.send(results);
});

app.get('/tags', function (request, response) {
    let tags = [];

    const rawFacts = fs.readFileSync('facts.json');
    const facts = JSON.parse(rawFacts);

    for (const fact of facts) {
        tags = tags.concat(fact.tags);
    }
    const tagSet = new Set(tags);
    response.send([...tagSet]);
});

app.post('/submit', async (request, response) => {
  try {
    const { tag, text } = request.body;

    // Read the current content of facts.json
    const rawFacts = await fs.readFile('facts.json', 'utf-8');
    const facts = JSON.parse(rawFacts);
        
    // Add the new fact
    facts.push({ tag, text });

    // Write the updated content back to facts.json
    await fs.writeFile('facts.json', JSON.stringify(facts, null, 2), 'utf-8');

    response.send('Facts added successfully!');
  } catch (error) {
    console.error('Error:', error);
    response.status(500).send('Internal Server Error');
  }
});

app.listen(8080);
