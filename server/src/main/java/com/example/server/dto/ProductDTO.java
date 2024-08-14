package com.example.server.dto;

import com.example.server.model.Product;

public class ProductDTO {
    private Integer productId;
    private String name;
    private Double price;
    private String mainImageUrl;
    private String subImageUrl;
    private String subImageUrl2;
    private String subImageUrl3;
    private Integer maxPeople;

    // 기본 생성자
    public ProductDTO() {}

    // 모든 필드를 받는 생성자
    public ProductDTO(Integer productId, String name, Double price, String mainImageUrl, String subImageUrl, String subImageUrl2, String subImageUrl3, Integer maxPeople) {
        this.productId = productId;
        this.name = name;
        this.price = price;
        this.mainImageUrl = mainImageUrl;
        this.subImageUrl = subImageUrl;
        this.subImageUrl2 = subImageUrl2;
        this.subImageUrl3 = subImageUrl3;
        this.maxPeople = maxPeople;
    }

    // Product 객체를 받는 생성자
    public ProductDTO(Product product) {
        this.productId = product.getProductId();
        this.name = product.getName();
        this.price = product.getPrice();
        this.mainImageUrl = product.getMainImageUrl();
        this.subImageUrl = product.getSubImageUrl();
        this.subImageUrl2 = product.getSubImageUrl2();
        this.subImageUrl3 = product.getSubImageUrl3();
        this.maxPeople = product.getMaxPeople();
    }

    // getters and setters
    public Integer getProductId() {
        return productId;
    }

    public void setProductId(Integer productId) {
        this.productId = productId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getMainImageUrl() {
        return mainImageUrl;
    }

    public void setMainImageUrl(String mainImageUrl) {
        this.mainImageUrl = mainImageUrl;
    }

    public String getSubImageUrl() {
        return subImageUrl;
    }

    public void setSubImageUrl(String subImageUrl) {
        this.subImageUrl = subImageUrl;
    }

    public String getSubImageUrl2() {
        return subImageUrl2;
    }

    public void setSubImageUrl2(String subImageUrl2) {
        this.subImageUrl2 = subImageUrl2;
    }

    public String getSubImageUrl3() {
        return subImageUrl3;
    }

    public void setSubImageUrl3(String subImageUrl3) {
        this.subImageUrl3 = subImageUrl3;
    }

    public Integer getMaxPeople() {
        return maxPeople;
    }

    public void setMaxPeople(Integer maxPeople) {
        this.maxPeople = maxPeople;
    }
}
