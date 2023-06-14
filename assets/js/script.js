var breedNameInput = $("#breedNameInput");
var searchButton = $("#searchButton");
var breedNameElement = $("#breedName");
var dogImageElement = $("#dogImage").width('50%').height('50%');
var breedInfoElement = $("#breedInfo");
var saveButtonElement = $("#saveButton");
var savedBreedsList = $("#Previously-Searched");

function displayDogData(data, dogImages) {
  var breedInfo;
  if (data.length > 0) {
    breedInfo = `Life Span: ${data[0].life_span}\nTemperament: ${data[0].temperament}`;
  } else {
    breedInfo = "Breed information not found.";
  }
  console.log(dogImages);
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
      console.log(dogImages);
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
      console.log(breedNames);
      console.log(breedName);
      breedName = breedName.split("-");
      console.log(breedName);
      if (breedNames.includes(breedName[0])) {
        breedName = breedName.join("/");
        getDogImg(breedName);
      } else {
        alert("Breed not found.");
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

function linkForAPI() {
  var breedName = breedNameInput.val().toLowerCase();
  breedName = breedName.split(" ").reverse().join("-");
  console.log(breedName);
  return breedName;
}

function handleBreedSearch(event) {
  // Check if the Enter key was pressed or the button was clicked
  if (event.keyCode === 13 || event.which === 13 || event.type === 'click') {
    event.preventDefault();
    var breedName = linkForAPI();
    getAllDogInfo(breedName);
  }
}

breedNameInput.on("keypress", handleBreedSearch);
searchButton.on("click", handleBreedSearch);

function saveInLocalStorage() {
  var breedName = breedNameInput.val();
  localStorage.setItem('breedName', breedName);
}

function displayLocalStorage() {
  if (localStorage.getItem("breedName")) {
    var savedBreedName = localStorage.getItem("breedName");
    var breedLink = $("<a>").text(savedBreedName).attr("href", "#").on("click",savedLink)
    var breedItem = $("<li>").append(breedLink);    
    savedBreedsList.append(breedItem);
    console.log(savedBreedName);
  }
}
function savedLink (event) {
  event.preventDefault();
  var breedName = $(this).text();
  breedNameInput.val(breedName);
  handleBreedSearch(event);
};

saveButtonElement.on("click", function() {
  saveInLocalStorage();
  displayLocalStorage();
});

displayLocalStorage();
