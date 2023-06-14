var breedNameInput = $("#breedNameInput");
var searchButton = $("#searchButton");
var breedNameElement = $("#breedName");
var dogImageElement = $("#dogImage");
var breedInfoElement = $("#breedInfo");
// document.addEventListener("DOMContentLoaded", function () {
//   getAllDogInfo();
// });

function displayDogData(data){
  var breedInfo;
      if (data.length > 0) {
        breedInfo = `Life Span: ${data[0].life_span}\nTemperament: ${data[0].temperament}`;
      } else {
        breedInfo = "Breed information not found.";
      }
      console.log(breedInfo);
      dogImageElement.attr("src", dogImage);
      breedNameElement.text(breedName);
      breedInfoElement.text(breedInfo);
}

function getBreedDescription(breedName) {
  fetch("https://api.thedogapi.com/v1/breeds/search?q=" + breedName, {
    headers: {
      "x-api-key":
        "live_3aRzpPfgLygEtn81Xr2xSHValhOfa9GfrdfHDqTN8jbHaoS9GDgBFWKBzN4wPI7c",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      //display dog data
      displayDogData(data)
    })
    .catch((error) => {
      console.error(error);
    });
}
function getDogImg(breedName) {
  fetch(`https://dog.ceo/api/breed/${breedName}/images/random`)
    .then((response) => response.json())
    .then((data) => {
      var dogImage = data.message;
      console.log(dogImage);
      // get breed description
      getBreedDescription(breedName)
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
      console.log(breedName)
        if (breedNames.includes(breedName[0])) {
          // turning breedName back into string
          breedName = breedName.join("/"); 
          //get dog picture by breed
          getDogImg(breedName)
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
  var breedName = breedNameInput.val().toLowerCase()
  // .replace(" ", "-");
  breedName = breedName.split(" ")
  breedName = breedName.reverse()
  breedName = breedName.join("-");
  console.log(breedName);
  getAllDogInfo(breedName);
}
searchButton.on("click", handleBreedSearch);
