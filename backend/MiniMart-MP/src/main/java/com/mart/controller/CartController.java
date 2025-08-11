package com.mart.controller;

import com.mart.entity.*;
import com.mart.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;    
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired private CartRepository cartRepo;
    @Autowired private CartItemRepository cartItemRepo;
    @Autowired private UserRepository userRepo;
    @Autowired private ProductRepository productRepo;
    
    

    // ✅ Add to cart (no duplication, increase quantity)
    @PostMapping("/add")
    public CartItem addToCart(
            @RequestParam Long productId,
            @RequestParam int quantity,
            @AuthenticationPrincipal UserDetails userDetails) {

        User user = userRepo.findByEmail(userDetails.getUsername())
                            .orElseThrow(() -> new RuntimeException("User not found"));

        Cart cart = cartRepo.findByUser(user)
                .orElseGet(() -> {
                    Cart c = new Cart();
                    c.setUser(user);
                    return cartRepo.save(c);
                });


        Product product = productRepo.findById(productId)
                                     .orElseThrow(() -> new RuntimeException("Product not found"));

        Optional<CartItem> existing = cartItemRepo.findByCartAndProduct(cart, product);

        if (existing.isPresent()) {
            CartItem item = existing.get();
            item.setQuantity(item.getQuantity() + quantity);
            return cartItemRepo.save(item);
        } else {
            CartItem item = new CartItem();
            item.setCart(cart);
            item.setProduct(product);
            item.setQuantity(quantity);
            return cartItemRepo.save(item);
        }
    }

    // ✅ View current user's cart
    @GetMapping("/items/my")
    public List<CartItem> viewMyCartItems(@AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepo.findByEmail(userDetails.getUsername())
                            .orElseThrow(() -> new RuntimeException("User not found"));

        Optional<Cart> cartOpt = cartRepo.findByUser(user);
        if (cartOpt.isEmpty()) return List.of();

        Cart cart = cartOpt.get();

        return cartItemRepo.findAll().stream()
                .filter(item -> item.getCart().getCartId().equals(cart.getCartId()))
                .toList();
    }

    // ✅ Update quantity of cart item
    @PutMapping("/item/{itemId}")
    public CartItem updateCartItemQuantity(
            @PathVariable Long itemId,
            @RequestParam int quantity
    ) {
        CartItem item = cartItemRepo.findById(itemId)
                                    .orElseThrow(() -> new RuntimeException("Item not found"));

        if (quantity <= 0) {
            cartItemRepo.delete(item);
            return null; 	
        }

        item.setQuantity(quantity);
        return cartItemRepo.save(item);
    }

    // ✅ Remove item from cart
    @DeleteMapping("/remove/{itemId}")
    public ResponseEntity<?> removeItem(@PathVariable Long itemId) {
        if (!cartItemRepo.existsById(itemId)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Item not found");
        }

        cartItemRepo.deleteById(itemId);
        return ResponseEntity.ok().body("Removed");
    }
    
    @DeleteMapping("/clear")
    public ResponseEntity<?> clearCart(@AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepo.findByEmail(userDetails.getUsername())
                            .orElseThrow(() -> new RuntimeException("User not found"));

        Optional<Cart> cartOpt = cartRepo.findByUser(user);
        if (cartOpt.isEmpty()) return ResponseEntity.ok().build();

        Cart cart = cartOpt.get();
        List<CartItem> items = cartItemRepo.findAll().stream()
                .filter(item -> item.getCart().getCartId().equals(cart.getCartId()))
                .toList();

        cartItemRepo.deleteAll(items);
        return ResponseEntity.ok("Cart cleared");
    }

}
