package com.miciu.web;

import com.miciu.services.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/items")
public class ItemController {

    @Autowired
    ItemService itemService;

    @RequestMapping(method = RequestMethod.GET)
    @ResponseBody
    public List<String> findAll() {
        return itemService.findAll();
    }

}
