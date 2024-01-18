const newFlashcardForm = document.getElementById('new-flashcard-form');

newFlashcardForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(newFlashcardForm);
  const dataJson = JSON.stringify(Object.fromEntries(formData.entries()));
  // send a fetch request (POST) with the data

  await fetch('http://127.0.0.1:8080/flashcard/new', {
    method: 'POST',
    // need to set headers to make sure the server knows to invoke the JSON parser
    headers: {
      'Content-Type': 'application/json'
    },
    body: dataJson
  });
});
