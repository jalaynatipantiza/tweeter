$(document).ready(function() {
 

  $('textarea').keyup(function() {
    const $input = $(this);
    const value = $input.val();
    const limit = 140;
    const finalCount = limit - value.length;
    const $counter = $input.parents().find(".counter");
    
    if (finalCount < 0) {
      $counter.css('color', 'red');
    } else {
      $counter.css('color', '#545149');
    }
    $counter.text(finalCount);
  });
});