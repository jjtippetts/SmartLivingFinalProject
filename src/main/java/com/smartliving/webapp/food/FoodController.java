package com.smartliving.webapp.food;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.data.web.SortDefault;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

/**
 * The controller that is responsible for handling all of the HTTP requests related to foods. Allows users to search
 * by name and by food group
 */
@RestController
@RequestMapping("/food")
public class FoodController {

    private static final int DEFAULT_PAGE_NUMBER = 0;
    private static final int DEFAULT_PAGE_SIZE = 5;

    private final FoodRepository foodRepository;

    FoodController(FoodRepository foodRepository) {
        this.foodRepository = foodRepository;
    }

    // Returns a paged list of all the foods in the database
    @GetMapping(params = "page")
    public Page<Food> findAllFood(@RequestParam(value = "page") int page,
                           @PageableDefault(size = DEFAULT_PAGE_SIZE)
                                   @SortDefault(sort = "name", direction = Sort.Direction.ASC) Pageable pageable) {

        return foodRepository.findAll(pageable);
    }

    // Returns a paged list of foods by food group
    @GetMapping(params = "foodGroup")
    public Page<Food> findFoodByFoodGroup(@RequestParam("foodGroup") FoodGroup foodGroup,
                                          @RequestParam("page") int page,
                                          @PageableDefault(size = DEFAULT_PAGE_SIZE)
                                              @SortDefault(sort = "name", direction = Sort.Direction.ASC) Pageable pageable){
        Page<Food> foodsFound = foodRepository.findByFoodGroup(foodGroup,pageable);
        return foodsFound;
    }

    // Returns a paged list of foods that match a name
    @GetMapping("/{name}")
    public Page<Food> findFoodByName(@PathVariable String name,
                              @RequestParam("page") int page,
                              @PageableDefault(size = DEFAULT_PAGE_SIZE)
                              @SortDefault(sort = "name", direction = Sort.Direction.ASC) Pageable pageable) throws FoodNotFoundException{

        Page<Food> foodsFound = foodRepository.findAllByNameContainingIgnoreCase(name,pageable);
        if(foodsFound.getContent().isEmpty()){
            throw new FoodNotFoundException();
        }else{
            return foodsFound;
        }
    }

    // saves a new food
    @PostMapping(consumes = MediaType.ALL_VALUE)
    public Food newFood(@RequestBody Food newFood) {
        return foodRepository.save(newFood);
    }

    // Delete a food item based on id
    @DeleteMapping("/{id}")
    public void deleteFood(@PathVariable Long id) {
        foodRepository.deleteById(id);
    }
}
