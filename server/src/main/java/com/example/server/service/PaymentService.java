package com.example.server.service;

import com.example.server.dto.PaymentDTO;
import com.example.server.model.Payment;
import com.example.server.model.Product;
import com.example.server.model.User;
import com.example.server.persistence.PaymentRepository;
import com.example.server.persistence.ProductRepository;
import com.example.server.persistence.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private ProductRepository productRepository; // ProductRepository 주입

    @Autowired
    private UserRepository userRepository; // UserRepository 주입

    public Map<String, List<Integer>> getReservedDatesWithProductIds() {
        List<Payment> payments = paymentRepository.findAll();
        Map<String, List<Integer>> reservedDates = new HashMap<>();

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy. M. d. a h:mm:ss");

        for (Payment payment : payments) {
            try {
                String reservationDate = payment.getReservationDate();
                String[] dates = reservationDate.split("-");
                LocalDateTime startDateTime = LocalDateTime.parse(dates[0].trim(), formatter);
                LocalDateTime endDateTime = LocalDateTime.parse(dates[1].trim(), formatter);

                LocalDate current = startDateTime.toLocalDate();
                LocalDate end = endDateTime.toLocalDate();

                while (!current.isAfter(end)) {
                    String dateString = current.toString();
                    if (!reservedDates.containsKey(dateString)) {
                        reservedDates.put(dateString, new ArrayList<>());
                    }
                    reservedDates.get(dateString).add(payment.getProduct().getProductId()); // 수정된 부분
                    current = current.plusDays(1);
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        return reservedDates;
    }

    public List<PaymentDTO> getReservationsByProductName(String productName) {
        List<Payment> payments = paymentRepository.findByProductName(productName);
        return payments.stream().map(this::convertToDTO).collect(Collectors.toList());
    }


    @Transactional
    public void processPayment(PaymentDTO paymentDTO) {
        Payment payment = new Payment();

        // PaymentDTO의 데이터를 Payment 엔티티에 매핑
        Product product = productRepository.findById(paymentDTO.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));
        payment.setProduct(product);

        // UserRepository를 사용하여 User 객체를 로드하고 설정
        User user = userRepository.findById(paymentDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        payment.setUser(user);

        payment.setReservationNumber(paymentDTO.getReservationNumber());
        payment.setReservationDate(paymentDTO.getReservationDate());
        payment.setProductName(paymentDTO.getProductName());
        payment.setOrderName(paymentDTO.getOrderName());
        payment.setOrderPhone(paymentDTO.getOrderPhone());
        payment.setUserEmail(paymentDTO.getUserEmail());
        payment.setPaymentPrice(paymentDTO.getPaymentPrice());
        payment.setProductPrice(paymentDTO.getProductPrice());
        payment.setOptionName(paymentDTO.getOptionName());
        payment.setOptionCount(paymentDTO.getOptionCount());
        payment.setOptionPrice(paymentDTO.getOptionPrice());
        payment.setOrderDate(paymentDTO.getOrderDate());
        payment.setPersonNumber(paymentDTO.getPersonNumber());
        paymentRepository.save(payment);
    }

    private PaymentDTO convertToDTO(Payment payment) {
        PaymentDTO dto = new PaymentDTO();
        dto.setProductId(payment.getProduct().getProductId());
        dto.setUserId(payment.getUser().getUserId());
        dto.setReservationNumber(payment.getReservationNumber());
        dto.setReservationDate(payment.getReservationDate());
        dto.setProductName(payment.getProductName());
        dto.setOrderName(payment.getOrderName());
        dto.setOrderPhone(payment.getOrderPhone());
        dto.setUserEmail(payment.getUserEmail());
        dto.setPaymentPrice(payment.getPaymentPrice());
        dto.setProductPrice(payment.getProductPrice());
        dto.setOptionName(payment.getOptionName());
        dto.setOptionCount(payment.getOptionCount());
        dto.setOptionPrice(payment.getOptionPrice());
        dto.setOrderDate(payment.getOrderDate());
        dto.setPersonNumber(payment.getPersonNumber());
        return dto;
    }
}
