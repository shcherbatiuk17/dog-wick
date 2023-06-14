var breedNameInput = $("#breedNameInput");
var searchButton = $("#searchButton");
var breedNameElement = $("#breedName");
var dogImageElement = $("#dogImage");
var breedInfoElement = $("#breedInfo");

function displayDogData(data, dogImage) {
  var breedInfo;
  if (data.length > 0) {
    breedInfo = `Life Span: ${data[0].life_span}\nTemperament: ${data[0].temperament}`;
  } else {
    breedInfo = "Breed information not found.";
  }
  console.log(breedInfo);
  console.log(dogImage);
  dogImageElement.attr("src", dogImage[0]);
  breedNameElement.text(breedNameInput.val());
  breedInfoElement.text(breedInfo);
}

function getBreedDescription(breedName, dogImage) {
  fetch("https://api.thedogapi.com/v1/breeds/search?q=" + breedName, {
    headers: {
      "x-api-key":
        "live_3aRzpPfgLygEtn81Xr2xSHValhOfa9GfrdfHDqTN8jbHaoS9GDgBFWKBzN4wPI7c",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      displayDogData(data, dogImage);
    })
    .catch((error) => {
      console.error(error);
    });
}

function getDogImg(breedName) {
  fetch(`https://dog.ceo/api/breed/${breedName}/images`)
    .then((response) => response.json())
    .then((data) => {
      var dogImage = data.message.slice(0, 5);
      console.log(dogImage);
      getBreedDescription(breedName, dogImage);
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

function handleBreedSearch(event) {
  event.preventDefault();
  var breedName = breedNameInput.val().toLowerCase();
  breedName = breedName.split(" ").reverse().join("-");
  console.log(breedName);
  getAllDogInfo(breedName);
}

searchButton.on("click", handleBreedSearch);

