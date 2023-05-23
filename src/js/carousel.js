/**
 * Carousel
 * @namespace gel
 * @method gel.Carousel.init
 */

export default (function() {
  if (!window.gel) { window.gel = {}; }
  var self = gel.Carousel = {};

  self.init = function() {

    self.constructor = function(elem) {
      // Save refs to elements
      var scrollable = elem.querySelector('.reel');
      var buttons = elem.querySelector('.reel__nav');
      var list = elem.querySelector('.reel');
      var items = list.children;
      var prev = elem.querySelector('.reel__nav button:first-child');
      var next = elem.querySelector('.reel__nav button:last-child');

      // Reveal button functionality now JS has run
      buttons.hidden = false;

      // Make the prev button disabled because
      // you can't 'go left' to begin with
      prev.disabled = true;

      // Scroll by half the container's width
      var scrollAmount = list.offsetWidth / 2;

      // Scroll incrementally by button
      prev.addEventListener('click', function(e) {
        scrollable.scrollLeft += -scrollAmount;
      });
      next.addEventListener('click', function(e) {
        scrollable.scrollLeft += scrollAmount;
      });

      function disableEnable() {
        prev.disabled = scrollable.scrollLeft < 1;
        next.disabled = scrollable.scrollLeft === list.scrollWidth - list.offsetWidth;
      }

      // Debounce the button disabling function on scroll
      var debounced;
      scrollable.addEventListener('scroll', function() {
        window.clearTimeout(debounced);
        debounced = setTimeout(disableEnable, 200);
      });

      // Only use if supported
      if ('IntersectionObserver' in window) {
        var observerSettings = {
          root: scrollable,
          threshold: 0.5
        }

        var callback = function(items, observer) {
          Array.prototype.forEach.call(items, function(item) {
            if (item.intersectionRatio > 0.5) {
              item.target.removeAttribute('inert');
            } else {
              // Makes items unfocusable and unavailable to assistive technologies
              item.target.setAttribute('inert', 'inert');
            }
          });
        }

        var observer = new IntersectionObserver(callback, observerSettings);
        Array.prototype.forEach.call(items, function(item) {
          observer.observe(item);
        });
      }
    }
  }
})();
