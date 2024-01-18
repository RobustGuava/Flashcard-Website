async function loadFlashcards (topicName) {
    const response = await fetch('http://127.0.0.1:8080/flashcards?topicName=' + topicName);
    if (response.ok) {
        const flashcards = await response.json();
        let html = '<ul>\n';
        for (const flashcard of flashcards) {
            html += `<li>Question: ${flashcard.question}</li>\n`;
            html += `<li>Answer: ${flashcard.answer}</li>\n`;
        }
        html += '</ul>\n';
        document.getElementById('flashcards-container').innerHTML = html;
    } else {
        alert('Sorry you cannot type you have a 404');
    }
}

const flashcardsForm = document.getElementById('flashcards-form');

flashcardsForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    try {
        const topicName = document.getElementById('topic-name').value;
        loadFlashcards(topicName);
    } catch (e) {
        alert(e);
    }
});
