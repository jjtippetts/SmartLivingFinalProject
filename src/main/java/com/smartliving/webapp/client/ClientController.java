package com.smartliving.webapp.client;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ClientController {

    private final ClientRepository clientRepository;

    ClientController(ClientRepository clientRepository){
        this.clientRepository = clientRepository;
    }

    @PostMapping(path = "/client", consumes = MediaType.ALL_VALUE)
    Client newClient(@RequestBody Client newClient){
        return clientRepository.save(newClient);
    }
}
