var counter = 0

var addFoodData = {
    counter: 0
}

var selectedFood = {}

var selectedDietPlan = {}
var dietSaved = true

function createDietPlanHTML(dietPlanName){
    $("#name-of-diet").remove()
    $("#diet-container").prepend("<div id='name-of-diet' class='d-flex justify-content-between pb-2'> " + "<h3>Diet Name: " + dietPlanName + "</h3>" +
        "<div><button type='button' id='download-diet' class='btn btn-secondary d-inline-block mr-3'>Download</button><form class='d-inline-block' id=\"submit-entire-diet\">" + "<button type=\"submit\" class=\"btn btn-primary\">Save Diet</button></form>" + "</div></div>" + "<div id='submit-diet-alert'></div>")
    // Add a form to enter in a meal name
    $("#diet-info").html(addMealTable)
    // Add a section for the total nutrients for all meals
    $("#diet-total-nutrients").html("<table class='table table-sm'><thead>" +
        "<tr class='table-primary'><th colspan='7'>Diet Totals</th></tr>" +
        nutrientHeaders + "</thead><tbody>" + nutrientTotals + "</tbody></table>")
}

function makeFoodSortable(){
    // Make food items sortable
    $(".sortable").each(function(index){
        Sortable.create($(".sortable")[index], {
            group: "foodShared",
            filter: ".sortDisabled", //prevents moving
            preventOnFilter: false, //Allows input to be clickable
            onMove: function (evt) { //Prevents moving object around
                return evt.related.className.indexOf('sortDisabled') === -1;
            },
            onAdd : function (evt) {
                console.log("Moved '" +
                    $(evt.to).children().eq(evt.newIndex).attr('data-food-name') + "' from: '" +
                    $(evt.from).closest('table').attr('data-meal-name') + "' to: '" +
                    $(evt.to).closest('table').attr('data-meal-name'))
                var mealAddedTo = $(evt.to).closest('table').attr('data-meal-name')
                var mealRemovedFrom= $(evt.from).closest('table').attr('data-meal-name')
                var foodName = $(evt.to).children().eq(evt.newIndex).attr('data-food-name')
                var foodIndex = evt.newIndex
                moveFood(foodName, foodIndex,mealAddedTo, mealRemovedFrom)
                $(evt.to).children().eq(evt.newIndex).attr('data-food-name')
                displayMealNutrients(mealAddedTo)
                displayMealNutrients(mealRemovedFrom)
                calculateTotalSum()
                console.log(selectedDietPlan)
            },
            onRemove : function (evt) {
            }
        });
    })
}

// Moves a food object between meals
function moveFood(foodName, newPosition,mealAddedTo, mealRemovedFrom){
    var addedFood = {}

    for (var i = 0; i < selectedDietPlan.meals.length; ++i){

        console.log(selectedDietPlan.meals[i].name)
        console.log(mealRemovedFrom)
        if (selectedDietPlan.meals[i].name === mealRemovedFrom) {
            for ( var j = 0; j < selectedDietPlan.meals[i].foods.length; ++j){
            //meal.foods.forEach(function(food, index){
                console.log(selectedDietPlan.meals[i].foods[j].name)
                console.log(foodName)
                if(selectedDietPlan.meals[i].foods[j].name === foodName){
                    addedFood = selectedDietPlan.meals[i].foods[j]
                    console.log("Food To be removed: ")
                    console.log(addedFood)
                    selectedDietPlan.meals[i].foods.splice(j, 1)

                    // Remove food from chart
                    removeCaloriesToCaloriesPerMeal(caloriesPerMeal, mealRemovedFrom,addedFood)
                    removeNutrientsDietMacroPieChart(dietMacros,addedFood)
                    if (addedFood.foodGroup !== 'UNDEFINED') {
                        removeFoodToBarChartFoodGroup(barChartFoodGroups, addedFood.foodGroup.replace("_", "/"))
                    }

                    // Add food to chart
                    addNutrientDietMacroPieChart(dietMacros, addedFood)
                    addCaloriesToCaloriesPerMeal(caloriesPerMeal,mealAddedTo,addedFood)
                    if (addedFood.foodGroup !== 'UNDEFINED') {
                        addFoodToBarChartFoodGroup(barChartFoodGroups, addedFood.foodGroup.replace("_", "/"))
                    }

                    break;
                }
            }
        }
    }
    selectedDietPlan.meals.forEach(function(meal, index) {
        if (meal.name === mealAddedTo) {
            meal.foods.splice(newPosition, 0, addedFood)
        }
    })
}

