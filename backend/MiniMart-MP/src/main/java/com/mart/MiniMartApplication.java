package com.mart;

import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;

import com.mart.entity.Product;
import com.mart.repository.ProductRepository;

@SpringBootApplication
@EnableFeignClients(basePackages = "com.mart.client") // 👈 Important!
public class MiniMartApplication {

	public static void main(String[] args) {
		SpringApplication.run(MiniMartApplication.class, args);
	}
	
	@Bean
	CommandLineRunner runner(ProductRepository repo) {
	    return args -> {
	        if (repo.count() == 0) {
	            repo.saveAll(List.of(
	                new Product(null, "Shoe 1", "Running Shoe", 1299.0, null, null, 0),
	                new Product(null, "Shoe 2", "Walking Shoe", 999.0, null, null, 0)
	            ));
	        }
	    };
	}


}
