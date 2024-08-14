package com.example.server.persistence;

import com.example.server.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PaymentRepository extends JpaRepository<Payment, Integer> {
    List<Payment> findByProductName(String productName); // 수정된 메서드 이름
}
