(function ($) {
  $(function () {
    $(".sidenav").sidenav();
    $(".parallax").parallax();
  }); // end of document ready
})(jQuery); // end of jQuery name space

$("#signuplink").click(function (e) {
  e.preventDefault();

  $("#loginclass").css("display", "none");
  $("#signupclass").css("display", "block");
});

$("#loginlink").click(function (e) {
  e.preventDefault();

  $("#loginclass").css("display", "block");
  $("#signupclass").css("display", "none");
});
