package com.mart.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.mart.entity.Cart;
import com.mart.entity.User;

public interface CartRepository extends JpaRepository<Cart, Long> {
	Optional<Cart> findByUser(User user);

}