// Injected Form to create meal after creating a diet plan
var addMealTable =
    "<table class=\"table table-sm table-striped meal\">\n" +
    "  <thead>\n" +
    "<tr class=\"meal-name-row table-primary\">\n" +
    "      <th colspan=\"2\">\n" +
    "        <form class='create-meal'>" +
    "          <div class='form-group row mb-0'>" +
    "          <div class='col-1'>" +
    "            <button class=\"btn btn-large btn-primary\" type=\"submit\">\n" +
    "              <i class=\"fas fa-plus\"></i>\n" +
    "            </button>\n" +
    "          </div>"+
    "          <label for=\"mealName\">Add a meal</label>\n" +
    "          <div class='col-6'>" +
    "          <input class=\"form-control\" id=\"mealName\" placeholder='Meal Name' type=\"text\"name=\"name\">\n"  +
    "          </div>"+
    "          </div>" +
    "        </form>" +
    "      </th>\n" +
    "    </tr>\n" +
    "  </thead>\n" +
    "</table> "

//Nutrient table row headers
var nutrientHeaders =
    "<tr class=\"nutrient-info\">\n" +
    "  <th scope=\"col\" style='width: 7%'></th>\n" +
    "  <th scope=\"col\" style='width: 18%'>Name</th>\n" +
    "  <th scope=\"col\" style='width: 17%'>Calories</th>\n" +
    "  <th scope=\"col\" style='width: 17%'>Carbs</th>\n" +
    "  <th scope=\"col\" style='width: 17%'>Fat</th>\n" +
    "  <th scope=\"col\" style='width: 17%'>Protein</th>\n" +
    "  <th scope=\"col\" style='width: 7%'></th>\n" +
    "</tr>\n"

// Starting nutrient totals for each meal
var nutrientTotals = "<tr id='nutrient-totals' class=\"table-info\">\n" +
"    <td>Total</td>\n" +
"    <td></td>\n" +
"    <td>0</td>\n" +
"    <td>0</td>\n" +
"    <td>0</td>\n" +
"    <td>0</td>\n" +
"    <td></td>\n" +
"  </tr>\n"

// Create a diet plan
var form = document.getElementById("addDietPlan")
form.addEventListener("submit", function(event){
    var formData = new FormData(form);

    event.preventDefault();
    selectedDietPlan = {}

    // Extract from name and values and create object to send to controller
    formData.forEach(function(value,key){
        selectedDietPlan[key]=value;
    });
    console.log(selectedDietPlan)

    createDietPlanHTML(selectedDietPlan.name)

    //Reset form value
    $('#diet-name').val('')
})

//Create A meal
$(document).on("submit", "form.create-meal", function (e) {
    var meal = {}
    var formElement = $(this)
    var formData = new FormData($(this)[0])

    e.preventDefault();

    // Loop through form data to create java object of meal
    formData.forEach(function(value,key){
        meal[key]=value;
    });
    // Add meal to diet plan object
    if(selectedDietPlan['meals'] == null){
        selectedDietPlan['meals'] = [meal]
    }
    else {
        selectedDietPlan['meals'].push(meal)
    }

    // Add nutrient headers to meal
    $(formElement).closest("tr").after(nutrientHeaders)

    // Add food form with unique ID's
    addFoodData.counter += 1
    var template = $("#add-food-form").html()
    var addFoodFormHtml = Mustache.render(template,addFoodData)
    // Injects the rows for adding a new food to the meal and the total nutrients for that meal
    $(formElement).closest("thead").after(addFoodFormHtml)

    var table = $(formElement).closest("table")
    // Add a new form for adding a meal below the current Meal table
    $("#diet-info").append(addMealTable)
    // Replace the form with the name of the meal
    $(formElement).closest("tr").html("<th colspan='7'>" + meal.name + "</th>")

    // Make meals sortable
    Sortable.create($("#diet-info")[0], {
        group: "shared",
    });

    // Link the table with the meal name
    $(table).attr('data-meal-name', meal.name)

    // Add meal name to list of meals to add a searched food to
    $("#list-of-meals").append("<option value='" + meal.name+ "'>" + meal.name +"</option>")

})

