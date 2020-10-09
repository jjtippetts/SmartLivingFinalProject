package com.smartliving.webapp;




import com.smartliving.webapp.food.FoodGroup;
import org.springframework.core.convert.converter.Converter;

public class StringToEnumConverter implements Converter<String, FoodGroup> {

    @Override
    public FoodGroup convert(String source){
        FoodGroup foodGroup = FoodGroup.valueOf(source);
        return FoodGroup.valueOf(source);
    }

}
