package com.mart.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.mart.dto.ProductRequest;
import com.mart.entity.Product;
import com.mart.repository.ProductRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/products")
public class ProductController {
	@Autowired
	private ProductRepository repo;
	
	 @Value("${upload.path:uploads}")
	    private String uploadDir;
	
	@GetMapping
	public List<Product> getAll(){
		return repo.findAll();
	}
	

	@PostMapping
	public Product addProduct(@Valid @RequestBody ProductRequest request) {
	    Product product = new Product();
	    product.setName(request.getName());
	    product.setDescription(request.getDescription());
	    product.setPrice(request.getPrice());
	    product.setBrand(request.getBrand());
	    product.setImageUrl(request.getImageUrl());
	    product.setStock(request.getStock());
	    return repo.save(product);
	}
	
	
	
	@GetMapping("/{id}")
	public ResponseEntity<?> getProductById(@PathVariable Long id) {
	    Optional<Product> productOpt = repo.findById(id);
	    if (productOpt.isPresent()) {
	        return ResponseEntity.ok(productOpt.get());
	    } else {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found");
	    }
	}


	@PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody ProductRequest updated) {
        return repo.findById(id)
                .map(product -> {
                    product.setName(updated.getName());
                    product.setDescription(updated.getDescription());
                    product.setPrice(updated.getPrice());
                    product.setBrand(updated.getBrand());
                    product.setImageUrl(updated.getImageUrl());
                    product.setStock(updated.getStock());
                    return ResponseEntity.ok(repo.save(product));
                })
                .orElse(ResponseEntity.notFound().build());
    }

	
	@DeleteMapping("/{id}")
//	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
	    if (repo.existsById(id)) {
	        repo.deleteById(id);
	        return ResponseEntity.noContent().build();
	    } else {
	        return ResponseEntity.notFound().build();
	    } 
	}

}
