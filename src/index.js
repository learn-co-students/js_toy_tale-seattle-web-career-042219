const addBtn = document.querySelector('#new-toy-btn')
const createToy = document.querySelector('.add-toy-form')
const toyForm = document.querySelector('.container')
let addToy = false

let ALLTOYS = []
const URL = "http://localhost:3000/toys"

function fetchToys() {
  fetch(URL)
  .then(resp => {
    return resp.json()
  })
  .then (json => {
    ALLTOYS = json
    let toysArray = json
    displayToys(toysArray)
  })
}

function displayToys(toys) {
  toys.forEach(function(element) {
    displayToy(element)
  })
}

function displayToy(toy) {


    let div = document.createElement('div')
    let header = document.createElement('h2')
    let img = document.createElement('IMG')
    let likes = document.createElement('p')
    let btn = document.createElement('BUTTON')
    img.classList.add('toy-avatar')
    btn.classList.add('like-btn')
    div.classList.add('card')

    div.id = toy.id

    btn.innerHTML = "Like"
    btn.addEventListener('click', incrememtLike)

    div.appendChild(header)
    div.appendChild(img)
    div.appendChild(likes)
    div.appendChild(btn)

    header.textContent = toy.name
    img.src = toy.image
    likes.textContent = toy.likes
    
    if (toy.likes == null ) {
      likes.textContent = 0;
    }

    let container = document.getElementById('toy-collection')
    container.appendChild(div)
}

function updateToy(toy) {
  let t = document.getElementById(toy.id)
  let newLike = t.querySelector('p')
  newLike.textContent = toy.likes
}

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

createToy.addEventListener('submit', (ev) => {
  ev.preventDefault();
  console.log(ev.target.elements)
  handleSubmit(ev.target.elements)
})

function handleSubmit(formInputs) {
  let name = formInputs['name'].value
  let image = formInputs['image'].value

  let likes = 0;
  fetch(URL, { 
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({name: name, image: image, likes: likes})
    })
    .then(resp => {
      return resp.json()
    })
    .then(json => {
      displayToy(json)
  })
}

function incrememtLike(ev) {
  let id = ev.target.parentElement.id
  let likes = parseInt(ev.target.parentElement.querySelector('p').textContent)
  let number = ++ likes


  fetch(`http://localhost:3000/toys/${id}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({"likes": `${number}`})
    })
    .then(resp => {
        return resp.json()
    })
    .then(json => {
      updateToy(json)
    })
  }
      
fetchToys();
// OR HERE!
