var counter = 0

var addFoodData = {
    counter: 0
}

var selectedDietPlan = {}

function createDietPlanHTML(dietPlanName){
    $("#name-of-diet").remove()
    $("#diet-container").prepend("<div id='name-of-diet' class='d-flex justify-content-between pb-2'> " + "<h3>Diet Name: " + dietPlanName + "</h3>" +
        "<form id=\"submit-entire-diet\">" + "<button type=\"submit\" class=\"btn btn-primary\">Save Diet</button>" + "</form>" + "</div>")
    // Add a form to enter in a meal name
    $("#diet-info").html(addMealTable)
    // Add a section for the total nutrients for all meals
    $("#diet-total-nutrients").html("<table class='table'><thead>" +
        "<tr class='table-primary'><th colspan='6'>Diet Totals</th></tr>" +
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
                calculateMealNutrients(mealAddedTo)
                calculateMealNutrients(mealRemovedFrom)
                calculateTotalSum()
            },
            onRemove : function (evt) {
                //calculateSum($(formElement).closest("table"))
            }
        });
    })
}

// Moves a food object between meals
function moveFood(foodName, newPosition,mealAddedTo, mealRemovedFrom){
    var addedFood = {}
    selectedDietPlan.meals.forEach(function(meal) {
        if (meal.name === mealRemovedFrom) {
            meal.foods.forEach(function(food, index){
                if(food.name === foodName){
                    addedFood = food
                    console.log("Food To be removed: ")
                    console.log(addedFood)
                    meal.foods.splice(index, 1)
                }
            })
        }
    })
    selectedDietPlan.meals.forEach(function(meal, index) {
        if (meal.name === mealAddedTo) {
            meal.foods.splice(newPosition, 0, addedFood)
        }
    })
}

// Injected Form to create meal after creating a diet plan
var addMealTable =
    "<table class=\"table table-striped meal\">\n" +
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
    "  <th scope=\"col\" style='width: 10%'></th>\n" +
    "  <th scope=\"col\" style='width: 18%'>Name</th>\n" +
    "  <th scope=\"col\" style='width: 18%'>Calories</th>\n" +
    "  <th scope=\"col\" style='width: 18%'>Carbohydrates</th>\n" +
    "  <th scope=\"col\" style='width: 18%'>Fat</th>\n" +
    "  <th scope=\"col\" style='width: 18%'>Protein</th>\n" +
    "</tr>\n"

// Starting nutrient totals for each meal
var nutrientTotals = "<tr id='nutrient-totals' class=\"table-info\">\n" +
"    <td>Total</td>\n" +
"    <td></td>\n" +
"    <td>0</td>\n" +
"    <td>0</td>\n" +
"    <td>0</td>\n" +
"    <td>0</td>\n" +
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
    console.log(selectedDietPlan)

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
    $(formElement).closest("tr").html("<th colspan='6'>" + formData.get("name") + "</th>")

    Sortable.create($("#diet-info")[0], {
        group: "shared",
    });
    $(table).attr('data-meal-name', formData.get("name"))
    addData(dietMacros, formData.get("name"),0 )
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


    // Add meal to Diet Plan object to be submitted
    selectedDietPlan.meals.forEach(function(meal){
        // if(meal.name === $(formElement).data('data-meal-name')){
        if(meal.name === mealName){
            if(meal.foods == null){
                meal.foods = [food]
            }
            else{
                meal.foods.push(food)
            }
        }
    })

    // Reset Form values
    formId = $(this).attr('id')
    var formInputs = $('input[form="' + formId + '"]')
    $(formInputs).each(function(index){
        $(formInputs[index]).val('')
    })

    // Add form data to table
    var row = $("<tr data-food-name = " + formData.get("name") + ">")
    row.append("<td><button class='btn btn-danger rm-food btn-sm'><i class='fas fa-minus'></i></button></td>")
    row.append("<td>" + formData.get("name") + "</td>");
    row.append("<td>" + formData.get("calories") + "</td>");
    row.append("<td>" + formData.get("carbohydrates") + "</td>");
    row.append("<td>" + formData.get("fat") + "</td>");
    row.append("<td>" + formData.get("protein") + "     </td>");
    $(formElement).closest("tr").before(row);

    //var mealName = $(formElement).data('data-meal-name')
    calculateMealNutrients(mealName)
    calculateTotalSum()

    // Make food items sortable
    makeFoodSortable()
});


//Removes Food
$(document).on('click', '.rm-food', function (event) {
    var foodName = $(this).closest('tr').attr('data-food-name')
    var mealName = $(this).closest("table").attr('data-meal-name')

    selectedDietPlan.meals.forEach(function(meal){
        if(meal.name === mealName){
            meal.foods.forEach(function(food, index){
                if(food.name === foodName){
                    meal.foods.splice(index, 1)
                }
            })
        }
    })
    console.log(selectedDietPlan)
    $(this).parent().parent().remove()
    calculateMealNutrients(mealName)
    calculateTotalSum()
})


// Saves Diet Plan
$(document).on('submit', '#submit-entire-diet', function (event) {
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
        },
        error: function (results) {
            console.log(results)
        }
    })
})


// If diet plan is set save it to the session
$(window).on('unload', function(){

    // If diet plan is set
    if(!jQuery.isEmptyObject(selectedDietPlan)){
        sessionStorage.setItem("dietplan", JSON.stringify(selectedDietPlan))
    }

})

