
// start of helpers.js


var FEED_FIXTURE = [
  {id: "Ember.js commits", url: "https://github.com/emberjs/ember.js/commits/master.atom"},
  {id: "TechCrunch", url: "http://feeds.feedburner.com/TechCrunch/"},
  {id: "Stackoverflow ember.js newest questions", url: "http://stackoverflow.com/feeds/tag?tagnames=ember.js&sort=newest"},
  {id: "TheVerge", url: "http://www.theverge.com/rss/frontpage"}
];


/**
returns feeds in the format:

[
  {
    title: "the title of the feed item",
    link: {
      href:"http://the-url-to-the-feed.com/the-feed-item.html"
    },
    summary: "This is the summary of the feed item. Probably in HTML."
  },
  
  ...
]

*/
var GetFeedItems = function(url){
  var requestUrl, query, data;
  var normalizeFeedItem = function(item) {
    return (typeof item === "object") ? item.content: item;
  };
  
  requestUrl = "http://query.yahooapis.com/v1/public/yql";
  query = "select * from feednormalizer where url='" + url + "' and output='atom_1.0'";
  
  data = {q: query,
          format: 'json'};

  return $.ajax(requestUrl, {data: data}).then(function(d){
    // get the raw array of items
    var rawItems = d.query.results.feed.entry;

    // slight process titles and summary/contents into a usable form
    return rawItems.map(function(item, index, enumerable){
      item.title = normalizeFeedItem(item.title);
      item.summary = normalizeFeedItem(item.summary || item.content);
      return item;
    });
  });
};