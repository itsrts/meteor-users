import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Mongo } from 'meteor/mongo';
import { Review } from '../db.js';

import './detail.html';

FlowRouter.route('/user/:id', {
    name: 'detail',
    action(params, queryParams) {
      BlazeLayout.render('App_body', {main: 'detail'});
    }
});
  

Template.detail.helpers({
    getdetails: function() {
      return Meteor.users.findOne({_id: FlowRouter.getParam("id")});
    },
    post: function() {
      Review.insert({"review":"ok", createdAt: new Date().getTime()});
    },
    reviews: function() {
      return Review.find({to: FlowRouter.getParam("id")});
    }
});

Template.detail.events({
    'submit .form'(event) {
        event.preventDefault();
        if(Meteor.user()==null) {
            alert("Please login to continue..!!");
            return;
        }

        const target = event.target;
        const text = target.text.value;
        let rating = target.rating.value;
        rating = parseInt(rating);

        if(text=="") {
            alert("Please enter a review..!!");
            return;
        }
        let doc = {"review":text, "rating": rating, "from": Meteor.userId(), "to":FlowRouter.getParam("id"), createdAt: new Date().getTime()};
        Review.insert(doc, function(p) {
            console.log("inserted", p);
        });

        target.text.value = '';
    }
})