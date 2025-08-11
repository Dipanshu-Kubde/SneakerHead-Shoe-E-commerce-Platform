package com.mart.controller;

import com.razorpay.Order;
import com.mart.service.PaymentService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {
    private final PaymentService paymentService;
    @Value("${razorpay.keyId}") private String keyId;
    @Value("${razorpay.keySecret}") private String keySecret;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping("/create-order")
    public ResponseEntity<Map<String, Object>> createOrder(@RequestParam double amount) throws Exception {
        Order order = paymentService.createOrder(amount);
        return ResponseEntity.ok(Map.of(
            "key", keyId,
            "orderId", order.get("id"),
            "amount", order.get("amount"),
            "currency", order.get("currency")
        ));
    }

    @PostMapping("/verify")
    public ResponseEntity<String> verify(@RequestBody Map<String, String> payload) throws Exception {
        boolean valid = paymentService.verify(
            payload.get("order_id"),
            payload.get("payment_id"),
            payload.get("signature"),
            keySecret
        );
        return valid ? ResponseEntity.ok("Payment Verified") : ResponseEntity.status(400).body("Verification Failed");
    }
}
                    