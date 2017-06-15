package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Carte;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Carte entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CarteRepository extends JpaRepository<Carte,Long> {
    
}
