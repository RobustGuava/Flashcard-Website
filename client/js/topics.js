const newTopicForm = document.getElementById('new-topic-form');
const searchTopicForm = document.getElementById("search-topic-form")


async function newTopic() {
    const formData = new FormData(newTopicForm);
    const dataJson = JSON.stringify(Object.fromEntries(formData.entries()));

    newTopicForm.reset();
    // send a fetch request (POST) with the data

    await fetch('http://127.0.0.1:8080/topic/new', {
        method: 'POST',
        // need to set headers to make sure the server knows to invoke the JSON parser
        headers: {
            'Content-Type': 'application/json'
        },
        body: dataJson
    });

    fillMainMenu();
}

async function getTopics() {
    const response = await fetch('http://127.0.0.1:8080/topics');
    if (response.ok) {
        return response.json();
    } else {
        alert('Sorry you cannot type you have a 404');
    }
}

async function getTopic(title) {
    const response = await fetch('http://127.0.0.1:8080/topic?title=' + title);
    if (response.ok) {
        return response.json();
    } else {
        console.log(response.status)
        alert('Sorry you cannot type you have a 404');
    }
}

function addTopicToMenu(topic) {
    html = ''
    html += '<div class="gallery">\n';
    html += `<h2>${topic.title}</h2>\n`;
    html += `<p>flashcards: ${topic.flashcardsCount}</p>\n`;
    html += `<p>${topic.desc}</p>\n`;
    html += `<button type="button" class="btn btn-primary bottom" data-toggle="modal" data-target="#newFlashcardModal" onclick="loadAddFlashcard('${topic.title}')">Add flashcard</button>`;
    html += `<button type="button" class="btn btn-primary bottom" style="right: 10px" data-toggle="modal" data-target="#flashcardModal" onclick="loadFlashcards('${topic.title}')">Study set</button>`;
    html += '</div>\n';

    document.getElementById('menu-container').innerHTML += html
}

async function fillMainMenu() {
    const topics = await getTopics();
    document.getElementById('menu-container').innerHTML = '';
    for (const topic of topics) {
        addTopicToMenu(topic);
    }
}

searchTopicForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    let title = document.getElementById("search-title").value;
    const topic = await getTopic(title);
    if (!topic) {
        fillMainMenu();
    } else {
        document.getElementById('menu-container').innerHTML = '';
        addTopicToMenu(topic);
    }
    searchTopicForm.reset();
});

fillMainMenu();
