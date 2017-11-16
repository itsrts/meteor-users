import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Mongo } from 'meteor/mongo';
import { Review } from '../db.js';

Template.card.helpers({
    link() {
      return "/user/"+Template.instance().data._id;
    },
    image() {
      if(!Template.instance().data.services.facebook) {
        return "https://www.w3schools.com/howto/img_avatar.png";
      }
      return "https://graph.facebook.com/"+Template.instance().data.services.facebook.id+"/picture?type=large";
    },
    info() {
      return JSON.stringify(this);
    },
    reviews: function() {
      return Review.find({to: Template.instance().data._id}).count();
    }
});