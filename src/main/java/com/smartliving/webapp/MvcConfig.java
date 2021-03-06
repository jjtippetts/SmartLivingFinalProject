package com.smartliving.webapp;

import com.smartliving.webapp.utils.StringToEnumConverter;

import org.springframework.context.annotation.Configuration;
import org.springframework.format.FormatterRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class MvcConfig implements WebMvcConfigurer {

    @Override
    public void addViewControllers(ViewControllerRegistry registry){
        registry.addViewController("/exercise/**").setViewName("forward:/index.html");
        registry.addViewController("/home").setViewName("landing");
        registry.addViewController("/").setViewName("landing");
        registry.addViewController("/login").setViewName("login");
        registry.addViewController("/settings").setViewName("settings");
    }

    @Override
    public void addFormatters(FormatterRegistry registry){
        registry.addConverter(new StringToEnumConverter());
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/exercise/**").addResourceLocations("classpath:/public/");
    }
}
