package com.mart.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class OrderResponseDTO {
    private Long id;
    private Long userId;
    private Double total;
    private String status;  // Changed from enum to String for API friendliness
    private LocalDateTime orderDate;
    private List<OrderItemDTO> items;
    
    public static class Item {
        private String productId;
        private String name;
        private int quantity;
        private int price;
    }
}
