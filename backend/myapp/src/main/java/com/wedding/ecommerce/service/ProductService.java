package com.wedding.ecommerce.service;

import com.wedding.ecommerce.model.Product;
import com.wedding.ecommerce.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepo;

    // Save uploads in a stable directory under the project folder
    private final String uploadDir = System.getProperty("user.dir") + File.separator + "uploads";

    public Product saveProduct(String name, String description, double price, String category, MultipartFile image) throws IOException {
        String imagePath = saveImageToFileSystem(image);
        Product product = new Product(null, name, description, price, category, imagePath);
        return productRepo.save(product);
    }

    public List<Product> getAllProducts() {
        return productRepo.findAll();
    }

    public List<Product> getProductsByCategory(String category) {
        return productRepo.findByCategory(category);
    }

    public Product updateProduct(Long id, String name, String description, double price, String category, MultipartFile image) throws IOException {
        Product product = productRepo.findById(id).orElseThrow(() -> new RuntimeException("Product not found"));
        product.setName(name);
        product.setDescription(description);
        product.setPrice(price);
        product.setCategory(category);

        if (image != null && !image.isEmpty()) {
            String imagePath = saveImageToFileSystem(image);
            product.setImagePath(imagePath);
        }

        return productRepo.save(product);
    }

    public void deleteProduct(Long id) {
        productRepo.deleteById(id);
    }

    private String saveImageToFileSystem(MultipartFile image) throws IOException {
        File dir = new File(uploadDir);
        if (!dir.exists()) {
            dir.mkdirs(); // create uploads folder if not exists
        }

        String fileName = UUID.randomUUID() + "_" + image.getOriginalFilename();
        File dest = new File(dir, fileName);
        image.transferTo(dest);

        return dest.getAbsolutePath(); // or return relative path if preferred
    }
}
