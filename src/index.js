const addBtn = document.querySelector("#new-toy-btn");
const toyForm = document.querySelector(".container");
let addToy = false;

// YOUR CODE HERE

addBtn.addEventListener("click", () => {
  // hide & seek with the form
  addToy = !addToy;
  if (addToy) {
    toyForm.style.display = "block";
    // submit listener here
  } else {
    toyForm.style.display = "none";
  }
});

// OR HERE!

const toyUrl = "http://localhost:3000/toys";
const submitBtn = document.getElementsByClassName("submit")[0];
const realForm = document.querySelector(".add-toy-form");

realForm.addEventListener("submit", postCall);
document.addEventListener("DOMContentLoaded", function() {
  getCall();
  addEventListener();
});

function getCall() {
  fetch(toyUrl)
    .then(result => result.json())
    .then(toy => renderToys(toy));
}

function renderToy(toy) {
  let toyCollection = document.getElementById("toy-collection");

  let div = document.createElement("div");
  let pID = document.createElement("p");
  let h2 = document.createElement("h2");
  let img = document.createElement("img");
  let pLikes = document.createElement("p");
  let button = document.createElement("button");

  div.classList.add("card");
  div.appendChild(pID);
  div.appendChild(h2);
  div.appendChild(img);
  div.appendChild(pLikes);
  div.appendChild(button);

  pID.textContent = "ID: " + toy.id;
  h2.textContent = toy.name;

  img.src = toy.image;
  img.classList.add("toy-avatar");

  pLikes.textContent = toy.likes + " Likes";
  button.textContent = "Like <3";

  console.log("buttons?");
  button.addEventListener("click", () => addLike(toy, pLikes));

  toyCollection.appendChild(div);
}

function renderToys(toyAr) {
  let toyCollection = document.getElementById("toy-collection");
  for (let i = 0; i < toyAr.length; i++) {
    renderToy(toyAr[i]);
    //   div = `<div class="card">
    //   <p>ID: ${toyAr[i].id}</p>
    //   <h2>${toyAr[i].name}</h2>
    //   <p>${toyAr[i].likes} Likes</p>
    //   <img src="${toyAr[i].image}" class="toy-avatar" />
    //   <button class="like-btn">Like <3</button>
    // </div>`;
    // toyCollection.innerHTML += div;
  }
}

function addEventListener() {
  submitBtn.addEventListener("submit", event => {
    event.preventDefault();
    postCall(event.target.elements);
  });
}

function postCall(event) {
  event.preventDefault();
  let inputs = document.querySelectorAll(".input-text");
  let name = inputs[0].value;
  let image = inputs[1].value;
  fetch(toyUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name: name, image: image, likes: 0 })
  })
    .then(response => {
      response.json();
    })
    .then(toy => {
      renderToy(toy);
    });
}

function addLike(toy, likesEl) {
  let id = toy.id;
  let likes = toy.likes;
  likes++;

  console.log("likes=", likes);
  console.log("id=", id);
  console.log("addLike fires");

  fetch(toyUrl + "/" + id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({ likes: likes })
  })
    .then(response => {
      return response.json();
    })
    .then(toy => {
      likesEl.innerText = `${likes} likes`;
    });
}
