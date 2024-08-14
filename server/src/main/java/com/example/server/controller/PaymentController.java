package com.example.server.controller;

import com.example.server.dto.PaymentDTO;
import com.example.server.model.Payment;
import com.example.server.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/payment")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;


    @GetMapping("/dates")
    public Map<String, List<Integer>> getReservedDatesWithProductIds() {
        return paymentService.getReservedDatesWithProductIds();
    }

    @GetMapping("/{productName}")
    public List<PaymentDTO> getReservationsByProductName(@PathVariable String productName) {
        return paymentService.getReservationsByProductName(productName);
    }

    @PostMapping("/complete")
    public ResponseEntity<String> completePayment(@RequestBody PaymentDTO paymentDTO) {
        try {
            paymentService.processPayment(paymentDTO);
            return ResponseEntity.ok("Payment processed successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error processing payment");
        }



    }
}
