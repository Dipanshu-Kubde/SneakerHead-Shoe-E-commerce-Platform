package com.mart.service;

import com.mart.client.OrderClient;
import com.mart.dto.OrderRequestDTO;
import com.mart.dto.OrderResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderService {

    private final OrderClient orderClient;

    @Autowired
    public OrderService(OrderClient orderClient) {
        this.orderClient = orderClient;
    }

    public OrderResponseDTO placeOrder(OrderRequestDTO orderRequestDTO) {
        return orderClient.createOrder(orderRequestDTO);
    }
}
