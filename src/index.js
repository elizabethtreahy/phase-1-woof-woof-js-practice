document.addEventListener('DOMContentLoaded', function () {
  fetchDogs();
});

function fetchDogs() {
  fetch('http://localhost:3000/pups')
    .then(response => response.json())
    .then(data => loadDogs(data))
}

function loadDogs(dogData) {
  dogData.forEach(element => {
    const span = document.createElement("span")
    span.innerHTML = element.name
    document.getElementById("dog-bar").append(span)
    span.addEventListener("click", () => { loadDogInfo(element) })
  })
}
function loadDogInfo(dogInfo) {
  const img = document.createElement('img')
  img.src = dogInfo.image
  console.log(dogInfo)
  document.getElementById("dog-info").replaceChildren()
  document.getElementById("dog-info").append(img)
  const h2 = document.createElement('h2')
  h2.textContent = dogInfo.name
  document.getElementById("dog-info").append(h2)
  const button = document.createElement('button')
  if (dogInfo.isGoodDog === true) {
    button.innerText = ("Good Dog!")
  }
  else {
    button.innerText = ("Bad Dog!")
  }
  button.addEventListener("click", () => {
    if (button.innerText === ("Good Dog!")) {
      button.innerText = ("Bad Dog!")
      patchDog(dogInfo)
    }
    else {
      button.innerText = ("Good Dog!")
      patchDog(dogInfo)
    }
  })
  document.getElementById("dog-info").append(button)
}
function patchDog(dogInfo) {
  dogInfo.isGoodDog = !dogInfo.isGoodDog
  fetch(`http://localhost:3000/pups/${dogInfo.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dogInfo)
  })
    .then(response => response.json())
    .then(dogs => console.log(dogs))
}