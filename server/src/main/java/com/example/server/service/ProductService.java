package com.example.server.service;

import com.example.server.dto.ProductDTO;
import com.example.server.model.Product;
import com.example.server.persistence.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public List<ProductDTO> getAllProducts() {
        return productRepository.findAll().stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public ProductDTO getProductById(Integer id) {
        return productRepository.findById(id).map(this::convertToDTO).orElse(null);
    }

    public ProductDTO getProductByName(String productName) {
        // 데이터베이스 또는 저장소에서 제품 이름으로 제품을 가져오는 로직
        Product product = productRepository.findByName(productName);
        if (product != null) {
            return new ProductDTO(product); // Product를 ProductDTO로 변환
        } else {
            return null;
        }
    }

    public ProductDTO createProduct(ProductDTO productDTO) {
        Product product = convertToEntity(productDTO);
        Product savedProduct = productRepository.save(product);
        return convertToDTO(savedProduct);
    }

    private ProductDTO convertToDTO(Product product) {
        return new ProductDTO(
                product.getProductId(),
                product.getName(),
                product.getPrice(),
                product.getMainImageUrl(),
                product.getSubImageUrl(),
                product.getSubImageUrl2(),
                product.getSubImageUrl3(),
                product.getMaxPeople()
        );
    }

    private Product convertToEntity(ProductDTO productDTO) {
        return new Product(
                productDTO.getProductId(),
                productDTO.getName(),
                productDTO.getPrice(),
                productDTO.getMainImageUrl(),
                productDTO.getSubImageUrl(),
                productDTO.getSubImageUrl2(),
                productDTO.getSubImageUrl3(),
                productDTO.getMaxPeople()
        );
    }
}
