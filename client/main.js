let flashcards = []
let index = 0
let showQuestion = true
let title = ''

async function loadFlashcards (req) {
    const response = await fetch('http://127.0.0.1:8080/flashcards?title=' + req);
    if (response.ok) {
        flashcards = await response.json();

        title = req
        index = 0
        showQuestion = true
        displayFlashcard();
        displayTitle();
    } else {
        alert('Sorry you cannot type you have a 404');
    }
}

function flipFlashcard () {
    showQuestion = !showQuestion
    displayFlashcard();
}

function displayFlashcard () {
    const modalBody = document.getElementById('modal-body');
    if (showQuestion) {
        modalBody.innerHTML = `<p>Question: ${index+1}/${flashcards.length}</p><p>${flashcards[index].question}</p>`;
    } else {
        modalBody.innerHTML = `<p>Answer: ${index+1}/${flashcards.length}</p><p>${flashcards[index].answer}</p>`
    }
}

function displayTitle () {
    const modalTitle = document.getElementById('modal-title')
    modalTitle.innerText = `${title}`
}

function nextFlashcard () {
    index = (index+1) % flashcards.length;
    showQuestion = true
    displayFlashcard();
    displayTitle();
}

function prevFlashcard () {
    index = (index - 1 + flashcards.length) % flashcards.length
    showQuestion = true
    displayFlashcard();
    displayTitle();
}