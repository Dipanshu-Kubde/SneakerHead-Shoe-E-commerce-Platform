	//package com.mart.service;
//
//import org.springframework.stereotype.Service;
//
//import com.mart.client.OrderClient;
//import com.mart.dto.OrderRequestDTO;
//import com.mart.dto.OrderResponseDTO;
//
//@Service
//public class CheckoutService {
//
//    private final OrderClient orderClient;
//
//    public CheckoutService(OrderClient orderClient) {
//        this.orderClient = orderClient;
//    }
//
//    public OrderResponseDTO placeOrder(OrderRequestDTO request) {
//        return orderClient.createOrder(request);
//    }
//}
