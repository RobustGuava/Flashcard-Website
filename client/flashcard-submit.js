const form = document.getElementById("new-flashcard-form");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const dataJson = JSON.stringify(Object.fromEntries(formData.entries()));
  // send a fetch request (POST) with the data

  const response = await fetch("http://127.0.0.1:8080/flashcard/new", {
    method: "POST",
    // need to set headers to make sure the server knows to invoke the JSON parser
    headers: {
      "Content-Type": "application/json"
    },
    body: dataJson
  });
});