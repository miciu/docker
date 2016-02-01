package com.miciu.services;

import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class ItemService {

    private final List<String> items;

    public ItemService() {
        items = Arrays.asList("item1", "item2", "item3");
    }

    public List<String> findAll() {
        return items;
    }
}
