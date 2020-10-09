package com.smartliving.webapp.client;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ClientRepository extends JpaRepository<Client, Long>{
    List<Client> findByName(String name);
    List<Client> findByNameContaining(String name);
}
