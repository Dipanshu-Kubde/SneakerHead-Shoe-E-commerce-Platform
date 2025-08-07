package com.mart.controller;

import com.mart.entity.*;
import com.mart.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired private OrderRepository orderRepo;
    @Autowired private OrderItemRepository orderItemRepo;
    @Autowired private CartRepository cartRepo;
    @Autowired private CartItemRepository cartItemRepo;
    @Autowired private UserRepository userRepo;

    @PostMapping("/place/{userId}/{cartId}")
    public Order placeOrder(@PathVariable Long userId, @PathVariable Long cartId) {
        User user = userRepo.findById(userId).orElseThrow();
        Cart cart = cartRepo.findById(cartId).orElseThrow();

        List<CartItem> cartItems = cartItemRepo.findAll().stream()
                .filter(i -> i.getCart().getCartId().equals(cartId)).toList();

        List<OrderItem> orderItems = new ArrayList<>();
        double total = 0;

        for (CartItem ci : cartItems) {
            OrderItem oi = new OrderItem();
            oi.setProduct(ci.getProduct());
            oi.setQuantity(ci.getQuantity());
            oi.setPrice(ci.getProduct().getPrice() * ci.getQuantity());
            total += oi.getPrice();
            orderItems.add(oi);
        }

        Order order = new Order();
        order.setUser(user);
        order.setOrderDate(LocalDateTime.now());
        order.setStatus("PLACED");
        order.setTotal(total);

        order.setOrderItems(orderItems);
        Order savedOrder = orderRepo.save(order);

        for (OrderItem oi : orderItems) {
            oi.setOrder(savedOrder);
            orderItemRepo.save(oi);
        }

        // Clear the cart
        cartItemRepo.deleteAll(cartItems);

        return savedOrder;
    }

    @GetMapping("/user/{userId}")
    public List<Order> getUserOrders(@PathVariable Long userId) {
        return orderRepo.findAll().stream()
                .filter(order -> order.getUser().getId().equals(userId))
                .toList();
    }
}
