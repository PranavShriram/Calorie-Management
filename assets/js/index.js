
var list_bf = [];
var list_ln = [];
var list_dn = [];
var currentSubmit;
var tot_sum;
var req_row;
var diff_row;
var personalDetails = {};
var user = "";
var personalDetailsSubmitFlag = 0 ;

//This implements local storage
var local_backup  = {};


//Listener for viewport width changes
function width(x) {

  if (x.matches && personalDetailsSubmitFlag) { // If media query matches
     
     
    var breakfast_table = document.querySelector(".breakfast");
    var lunch_table = document.querySelector(".lunch");
    var dinner_table = document.querySelector('.dinner');
    var bf_button = document.querySelector('#bf_button');
    var ln_button = document.querySelector('#ln_button');
    var dn_button = document.querySelector('#dn_button');
    var sidebar = document.querySelector("#sidebar");
    var form = document.querySelector('.input_form');
   
    var canvas = document.querySelector('#my_canvas');
    var analytics_container = document.querySelector(".analytics")
     
    
     lunch_table.style.display = "" ;
     dinner_table.style.display = "" ;
     ln_button.style.display  = "";
     dn_button.style.display = "";
     bf_button.style.display = "";
     breakfast_table.style.display = "";
     sidebar.style.display = "none";
     canvas.style.display = "";
     analytics_container.style.display = "";
     renderSmallScreenAnalytics();
     render_smallscreen();
  }
   else if(personalDetailsSubmitFlag)
  {

    var breakfast_table = document.querySelector(".breakfast");
    var lunch_table = document.querySelector(".lunch");
    var dinner_table = document.querySelector('.dinner');
    var bf_button = document.querySelector('#bf_button');
    var ln_button = document.querySelector('#ln_button');
    var dn_button = document.querySelector('#dn_button');
    var sidebar = document.querySelector("#sidebar");
    var form = document.querySelector('.input_form');
    var sidebar = document.querySelector('#sidebar');
    var sidebar_li = document.querySelectorAll('li');
    var canvas = document.querySelector('#my_canvas');
    var analytics_container = document.querySelector(".analytics")
     
    sidebar.style.display = "";
    breakfast_table.style.display = "";

     lunch_table.style.display = "none" ;
     dinner_table.style.display = "none" ;
     ln_button.style.display  = "none";
     dn_button.style.display = "none";
     bf_button.style.display = "";
     analytics_container.style.display = "none";
     
     canvas.style.display = "none";
     
     for(var i = 0;i < sidebar_li.length;i++)
              {
                  sidebar_li[i].style.borderColor = "rgba(100,100,100,0.3)";
              }
              sidebar_li[1].style.borderColor = "red";
    renderAnalytics();
    render();
  }
}


var row  = function(name,calories,carbs,fat,protein,sugar,sodium,water,time)
{
    this.name = name;
    this.calories = calories;
    this.carbs = carbs;
    this.sugar = sugar;
    this.protein = protein;
    this.sodium = sodium;
    this.fat = fat;
    this.water = water;
    this.time = time;
   
}

function wrapRow(row_a)
{ 
  var res_string = "";

  res_string += "<div class = 'ele'>" + row_a.name + "</div>";
  res_string += "<div class = 'ele'>" + row_a.calories + "</div>";
  res_string += "<div class = 'ele'>" + row_a.carbs + "</div>";
  res_string += "<div class = 'ele'>" + row_a.fat + "</div>";
  res_string += "<div class = 'ele'>" + row_a.protein + "</div>";
  res_string += "<div class = 'ele'>" + row_a.sugar + "</div>";
  res_string += "<div class = 'ele'>" + row_a.sodium + "</div>";
  res_string += "<div class = 'ele'>" +row_a.water + "</div>";

  return res_string;
}

