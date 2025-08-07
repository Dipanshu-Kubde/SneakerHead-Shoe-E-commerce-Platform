package com.mart.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Version;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	 private Long id;

    private String name;
    private String description;
    private double price;
    private String brand;
    private String imageUrl;
    private int stock;	
//	@Version
//    private Long version;
//	

	public Product(String name, String description, double price, String brand, String imageUrl, int stock) {
	
		this.name = name;
		this.description = description;
		this.price = price;
		this.brand = brand;
		this.imageUrl = imageUrl;
		this.stock = stock;
	}
}
