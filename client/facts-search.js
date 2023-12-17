async function loadTaggedFacts(tag){
    let response = await fetch('http://127.0.0.1:8080/facts?tag=' + tag);
    if(response.ok){
      let facts = await response.json();
      let html = "<ul>\n";
      for(let fact of facts){
        html += `<li>${fact}</li>\n`;
      }
      html += "</ul>\n";
      document.getElementById('facts-container').innerHTML = html;
    } else{
        alert("Sorry you cannot type you have a 404");
    }
  }
  
  let ff = document.getElementById("facts-form")
  
  ff.addEventListener('submit', async function(event){
      event.preventDefault();
      try{
        let tag = document.getElementById("facts-tag").value;
        tag = tag.toLowerCase();
        loadTaggedFacts(tag);
      } catch(e) {
        alert(e);
      }
    });
