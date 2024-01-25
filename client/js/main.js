const flashcardModalTitle = document.getElementById('flashcard-modal-title');
const alertElement = document.getElementById('alert');
const modalTitle = document.getElementById('modal-title');
const modalFooter = document.getElementById('modal-footer');
const modalBody = document.getElementById('modal-body');

let flashcards = [];
let index = 0;
let showQuestion = true;
let title = '';

async function loadFlashcards (req) {
    try {
        const response = await fetch('http://127.0.0.1:8080/flashcards?title=' + req);

        if (response.ok) {
            flashcards = await response.json();

            title = req;
            index = 0;
            showQuestion = true;
            displayFlashcard();
            displayTitle();
        } else {
            const responseData = await response.json()
            addAlert(responseData.error);
        }
    } catch (error) {
        addAlert('The server is down, try again later.');
    }
}

function loadAddFlashcard (title) {
    let html = '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>';
    html += `<button type="button" class="btn btn-primary" onclick="newFlashcard('${title}');">Add
        flashcard</button>`;

    modalTitle.innerText = title;
    modalFooter.innerHTML = html;
}

function flipFlashcard () {
    showQuestion = !showQuestion;
    displayFlashcard();
}

function displayFlashcard () {
    if (flashcards.length === 0) {
        modalBody.innerHTML = '<p>This topic doesnt have any flashcards.</p>';
    } else if (showQuestion) {
        modalBody.innerHTML = `<p>Question: ${index + 1}/${flashcards.length}</p><p>${flashcards[index].question}</p>`;
    } else {
        modalBody.innerHTML = `<p>Answer: ${index + 1}/${flashcards.length}</p><p>${flashcards[index].answer}</p>`;
    }
}

function displayTitle () {
    flashcardModalTitle.innerText = `${title}`;
}

function nextFlashcard () {
    index = (index + 1) % flashcards.length;
    showQuestion = true;
    displayFlashcard();
    displayTitle();
}

function prevFlashcard () {
    index = (index - 1 + flashcards.length) % flashcards.length;
    showQuestion = true;
    displayFlashcard();
    displayTitle();
}
