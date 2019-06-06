const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})

document.addEventListener("DOMContentLoaded", () => {

  const URL = 'http://localhost:3000/toys'
  function fetchToys(){
    fetch(URL)
    .then(response => {
      return response.json()
    })
    .then(json => {
      addToys(json)
    })
  }

  function addToys(toys) {
    toys.forEach((toy) => {
      createToy(toy);
    });
  }

  function createToy(toy){
    let toyDiv = document.createElement('div');
    toyDiv.className = 'card';
    document.getElementById('toy-collection').appendChild(toyDiv);

    let nameHeader = document.createElement('h2');
    let photoUrl = document.createElement('img');
    let likeCount = document.createElement('p');
    likeCount.id = toy.id;

    toyDiv.appendChild(nameHeader);
    toyDiv.appendChild(photoUrl);
    toyDiv.appendChild(likeCount);

    nameHeader.textContent = toy.name;
    photoUrl.src = toy.image;
    photoUrl.height = "200";
    photoUrl.width = "200";
    likeCount.textContent = toy.likes;

    if (toy.likes == null) {
      likeCount.textContent = 0;
    }

    let likeBtn = document.createElement('button');
    likeBtn.name = `${toy.id}`
    likeBtn.className = 'like-btn';
    likeBtn.textContent = 'Like <3'

    likeBtn.addEventListener('click', like);

    toyDiv.appendChild(likeBtn);
  }

  function like(event){
    event.preventDefault()
    console.log(event);
    let id = event.target.name;
    let currentLikes = event.path[1].childNodes[2].innerHTML;
    let newLikes = parseInt(currentLikes) + 1;

    fetch(URL + `/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({likes: newLikes})
    })
    .then(res => {
      return res.json()
    })
    .then(json => {
      updateToy(json);
    })
  }

  function updateToy(toy) {
    document.getElementById(`${toy.id}`).textContent = toy.likes;
  }

  fetchToys();
  addListenerToForm ();

  function addListenerToForm () {
    let form = document.getElementsByClassName('add-toy-form')[0]
    form.addEventListener('submit', (ev) => {
      ev.preventDefault();
      console.log(ev.target)
      handleSubmit(ev.target.elements)
    })
  }

  function handleSubmit(inputs) {
    let toyName = inputs[0].value
    let toyURL = inputs[1].value

    fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name: toyName, image: toyURL})
    })
    .then(res=>{
      return res.json()
    })
    .then(json=> {
      createToy(json);
    })


  }

});
