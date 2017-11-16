import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Mongo } from 'meteor/mongo';
import { Review } from './db.js';

import './main.html';
import './detail/detail.js';
import './review/review.js';
import './card/card.js';

FlowRouter.notFound = {
  action() {
    FlowRouter.go('/', {});
  }
};

FlowRouter.route('/users', {
  name: 'users',
  action(params, queryParams) {
    if(Meteor.user()==null) {
      FlowRouter.go('/', {});
    } else{
      BlazeLayout.render('App_body', {main: 'users'});
    }
  }
});

FlowRouter.route('/', {
  name: 'home',
  action(params, queryParams) {
    if(Meteor.user()!=null) {
      FlowRouter.go('users', {});
    } else {
      BlazeLayout.render('App_body', {main: 'home'});
    }
  }
});

Template.home.helpers({
  loginrequired: function() {
    return Meteor.user()==null;
  }
});

Template.users.helpers({
  users: Meteor.users.find({})
});
