const newTopicForm = document.getElementById('new-topic-form');
const searchTopicForm = document.getElementById('search-topic-form');
const myAlert = document.getElementById('alert');

async function newTopic () {
    try {
        const formData = new FormData(newTopicForm);
        const dataJson = JSON.stringify(Object.fromEntries(formData.entries()));

        newTopicForm.reset();
        // send a fetch request (POST) with the data

        const response = await fetch('http://127.0.0.1:8080/topic/new', {
            method: 'POST',
            // need to set headers to make sure the server knows to invoke the JSON parser
            headers: {
                'Content-Type': 'application/json'
            },
            body: dataJson
        });

        const responseData = await response.json();
        if (response.ok) {
            fillMainMenu();
            addAlert('Topic added successfully!', 'success');
        } else {
            addAlert(responseData.error);
        }
    } catch {
        addAlert('The server is down, try again later.');
    }
}

async function getTopics () {
    try {
        const response = await fetch('http://127.0.0.1:8080/topics');
        if (response.ok) {
            return response.json();
        } else {
            const errorData = await response.json();
            addAlert(errorData.error);
        }
    } catch {
        addAlert('The server is down, try again later.');
    }
}

async function getTopic (title) {
    try {
        const response = await fetch('http://127.0.0.1:8080/topic?title=' + title);
        if (response.ok) {
            return response.json();
        } else {
            const errorData = await response.json();
            addAlert(errorData.error);
        }
    } catch {
        addAlert('The server is down, try again later.');
    }
}

searchTopicForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    const title = document.getElementById('search-title').value;
    const topic = await getTopic(title);
    if (!topic) {
        fillMainMenu();
    } else {
        document.getElementById('menu-container').innerHTML = '';
        addTopicToMenu(topic);
    }
    searchTopicForm.reset();
});

function addTopicToMenu (topic) {
    let html = '';
    html += '<div class="gallery">\n';
    html += `<h2>${topic.title}</h2>\n`;
    html += `<p>flashcards: ${topic.flashcardsCount}</p>\n`;
    html += `<p>${topic.desc}</p>\n`;
    html += `<button type="button" class="btn btn-primary bottom" data-toggle="modal" data-target="#newFlashcardModal" onclick="loadAddFlashcard('${topic.title}')">Add flashcard</button>`;
    html += `<button type="button" class="btn btn-primary bottom" style="right: 10px" data-toggle="modal" data-target="#flashcardModal" onclick="loadFlashcards('${topic.title}')">Study set</button>`;
    html += '</div>\n';

    document.getElementById('menu-container').innerHTML += html;
}

async function fillMainMenu () {
    const topics = await getTopics();
    document.getElementById('menu-container').innerHTML = '';
    for (const topic of topics) {
        addTopicToMenu(topic);
    }
}

// code from chatGPT
// html for alert from bootstrap https://getbootstrap.com/docs/4.0/components/alerts/
function addAlert (message, type = 'danger') {
    // Create a new alert element
    const alertElement = document.createElement('div');
    alertElement.className = `alert alert-${type} alert-dismissible`;

    // Add the close button
    alertElement.innerHTML = `
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
        <strong>Message: </strong>${message}
    `;

    // Get the alert container
    const alertContainer = document.getElementById('alert-container');

    // Append the new alert to the container
    alertContainer.appendChild(alertElement);

    // Set a timeout to remove the alert after 5 seconds
    setTimeout(() => {
        alertElement.remove();
    }, 5000);
}

fillMainMenu();
