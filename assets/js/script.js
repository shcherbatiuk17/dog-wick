function fetchRandomDog() {
    fetch('https://documenter.getpostman.com/view/5578104/2s935hRnak' )
      .then(response => response.json())
      .then(data => {
        // Process the returned data
        console.log(data);
        // Display the dog image or perform any other actions
      })
      .catch(error => {
        // Handle any errors
        console.error(error);
      });
  }