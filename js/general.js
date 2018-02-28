(function ($) {
  $(window).on('scroll', function () {
      if ($(this).scrollTop() > 0) {
          $('.site-header').addClass('sticky');
      } else {
          $('.site-header').removeClass('sticky');
      }
  });
})(jQuery);