function wrapRowSmallScreen(row_a,i)
{ 
  var res_string = "";
  res_string += "<div class = 'ele'>"+parseInt(i+1)+" Name:" + row_a.name + "</div>";
  res_string += "<div class = 'ele'>Calories:" + row_a.calories + "</div>";
  res_string += "<div class = 'ele'>Carbs(in g):" + row_a.carbs + "</div>";
  res_string += "<div class = 'ele'>Fat(in g):" + row_a.fat + "</div>";
  res_string += "<div class = 'ele'>Protein(in g):" + row_a.protein + "</div>";
  res_string += "<div class = 'ele'>Sugar(in g):" + row_a.sugar + "</div>";
  res_string += "<div class = 'ele'>Sodium(in g):" + row_a.sodium + "</div>";
  res_string += "<div class = 'ele'>Water(in L)" + row_a.water + "</div>";
  res_string += "<hr>"
  return res_string;
}

function wrapRowAnalytics(row_a)
{ 
  var res_string = "";
    res_string += "<div class = 'item_header'>"
    res_string += row_a.calories;
    res_string += "</div>";

    res_string += "<div class = 'item_header'>"
    res_string += row_a.carbs;
    res_string += "</div>";

    res_string += "<div class = 'item_header'>"
    res_string += row_a.fat;
    res_string += "</div>";

    res_string += "<div class = 'item_header'>"
    res_string += row_a.protein;
    res_string += "</div>";

    res_string += "<div class = 'item_header'>"
    res_string += row_a.sugar;
    res_string += "</div>";

    res_string += "<div class = 'item_header'>"
    res_string += row_a.sodium;
    res_string += "</div>";


    res_string += "<div class = 'item_header'>"
    res_string += row_a.water;
    res_string += "</div>";

    return res_string;
    
}
function wrapRowAnalyticsSmallScreen(row_a)
{ 
  var res_string = "";
    res_string += "<div class = 'item_header'>Calories:"
    res_string += row_a.calories;
    res_string += "</div>";

    res_string += "<div class = 'item_header'>Carbs:"
    res_string += row_a.carbs;
    res_string += "</div>";

    res_string += "<div class = 'item_header'>Fat:"
    res_string += row_a.fat;
    res_string += "</div>";

    res_string += "<div class = 'item_header'>Protein:"
    res_string += row_a.protein;
    res_string += "</div>";

    res_string += "<div class = 'item_header'>Sugar:"
    res_string += row_a.sugar;
    res_string += "</div>";

    res_string += "<div class = 'item_header'>Sodium:"
    res_string += row_a.sodium;
    res_string += "</div>";


    res_string += "<div class = 'item_header'>Water:"
    res_string += row_a.water;
    res_string += "</div>";

    return res_string;
    
}
function setupFlashMessage()
{
  var flash_message = document.querySelector('.flash_message'); 

   //SENDING fLASH Message
   if(req_row && tot_sum.calories < req_row.calories)
   {   
     flash_message.style.backgroundColor = "#e74c3c";
       flash_message.innerHTML = "Calorie requirement not reached";
        setTimeout(function()
        {
         flash_message.innerHTML = "";
         //Flash message for water
           if(req_row.water < tot_sum.water)
           {  
             flash_message.style.backgroundColor = "#2ecc71";
             flash_message.innerHTML = "Water requirement successfully reached";
             setTimeout(function(){
               flash_message.innerHTML = "";
             },2000);
           }
           else
           {  flash_message.style.backgroundColor = "#e74c3c";
             flash_message.innerHTML = "Water requirement not reached";
             setTimeout(function(){
               flash_message.innerHTML = "";
             },2000);
           }
        },2000);
   } 
   else
   {
                flash_message.style.backgroundColor = "#e74c3c";
               flash_message.innerHTML = "Calorie requirement successfully reached reached";
               setTimeout(function()
               {
                flash_message.innerHTML = "";
   
                if(req_row.water < tot_sum.water)
                { 
                  flash_message.style.backgroundColor = "#2ecc71";
                  flash_message.innerHTML = "Water requirement successfully reached";
                  setTimeout(function(){flash_message.style.backgroundColor = "#e74c3c";
                    flash_message.innerHTML = "";
                  },2000);
                }
                else
                { flash_message.style.backgroundColor = "#e74c3c";
                  flash_message.innerHTML = "Water requirement not reached";
                  setTimeout(function(){
                    flash_message.innerHTML = "";
                  },2000);
                }
   
               },2000);
    }   
}

