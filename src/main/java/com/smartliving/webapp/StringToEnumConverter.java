package com.smartliving.webapp;




import org.springframework.core.convert.converter.Converter;

import java.lang.annotation.Annotation;

public class StringToEnumConverter implements Converter<String,FoodGroup> {

    @Override
    public FoodGroup convert(String source){
        FoodGroup foodGroup = FoodGroup.valueOf(source);
        return FoodGroup.valueOf(source);
    }

}
