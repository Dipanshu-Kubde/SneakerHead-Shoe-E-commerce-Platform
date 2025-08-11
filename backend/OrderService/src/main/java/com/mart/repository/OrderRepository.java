package com.mart.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mart.entity.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {}