function callPiechart()
{
          
                 //Drawing piechart
          
                 var canvas = document.querySelector('#my_canvas');
                 canvas.width = "1000";
                 canvas.height = "1000"
                 var ctx = canvas.getContext('2d');
             
                 var sum_grams = parseInt(tot_sum.carbs)+parseInt(tot_sum.fat)+parseInt(tot_sum.protein)+parseInt(tot_sum.sugar)+parseInt(tot_sum.sodium);
             
                  var dataPoints = [
                      {y:parseInt(tot_sum.carbs)/sum_grams , label: "Carbs",color:"#1abc9c"},
                      {y: parseInt(tot_sum.fat)/sum_grams , label: "Fat",color:"#2ecc71"},
                      {y: parseInt(tot_sum.protein)/sum_grams , label: "Protein",color:"#3498db"},
                      {y: parseInt(tot_sum.sugar)/sum_grams , label: "Sugar",color:"#9b59b6"},
                      {y: parseInt(tot_sum.sodium)/sum_grams , label: "Sodium",color:"#f1c40f"}
                   ];
             
                   var p = new pieChart(dataPoints,200,200,200);
             
                   p.draw(ctx);
               
}

function calculateCalorieRequirement(age,height,gender,weight,activityFactor)
{   
    var requirement = document.querySelector('.requirement');
    var water_req,water_factor;
    var reqString = "<div class = 'header'>Requirement</div>";
    var bmr,calorie,sugar;

      if(gender == "Male")
      {
        bmr = (10 * weight) + (6.25 * height) - (5 * age ) + 5;
        calorie = bmr*activityFactor;
        sugar = 37.5
      }
      else if (gender == "Female")
      {
          bmr = (10*weight) +(6.25*height)-5*age-161;
          calorie = bmr*activityFactor;
          sugar = 25
      }
      

      if(activityFactor == 1.2)
       water_factor = 0;
      else if(activityFactor == 1.375)
       water_factor = 12*0.03;
      else if(activityFactor == 1.55)
       water_factor = 24*0.03;
      else if(activityFactor == 1.725)
       water_factor = 36*0.03;
      else 
       water_factor = 48*0.03;    

      water_req = weight*2.204*0.5*0.03 + water_factor;
      console.log(water_factor,activityFactor);
      console.log(water_req);
      req_row = new row("Requirement",calorie.toFixed(2),(0.5*calorie/4).toFixed(2),(0.3*calorie/9).toFixed(2),(0.8*weight).toFixed(2),sugar.toFixed(2),1.80,(water_req).toFixed(2),"All");
      console.log(req_row);
   
    
    diff_row.calories = req_row.calories;
    diff_row.carbs = req_row.carbs;
    diff_row.fat = req_row.fat;
    diff_row.protein = req_row.protein;
    diff_row.sugar = req_row.sugar;
    diff_row.sodium = req_row.sodium;
    diff_row.water = req_row.water;

   
}
function computeSum(row_a)
{
  
 

        tot_sum.calories += parseInt(row_a.calories);
        tot_sum.carbs += parseInt(row_a.carbs);
        tot_sum.fat += parseInt(row_a.fat);
        tot_sum.protein += parseInt(row_a.protein);
        tot_sum.sugar += parseInt(row_a.sugar);
        tot_sum.sodium += parseInt(row_a.sodium);
        tot_sum.water += parseInt(row_a.water);
       
        diff_row.calories = (diff_row.calories -  row_a.calories).toFixed(2);
        diff_row.carbs = (diff_row.carbs -  row_a.carbs).toFixed(2);      
        diff_row.fat = (diff_row.fat -  row_a.fat).toFixed(2);
        diff_row.protein = (diff_row.protein -  row_a.protein).toFixed(2);
        diff_row.sugar = (diff_row.sugar -  row_a.sugar).toFixed(2);
        diff_row.sodium = (diff_row.sodium -  row_a.sodium).toFixed(2); 
        diff_row.water = (diff_row.water -  row_a.water).toFixed(2);

}




