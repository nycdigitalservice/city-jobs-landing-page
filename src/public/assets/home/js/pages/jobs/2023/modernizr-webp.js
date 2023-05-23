/* DOC
   Tests for lossy, non-alpha webp support.
*/

window.Modernizr.addTest('webp', function(){
  var image = new Image();

  image.onerror = function() {
    console.log('webp error')
    /*          window.Modernizr.addTest('webp', false); */
  };

  image.onload = function() {
    console.log('webp success')
    window.Modernizr.addTest('webp', image.width == 1);
    document.documentElement.classList.remove('no-webp');
  };

  image.src = 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=';
});
