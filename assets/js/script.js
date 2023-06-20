var breedNameInput = $("#breedNameInput");
var searchButton = $("#searchButton");
var breedNameElement = $("#breedName");
var dogImageElement = $("#dogImage");
var breedInfoElement = $("#breedInfo");
var saveButtonElement = $("#saveButton");
var savedBreedsList = $("#Previously-Searched");
var landingPageEl = $('#landing-img');
var dogsResultEl = $('#dogs-result');
var dogHeroEl = $('#dog-hero');
var cryingDogEl = $('#cryingDog').hide();

function displayDogData(data, dogImages) {
  var breedInfo;
  if (data.length > 0) {
    breedInfo = `Life Span: ${data[0].life_span}\nTemperament: ${data[0].temperament}`;
  } else {
    breedInfo = "Breed information not found.";
  }
  dogImageElement.attr("src", dogImages[0]);
  breedNameElement.text(breedNameInput.val());
  breedInfoElement.text(breedInfo);
}

function getBreedDescription(breedName, dogImages) {
  fetch("https://api.thedogapi.com/v1/breeds/search?q=" + breedName, {
    headers: {
      "x-api-key": "live_3aRzpPfgLygEtn81Xr2xSHValhOfa9GfrdfHDqTN8jbHaoS9GDgBFWKBzN4wPI7c",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      displayDogData(data, dogImages);
    })
    .catch((error) => {
      console.error(error);
    });
}

function getDogImg(breedName) {
  fetch(`https://dog.ceo/api/breed/${breedName}/images`)
    .then((response) => response.json())
    .then((data) => {
      var dogImages = data.message.slice(0, 3); // Get the first three images
      getBreedDescription(breedName, dogImages);
    })
    .catch((error) => {
      console.error(error);
    });
}

function getAllDogInfo(breedName) {
  fetch("https://dog.ceo/api/breeds/list/all")
    .then((response) => response.json())
    .then((data) => {
      var breedNames = Object.keys(data.message);
      breedName = breedName.split("-").reverse().join("/");
      if (breedNames.includes(breedName)) {
        getDogImg(breedName);
      } else {
        breedInfoElement.text("Apologies, but this breed is either not yet in our database or does not exist.");
        dogImageElement.hide();
        cryingDogEl.show();
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

function handleBreedSearch(event) {
  dogHeroEl.empty();
  dogsResultEl.show();
  event.preventDefault();
  var breedName = breedNameInput.val().toLowerCase().replace(/\s+/g, "-");
  getAllDogInfo(breedName);
}

function saveInLocalStorage() {
  var breedName = breedNameInput.val();
  var savedBreeds = localStorage.getItem('savedBreeds');

  if (savedBreeds) {
    savedBreeds = JSON.parse(savedBreeds);
  } else {
    savedBreeds = [];
  }

  savedBreeds.push(breedName);
  localStorage.setItem('savedBreeds', JSON.stringify(savedBreeds));
}

function displayLocalStorage() {
  savedBreedsList.empty();
  var savedBreeds = localStorage.getItem("savedBreeds");

  if (savedBreeds) {
    savedBreeds = JSON.parse(savedBreeds);

    for (var i = 0; i < savedBreeds.length; i++) {
      var breedName = savedBreeds[i];
      var breedLink = $("<a>").text(breedName).attr("href", "#").on("click", savedLink);
      var breedItem = $("<li>").append(breedLink);
      savedBreedsList.append(breedItem);
    }
  }
  }


function savedLink(event) {
  event.preventDefault();
  var breedName = $(this).text();
  breedNameInput.val(breedName);
  handleBreedSearch(event);
}

searchButton.on("click", function(event) {
  saveInLocalStorage();
  displayLocalStorage();
  handleBreedSearch(event);
});

displayLocalStorage();

dogsResultEl.hide();
cryingDogEl.hide();