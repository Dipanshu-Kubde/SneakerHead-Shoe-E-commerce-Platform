package com.mart.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mart.client.OrderClient;
import com.mart.dto.OrderResponseDTO;

@RestController
@RequestMapping("/api/orders")
public class OrderProxyController {

    private final OrderClient orderClient;

    public OrderProxyController(OrderClient orderClient) {
        this.orderClient = orderClient;
    }

    @GetMapping("/my")
    public ResponseEntity<List<OrderResponseDTO>> getMyOrders(@RequestHeader("Authorization") String authorization) {
        List<OrderResponseDTO> orders = orderClient.getMyOrders(authorization);
        return ResponseEntity.ok(orders);
    }
}

