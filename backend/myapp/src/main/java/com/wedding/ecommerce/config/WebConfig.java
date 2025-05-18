package com.wedding.ecommerce.config;

import java.io.File;
import java.nio.file.Paths;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        String uploadDir = System.getProperty("user.dir") + File.separator + "uploads";
        
        // Make sure we're using file:/// protocol for local files
        registry.addResourceHandler("/uploads/**")
               .addResourceLocations("file:" + uploadDir + File.separator);
    }
}