function renderAnalytics()
{
  var total = document.querySelector('.total');
  var difference = document.querySelector('.difference');
  var requirement = document.querySelector('.requirement');
  var analyitcs_heading = document.querySelector('.analytics_heading');
 
  analyitcs_heading.innerHTML = "<div class = 'header'></div><div class = 'item_header'>Calories</div><div class = 'item_header'>Carbs(in g)</div><div class = 'item_header'>Fats(in g)</div><div class = 'item_header'>Protein(in g)</div><div class = 'item_header'>Sugar(in g)</div><div class = 'item_header'>Sodium(in g)</div><div class = 'item_header'>Water(in L)</div>"
  
 
   var totalString = "<div class = 'header'>Total</div>";
   var reqString = "<div class = 'header'>Requirement</div>";
   var diffString = "<div class = 'header'>Remaining</div>";
   
   totalString += wrapRowAnalytics(tot_sum);
   reqString += wrapRowAnalytics(req_row);
   diffString += wrapRowAnalytics(diff_row);

   total.innerHTML = totalString;
   difference.innerHTML = diffString;
   requirement.innerHTML = reqString;
} 
function renderSmallScreenAnalytics()
{
  var analyitcs_heading = document.querySelector('.analytics_heading');
  var total = document.querySelector('.total');
  var difference = document.querySelector('.difference');
  var requirement = document.querySelector(".requirement");
  
  analyitcs_heading.innerHTML = ""
  var totalString = "<div class = 'header'>Total</div>";
  var reqString = "<div class = 'header'>Requirement</div>";
  var diffString = "<div class = 'header'>Difference</div>";

     totalString += wrapRowAnalyticsSmallScreen(tot_sum);
     diffString += wrapRowAnalyticsSmallScreen(diff_row);
     reqString += wrapRowAnalyticsSmallScreen(req_row);
    
    
      total.innerHTML = totalString;
      difference.innerHTML = diffString;
      requirement.innerHTML = reqString;
      
    
}


function render_smallscreen()
{
  var breakfast_table = document.querySelector(".breakfast");
  breakfast_table.innerHTML = "<div class = 'header'>Breakfast</div>";

 
  for(var i = 0;i < list_bf.length;i++)
  {
      var res_string = wrapRowSmallScreen(list_bf[i],i);
      breakfast_table.insertAdjacentHTML("beforeEnd",res_string);
  }
  

  //Lunch Table
  var lunch_table = document.querySelector(".lunch");
  lunch_table.innerHTML = "<div class = 'header'>Lunch</div>";

  for(var i = 0;i < list_ln.length;i++)
  {
      var res_string = wrapRowSmallScreen(list_ln[i],i);
    
      lunch_table.insertAdjacentHTML("beforeEnd",res_string);
  }
  
  //Dinner Table
  
  var dinner_table = document.querySelector(".dinner");
  dinner_table.innerHTML = "<div class = 'header'>Dinner</div>";
  for(var i = 0;i < list_dn.length;i++)
  {
      var res_string = wrapRowSmallScreen(list_dn[i],i);
    
      dinner_table.insertAdjacentHTML("beforeEnd",res_string);
  }
  
}


