import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Mongo } from 'meteor/mongo';

import './review.html';

Template.review.helpers({
  gettime: function() {
    return new Date(this.createdAt).toDateString();
  }
});