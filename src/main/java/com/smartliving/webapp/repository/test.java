package com.smartliving.webapp.repository;

import com.smartliving.webapp.client.Client;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

interface TestRepository extends JpaRepository<Client, Long>{
    List<Client> findByName(String name);
    List<Client> findByNameContaining(String name);
}

