const express = require('express');
const router = express.Router();
const passport = require('../config/ppConfig');
const { Lead, User } = require('../models');
const isLoggedIn = require('../middleware/isLoggedIn');
const fetch = require('node-fetch');

const myAxios = async (endpoint) => {
    let response  = await fetch(endpoint);
    let data = await response.json();
    return data;
}

// profile of user
const profile =  (req,res) => {
    const { id, firstName, lastName, email, nmlsId } = req.user.get();

    myAxios(`https://finnhub.io/api/v1/news?category=technology&token=${process.env.FINNHUB_API_KEY}`)
    .then(data => {
        // console.log(data);
        res.render('profile', { id, firstName, lastName, email, nmlsId, marketData: data});
    }).catch(err => {
        console.log('you have an error with finnhuB NEWS', err)
    });
};

// show all the leads
const allLeads = async (req,res) => {
    try {
        const rawData = await Lead.findAll({});
        const leadData = rawData.map(u => u.toJSON());
     res.render('leadsThree', {leadObj: leadData});

    } catch (error) {
        console.log(error)
    }
}
// index of leads
const leadsIdx = async (req,res) => {
    try {
        const rawData = await Lead.findByPk(req.params.idx);
        const leadData = rawData.toJSON();
        
        res.render('leads/show', { leadObj: leadData});
    } catch (error) {
        console.log(error)
    }
}
// show one lead 
const showLead = async (req,res) => {
    try {
        const rawData = await Lead.findAll({});
        const leadData = rawData.map(u => u.toJSON());
        // search for lead in DB by name then render show/lead
        let searchValue = req.body.showLead;
        // console.log(leadData);
        console.log('search value',searchValue);
        if(searchValue) {
            for (let i = 0; i < leadData.length; i++) {
                const lead = leadData[i];
                if(searchValue.toLowerCase() === lead.firstName.toLowerCase()) 
                {
                    console.log('name of the lead',lead);
                    res.redirect(`/profile/leads/${lead.id}`)
                } 
            }
        }
      
    } catch (error) {
        console.log('you have an error on ShowLead:',error)
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
        const fetchUser = await User.findByPk(req.user.id);
        const newLead = await fetchUser.createLead({ 
            firstName, 
            lastName, 
            phoneNumber, 
            address, 
            state, 
            zipCode,
            email 
        });
        console.log(newLead);
        let lead = newLead.toJSON();
        console.log(lead);
        req.flash('success','You added a new lead');
        res.redirect(`/profile/leads/${lead.id}`);
    
      } catch (error) {
        console.log('*********ERRROORR');
        console.log(error);
        req.flash('error', 'There is an error. Please try again.');
        res.redirect('/profile');
      }

}
// edit lead FORM db
const editLead = async (req,res) => {
    try {
        const leadIdx = req.params.idx;
        const rawData = await Lead.findByPk(leadIdx);
        const leadData = rawData.toJSON();

        res.render('leads/edit', {leadObj: leadData});
    } catch (error) {
        console.log(error)
    }  
}
// add edited lead to db
const addEditedLead = async (req,res) => {
    const { firstName, lastName, phoneNumber, address, state, zipCode, email } = req.body;
    const id = req.params.idx;
    console.log("THE PHONE NUMBER:", phoneNumber);
    try {
        const numberOfRowsUpdate = await Lead.update({ firstName, lastName, phoneNumber, address, state, zipCode },{
            where: {id : id}
        });
        res.redirect(`/profile/leads/${id}`);
        console.log('you have successfully updated a lead');
    } catch (error) {
        console.log('you had an error updating a lead: --->', error)
    }
}
// delete or deactivate from db
const deactivateLead = async (req,res) => {
    const leadId = req.params.idx
    console.log(leadId);

    try {
        let deleteUserData = await Lead.destroy({
            where: {id: leadId}
        });  
        res.redirect('/profile/leads');
    //   returns a number of how many users where deleted
        console.log(deleteUserData)
    } catch (error) {
        console.log(error);
    }
}

// CREATE ROUTES FOR PROFILE
router.get('/', isLoggedIn, profile);
// CREATE ROUTES FOR LEADS
router.get('/leads', isLoggedIn, allLeads);
// index of leads
router.get('/leads/:idx',isLoggedIn, leadsIdx);
// show one lead
router.post('/leads/showLead', showLead);
// add new lead form
router.get('/newLead', isLoggedIn, newLead);
// add new lead to db
router.post('/leads', isLoggedIn, addNewLead);
// edit FORM for lead
router.get('/leads/edit/:idx', isLoggedIn, editLead);
// add new edits to lead db
router.post('/leads/:idx', addEditedLead);
// delete lead from db
router.get('/leads/delete/:idx', deactivateLead);

module.exports = router;

