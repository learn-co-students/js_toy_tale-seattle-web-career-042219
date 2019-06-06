// Add your code here
const URL = 'http://localhost:3000/users';

document.addEventListener('DOMContentLoaded', () => {
  main();
})

function main() {
  attachListeners();
}

function attachListeners() {
  let form = document.getElementById("form");
  form.addEventListener("submit", event => {
    event.preventDefault();
    submitData(event.target.elements);
  })
}

function submitData(formInputs) {
  let name = formInputs['name'].value;
  let email = formInputs['email'].value;



  fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({name: name, email: email})
  })
  .then(res => {
    return res.json()
  })
  .then(json => {
  })
}
