package com.example.server.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.time.OffsetDateTime;

@Getter
@Setter
@Entity
@Table(name = "pay")
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "payment_id")
    private Integer paymentId;

    @ManyToOne
    @JoinColumn(name = "product_id", referencedColumnName = "product_id")
    private Product product; // Product 엔티티와의 관계 설정

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    private User user; // User 엔티티와의 관계 설정

    @Column(name = "reservation_number")
    private String reservationNumber;

    @Column(name = "reservation_date")
    private String reservationDate;

    @Column(name = "product_name")
    private String productName;

    @Column(name = "order_name")
    private String orderName;

    @Column(name = "order_phone")
    private String orderPhone;

    @Column(name = "user_email")
    private String userEmail;

    @Column(name = "payment_price")
    private double paymentPrice;

    @Column(name = "product_price")
    private double productPrice;

    @Column(name = "option_name")
    private String optionName;

    @Column(name = "option_count")
    private int optionCount;

    @Column(name = "option_price")
    private double optionPrice;

    @Column(name = "order_date")
    private OffsetDateTime orderDate;

    @Column(name = "person_number")
    private int personNumber;
}
