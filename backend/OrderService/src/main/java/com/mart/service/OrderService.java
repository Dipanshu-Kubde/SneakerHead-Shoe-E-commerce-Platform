package com.mart.service;

import com.mart.dto.OrderRequestDTO;
import com.mart.dto.OrderResponseDTO;
import com.mart.entity.Order;
import com.mart.entity.OrderStatus;
import com.mart.mapper.OrderMapper;
import com.mart.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class OrderService {

    private final OrderRepository orderRepository;

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public OrderResponseDTO createOrder(OrderRequestDTO orderRequestDTO) {
        Order order = OrderMapper.toOrderEntity(orderRequestDTO);
        order.setOrderDate(LocalDateTime.now());
        order.setStatus(OrderStatus.PENDING_PAYMENT);
        Order savedOrder = orderRepository.save(order);
        return OrderMapper.toOrderResponseDTO(savedOrder);
    }

    public Optional<OrderResponseDTO> getOrderById(Long id) {
        return orderRepository.findById(id)
                .map(OrderMapper::toOrderResponseDTO);
    }

    public OrderResponseDTO updateOrderStatus(Long id, OrderStatus status) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        order.setStatus(status);
        Order updated = orderRepository.save(order);
        return OrderMapper.toOrderResponseDTO(updated);
    }
    
    
}
