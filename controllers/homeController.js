const renderHome = (request,response) =>{
    response.render("home", {PageName: "Home"});
 }

 module.exports = renderHome;