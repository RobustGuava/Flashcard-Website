const newTopicForm = document.getElementById('new-topic-form');

newTopicForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(newTopicForm);
  const dataJson = JSON.stringify(Object.fromEntries(formData.entries()));
  // send a fetch request (POST) with the data

  newTopicForm.reset();

  await fetch('http://127.0.0.1:8080/topic/new', {
    method: 'POST',
    // need to set headers to make sure the server knows to invoke the JSON parser
    headers: {
      'Content-Type': 'application/json'
    },
    body: dataJson
  });
});
