package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.Carte;

import com.mycompany.myapp.repository.CarteRepository;
import com.mycompany.myapp.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Carte.
 */
@RestController
@RequestMapping("/api")
public class CarteResource {

    private final Logger log = LoggerFactory.getLogger(CarteResource.class);

    private static final String ENTITY_NAME = "carte";

    private final CarteRepository carteRepository;

    public CarteResource(CarteRepository carteRepository) {
        this.carteRepository = carteRepository;
    }

    /**
     * POST  /cartes : Create a new carte.
     *
     * @param carte the carte to create
     * @return the ResponseEntity with status 201 (Created) and with body the new carte, or with status 400 (Bad Request) if the carte has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/cartes")
    @Timed
    public ResponseEntity<Carte> createCarte(@RequestBody Carte carte) throws URISyntaxException {
        log.debug("REST request to save Carte : {}", carte);
        if (carte.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new carte cannot already have an ID")).body(null);
        }
        Carte result = carteRepository.save(carte);
        return ResponseEntity.created(new URI("/api/cartes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /cartes : Updates an existing carte.
     *
     * @param carte the carte to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated carte,
     * or with status 400 (Bad Request) if the carte is not valid,
     * or with status 500 (Internal Server Error) if the carte couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/cartes")
    @Timed
    public ResponseEntity<Carte> updateCarte(@RequestBody Carte carte) throws URISyntaxException {
        log.debug("REST request to update Carte : {}", carte);
        if (carte.getId() == null) {
            return createCarte(carte);
        }
        Carte result = carteRepository.save(carte);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, carte.getId().toString()))
            .body(result);
    }

    /**
     * GET  /cartes : get all the cartes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of cartes in body
     */
    @GetMapping("/cartes")
    @Timed
    public List<Carte> getAllCartes() {
        log.debug("REST request to get all Cartes");
        return carteRepository.findAll();
    }

    /**
     * GET  /cartes/:id : get the "id" carte.
     *
     * @param id the id of the carte to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the carte, or with status 404 (Not Found)
     */
    @GetMapping("/cartes/{id}")
    @Timed
    public ResponseEntity<Carte> getCarte(@PathVariable Long id) {
        log.debug("REST request to get Carte : {}", id);
        Carte carte = carteRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(carte));
    }

    /**
     * DELETE  /cartes/:id : delete the "id" carte.
     *
     * @param id the id of the carte to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/cartes/{id}")
    @Timed
    public ResponseEntity<Void> deleteCarte(@PathVariable Long id) {
        log.debug("REST request to delete Carte : {}", id);
        carteRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