function render()
{   
   

    var breakfast_table = document.querySelector(".breakfast");
    breakfast_table.innerHTML = "<div class = 'header'>Breakfast</div><div class = 'item_header'>Calories</div><div class = 'item_header'>Carbs(in g)</div><div class = 'item_header'>Fats(in g)</div><div class = 'item_header'>Protein(in g)</div><div class = 'item_header'>Sugar(in g)</div><div class = 'item_header'>Sodium(in g)</div><div class = 'item_header'>Water(in L)</div>";

   
    for(var i = 0;i < list_bf.length;i++)
    {
        var res_string = wrapRow(list_bf[i]);
        console.log(res_string);
        breakfast_table.insertAdjacentHTML("beforeEnd",res_string);
    }
    

    //Lunch Table
    var lunch_table = document.querySelector(".lunch");
    lunch_table.innerHTML = "<div class = 'header'>Lunch</div><div class = 'item_header'>Calories</div><div class = 'item_header'>Carbs(in g)</div><div class = 'item_header'>Fats(in g)</div><div class = 'item_header'>Protein(in g)</div><div class = 'item_header'>Sugar(in g)</div><div class = 'item_header'>Sodium(in g)</div><div class = 'item_header'>Water(in L)</div>";

    for(var i = 0;i < list_ln.length;i++)
    {
        var res_string = wrapRow(list_ln[i]);
        lunch_table.insertAdjacentHTML("beforeEnd",res_string);
    }
    
    //Dinner Table
    
    var dinner_table = document.querySelector(".dinner");
    dinner_table.innerHTML = "<div class = 'header'>Dinner</div><div class = 'item_header'>Calories</div><div class = 'item_header'>Carbs(in g)</div><div class = 'item_header'>Fats(in g)</div><div class = 'item_header'>Protein(in g)</div><div class = 'item_header'>Sugar(in g)</div><div class = 'item_header'>Sodium(in g)</div><div class = 'item_header'>Water(in L)</div>";
    for(var i = 0;i < list_dn.length;i++)
    {
        var res_string = wrapRow(list_dn[i]);
        dinner_table.insertAdjacentHTML("beforeEnd",res_string);
    }
     
   

}





