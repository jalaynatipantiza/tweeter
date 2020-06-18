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

    if (decodedData.length > 140) {
      alert("Tweet is too long!");
    } else if (decodedData === "") {
      alert("No tweet added");
    } else {
      $.post('/tweets/', data, function() {
        console.log('sucess');
      });
    }
  });
  
  
  const loadtweets = () => {
    $.getJSON('/tweets/', function(data) {
      renderTweets(data);
    });
  };
  
  
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];
  const renderTweets = function(tweets) {
    // loops through tweets
    for (const tweet of tweets) {
      // calls createTweetElement for each tweet
      const newTweet = createTweetElement(tweet);
      // takes return value and appends it to the tweets container
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
      <p>${text}</p>  
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
    
  loadtweets();
});
    
    
    
    
    
    
    