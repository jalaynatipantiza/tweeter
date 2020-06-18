/*
* Client-side JS logic goes here
* jQuery is already loaded
* Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/

$(document).ready(function() {
  
  $('#new-post').on('submit', function(event) {  
    event.preventDefault();
    let data = $(this).serialize();
    let decodedData = decodeURIComponent(data).slice(5);

    $("#error-message").slideUp(() => {
      $("#error-messages").empty();
    });
  
    if (decodedData.length > 140) {
      $("#error-messages").prepend(`<div id="error-message">
      🚫 Easy there pal, tweet is too long. Plz respect our arbitrary limit of 140 characters. #kthxbye 🚫
      </div>`)
      if ( $( "#error-message" ).first().is( ":hidden" ) ) {
          $( "#error-message" ).slideDown();
        }
    
    } else if (!decodedData) {
      $("#error-messages").prepend(`<div id="error-message">
      🚫 Easy there pal, you didn't enter anything 🚫
      </div>`)
      if ( $( "#error-message" ).first().is( ":hidden" ) ) {
          $( "#error-message" ).slideDown();
        }
    } else {
      $.post('/tweets/', data, function() {
        loadtweets();       
      });
    }
  });
  
  
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
    const createdAt = tweet.created_at;
      
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
      <p class="margin-b"> ⚑ ↩︎ ♥︎</p>
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
    
    
    
    
    
    
    