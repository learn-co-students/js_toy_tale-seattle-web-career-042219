const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
const URL = 'http://localhost:3000/toys'
// YOUR CODE HERE
fetch(URL)
.then(resp => resp.json())
.then(json => displayToys(json))

function displayToys(toys) {
  console.log("toys structure:" , toys)
  toys.forEach(toy => {
    console.log("toy", toy['name'])
    displayToy(toy)
  })


}

function displayToy(toy) {
  let div = document.createElement('div')
  div.id = 'card'
  let h2 = document.createElement('h2')
  h2.textContent = toy.name
  let img = document.createElement('img')
  img.src = `${toy.image}`
  img.width = "200"

  let like = document.createElement('p')
  like.textContent = "likes: " + toy.likes
  like.id = toy.id


  let likeBtn = document.createElement('button')
  likeBtn.innerHTML = "Like"

  let collection = document.getElementById('toy-collection')
  collection.appendChild(div)
  div.appendChild(h2)
  div.appendChild(img)
  div.appendChild(like)
  div.appendChild(likeBtn)

  likeBtn.addEventListener('click', (ev) => {
    let likeHtml = document.getElementById(`${toy.id}`)
    let currentLikes = likeHtml.textContent.split(" ")[1]
    console.log(currentLikes)


    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({"likes": parseInt(currentLikes) + 1})
    })
    .then(res => res.json())
    .then(json => updateLikes(json))
  })


}

function updateLikes(toyObj) {
  let likes = document.getElementById(`${toyObj.id}`)
  likes.textContent = "likes: " + toyObj.likes

}



document.addEventListener('DOMContentLoaded', () => {

} )





document.querySelector('.add-toy-form').addEventListener('submit', handleSubmit)

function handleSubmit(ev) {
  ev.preventDefault()
  let name = ev.target[0].value;
  let url = ev.target[1].value;
  let likes = 0;

  fetch(URL, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({name: name, likes: likes, image: url})
  })
  .then(resp => resp.json())
  .then(json => displayToy(json))

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


// OR HERE!