function setup()
{
    var bf_button = document.querySelector('#bf_button');
    var ln_button = document.querySelector('#ln_button');
    var dn_button = document.querySelector('#dn_button');
    var container = document.querySelector('.container');
    var form = document.querySelector('.input_form');
    var form_submit = document.querySelector("#form_submit");
    var toggleBtn = document.querySelector(".toggle-btn");
    var sidebar_li  = document.querySelectorAll(".menu>ul>li");
    var breakfast_table = document.querySelector(".breakfast");
    var lunch_table = document.querySelector(".lunch");
    var dinner_table = document.querySelector('.dinner');
    var personalDetailsButton = document.querySelector('.Personal_details_button');
    var personalDetailsForm = document.querySelector('.personal_details');
    var sidebar = document.querySelector("#sidebar");
    var analytics_container = document.querySelector(".analytics");
    var canvas = document.querySelector("#my_canvas");
    var clear_btn = document.querySelector('#clear');
    
    clear_btn.addEventListener("click",function()
    {
      localStorage.clear();
    })

    personalDetailsButton.addEventListener('click',function check_userInputForm()
    {    
        var flag = 0,genderFlag = 0;
        var user_div = document.querySelectorAll(" .user");
        var formData = new FormData(personalDetailsForm);
        var person_name = formData.get('name');
        user = person_name;
        var gender = formData.get('gender').toLowerCase();
        var age = parseInt(formData.get('age'));
        var height = parseInt(formData.get('height'));
        var weight = parseInt(formData.get('weight'));
        var activityFactor_string = (formData.get('activityFactor'));
        var activityFactor
      
         console.log(gender);
        if(activityFactor_string == "little")
         activityFactor = 1.2;
        else if(activityFactor_string == "light")
         activityFactor = 1.37;
        else if(activityFactor_string == "moderate")  
         activityFactor = 1.55;
        else if(activityFactor_string == "heavy")
         activityFactor = 1.72;
        else if(activityFactor_string == "veryheavy")
         activityFactor = 1.9;  
        
         console.log(activityFactor);
          
         if(gender != "male" && gender != "female")
          genderFlag = 1;

        if(person_name == "" || gender == "" || age == "" || height == "" ||weight == ""||activityFactor == ""||genderFlag)
          { 
             
              if(genderFlag == 1)
               alert("Fill proper gender");
              else 
              alert("Enter all details");    
          }   
        else
        {  
          gender = gender.charAt(0).toUpperCase() + gender.slice(1); 
          console.log(gender);
          flag = 1;
          var flaguserExists = 0;
          calculateCalorieRequirement(age,height,gender,weight,activityFactor); 
        for(var key in localStorage)
        {
            if(key == user)
            {    
                flaguserExists = 1;
                 local_backup = JSON.parse(localStorage.getItem(user));
               if(local_backup.breakfast)
               { 
                for(var i = 0;i < local_backup.breakfast.length;i++)
                {
                       computeSum(local_backup.breakfast[i]);
                       list_bf.push(local_backup.breakfast[i]);
                }
               } 
               if(local_backup.lunch)
               { 
                for(i = 0;i < local_backup.lunch.length;i++)
                {
                       computeSum(local_backup.lunch[i]);
                       list_ln.push(local_backup.lunch[i]);
                }
               } 
               if(local_backup.dinner)
               {
                for(i = 0;i < local_backup.dinner.length;i++)
                {
                       computeSum(local_backup.dinner[i]);
                       list_dn.push(local_backup.dinner[i]);
                }
              } 
                personalDetailsSubmitFlag = 1;
               if(window.innerWidth <= 992)
               {  
                var breakfast_table = document.querySelector(".breakfast");
                var lunch_table = document.querySelector(".lunch");
                var dinner_table = document.querySelector('.dinner');
                var bf_button = document.querySelector('#bf_button');
                 var ln_button = document.querySelector('#ln_button');
                 var dn_button = document.querySelector('#dn_button');
                 var sidebar = document.querySelector("#sidebar");
                 var form = document.querySelector('.input_form');
 
                var canvas = document.querySelector('#my_canvas');
                 var analytics_container = document.querySelector(".analytics")
   
  
                lunch_table.style.display = "" ;
                dinner_table.style.display = "" ;
                 ln_button.style.display  = "";
                  dn_button.style.display = "";
                bf_button.style.display = "";
                 breakfast_table.style.display = "";
                 sidebar.style.display = "none";
                 canvas.style.display = "";  
                 ln_button.style.display = "";
                 dn_button.style.display = "";
                 analytics_container.style.display = "";
                 form.style.display = "none";
                 canvas.style.display = "";
                 personalDetailsForm.style.display = "none";
                 personalDetailsButton.style.display = "none";
                 renderSmallScreenAnalytics();
                 callPiechart();
                 setupFlashMessage();
                  render_smallscreen();
               }   
               else
               {
                var breakfast_table = document.querySelector(".breakfast");
                var lunch_table = document.querySelector(".lunch");
                var dinner_table = document.querySelector('.dinner');
                var bf_button = document.querySelector('#bf_button');
                 var ln_button = document.querySelector('#ln_button');
                 var dn_button = document.querySelector('#dn_button');
                 var sidebar = document.querySelector("#sidebar");
                 var form = document.querySelector('.input_form');
 
                var canvas = document.querySelector('#my_canvas');
                 var analytics_container = document.querySelector(".analytics") 
                breakfast_table.style.display = "";
                bf_button.style.display = "";
                personalDetailsForm.style.display = "none";
                personalDetailsButton.style.display = "none";
                sidebar.style.display = "";
                renderAnalytics();
                callPiechart();
                setupFlashMessage();
                render();
               }
              
            }
      
        
       
        
      
         }   console.log(person_name,gender,age,height,weight);

         if(!flaguserExists)
         { 
          personalDetailsSubmitFlag = 1;
           if(window.innerWidth > 992)
           {
            var breakfast_table = document.querySelector(".breakfast");
            var lunch_table = document.querySelector(".lunch");
            var dinner_table = document.querySelector('.dinner');
            var bf_button = document.querySelector('#bf_button');
             var ln_button = document.querySelector('#ln_button');
             var dn_button = document.querySelector('#dn_button');
             var sidebar = document.querySelector("#sidebar");
             var form = document.querySelector('.input_form');

            var canvas = document.querySelector('#my_canvas');
             var analytics_container = document.querySelector(".analytics") 
            

            breakfast_table.style.display = "";
            bf_button.style.display = "";
            personalDetailsForm.style.display = "none";
            personalDetailsButton.style.display = "none";
            sidebar.style.display = "";
            renderAnalytics();
            render(); 
           }
           else
          {
            var breakfast_table = document.querySelector(".breakfast");
            var lunch_table = document.querySelector(".lunch");
            var dinner_table = document.querySelector('.dinner');
            var bf_button = document.querySelector('#bf_button');
             var ln_button = document.querySelector('#ln_button');
             var dn_button = document.querySelector('#dn_button');
             var sidebar = document.querySelector("#sidebar");
             var form = document.querySelector('.input_form');

            var canvas = document.querySelector('#my_canvas');
             var analytics_container = document.querySelector(".analytics")


            lunch_table.style.display = "" ;
            dinner_table.style.display = "" ;
             ln_button.style.display  = "";
              dn_button.style.display = "";
            bf_button.style.display = "";
             breakfast_table.style.display = "";
             sidebar.style.display = "none";
             canvas.style.display = "";  
             ln_button.style.display = "";
             dn_button.style.display = "";
             analytics_container.style.display = "";
             personalDetailsForm.style.display = "none";
             personalDetailsButton.style.display = "none";
             form.style.display = "none";
             canvas.style.display = "";
             renderSmallScreenAnalytics();
              render_smallscreen();
          }
         }
         user_div[0].innerHTML = user;
         user_div[1].innerHTML = user;
    } 
    });
  toggleBtn.addEventListener("click",toggleNavbar);
  
    for(var i = 0;i < sidebar_li.length;i++)
    {
        sidebar_li[i].addEventListener("click",function(){
            for(var i = 0;i < sidebar_li.length;i++)
              {
                  sidebar_li[i].style.borderColor = "rgba(100,100,100,0.3)";
              }
              this.style.borderColor = "red";
              var text = this.textContent;


              var breakfast_table = document.querySelector(".breakfast");
              var lunch_table = document.querySelector(".lunch");
              var dinner_table = document.querySelector('.dinner');
              var bf_button = document.querySelector('#bf_button');
               var ln_button = document.querySelector('#ln_button');
               var dn_button = document.querySelector('#dn_button');
               var sidebar = document.querySelector("#sidebar");
               var form = document.querySelector('.input_form');

              var canvas = document.querySelector('#my_canvas');
               var analytics_container = document.querySelector(".analytics")
 
              if(text == "Breakfast Table")
              {    
                   container.style.display = "";
                   breakfast_table.style.display = "" ;
                   bf_button.style.display = "";
                   lunch_table.style.display = "none" ;
                   dinner_table.style.display = "none" ;
                 
    
                  lunch_table.style.display = "none" ;
                  dinner_table.style.display = "none" ;
                   ln_button.style.display  = "none";
                    dn_button.style.display = "none";
                   canvas.style.display = "none";  
                   ln_button.style.display = "none";
                   dn_button.style.display = "none";
                   analytics_container.style.display = "none";
                   form.style.display = "none";
                   canvas.style.display = "none";
                  
              }
              else if(text == "Lunch Table")
              {   
                container.style.display = "";
                  lunch_table.style.display = "";
                  ln_button.style.display = "";   

                 breakfast_table.style.display = "none" ;
                 dinner_table.style.display = "none" ;
                 bf_button.style.display ="none";
                 dn_button.style.display ="none";
                 analytics_container.style.display = "none";
                 form.style.display = "none";
                 canvas.style.display = "none";
              }
              else if(text == "Dinner Table")
              { 
                container.style.display = "";  
                lunch_table.style.display = "none";
                ln_button.style.display = "none";   

                 breakfast_table.style.display = "none" ;
                 dinner_table.style.display = "" ;
                 bf_button.style.display = "none";
                 dn_button.style.display = "";
                 form.style.display = "none";
                 analytics_container.style.display = "none";
                 canvas.style.display = "none";

              }
              else if(text == "View Analytics")
              {
                 container.style.display = "";  
                 lunch_table.style.display = "none";
                 ln_button.style.display = "none";   
                 breakfast_table.style.display = "none";
                 dinner_table.style.display = "none" ;
                 bf_button.style.display = "none";
                 dn_button.style.display = "none";
                 form.style.display = "none";
                 analytics_container.style.display = "";
                 canvas.style.display = "";

              }
        });
    }

    bf_button.addEventListener("click",function()
    {
        container.style.display = "none";
       form.style.display = "";
        currentSubmit = "breakfast";

    });

    ln_button.addEventListener("click",function()
    {
        container.style.display = "none";
        form.style.display = "";  
        currentSubmit = "lunch";
        //console.log(form_submit);
    });

    dn_button.addEventListener("click",function()
    {
        container.style.display = "none";
       form.style.display = "";
        currentSubmit = "dinner";
        //console.log(form_submit);

    });

    form_submit.addEventListener("click",function()
        {   
            
            var formData = new FormData(form);
            var name = formData.get('name');
            var calories = formData.get('calories');
            var carbs = formData.get('carbs');
            var fat = formData.get('fat');
            var protein = formData.get('protein');
            var sugar = formData.get('sugar');
            var sodium = formData.get('sodium');
            var water_consumed = formData.get('water');
            console.log(water_consumed);  
           
            var row_a = new row(name,calories,carbs,fat,protein,sugar,sodium,water_consumed,currentSubmit);
            console.log(row_a);
            if(name == "" || calories == "" || carbs == "" || fat == "" || protein == "" || sugar == ""||sodium == ""||water == "")
            {
                alert("Enter all details (if name is water enter 0 for remaining columns");
            }
            else
            { 
               calories = parseInt(calories); 
               carbs = parseInt(carbs); 
               fat = parseInt(fat); 
               protein = parseInt(protein); 
               sugar = parseInt(sugar); 
               sodium = parseInt(sodium); 
               water = parseInt(water); 
            if(currentSubmit === "breakfast")
              {
                   list_bf.push(row_a);
                   local_backup.breakfast = list_bf;
              }    
            else if(currentSubmit === "lunch")
               {
                   list_ln.push(row_a);
                   local_backup.lunch = list_ln;
               }  
            else
             {
               list_dn.push(row_a);
               local_backup.dinner = list_dn;
             }   
            localStorage.setItem(user,JSON.stringify(local_backup));
           
            
            computeSum(row_a);
         
            if(window.innerWidth <= 992) 
            { renderSmallScreenAnalytics();
              callPiechart();
              setupFlashMessage();
              render_smallscreen();
            } 
            else
            {  renderAnalytics(); 
              callPiechart();
              setupFlashMessage(); 
               render();
            }

            currentSubmit = "";

            container.style.display = "flex";
            form.style.display = "none";
            }
        });
}

