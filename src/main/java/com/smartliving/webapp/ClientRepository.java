package com.smartliving.webapp;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

interface ClientRepository extends JpaRepository<Client, Long>{
    List<Client> findByName(String name);
    List<Client> findByNameContaining(String name);
}
