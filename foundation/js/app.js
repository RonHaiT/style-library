$(document).foundation();
$("head").append(
  '<link id="css-dark" rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/vinorodrigues/foundswatch@0.1.0/dist/dark/foundation.min.css" media="(prefers-color-scheme: dark)" />'
);
$("head").append(
  '<link id="css-light" rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/foundation/6.6.3/css/foundation.css" media="(prefers-color-scheme: no-preference), (prefers-color-scheme: light)" />'
);
$("head").append('<link id="css" />');

// the big toggle switch and all it's trickery - it assumes jQuery is loaded.
// if jQuery loaded, set the button control trigger
$("#toggleButton").click(function () {
  // get current mode
  $mode = $("#css").attr("data-mode"); // don't use data("mode"), it doesn't refresh
  if (typeof $mode === "undefined") {
    // not defined yet - set brand pref. & ask the browser if alt. is active
    $mode = "light";
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    )
      $mode = "dark";
    // optional disable media-query entries
    $("#css-dark").prop("disabled", true);
    $("#css-light").prop("disabled", true);
  }

  // by here we have the current mode, so swap it
  $mode = $mode == "dark" ? "light" : "dark";
  // and grab the new mode css href
  $href = $("#css-" + $mode).attr("href");

  // set the css the forced preference.
  $("#css").attr({
    rel: "stylesheet",
    type: "text/css",
    href: $href,
    "data-mode": $mode,
  });

  // optional bit, just for this demo
  $("#mode-msg").html($mode);
});
