const Form = require("../models/form");

const reportRender = async (request,response) =>{
        try{
            
            const forms = await Form.getAllExpenditures();

              let sumFood = 0
              let sumBills = 0;
              let sumHealth = 0;
              let sumClothes = 0;
              let sumRelaxation = 0;
              let sumOthers = 0;
              for(let i = 0; i<forms.length;i++){
                if(forms[i].category ==='Food') sumFood = sumFood+forms[i].sum
                if(forms[i].category ==='Bills') sumBills = sumBills+forms[i].sum
                if(forms[i].category ==='Health') sumHealth = sumHealth+forms[i].sum
                if(forms[i].category ==='Clothes') sumClothes = sumClothes+forms[i].sum
                if(forms[i].category ==='Relaxation') sumRelaxation = sumRelaxation+forms[i].sum
                if(forms[i].category ==='Others') sumOthers = sumOthers+forms[i].sum
              }
              console.log(forms[0])
              console.log(forms[0].sum)
              console.log(typeof(forms[0].sum))
    
              response.render("report", {
                sumFood : sumFood,
                sumBills: sumBills,
                sumHealth: sumHealth,
                sumClothes: sumClothes,
                sumRelaxation: sumRelaxation,
                sumOthers: sumOthers,
                PageName: "Expense report"
                });
        }
        catch(err){
            console.error('Błąd podczas renderowania listy:', err);
            response.render("report", {
            sumFood : 0,
            sumBills: 0,
            sumHealth: 0,
            sumClothes: 0,
            sumRelaxation: 0,
            sumOthers: 0,
            PageName: "Expense report"
            });
        }
    }

module.exports = reportRender;