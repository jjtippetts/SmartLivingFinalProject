package com.smartliving.webapp.food;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.data.web.SortDefault;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
public class FoodController {

    private static final int DEFAULT_PAGE_NUMBER = 0;
    private static final int DEFAULT_PAGE_SIZE = 5;

    private final FoodRepository foodRepository;

    FoodController(FoodRepository foodRepository) {
        this.foodRepository = foodRepository;
    }

    @GetMapping(value = "/food", params = "page")
    public Page<Food> findAllFood(@RequestParam(value = "page") int page,
                           @PageableDefault(size = DEFAULT_PAGE_SIZE)
                                   @SortDefault(sort = "name", direction = Sort.Direction.ASC) Pageable pageable) {

        return foodRepository.findAll(pageable);
    }

    @GetMapping(value = "/food", params = "foodGroup")
    public Page<Food> findFoodByFoodGroup(@RequestParam("foodGroup") FoodGroup foodGroup,
                                          @RequestParam("page") int page,
                                          @PageableDefault(size = DEFAULT_PAGE_SIZE)
                                              @SortDefault(sort = "name", direction = Sort.Direction.ASC) Pageable pageable){
        Page<Food> foodsFound = foodRepository.findByFoodGroup(foodGroup,pageable);
        return foodsFound;
    }

    @GetMapping("/food/{name}")
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

    @PostMapping(path = "/food", consumes = MediaType.ALL_VALUE)
    public Food newFood(@RequestBody Food newFood) {
        return foodRepository.save(newFood);
    }

    @DeleteMapping("/food/{id}")
    public void deleteFood(@PathVariable Long id) {
        foodRepository.deleteById(id);
    }

    @GetMapping("/test")
    public String getTest(){
        return "Hello World";
    }
}
