package com.mart.client;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

import com.mart.dto.OrderRequestDTO;
import com.mart.dto.OrderResponseDTO;

// Updated Feign client name matching OrderService artifactId
@FeignClient(name = "OrderService", url = "http://localhost:8081")  // OrderService runs on port 8081
public interface OrderClient {

    @PostMapping("/api/orders")
    OrderResponseDTO createOrder(@RequestBody OrderRequestDTO orderRequest);
    
    @GetMapping("/api/orders/my")
    List<OrderResponseDTO> getMyOrders(@RequestHeader("Authorization") String authorization);
}
