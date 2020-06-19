$(document).ready(function() {

  //Displays error slide up and down
  $('#new-post').on('submit', function(event) {  
    let data = $(this).serialize();
    let decodedData = decodeURIComponent(data).slice(5);
    event.preventDefault();

    $("#error-message").slideUp()
    
    if (decodedData.length > 140) {
      $("#error-messages").empty();
      $("#error-messages").prepend(`
      <div id="error-message">
      <b>🚫Easy there pal, tweet is too long. Plz respect our arbitrary limit of 140 characters🚫</b>
      </div>`)
      if ( $( "#error-message" ).first().is( ":hidden" ) ) {
          $( "#error-message" ).slideDown();
        }   
    } else if (!decodedData) {
      $("#error-messages").empty();
      $("#error-messages").prepend(`
      <div id="error-message">
      <b>🚫 Easy there pal, you didn't enter anything 🚫</b>
      </div>`)

      if ( $( "#error-message" ).first().is( ":hidden" ) ) {
          $( "#error-message" ).slideDown();
      }
    } else {
      $.post('/tweets/', data, function() {
        loadtweets();   
        $("textarea").val('').change();
        $(".counter").val('140').change();   
      });
    }
  });
  
  //button event listener 
  $(".double-down").on("click", function() {
    if($( ".new-tweet" ).first().is( ":hidden" )) {
      $( ".new-tweet" ).slideDown();
      $( "textarea" ).focus();
    } else {
      $( ".new-tweet" ).slideUp();
    }
  })
  
  const loadtweets = () => {
    $.getJSON('/tweets/', function(data) {
      $('#tweets-container').empty()
      renderTweets(data);
      
    });
  };

  const renderTweets = function(tweets) {
    $('#container').empty()   
    for (const tweet of tweets) {
      const newTweet = createTweetElement(tweet);
      $('#tweets-container').prepend(newTweet);
    }    
  };
    
  const createTweetElement = function(tweet) {
    const name = tweet.user.name;
    const avatar = tweet.user.avatars;
    const handle = tweet.user.handle;
    const text = tweet.content.text;
    const createdAt = moment(tweet.created_at).fromNow();
      
    const tweetArticle = `
      <article> 
      <header class="tweet-header">
      <div class="profile-pic-name">
      <img src="${avatar} alt="profile avatar">
      <p>${name}</p>
      </div>
      <p class="handle">${handle}</p>
      </header>
      <footer>
      <div class="bottom-footer-a">             
      <p>${escape(text)}</p>  
      </div>
      <div class="bottom-footer-b">
      <p class="margin-a">${createdAt}</p> 
      <p class="margin-b handle"> ⚑ ↩︎ ♥︎</p>
      </div>   
      </footer>
      </article>  
      `;
    return tweetArticle;
  };

  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }
    
  loadtweets();
});
    
    
    
    
    
    
    