package com.markethub.catalog.service;

import com.markethub.catalog.domain.Product;
import com.markethub.catalog.dto.ProductDto;
import com.markethub.catalog.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
  private final ProductRepository repository;

  public ProductService(ProductRepository repository) {
    this.repository = repository;
  }

  public List<ProductDto> findAll() {
    return repository.findAll().stream().map(ProductService::toDto).toList();
  }

  private static ProductDto toDto(Product p) {
    return new ProductDto(p.getId(), p.getName(), p.getDescription(), p.getPrice().doubleValue());
  }
}
