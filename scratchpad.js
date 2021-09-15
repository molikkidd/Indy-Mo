// import
require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const app = express();
const mortgageApi = "https://www.xignite.com/xRates.json/ListRates?"
const githubUser = " https://api.github.com/user";
const userToken = '';

// fetch(mortgageApi)
// .then(response => {
//     console.log(response);
//     return response.json();
// })
// .then(data => {
//     console.log(data);
// })

// Fetch is a built-in module on the browsers ( ie. Chrome, Safari )
// Fetch is a third party module ( aka dependency ) inside of Node; therefore,
// you will need to npm install node-fetch and import it


// What axios does is use fetch to grab the data, and return the data instead.
// app.get('/altSignIn', (req,res) => {
//     res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`);
//   });
  
//   // O-Auth-Log-in
//   app.get('/oauth-callback', ({query: {code}},res) => {
//     const body = {
//       client_id: process.env.GITHUB_CLIENT_ID,
//       client_secret: process.env.GITHUB_SECRET,
//       code,
//     };
//     const opts = {headers: { accept: 'application/json'}};
//     axios.post('https://github.com/login/oauth/access_token', body, opts)
//          .then((_res) => _res.data.access_token)
//          .then((token) => {
//            console.log('My token', token);
//             token = userToken; 
//            res.redirect(`/?token=${token}`);
//          })
//          .catch((error) => console.log('you have an oauth error --->:',error))
  
//   });

// //   grab github user
// const myAxios = async (endpoint) => {
//     let response  = await fetch(endpoint);
//     let data = await response.json();
//     return data;
// }

// myAxios(githubUser, {Authorization: userToken})
// .then(data => {
//     console.log(data);
// })




<% (async function () { %>
  <% 'use strict' %>  
  <% feather.replace({ 'aria-hidden': 'true' })%>
 <!-- // Graphs -->
 <% var ctx = document.getElementById('myChart') %>
 <!-- // eslint-disable-next-line no-unused-vars -->
 <%  var myChart = new Chart(ctx, { %> 
<% type: 'line', %> 
<%   data: { %> 
<% labels: [ %> 
<% 'Sunday', 'Monday','Tuesday',  'Wednesday','Thursday', 'Friday','Saturday'],%> 
<%  datasets: [{ %> 
   <% data: [ %> 
   <% 15339,21345,18483,24003,23489,24092,12034], %>
      <% lineTension: 0,  %> 
       <% backgroundColor: 'transparent', %> 
       <% borderColor: '#007bff', %> 
       <% borderWidth: 4, %> 
       <% pointBackgroundColor: '#007bff' }] %> 
<% }, %> 
   <% options: { %>     
   <% scales: { %>       
   <%  yAxes: [{ %> 
   <% ticks: { %> 
      <%  beginAtZero: false %> 
         <% } %>  
        <% }] %>  
     <% }, %>   
     <% legend: { %> 
     <%  display: false %> 
    <% } %>   
    <% }  %>  
   <% }) %> 
<% })() %>