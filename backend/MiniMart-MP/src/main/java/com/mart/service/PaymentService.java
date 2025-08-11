package com.mart.service;

import com.mart.util.SignatureUtil;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

@Service
public class PaymentService {
    private final RazorpayClient razorpayClient;

    public PaymentService(RazorpayClient razorpayClient) {
        this.razorpayClient = razorpayClient;
    }

    public Order createOrder(double amount) throws Exception {
        JSONObject req = new JSONObject();
        req.put("amount", (int)(amount * 100));
        req.put("currency", "INR");
        req.put("payment_capture", 1);
        return razorpayClient.orders.create(req);
    }

    public boolean verify(String orderId, String paymentId, String signature, String secret) throws Exception {
        String payload = orderId + "|" + paymentId;
        String actual = SignatureUtil.calculateHMAC(payload, secret);
        return actual.equals(signature);
    }
}
