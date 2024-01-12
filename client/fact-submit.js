const form = document.getElementById("new-fact-form");

async function submitFact(tag, text){
    let response = await fetch(`http://127.0.0.1:8080/submit?tag=${tag}?text=${text}`);
    if(response.ok){
      let response = await response.json();
      document.getElementById('facts-container').innerHTML = response;
    } else{
        alert(response);
    }
  }

form.addEventListener('submit', async function(event){
    event.preventDefault();
    try{
      let tag = document.getElementById("fact-tag").value;
      let text = document.getElementById("fact-text").value;
      tag = tag.toLowerCase();
      submitFact(tag, text);
    } catch(e) {
      alert(e);
    }
  });
