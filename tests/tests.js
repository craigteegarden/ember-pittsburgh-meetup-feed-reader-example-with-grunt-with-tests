// in order to see the app running inside the QUnit runner
App.rootElement = '#ember-testing';

// Common test setup
App.setupForTesting();
App.injectTestHelpers();


var oldGetFeedItems;

// common QUnit module declaration
module("Integration tests - fake data", {
  setup: function() {
    // swap out fixture for GetFeedItems
    oldGetFeedItems = GetFeedItems;
    GetFeedItems = function() {
      var data = [
        {
          title: "the title of the first feed item",
          link: {
            href:"http://the-url-to-the-feed.com/the-feed-item-1.html"
          },
          summary: "Summary number one"
        },
        {
          title: "the title of the second feed item",
          link: {
            href:"http://the-url-to-the-feed.com/the-feed-item-2.html"
          },
          summary: "the second summary"
        }
      ];

      return Ember.RSVP.resolve(data);

    };



    // reset the application state between each test
    App.reset();
  },

  teardown: function() {
    // put GetFeedItems back
    GetFeedItems = oldGetFeedItems;
  }
});

// QUnit test case
test("/", function() {
  // async helper telling the application to go to the '/' route
  visit("/");

  // helper waiting the application is idle before running the callback
  andThen(function() {
    equal(find("h1").text(), "Welcome to Ember.js Feed Reader", "Application header is rendered");
    equal(find("li").length, 4, "There are four items in the list");
  });
});

test("go to a feed", function() {
  // async helper telling the application to go to the '/Ember.js commits' route
  visit("/Ember.js commits");

  // helper waiting the application is idle before running the callback
  andThen(function() {
    equal(find("#feed-list li").length, 2, "Application header is rendered");
    equal(find("#feed-list li:nth-of-type(1) a").attr('href'), "http://the-url-to-the-feed.com/the-feed-item-1.html", "link to correct feed article");
  });
});




module("unit tests", {});

test("test my-unit-test", function(){
  ok(true, "normal unit test");
});