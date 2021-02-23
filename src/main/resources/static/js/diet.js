class Food {
    constructor() {}
    set id(id) {this._id = id;}
    set name(name) {this._name = name;}
    set calories(calories) {this._calories = calories;}
    set carbohydrates(carbohydrates) {this._carbohydrates = carbohydrates;}
    set fat(fat) {this._fat = fat;}
    set foodGroup(foodGroup) {this._foodGroup = foodGroup;}
    set protein(protein) {this._protein = protein;}

    showDietInfo() {
        console.log(this._id);
        console.log(this._name);
        console.log(this._calories);
        console.log(this._carbohydrates);
        console.log(this._protein);
        console.log(this._foodGroup);
    }
}

class Meal {
    constructor() {}
    set id(id) {this._id = id;}
    set name(name) {this._name = name;}

    set foods(foods) {
        let allFoods = []
        foods.forEach(function (food) {
            let aFood = new Food();
            Object.assign(aFood, food)
            allFoods.push(aFood);
        })
        this._foods = allFoods;
    }

    showDietInfo() {
        console.log(this._id);
        console.log(this._name);
        this._foods.forEach(function (food) {
            food.showDietInfo();
        })
    }

    addFood(food){
        if(food instanceof Food){
            this._foods.push(food)
        } else {
            throw new Error("InvalidArgumentException - food must be instance of class Food")
        }
    }
}

class Diet {
    constructor() {}
    set id(id) {this._id = id;}
    set name(name) {this._name = name;}

    set meals(meals) {
        let allMeals = []
        meals.forEach(function (meal) {
            let aMeal = new Meal();
            Object.assign(aMeal, meal)
            allMeals.push(aMeal);
        })
        this._meals = allMeals;
    }

    showDietInfo() {
        console.log(this._id);
        console.log(this._name);
        this._meals.forEach(function (meal) {
            meal.showDietInfo();
        })
    }

    addAMeal(meal){
        if(meal instanceof Meal){
            this._meals.push(meal)
        } else {
            throw new Error("InvalidArgumentException - meal must be instance of class Meal")
        }
    }
}