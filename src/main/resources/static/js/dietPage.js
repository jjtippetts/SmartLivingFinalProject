var counter = 0

var newDietBefore = {}

function updateGraph(){
    $(".meal-name-row").each(function(index){
        console.log($(this).children())
    })
}

// Moves a food object between meals
function moveFood(foodName, newPosition,mealAddedTo, mealRemovedFrom){
    var addedFood = {}
    newDietBefore.meals.forEach(function(meal) {
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
    newDietBefore.meals.forEach(function(meal, index) {
        if (meal.name === mealAddedTo) {
            meal.foods.splice(newPosition, 0, addedFood)
        }
    })
}

// Calculates the sum of all the nutrients in each meal by traversing the DOM
function calculateTotalSum() {
    var totals = $(".sum")
    var mealName
    for(var i = 2; i < 6; ++i){
        var sum = 0;
        $(totals).each(function(index){
            var rowItems = totals[index].children
            sum += parseInt(rowItems[i].textContent)
        })
        $("#nutrient-totals").children().eq(i).text(sum)
    }
}

// Calculates the sum of nutrients by traversing the DOM
function calculateSum(listOfFoods) {

    var mealTotals = {
        calories : 0,
        carbohydrates : 0,
        fat : 0,
        protein : 0
    }

    listOfFoods.forEach(function(food){
        mealTotals.calories += parseInt(food.calories)
        mealTotals.carbohydrates += parseInt(food.carbohydrates)
        mealTotals.fat += parseInt(food.fat)
        mealTotals.protein += parseInt(food.protein)
    })
    return mealTotals
}

function calculateMealNutrients(mealName){
    var mealNutrientTotal = $("[data-meal-name='" + mealName +"']").closest('tr').next('tr')

    newDietBefore.meals.forEach(function(meal) {
        if (meal.name === mealName) {
            var mealTotals = calculateSum(meal.foods)
            $(mealNutrientTotal).find('.food-calories').text(mealTotals.calories)
            $(mealNutrientTotal).find('.food-carbohydrates').text(mealTotals.carbohydrates)
            $(mealNutrientTotal).find('.food-fat').text(mealTotals.fat)
            $(mealNutrientTotal).find('.food-protein').text(mealTotals.protein)
        }
    })
}



// Injected Form to create meal after creating a diet plan
var addMealTable =
    "<table class=\"table table-striped meal\">\n" +
    "  <thead>\n" +
    "<tr class=\"meal-name-row table-primary\" id=\"mealHeader\">\n" +
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
nurtientHeaders =
    "<tr class=\"nutrient-info\">\n" +
    "  <th scope=\"col\" style='width: 10%'></th>\n" +
    "  <th scope=\"col\" style='width: 18%'>Name</th>\n" +
    "  <th scope=\"col\" style='width: 18%'>Calories</th>\n" +
    "  <th scope=\"col\" style='width: 18%'>Carbohydrates</th>\n" +
    "  <th scope=\"col\" style='width: 18%'>Fat</th>\n" +
    "  <th scope=\"col\" style='width: 18%'>Protein</th>\n" +
    "</tr>\n"

//Form for adding a food to a meal
addFoodBody =
    "<tbody class='sortable'>\n" +
    "  <tr class=\"sortDisabled\">\n" +
    "        <td>\n" +
    "    <form class=\"addFoodToDiet\">\n" +
    "          <button class=\"btn btn-primary btn-sm\" type=\"submit\">\n" +
    "            <i class=\"fas fa-plus\"></i>\n" +
    "          </button>\n" +
    "    </form>\n" +
    "        </td>\n" +
    "        <td>\n" +
    "          <label for=\"foodName\"></label>\n" +
    "          <input\n" +
    "                  type=\"text\"\n" +
    "                  class=\"form-control\"\n" +
    "                  id=\"foodName\"\n" +
    "                  placeholder=\"Strawberries\"\n" +
    "                  name=\"name\"\n" +
    "                  required\n" +
    "          />\n" +
    "        </td>\n" +
    "        <td>\n" +
    "          <label for=\"calories\"></label>\n" +
    "          <input\n" +
    "                  type=\"number\"\n" +
    "                  min=\"0\"\n" +
    "                  class=\"form-control\"\n" +
    "                  id=\"calories\"\n" +
    "                  placeholder=\"40\"\n" +
    "                  name=\"calories\"\n" +
    "                  required\n" +
    "          />\n" +
    "        </td>\n" +
    "        <td>\n" +
    "          <label for=\"carbohydrates\"></label>\n" +
    "          <input\n" +
    "                  type=\"number\"\n" +
    "                  min=\"0\"\n" +
    "                  class=\"form-control\"\n" +
    "                  id=\"carbohydrates\"\n" +
    "                  placeholder=\"9\"\n" +
    "                  name=\"carbohydrates\"\n" +
    "                  required\n" +
    "          />\n" +
    "        </td>\n" +
    "        <td>\n" +
    "          <label for=\"fat\"></label>\n" +
    "          <input\n" +
    "                  type=\"number\"\n" +
    "                  min=\"0\"\n" +
    "                  class=\"form-control\"\n" +
    "                  id=\"fat\"\n" +
    "                  placeholder=\"0\"\n" +
    "                  name=\"fat\"\n" +
    "                  required\n" +
    "          />\n" +
    "        </td>\n" +
    "        <td>\n" +
    "          <label for=\"protein\"></label>\n" +
    "          <input\n" +
    "                  type=\"number\"\n" +
    "                  min=\"0\"\n" +
    "                  class=\"form-control\"\n" +
    "                  id=\"protein\"\n" +
    "                  placeholder=\"1\"\n" +
    "                  name=\"protein\"\n" +
    "                  required\n" +
    "          />\n" +
    "        </td>\n" +
    "  </tr>\n" +
    "  <tr class=\"sum table-info sortDisabled\">\n" +
    "    <td>Total</td>\n" +
    "    <td></td>\n" +
    "    <td class='food-calories'>0</td>\n" +
    "    <td class='food-carbohydrates'>0</td>\n" +
    "    <td class='food-fat'>0</td>\n" +
    "    <td class='food-protein'>0</td>\n" +
    "  </tr>\n" +
    "</tbody>\n"

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

    // Extract from name and values and create object to send to controller
    formData.forEach(function(value,key){
        newDietBefore[key]=value;
    });
    console.log(newDietBefore)

    $("#create-diet-container").html("<div class='d-flex justify-content-between pb-2'> " + "<h3>Diet Name: " + newDietBefore.name + "</h3>" +
    "<form id=\"submit-entire-diet\">" + "<button type=\"submit\" class=\"btn btn-primary\">Save Diet</button>" + "</form>" + "</div>")
    // Add a form to enter in a meal name
    $("#diet-info").html(addMealTable)
    // Add a section for the total nutrients for all meals
    $("#diet-total-nutrients").html("<table class='table'><thead>" +
        nurtientHeaders + "</thead><tbody>" + nutrientTotals + "</tbody></table>")
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
    if(newDietBefore['meals'] == null){
        newDietBefore['meals'] = [meal]
    }
    else {
        newDietBefore['meals'].push(meal)
    }
    console.log(newDietBefore)

    $(formElement).closest("tr").after(nurtientHeaders)
    // Injects the rows for adding a new food to the meal and the total nutrients for that meal
    $(formElement).closest("thead").after(addFoodBody)
    var table = $(formElement).closest("table")
    // Add a new form for adding a meal below the current Meal table
    $("#diet-info").append(addMealTable)
    // Replace the form with the name of the meal
    $(formElement).closest("tr").html("<th colspan='6'>" + formData.get("name") + "</th>")
    // Alter the id's of the form, label, and input so that there are not duplicates
    $(table).find("form").attr('id','addMeal' + (++counter))
    $(table).find("label").attr("form", "addMeal" + (counter))
    $(table).find("input").attr("form", "addMeal" + (counter))

    $("#foodName").attr("id", "foodName" + (counter))
    $("#calories").attr("id", "calories" + (counter))
    $("#carbohydrates").attr("id", "carbohydrates" + (counter))
    $("#fat").attr("id", "fat" + (counter))
    $("#protein").attr("id", "protein" + (counter))
    $("label[for='foodName']").attr("for", "foodName" + (counter))
    $("label[for='calories']").attr("for", "calories" + (counter))
    $("label[for='carbohydrates']").attr("for", "carbohydrates" + (counter))
    $("label[for='fat']").attr("for", "fat" + (counter))
    $("label[for='protein']").attr("for", "protein" + (counter))
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
    newDietBefore.meals.forEach(function(meal){
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
    row.append("<td>" + formData.get("protein") + "</td>");
    $(formElement).closest("tr").before(row);

    //var mealName = $(formElement).data('data-meal-name')
    calculateMealNutrients(mealName)
    calculateTotalSum()

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
                console.log(formData.get("name"))
                console.log("Moved '" +
                    $(evt.to).children().eq(evt.newIndex).attr('data-food-name') + "' from: '" +
                    $(evt.from).find('table').attr('data-meal-name') + "' to: '" +
                    $(evt.to).find('table').attr('data-meal-name'))
                var mealAddedTo = $(evt.to).find('table').attr('data-meal-name')
                var mealRemovedFrom= $(evt.from).find('table').attr('data-meal-name')
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
});

$(document).on('click', '.rm-food', function (event) {
    var foodName = $(this).closest('tr').attr('data-food-name')
    var mealName = $(this).closest("table").attr('data-meal-name')

    newDietBefore.meals.forEach(function(meal){
        if(meal.name === mealName){
            meal.foods.forEach(function(food, index){
                if(food.name === foodName){
                    meal.foods.splice(index, 1)
                }
            })
        }
    })
    console.log(newDietBefore)
    $(this).parent().parent().remove()
    calculateMealNutrients(mealName)
    calculateTotalSum()
})

$(document).on('submit', '#submit-entire-diet', function (event) {
    event.preventDefault()
    var json = JSON.stringify(newDietBefore);
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
            newDietBefore = results
            console.log(results)
        },
        error: function (results) {
            console.log(results)
        }
    })
})

function updateCaloriePercentage(){
    var mealNutrients = $(".sum")
    $(mealNutrients).each(function(index){

    })
}

function addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.update();
}

function removeData(chart) {
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
    });
    chart.update();
}

