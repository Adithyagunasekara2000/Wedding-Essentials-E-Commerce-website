package com.wedding.ecommerce.model;

import jakarta.persistence.*;

@Entity
@Table(name = "products")
public class Product {
	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

	    private String name;
	    private String description;
	    private double price;
	    private String category;

	    @Column(name = "image_path")
	    private String imagePath;

		public Product(Long id, String name, String description, double price, String category, String imagePath) {
			super();
			this.id = id;
			this.name = name;
			this.description = description;
			this.price = price;
			this.category = category;
			this.imagePath = imagePath;
		}

		public Long getId() {
			return id;
		}

		public void setId(Long id) {
			this.id = id;
		}

		public String getName() {
			return name;
		}

		public void setName(String name) {
			this.name = name;
		}

		public String getDescription() {
			return description;
		}

		public void setDescription(String description) {
			this.description = description;
		}

		public double getPrice() {
			return price;
		}

		public void setPrice(double price) {
			this.price = price;
		}

		public String getCategory() {
			return category;
		}

		public void setCategory(String category) {
			this.category = category;
		}

		public String getImagePath() {
			return imagePath;
		}

		public void setImagePath(String imagePath) {
			this.imagePath = imagePath;
		} 
	    
}
