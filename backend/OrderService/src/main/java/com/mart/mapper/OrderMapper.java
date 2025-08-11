package com.mart.mapper;

import com.mart.dto.OrderItemDTO;
import com.mart.dto.OrderRequestDTO;
import com.mart.dto.OrderResponseDTO;
import com.mart.entity.Order;
import com.mart.entity.OrderItem;

import java.util.List;
import java.util.stream.Collectors;

public class OrderMapper {

    public static Order toOrderEntity(OrderRequestDTO dto) {
        Order order = new Order();
        order.setUserId(dto.getUserId());

        // Calculate total from items
        double total = 0;
        if (dto.getItems() != null) {
            total = dto.getItems().stream()
                    .mapToDouble(i -> i.getPrice() * i.getQuantity())
                    .sum();
        }
        order.setTotal(total);

        // Convert DTO items to entity items
        List<OrderItem> items = dto.getItems().stream()
                .map(itemDTO -> {
                    OrderItem item = new OrderItem();
                    item.setProductId(itemDTO.getProductId());
                    item.setQuantity(itemDTO.getQuantity());
                    item.setPrice(itemDTO.getPrice());
                    return item;
                })
                .collect(Collectors.toList());

        order.setItems(items);

        return order;
    }

    public static OrderResponseDTO toOrderResponseDTO(Order order) {
        OrderResponseDTO dto = new OrderResponseDTO();
        dto.setId(order.getId());
        dto.setUserId(order.getUserId());
        dto.setTotal(order.getTotal());
        dto.setStatus(order.getStatus().name());
        dto.setOrderDate(order.getOrderDate());

        List<OrderItemDTO> items = order.getItems().stream()
                .map(item -> {
                    OrderItemDTO itemDTO = new OrderItemDTO();
                    itemDTO.setProductId(item.getProductId());
                    itemDTO.setQuantity(item.getQuantity());
                    itemDTO.setPrice(item.getPrice());
                    return itemDTO;
                })
                .collect(Collectors.toList());

        dto.setItems(items);

        return dto;
    }
}
