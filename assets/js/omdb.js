var movies = $('#movies');

  // Generate random movies released in 1995
  $('#searchButton').click(function() {
    // Clear previous results
    $('#movies').empty();

    // Request a random movie released in 1995
    fetch("https://www.omdbapi.com/?i=tt1&apikey=73a93d98")
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        // Display the random movie
        var movie = data.Title;
        $('#movies').append('<li>' + movie + '</li>');
      })
      .catch(function(error) {
        console.log('Error:', error);
      });
    });
