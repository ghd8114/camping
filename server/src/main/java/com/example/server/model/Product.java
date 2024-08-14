package com.example.server.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {

    @Id
    @Column(name = "product_id")
    private Integer productId;

    @Column(name = "product_name")
    private String name;

    @Column(name = "product_price")
    private double price;

    @Column(name = "main_image")
    private String mainImageUrl;

    @Column(name = "sub_image")
    private String subImageUrl;

    @Column(name = "sub_image2")
    private String subImageUrl2;

    @Column(name = "sub_image3")
    private String subImageUrl3;

    @Column(name = "max_people")
    private int maxPeople;


}
