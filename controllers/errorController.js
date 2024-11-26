
const renderError = (request,response) =>{
    response.render("error", {PageName: "Error404"});
 }

 module.exports = renderError;