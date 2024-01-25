let flashcards = [];
let index = 0;
let showQuestion = true;
let title = '';

async function loadFlashcards(req) {
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
            throw new Error('Failed to load flashcards');
        }
    } catch (error) {
        console.error(error);

        const alertElement = document.getElementById('alert');
        alertElement.classList.toggle('show', true);
    }
}

function loadAddFlashcard(title) {
console.log(title)

    const modalTitle = document.getElementById('modal-title')
    const modalFooter = document.getElementById('modal-footer');
    html = '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>'
    html += `<button type="button" class="btn btn-primary" onclick="newFlashcard('${title}');">Add
        flashcard</button>`

    modalTitle.innerText = title
    modalFooter.innerHTML = html;
}

function flipFlashcard() {
    showQuestion = !showQuestion;
    displayFlashcard();
}

function displayFlashcard() {
    const modalBody = document.getElementById('modal-body');
    
    if (flashcards.length === 0) {
        modalBody.innerHTML = '<p>This topic doesnt have any flashcards.</p>'
    } else if (showQuestion) {
        modalBody.innerHTML = `<p>Question: ${index + 1}/${flashcards.length}</p><p>${flashcards[index].question}</p>`;
    } else {
        modalBody.innerHTML = `<p>Answer: ${index + 1}/${flashcards.length}</p><p>${flashcards[index].answer}</p>`;
    }
}

function displayTitle() {
    const modalTitle = document.getElementById('flashcard-modal-title');
    modalTitle.innerText = `${title}`;
}

function nextFlashcard() {
    index = (index + 1) % flashcards.length;
    showQuestion = true;
    displayFlashcard();
    displayTitle();
}

function prevFlashcard() {
    index = (index - 1 + flashcards.length) % flashcards.length;
    showQuestion = true;
    displayFlashcard();
    displayTitle();
}
