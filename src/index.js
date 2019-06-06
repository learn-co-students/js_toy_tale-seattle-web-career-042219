const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const URL = "http://localhost:3000/toys"
let addToy = false

// YOUR CODE HERE
function main() {
	fetchToys();
}

main();

function fetchToys() {
	fetch(URL)
	.then(resp => {
		return resp.json();
	})
	.then(json => {
		displayToys(json);
	})
}

function displayToys(json) {
	for (let toy of json) {
		displayToy(toy);
	}
}

function displayToy(toy) {
	let toyCollect = document.getElementById("toy-collection");
	let newToyCard = document.createElement("div");
	let toyImage = document.createElement("img");
	let toyH2 = document.createElement("h2");
	let toyP = document.createElement("p");
	let toyButton = document.createElement("button");
	
	newToyCard.className = "card";
	toyImage.className = "toy-avatar";
	toyImage.src = toy.image;
	toyH2.innerHTML = toy.name;
	toyP.innerHTML = `${toy.likes} Likes`;
	toyButton.className = "like-btn";
	toyButton.innerHTML = "like &hearts;"
	toyButton.addEventListener("click", () => {
		const toyURL = `${URL}/${toy.id}`
		let likes = toy.likes;
		fetch(toyURL, {
			method: 'PATCH', 
			headers: {
			  "Content-Type": "application/json"
			},

			body: JSON.stringify({ likes: (likes + 1) })
		})
		.then(res => {
			return res.json();
		})
		.then(json => {
			
			toyP.innerHTML = `${json["likes"]} Likes`;
			toy["likes"] = json["likes"];
		})
		
	});



	newToyCard.appendChild(toyImage);
	newToyCard.appendChild(toyH2);
	newToyCard.appendChild(toyP);
	newToyCard.appendChild(toyButton);

	toyCollect.appendChild(newToyCard);
}


addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
    toyForm.addEventListener("submit", (ev) => {
    	ev.preventDefault();
    	handleSubmit(ev.target.elements);
    })
  } else {
    toyForm.style.display = 'none'
  }
})


// OR HERE!
function handleSubmit(formInputs) {
	let name = formInputs['name'].value
	let image = formInputs['image'].value

	fetch(URL, {
		method: 'POST',
		headers: {
		  "Content-Type": "application/json"
		},

		body: JSON.stringify({ 
			name: name, 
		  	image: image,
			likes: 0
		})
	})
	.then(res => {
		return res.json();
	})
	.then(json => {
		displayToy(json);
	})
}
