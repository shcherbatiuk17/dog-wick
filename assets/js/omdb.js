var movies = $('#movies');

  // Generate random movies released in 1995
  $('#searchButton').click(function() {
    // Clear previous results
    $('#movies').empty();

    // Request a random movie released in 1995
    fetch("https://www.omdbapi.com/?apikey=73a93d98&y=1995$type=movie")
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        // Display the random movie
        var movie = data.Title;
        console.log(movie)
        $('#movies').append('<li>' + movie + '</li>');
      })
      .catch(function(error) {
        console.log('Error:', error);
      });
    });

//   function displayMovieData(movies) {
//     var title;
//     if (data.length > 0) {
//       movieData = 'Title:' ${movies[0].title}
//     }
//   }
