package com.example.server.service;

import com.example.server.model.Option;
import com.example.server.persistence.OptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OptionService {

    @Autowired
    private OptionRepository optionRepository;

    public List<Option> getAllOptions() {
        return optionRepository.findAll();
    }

    public Optional<Option> getOptionById(Integer id) {
        return optionRepository.findById(id);
    }
}
