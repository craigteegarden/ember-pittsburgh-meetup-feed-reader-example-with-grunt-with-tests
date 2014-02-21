App = Ember.Application.create();

App.Router.map(function() {
  this.resource('feeds', {path: "/"}, function(){
    this.route('feed', {path: "/:feed_id"});
  });
});


App.FeedsRoute = Ember.Route.extend({
  model: function(params) {
    return App.Feed.find();
  }
});


App.FeedsFeedRoute = Ember.Route.extend({
  setupController: function(controller, model){
    this._super(controller, model);
    
    GetFeedItems(model.url).then(function(items){
      controller.set('content.feedItems', items);
    });
  }
});


App.Feed = Ember.Object.extend();

App.Feed.reopenClass({
  find: function(id) {
    if (id) {
      return FEED_FIXTURE.find(function(item, index, enumerable){
        return (item.id === id);
      });
    } else {
      return FEED_FIXTURE;
    }
  }
});


