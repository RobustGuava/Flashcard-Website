const newFlashcardForm = document.getElementById('new-flashcard-form');

async function newFlashcard (title) {
    try {
        const formData = new FormData(newFlashcardForm);
        const dataObject = Object.fromEntries(formData.entries());
        dataObject.title = title;
        newFlashcardForm.reset();
        const dataJson = JSON.stringify(dataObject);
        // send a fetch request (POST) with the data

        const response = await fetch('http://127.0.0.1:8080/flashcard/new', {
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
            addAlert('Flashcard added successfully!', 'success');
        } else {
            addAlert(responseData.error);
        }
    } catch {
        addAlert('The server is down, try again later.');
    }
}
