package com.mart.dto;

import org.checkerframework.common.aliasing.qual.Unique;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class ProductRequest {

    @NotBlank(message = "Product name is required")
    @Unique
    @Size(min = 2, max = 100, message = "Product name must be between 2 and 100 characters")
    private String name;

    @NotBlank(message = "Description is required")
    @Size(min = 5, message = "Description must be at least 5 characters long")
    private String description;

    @Positive(message = "Price must be greater than 0")
    private double price;

    @NotBlank(message = "Brand is required")
    private String brand;

    private String imageUrl; 

    @PositiveOrZero(message = "Stock must be 0 or more")
    private int stock;
}
