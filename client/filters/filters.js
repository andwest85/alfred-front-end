
app.filter('direct', function() {
  return function(input) {
    console.log(input);
  };
});
