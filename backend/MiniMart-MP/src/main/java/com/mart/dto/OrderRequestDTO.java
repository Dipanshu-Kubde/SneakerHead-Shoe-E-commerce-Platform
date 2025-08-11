package com.mart.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Data
public class OrderRequestDTO {
    @NotNull(message = "userId is required")
    private Long userId;

    @NotNull(message = "items cannot be null")
    @Valid // validate nested DTOs
    private List<OrderItemDTO> items;
}
