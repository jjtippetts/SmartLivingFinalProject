package com.smartliving.webapp;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.web.bind.annotation.*;

@RestController
public class FoodController {

    private final AtomicLong counter = new AtomicLong();
    private final ArrayList<Food> foods = new ArrayList<>();

    private final FoodRepository repository;

    FoodController(FoodRepository repository){
        this.repository = repository;
    }

//    @GetMapping("/food")
//    public Food getFood(@RequestParam(value = "foodName", defaultValue = "none") String foodName){
//
//        foods.add(new Food("pie",1,1,1,1));
//
//        for(Food food : foods){
//            if(food.getName().equals(foodName)){
//                return food;
//            }
//        }
//        return null;
//    }

    @GetMapping("/food")
    List<Food> all(){
        return repository.findAll();
    }

    @PostMapping("/food")
    Food newFood(@RequestBody Food newFood){
        return repository.save(newFood);
    }

    @GetMapping("/food/{id}")
    Food one(@PathVariable Long id){
        return repository.findById(id).orElseThrow(() -> new FoodNotFoundException(id)  );
    }

//    @PutMapping("/food/{id}")
//    Food replaceFood(@RequestBody Food newFood, @PathVariable Long id){
//        return repository.findById(id).map(Food -> {
//            food
//        })
//    }

    @DeleteMapping("/food/{id}")
    void deleteFood(@PathVariable Long id){
        repository.deleteById(id);
    }

//    @GetMapping("/test")
//    public String itWorks(){
//        return "Its working";
//    }

//    @PostMapping("/food")
//    public void createFood(@RequestParam(value = "name") String name,
//                           @RequestParam(value = "calories") int calories,
//                           @RequestParam(value = "carbs") int carbs,
//                           @RequestParam(value = "fat") int fat,
//                           @RequestParam(value = "protein") int protein){
//        foods.add(new Food(name, calories, carbs, fat, protein));
//    }

}
