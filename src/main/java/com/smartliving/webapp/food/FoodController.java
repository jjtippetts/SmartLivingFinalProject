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
    Page<Food> findAllFood(@RequestParam(value = "page") int page,
                           @PageableDefault(size = DEFAULT_PAGE_SIZE)
                                   @SortDefault(sort = "name", direction = Sort.Direction.ASC) Pageable pageable) {

        return foodRepository.findAll(pageable);
    }

    @GetMapping(value = "/food", params = "foodGroup")
    List<Food> findFoodByFoodGroup(@RequestParam("foodGroup") FoodGroup foodGroup){
        return foodRepository.findByFoodGroup(foodGroup);
    }

    @GetMapping("/food/{name}")
    Page<Food> findFoodByName(@PathVariable String name,
                              @RequestParam("page") int page,
                              @PageableDefault(size = DEFAULT_PAGE_SIZE)
                              @SortDefault(sort = "name", direction = Sort.Direction.ASC) Pageable pageable) {

        return foodRepository.findAllByNameContainingIgnoreCase(name,pageable);
    }

    @PostMapping(path = "/food", consumes = MediaType.ALL_VALUE)
    Food newFood(@RequestBody Food newFood) {
        return foodRepository.save(newFood);
    }

    @DeleteMapping("/food/{id}")
    void deleteFood(@PathVariable Long id) {
        foodRepository.deleteById(id);
    }
}
