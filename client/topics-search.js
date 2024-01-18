async function loadTopics () {
    const response = await fetch('http://127.0.0.1:8080/topics');
    if (response.ok) {
        const topics = await response.json();
        let html = '<ul>\n';
        for (const topic of topics) {
            html += `<li>${topic}</li>\n`;
        }
        html += '</ul>\n';
        document.getElementById('topics-container').innerHTML = html;
    } else {
        alert('Sorry you cannot type you have a 404');
    }
}

const topicsForm = document.getElementById('topics-form');

topicsForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    try {
        loadTopics();
    } catch (e) {
        alert(e);
    }
});
