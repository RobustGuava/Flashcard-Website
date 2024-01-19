const topicsForm = document.getElementById('topics-form');
const newTopicForm = document.getElementById('new-topic-form');

topicsForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    try {
        const topics = await getTopics();
        console.log(topics);
        let html = '<ul>\n';
        for (const topic of topics) {
            html += `<li>${topic}</li>\n`;
        }
        html += '</ul>\n';
        document.getElementById('topics-container').innerHTML = html;
    } catch (e) {
        alert(e);
    }
});

async function getTopics () {
    const response = await fetch('http://127.0.0.1:8080/topics');
    if (response.ok) {
        return response.json();
    } else {
        alert('Sorry you cannot type you have a 404');
    }
}

async function populateDropdown () {
    try {
        const topics = await getTopics();
        let html = '<option value="">Select</option>\n';
        for (const topic of topics) {
            html += `<option value="${topic}">${topic}</option>\n`;
        }

        // code found on stackoverflow https://stackoverflow.com/questions/3607291/javascript-and-getelementbyid-for-multiple-elements-with-the-same-id
        const elms = document.querySelectorAll("[id='topic-name']");
        for (const element of elms) {
            element.innerHTML = html;
        }
    } catch (e) {
        alert(e);
    }
}

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

  populateDropdown();
});

populateDropdown();