function initialize()
{   
    tot_sum = new row("Total Sum",0,0,0,0,0,0,0,"All");
    diff_row = new row("Remaining",0,0,0,0,0,0,0,"All");
    
    var breakfast_table = document.querySelector(".breakfast");
    var lunch_table = document.querySelector(".lunch");
    var dinner_table = document.querySelector('.dinner');
    var bf_button = document.querySelector('#bf_button');
    var ln_button = document.querySelector('#ln_button');
    var dn_button = document.querySelector('#dn_button');
    var sidebar = document.querySelector("#sidebar");
    var form = document.querySelector('.input_form');
   
    var canvas = document.querySelector('#my_canvas');
    var analytics_container = document.querySelector(".analytics")
     
   
     lunch_table.style.display = "none" ;
     dinner_table.style.display = "none" ;
     ln_button.style.display  = "none";
     dn_button.style.display = "none";
     bf_button.style.display = "none";
     breakfast_table.style.display = "none";
     sidebar.style.display = "none";
     canvas.style.display = "none";
     analytics_container.style.display = "none";
      form.style.display = "none"; 
     document.querySelector(".navbar-right-smallscreen").classList.add('display_none');
 
  
      setup();
      
      //function for viewport width < 922px
      var x = window.matchMedia("(max-width: 992px)"); 
      width(x) // Call listener function at run time
      x.addListener(width) // Attach listener function on state changes

    // render();
}

function toggleNavbar()
{
  document.querySelector(".navbar-right-smallscreen").classList.toggle('display_none');
  console.log("hello");
}