//Adding a food to a Meal
$(document).on("submit", ".addFoodToDiet", function (e) {
    var food = {}
    var formElement = $(this)
    var table = $(this).closest('table')
    var formData = new FormData($(this)[0])
    var mealName = $(table).attr('data-meal-name')

    e.preventDefault();

    formData.forEach(function(value,key){
        food[key]=value;
    });

    var jsonFood = JSON.stringify(food)

    $.ajax({
        type: "POST",
        url: "/food",
        data: jsonFood,
        headers: {
            // Important that content type is used to accept json. jquery .post does not work because content type
            // can't be specified
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        success: function (results) {
            food = results
            // Update Charts
            if (food.foodGroup !== 'UNDEFINED') {
                addFoodToBarChartFoodGroup(barChartFoodGroups, food.foodGroup.replace("_", "/"))
            }
            addNutrientDietMacroPieChart(dietMacros, food)
            addCaloriesToCaloriesPerMeal(caloriesPerMeal,mealName,food)
        },
        error: function (results) {
            console.log(results)
        }
    })

    // Reset Form values
    formId = $(this).attr('id')
    var formInputs = $('input[form="' + formId + '"]')
    $(formInputs).each(function(index){
        $(formInputs[index]).val('')
    })

    // Add food to meal
    addFoodToMealJSON(selectedDietPlan,food,mealName)


    // Add form data to table
    var row = createFoodRow(food)
    $(formElement).closest("tr").before(row);

    displayMealNutrients(mealName)
    calculateTotalSum()

    // Make food items sortable
    makeFoodSortable()

    var carbs = parseInt(formData.get("carbohydrates"))
    var fat = parseInt(formData.get("fat"))
    var protein = parseInt(formData.get("protein"))

    //updateDietMacroPieChart(dietMacros,[carbs,fat,protein])

    console.log(food)


    dietSaved = false
});


//Removes Food
$(document).on('click', '.rm-food', function (event) {
    var foodName = $(this).closest('tr').attr('data-food-name')
    var mealName = $(this).closest("table").attr('data-meal-name')

    selectedDietPlan.meals.forEach(function(meal){
        if(meal.name === mealName){
            meal.foods.forEach(function(food, index){
                if(food.name === foodName){
                    removeCaloriesToCaloriesPerMeal(caloriesPerMeal, mealName,food)
                    removeNutrientsDietMacroPieChart(dietMacros,food)
                    if (food.foodGroup !== 'UNDEFINED') {
                        removeFoodToBarChartFoodGroup(barChartFoodGroups, food.foodGroup.replace("_", "/"))
                    }
                    meal.foods.splice(index, 1)
                }
            })
        }
    })

    $(this).parent().parent().remove()
    displayMealNutrients(mealName)
    calculateTotalSum()
})


// Saves Diet Plan
$(document).on('submit', '#submit-entire-diet', function (event) {
    // $('.alert').alert()
    var successAlert = "<div class=\"alert alert-success alert-dismissible fade show\" role=\"alert\">\n" +
        "  <p class='font-weight-bold'>Diet Plan Saved</p>" +
        "  <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n" +
        "    <span aria-hidden=\"true\">&times;</span>\n" +
        "  </button>\n" +
        "</div>"

    var failAlert = "<div class=\"alert alert-warning alert-dismissible fade show\" role=\"alert\">\n" +
        "  <p class='font-weight-bold'>Error in Saving Diet Plan</p>" +
        "  <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n" +
        "    <span aria-hidden=\"true\">&times;</span>\n" +
        "  </button>\n" +
        "</div>"

    event.preventDefault()
    var json = JSON.stringify(selectedDietPlan);
    $.ajax({
        type: "POST",
        url: "/dietplan",
        data: json,
        headers: {
            // Important that content type is used to accept json. jquery .post does not work because content type
            // can't be specified
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        success: function (results) {
            selectedDietPlan = results
            console.log(results)
            $("#submit-diet-alert").html(successAlert)
            window.setTimeout(function() {
                $(".alert").fadeTo(500, 0).slideUp(500, function(){
                    $(this).remove();
                });
            }, 3000);

        },
        error: function (results) {
            $("#submit-diet-alert").html(failAlert)
            window.setTimeout(function() {
                $(".alert").fadeTo(500, 0).slideUp(500, function(){
                    $(this).remove();
                });
            }, 3000);
            console.log(results)
        }
    })
})

// ** Not currently supported
// If diet plan is set save it to the session
$(window).on('unload', function(){

    // If diet plan is set
    // if(!jQuery.isEmptyObject(selectedDietPlan)){
    //     sessionStorage.setItem("dietplan", JSON.stringify(selectedDietPlan))
    // }

})

// Add food to meal when clicked
$(document).on('click', ".food-found", function (event) {
    var mealNames = []

    event.preventDefault();

    // Remove active state from all previously selected foods
    $(".food-found.active").removeClass("active")

    // Show form
    $("#add-food-to-meal").removeClass("d-none")

    // Add active to currently selected food
    $(this).addClass("active")

    selectedFood = {
        id : parseInt($(this).attr('data-food-id')),
        name : $(this).find(".food-name-found").text(),
        calories : parseInt($(this).find(".food-calories-found").text()),
        carbohydrates : parseInt($(this).find(".food-carbs-found").text()),
        fat : parseInt($(this).find(".food-fat-found").text()),
        protein : parseInt($(this).find(".food-protein-found").text()),
        foodGroup: $(this).find(".food-group-found").text()
    }

    // Add meal names to options
    mealNames = getMealNames(selectedDietPlan)
    console.log(mealNames)
    $("#list-of-meals").html("<option disabled=\"disabled\" selected value=\"\">Select a meal</option>")
    $(mealNames).each(function(index){
        $("#list-of-meals").append("<option value='" + mealNames[index]+ "'>" + mealNames[index] +"</option>")
    })

})

// Add searched food to a meal
$(document).on('submit','#add-food-to-meal',function(event){
    event.preventDefault()
    var formData = new FormData($(this)[0])
    var data = {}

    formData.forEach(function(value,key){
        data[key]=value;
    });

    var mealName = data['meal']
    console.log(selectedFood)
    addFoodToMealJSON(selectedDietPlan, selectedFood, mealName)
    console.log(selectedDietPlan)
     var row = createFoodRow(selectedFood)
    $("table[data-meal-name='" + mealName +"'] tbody tr:nth-last-child(2)").before(row)

    if (selectedFood.foodGroup !== 'UNDEFINED') {
        addFoodToBarChartFoodGroup(barChartFoodGroups, selectedFood.foodGroup.replace("_", "/"))
    }
    addNutrientDietMacroPieChart(dietMacros, selectedFood)
    addCaloriesToCaloriesPerMeal(caloriesPerMeal,mealName,selectedFood)

    displayMealNutrients(mealName)
    calculateTotalSum()
})

function createFoodRow(food){
    var row = $("<tr data-food-name = '" + food.name + "'>")
    var infoButton =
        "<td>" +
        "  <button " +
        "    type='button'" +
        "    class='btn btn-info btn-sm'" +
        "    data-toggle='popover'" +
        "    data-trigger='focus'" +
        "    title='" + food.name +"'" +
        "    data-content='food group: " + food.foodGroup +"\ncalories: " + food.calories +"\ncarbs: " + food.carbohydrates +"\nfat: " + food.fat +"\nprotein: " + food.protein + "'" +
        "    data-placement='right'>" +
        "    <i class=\"fas fa-question\"></i>" +
        "  </button>" +
        "</td>"
    row.append(infoButton)
    row.append("<td>" + food.name + "</td>");
    row.append("<td>" + food.calories + "</td>");
    row.append("<td>" + food.carbohydrates + "</td>");
    row.append("<td>" + food.fat + "</td>");
    row.append("<td>" + food.protein + "</td>");
    row.append("<td><button class='btn btn-secondary rm-food btn-sm'><i class='fas fa-trash'></i></button></td>");

    return row
}

// Next button to scroll through info about diet
$(document).on('click','.btn-next', function(event){
    var tab =  $('#diet-slide-options .active').parent().next('li').find('a')
    if(tab.length){
        $(tab).trigger('click');
    }else{
        tab = $('#diet-slide-options li:first-child a').trigger('click')
    }
})

// Previous button to scroll through info about diet
$(document).on('click','.btn-previous', function(event){
    var tab =  $('#diet-slide-options .active').parent().prev('li').find('a')
    if(tab.length){
        $(tab).trigger('click');
    }else{
        tab = $('#diet-slide-options li:last a').trigger('click')
    }
})

// Adds a food to the currently selected diet plan object
function addFoodToMealJSON(dietPlan, food, mealName){
    $(dietPlan.meals).each(function(index){
        if(dietPlan.meals[index].name == mealName){
            if(dietPlan.meals[index].foods == null){
                dietPlan.meals[index].foods = [food]
            }
            else{
                dietPlan.meals[index].foods.push(food)
            }
        }
    })
}

// Gets the names of meals in a diet plan
function getMealNames(dietPlan){
    var meals = []

    $(dietPlan.meals).each(function(index) {
        meals.push(dietPlan.meals[index].name)
    })
    return meals
}

function convertDietPlanJsonToCSV(dietPlan){

}
