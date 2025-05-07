package com.wedding.ecommerce.controller;

import com.wedding.ecommerce.model.Product;
import com.wedding.ecommerce.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
@RestController
@RequestMapping("/admin/products")
@CrossOrigin
public class ProductController {

    @Autowired
    private ProductService productService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Product addProduct(
        @RequestParam String name,
        @RequestParam String description,
        @RequestParam double price,
        @RequestParam String category,
        @RequestParam MultipartFile image
    ) throws IOException {
        return productService.saveProduct(name, description, price, category, image);
    }


    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/{category}")
    public List<Product> getByCategory(@PathVariable String category) {
        return productService.getProductsByCategory(category);
    }

    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Product updateProduct(
        @PathVariable Long id,
        @RequestParam String name,
        @RequestParam String description,
        @RequestParam double price,
        @RequestParam String category,
        @RequestParam(required = false) MultipartFile image
    ) throws IOException {
        return productService.updateProduct(id, name, description, price, category, image);
    }


    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
    }
}
