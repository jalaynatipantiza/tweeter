$(document).ready(function() {
 
  //changes count to red when chars exceed 140
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

  // //Getting how many days ago tweet was written
  // const date1 = new Date();
  // const date2 = tweet.created_at;
  // const differenceInTime = date1.getTime() - date2;
  // const differenceInDays = (differenceInTime / (1000 * 3600 *24));
  // const differenceInyears = Math.floor(differenceInDays / 365);
  // const differenceInHours = (differenceInDays * 24);
  // const differenceInMinutes = (differenceInHours * 60);
  // const differenceInSeconds = (differenceInMinutes * 60);

  // let dateString;

  // if(differenceInDays > 365) {
  //   dateString = differenceInyears.toFixed(0) + ' years ago';
  // } else if(differenceInSeconds < 60) {
  //   dateString = differenceInSeconds.toFixed(0) + ' seconds ago';
  // } else if(differenceInMinutes < 60) {
  //   dateString = differenceInMinutes.toFixed(0) + ' minitues ago';
  // } else if(differenceInHours < 24) {
  //   dateString = differenceInHours.toFixed(0) + ' hours ago';
  // } 
});

