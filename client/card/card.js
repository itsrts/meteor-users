import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Mongo } from 'meteor/mongo';
import { Review } from '../db';

import './card.html';

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
      // $(".star").rateYo({
      //   maxValue: 1,
      //   rating: 1,
      //   numStars: 1,
      //   starWidth: "40px",
      //   readOnly: true
      // });
      return Review.find({to: Template.instance().data._id}).count();
    },
    avg: function() {
      var r = Review.find({to: Template.instance().data._id});
      r = r.collection._docs._map;
      var s = 0, c = 0;
      for(var i in r) {
        c++;
        s+=r[i].rating || 0;
        console.log(i, s);
      }
      return (s / parseFloat(c)).toFixed(1);
    }
});