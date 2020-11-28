package com.smartliving.webapp;


import com.smartliving.webapp.dietplan.DietPlan;
import com.smartliving.webapp.dietplan.DietRepository;
import com.smartliving.webapp.exercise.*;
import com.smartliving.webapp.food.Food;
import com.smartliving.webapp.food.FoodGroup;
import com.smartliving.webapp.food.FoodRepository;
import com.smartliving.webapp.meal.Meal;
import com.smartliving.webapp.meal.MealRepository;
import com.smartliving.webapp.user.User;
import com.smartliving.webapp.user.UserRepository;
import org.hibernate.loader.plan.build.spi.ExpandingQuerySpace;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;


/**
 * Command line runner class to initialize database with data. Used in development.
 */
@Profile("dev")
@Configuration
public class LoadDatabase {

    private final PasswordEncoder passwordEncoder;

    @Autowired
    public LoadDatabase(PasswordEncoder passwordEncoder){
        this.passwordEncoder = passwordEncoder;
    }

    private static final Logger log = LoggerFactory.getLogger(LoadDatabase.class);

    /**
     * Preloads the food repository
     * @param
     * @return
     */
    @Bean
    CommandLineRunner initDatabase(FoodRepository foodRepository, MealRepository mealRepository,
                                   DietRepository dietRepository, UserRepository userRepository,
                                   ExerciseRepository exerciseRepository, ExercisePlanRepository exercisePlanRepository){
        // Sample Diet

        // Breakfast Foods
        Food almondMilk = new Food("Almond Milk", 30,1,3,1, FoodGroup.DAIRY);
        Food honeyNutCheerios = new Food("Honey Nut Cheerios", 140, 30, 2,3,FoodGroup.GRAIN);

        // Lunch Foods
        Food apple = new Food("Apple", 40, 10, 0,0, FoodGroup.FRUIT);
        Food whiteBread = new Food("White Bread", 90, 19,0,3, FoodGroup.GRAIN);
        Food ham = new Food("Ham", 50, 1,2,8, FoodGroup.MEAT);
        Food cheese = new Food("Cheese", 120, 10,1,6,FoodGroup.DAIRY);
        Food mayo = new Food("Mayo", 90,0,10,0, FoodGroup.FATS_OILS);


        List<Food> foods = Arrays.asList(almondMilk,honeyNutCheerios,apple,whiteBread,ham,cheese,mayo);
        foodRepository.saveAll(foods);

        Meal breakfast = new Meal("Breakfast");
        breakfast.addFood(almondMilk);
        breakfast.addFood(honeyNutCheerios);

        Meal lunch = new Meal("Lunch");
        lunch.addFood(whiteBread);
        lunch.addFood(ham);
        lunch.addFood(cheese);
        lunch.addFood(mayo);
        lunch.addFood(apple);

        DietPlan smartDiet = new DietPlan("Smart Diet");
        smartDiet.addMeal(breakfast);
        smartDiet.addMeal(lunch);


        User user = new User("jordan","jordan@gmail.com",passwordEncoder.encode("password"));
        user.addDietPlan(smartDiet);
        userRepository.save(user);

        User user1 = new User("j","jordan12@gmail.com",passwordEncoder.encode("j"));
        userRepository.save(user1);

        //Exercises name, muscleGroup, equipment
        Exercise bicepCurl = new Exercise("Bicep Curl", "Bicep", "Dumbbells");
        Exercise backSquat = new Exercise("Back Squat", "Lower Body", "Barbell");
        Exercise deadlift = new Exercise("Conventional Deadlift", "Lower Body", "Barbell");
        Exercise benchPress = new Exercise("Bench Press", "Chest", "Barbell");
        Exercise reverseChestFly = new Exercise("Reverse Chest Fly", "Back", "Dumbbells");
        Exercise barbellJammers = new Exercise("Barbell Jammers", "Abs", "Barbell");
        Exercise abCrunchMachine = new Exercise("Ab Crunch Machine", "Abs", "Machine");
        Exercise backExtensionMachine = new Exercise("Back Extension Machine", "Back", "Machine");
        Exercise bandBackFlyes = new Exercise("Band Back Flyes", "Back", "Bands");
        Exercise bandWeightedSitUp = new Exercise("Band Weighted Sit Up", "Abs", "Bands");
        Exercise bandsSeatedShoulderPress = new Exercise("Bands Seated Shoulder Press", "Shoulders", "Bands");
        Exercise barbellMilitaryPress = new Exercise("Barbell Military Press", "Shoulders", "Barbell");
        Exercise barbellBentArmPullover = new Exercise("Barbell Bent Arm Pullover", "Back", "Barbell");
        Exercise barbellBodyRow = new Exercise("Barbell Body Row", "Biceps", "Barbell");
        Exercise barbellBradfordRockyPress = new Exercise("Barbell Bradford Rocky Press", "Shoulders", "Barbell");
        Exercise barbellCloseGripBenchPress = new Exercise("Barbell Close Grip Bench Press", "Triceps", "Barbell");
        Exercise barbellCloseGripPreacherCurl = new Exercise("Barbell Close Grip Preacher Curl", "Biceps", "EZ Curl Bar");
        Exercise barbellCloseGripPressBehindNeck = new Exercise("Barbell Close Grip Press Behind the Neck", "Triceps", "Barbell");
        Exercise barbellCloseGripSeatedConcentrationCurl = new Exercise("Barbell Close Grip Seated Concentration Curl", "Biceps", "Barbell");
        Exercise barbellCurlsLyingAgainstIncline = new Exercise("Barbell Curls Lying Against An Incline", "Biceps", "Barbell");
        Exercise barbellDeclineBenchLunge = new Exercise("Barbell Decline Bench Lunge", "Upper Legs", "Barbell");
        Exercise barbellDeclineBenchPress = new Exercise("Barbell Decline Bench Press", "Chest", "Barbell");
        Exercise barbellDeclinePullover = new Exercise("Barbell Decline Pullover", "Chest", "Barbell");
        Exercise barbellFrontRaiseAndPullover = new Exercise("Barbell Front Raise and Pullover", "Chest", "Barbell");
        Exercise barbellGoodMorningOffPins = new Exercise("Barbell Good Morning Off Pins", "Upper Legs", "Barbell");
        Exercise barbellHighInvertedRow = new Exercise("Barbell High Inverted Row", "Back", "Barbell");
        Exercise barbellHipThrust = new Exercise("Barbell Hip Thrust", "Glutes", "Barbell");
        Exercise barbellInclineBenchPress = new Exercise("Barbell Incline Bench Press", "Chest", "Barbell");
        Exercise barbellInclineBenchPull = new Exercise("Barbell Incline Bench Pull", "Back", "Barbell");
        Exercise barbellInclineBenchRow = new Exercise("Barbell Incline Bench Row", "Back", "Barbell");
        Exercise barbellJMPress = new Exercise("Barbell JM Press", "Triceps", "Barbell");
        Exercise barbellLyingBackOfTheHeadExtension = new Exercise("Barbell Lying Back of the Head Tricep Extension", "Triceps", "Barbell");
        Exercise barbellLyingCamberedRow = new Exercise("Barbell Lying Cambered Row", "Back", "Barbell");
        Exercise barbellLyingCloseGripTricepsPressToChin = new Exercise("Barbell Lying Close Grip Triceps Press To Chin", "Triceps", "Barbell");
        Exercise benchDip = new Exercise("Bench Dip", "Triceps", "Bench");
        Exercise benchPressMachine = new Exercise("Bench Press Machine", "Chest", "Machine");
        Exercise benchPushup = new Exercise("Bench Pushup", "Chest", "Bench");
        Exercise biceptCurlMachine = new Exercise("Bicep Curl Machine", "Biceps", "Machine");
        Exercise butterfly = new Exercise("Butterfly", "Chest", "Machine");
        Exercise cableBackInclinePushdown = new Exercise("Cable Back Incline Pushdown", "Back", "Machine");
        Exercise cableBentOverLowPulleyLateral = new Exercise("Cable Bent Over Low Pulley Lateral", "Shoulders", "Machine");
        Exercise cableCalfRaise = new Exercise("Cable Calf Raise", "Lower Legs", "Machine");
        Exercise cableCloseGripCurl = new Exercise("Cable Close Grip Curl", "Biceps", "Machine");
        Exercise cableConcentrationCurl = new Exercise("Cable Concentration Curl", "Biceps", "Machine");
        Exercise cableCrossOver = new Exercise("Cable Cross Over", "Chest", "Machine");
        Exercise cableCrunch = new Exercise("Cable Crunch", "Abs", "Machine");
        Exercise cableDeadlift = new Exercise("Cable Deadlift", "Back", "Machine");
        Exercise cableDeclineChestFly = new Exercise("Cable Decline Chest Fly", "Back", "Machine");
        Exercise cableDeclinePress = new Exercise("Cable Decline Press", "Chest", "Machine");
        Exercise cableDeclinePullover = new Exercise("Cable Decline Pullover", "Shoulders", "Machine");
        Exercise cableDragCurl = new Exercise("Cable Drag Curl", "Biceps", "Machine");
        Exercise cableElevatedRows = new Exercise("Cable Elevated Rows", "Back", "Machine");
        Exercise cableExternalRotation = new Exercise("Cable External Rotation", "Shoulders", "Machine");
        Exercise cableFlatBenchFly = new Exercise("Cable Flat Bench Fly", "Chest", "Machine");
        Exercise cableFrontRaise = new Exercise("Cable Front Raise", "Shoulders", "Machine");


        exerciseRepository.save();



        exerciseRepository.save(bicepCurl);
        exerciseRepository.save(backSquat);
        exerciseRepository.save(deadlift);
        exerciseRepository.save(benchPress);
        exerciseRepository.save(reverseChestFly);
        exerciseRepository.save(barbellJammers);
        exerciseRepository.save(abCrunchMachine);
        exerciseRepository.save(backExtensionMachine);
        exerciseRepository.save(bandBackFlyes);
        exerciseRepository.save(bandWeightedSitUp);
        exerciseRepository.save(bandsSeatedShoulderPress);
        exerciseRepository.save(barbellMilitaryPress);
        exerciseRepository.save(barbellBentArmPullover);
        exerciseRepository.save(barbellBodyRow);
        exerciseRepository.save(barbellBradfordRockyPress);
        exerciseRepository.save(barbellCloseGripBenchPress);
        exerciseRepository.save(barbellCloseGripPreacherCurl);
        exerciseRepository.save(barbellCloseGripPressBehindNeck);
        exerciseRepository.save(barbellCloseGripSeatedConcentrationCurl);
        exerciseRepository.save(barbellCurlsLyingAgainstIncline);
        exerciseRepository.save(barbellDeclineBenchLunge);
        exerciseRepository.save(barbellDeclineBenchPress);
        exerciseRepository.save(barbellDeclineBenchPress);
        exerciseRepository.save(barbellDeclinePullover);
        exerciseRepository.save(barbellFrontRaiseAndPullover);
        exerciseRepository.save(barbellGoodMorningOffPins);
        exerciseRepository.save(barbellHighInvertedRow);
        exerciseRepository.save(barbellHipThrust);
        exerciseRepository.save(barbellInclineBenchPress);
        exerciseRepository.save(barbellInclineBenchPull);
        exerciseRepository.save(barbellInclineBenchRow);
        exerciseRepository.save(barbellJMPress);
        exerciseRepository.save(barbellLyingBackOfTheHeadExtension);
        exerciseRepository.save(barbellLyingCamberedRow);
        exerciseRepository.save(barbellLyingCloseGripTricepsPressToChin);
        exerciseRepository.save(benchDip);
        exerciseRepository.save(benchPressMachine);
        exerciseRepository.save(benchPushup);
        exerciseRepository.save(biceptCurlMachine);
        exerciseRepository.save(butterfly);
        exerciseRepository.save(cableBackInclinePushdown);
        exerciseRepository.save(cableBentOverLowPulleyLateral);
        exerciseRepository.save(cableCalfRaise);
        exerciseRepository.save(cableCloseGripCurl);
        exerciseRepository.save(cableConcentrationCurl);
        exerciseRepository.save(cableCrossOver);
        exerciseRepository.save(cableCrunch);
        exerciseRepository.save(cableDeadlift);
        exerciseRepository.save(cableDeclineChestFly);
        exerciseRepository.save(cableDeclinePress);
        exerciseRepository.save(cableDeclinePullover);
        exerciseRepository.save(cableDragCurl);
        exerciseRepository.save(cableElevatedRows);
        exerciseRepository.save(cableExternalRotation);
        exerciseRepository.save(cableFlatBenchFly);
        exerciseRepository.save(cableFrontRaise);


        ArrayList<ExercisePlanExercise> exercisesSetsReps = new ArrayList<>();
        exercisesSetsReps.add(new ExercisePlanExercise(5, 25, 25, false, bicepCurl));
        ExercisePlan exercisePlan = new ExercisePlan("Big body", exercisesSetsReps, user);
        exercisePlanRepository.save(exercisePlan);

        return args -> {
            log.info("Preloading " + foods);
            log.info("Preloading " + apple);
            log.info("Preloading " + breakfast);
            log.info("Preloading " + user);
            log.info("Preloading " + bicepCurl);
            log.info("Preloading " + exercisePlan);
            log.info("Preloading " + userRepository.save(new User("doe","doe@gmail.com","doepassword")));
        };
    }
}
