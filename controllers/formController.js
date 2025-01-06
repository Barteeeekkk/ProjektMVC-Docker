const Form = require("../models/form");
const { format } = require('date-fns');


const newFormRender = (request,response) =>{
    response.render("newForm",{PageName: "New Form"});
}
const formListRender = async (request,response) =>{ 
    
    try{
        const forms = await Form.getAllExpenditures();

        forms.forEach(form => {
            form.date = format(new Date(form.date), 'yyyy-MM-dd');
          });

        response.render("formList", {
           forms : forms,
           PageName: "Form List"
       });
    }
    catch(err){
        console.error('Rendering list error:', err);
        const forms = []
        response.render("formList", {
            forms : forms,
            PageName: "Form List"
        });
    }
}

const addNewForm = (request,response) =>{
    const {expenseName, category , sum, date} = request.body;
    Form.AddExpediture(expenseName, category , sum, date)
    response.redirect("/forms");
}

const formEditRender = async (request,response) =>{
    try{
        const id = Number(request.params.id);

        const form = await Form.getExpediture(id);
        form.date = new Date(form.date);

        response.render("editForm", {
           form : form[0],
           PageName: "Edit Form",
           id: id
       });
    }
    catch(err){
        console.error('Form error:', err);
        response.redirect('/forms')
    }
}

const editForm = async (request,response) =>{
    try{
        const id = request.params.id;
        const parsedId = parseInt(id);
        console.log(parsedId);
        const { expenseName, category, sum, date } = request.body;

        const form = await Form.editExpediture(expenseName, category, sum, date, parsedId);

        console.log(form)

        response.redirect('/forms');
        
    }
    catch(err){
        console.error('Form edidtion error:', err);
        response.redirect('/forms')
    }
    
}

const deleteFrom = async (request,response) =>{
    try{
        const id = request.params.id;
        const parsedId = parseInt(id);

        await Form.deleteExpediture(parsedId);

        response.redirect('/forms');
        
    }
    catch(err){
        console.error('Form delete error:', err);
        response.redirect('/forms')
    }
    
}

module.exports = {
    newFormRender,
    formListRender,
    addNewForm,
    formEditRender,
    editForm,
    deleteFrom
}
