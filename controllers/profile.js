const express = require('express');
const router = express.Router();
const passport = require('../config/ppConfig');
const { Lead, User } = require('../models');
const isLoggedIn = require('../middleware/isLoggedIn');

// profile of user
const profile =  (req,res) => {
    const { id, firstName, lastName, email, nmlsId } = req.user.get();
    res.render('profile', { id, firstName, lastName, email, nmlsId });
};

// show all the leads
const allLeads = async (req,res) => {
    try {
        const rawData = await Lead.findAll({});
        const leadData = rawData.map(u => u.toJSON());
        // res.render('leads', { firstName, lastName, phoneNumber, address, state, zip, email })
        res.render('leads', {leadObj: leadData});
    } catch (error) {
        console.log(error)
    }
}
// index of leads
const leadsIdx = async (req,res) => {
    try {
        const rawData = await Lead.findAll({});
        const leadData = rawData.map(u => u.toJSON());
        let oneLeadIdx = req.params.idx;
        res.render('leads/show', { leadObj: leadData[oneLeadIdx], leadId: oneLeadIdx});
    } catch (error) {
        console.log(error)
    }
}
// new lead FORM
const newLead = async (req,res) => {
    res.render('leads/new');
}
// add new lead to database
const addNewLead = async (req,res) => {
    // grab data from the form
    const { firstName, lastName, phoneNumber, address, state, zipCode, email } = req.body;

    console.log('new lead info',firstName, lastName, phoneNumber, address, state, zipCode, email);
    // find user by id
    try {
        const foundUser = await Lead.findOrCreate({
          where: { email },
          defaults: { firstName, lastName, phoneNumber, address, state, zipCode }
        });
    
        if (foundUser) {
          // if new user created then redirect back to /.. page
          console.log(`-----${User.email} is already in your database ------`);
          res.flash('error', 'The provided email address already matches a lead in your database');
          res.redirect('/profile/leads');
        } else {
            // add new lead to database
          req.flash('success','You added a new lead');
          res.redirect('/profile/leads');
        }
    
      } catch (error) {
        console.log('*********ERRROORR');
        console.log(error);
        req.flash('error', 'There is an error. Please try again.');
        res.redirect('/profile');
      }

}
// edit lead FORM db
const editLead = async (req,res) => {
    const leadIdx = req.params.idx;
    try {
        const rawData = await Lead.findAll({});
        const leadData = rawData.map(u => u.toJSON());
        res.render('leads/edit', {leadObj: leadData[leadIdx], leadId: leadIdx});
    } catch (error) {
        console.log(error)
    }  
}
// add edited lead to db
const addEditedLead = async (req,res) => {
    const { firstName, lastName, phoneNumber, address, state, zipCode, email } = req.body;
    const id = req.params.idx;
    try {
        const numberOfRowsUpdate = await Lead.update({ firstName, lastName, phoneNumber, address, state, zipCode },{
            where: {email : email}
        });
        console.log('you have successfully updated a lead');
    } catch (error) {
        console.log('you had an error updating a lead: --->', error)
    }
}
// delete or deactivate from db
// const deactivateLead = (req,res) => {
//     res.send('you more than likely shouldnt delete data in the information age')
// }
// CREATE ROUTES FOR PROFILE
router.get('/', isLoggedIn, profile);

// CREATE ROUTES FOR LEADS
router.get('/leads', isLoggedIn, allLeads);
// index of leads
router.get('/leads/:idx',isLoggedIn, leadsIdx);
// add new lead form
router.get('/newLead', isLoggedIn, newLead);
// add new lead to db
router.post('/leads', addNewLead);
// edit FORM for lead
router.get('/leads/edit/:idx', editLead);
// add new edits to lead db
router.post('/leads/:idx', addEditedLead);
// delete lead from db
// router.delete('/leads/delete/:idx', deactivateLead)

module.exports = router;

