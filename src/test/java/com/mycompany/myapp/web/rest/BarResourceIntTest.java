package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.App1App;

import com.mycompany.myapp.domain.Bar;
import com.mycompany.myapp.repository.BarRepository;
import com.mycompany.myapp.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the BarResource REST controller.
 *
 * @see BarResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = App1App.class)
public class BarResourceIntTest {

    private static final String DEFAULT_BAR_NAME = "AAAAAAAAAA";
    private static final String UPDATED_BAR_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_BAR_ADDRESS = "AAAAAAAAAA";
    private static final String UPDATED_BAR_ADDRESS = "BBBBBBBBBB";

    private static final String DEFAULT_CATEGORY_BAR = "AAAAAAAAAA";
    private static final String UPDATED_CATEGORY_BAR = "BBBBBBBBBB";

    @Autowired
    private BarRepository barRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restBarMockMvc;

    private Bar bar;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        BarResource barResource = new BarResource(barRepository);
        this.restBarMockMvc = MockMvcBuilders.standaloneSetup(barResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Bar createEntity(EntityManager em) {
        Bar bar = new Bar()
            .barName(DEFAULT_BAR_NAME)
            .barAddress(DEFAULT_BAR_ADDRESS)
            .categoryBar(DEFAULT_CATEGORY_BAR);
        return bar;
    }

    @Before
    public void initTest() {
        bar = createEntity(em);
    }

    @Test
    @Transactional
    public void createBar() throws Exception {
        int databaseSizeBeforeCreate = barRepository.findAll().size();

        // Create the Bar
        restBarMockMvc.perform(post("/api/bars")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bar)))
            .andExpect(status().isCreated());

        // Validate the Bar in the database
        List<Bar> barList = barRepository.findAll();
        assertThat(barList).hasSize(databaseSizeBeforeCreate + 1);
        Bar testBar = barList.get(barList.size() - 1);
        assertThat(testBar.getBarName()).isEqualTo(DEFAULT_BAR_NAME);
        assertThat(testBar.getBarAddress()).isEqualTo(DEFAULT_BAR_ADDRESS);
        assertThat(testBar.getCategoryBar()).isEqualTo(DEFAULT_CATEGORY_BAR);
    }

    @Test
    @Transactional
    public void createBarWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = barRepository.findAll().size();

        // Create the Bar with an existing ID
        bar.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBarMockMvc.perform(post("/api/bars")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bar)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<Bar> barList = barRepository.findAll();
        assertThat(barList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllBars() throws Exception {
        // Initialize the database
        barRepository.saveAndFlush(bar);

        // Get all the barList
        restBarMockMvc.perform(get("/api/bars?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(bar.getId().intValue())))
            .andExpect(jsonPath("$.[*].barName").value(hasItem(DEFAULT_BAR_NAME.toString())))
            .andExpect(jsonPath("$.[*].barAddress").value(hasItem(DEFAULT_BAR_ADDRESS.toString())))
            .andExpect(jsonPath("$.[*].categoryBar").value(hasItem(DEFAULT_CATEGORY_BAR.toString())));
    }

    @Test
    @Transactional
    public void getBar() throws Exception {
        // Initialize the database
        barRepository.saveAndFlush(bar);

        // Get the bar
        restBarMockMvc.perform(get("/api/bars/{id}", bar.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(bar.getId().intValue()))
            .andExpect(jsonPath("$.barName").value(DEFAULT_BAR_NAME.toString()))
            .andExpect(jsonPath("$.barAddress").value(DEFAULT_BAR_ADDRESS.toString()))
            .andExpect(jsonPath("$.categoryBar").value(DEFAULT_CATEGORY_BAR.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingBar() throws Exception {
        // Get the bar
        restBarMockMvc.perform(get("/api/bars/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBar() throws Exception {
        // Initialize the database
        barRepository.saveAndFlush(bar);
        int databaseSizeBeforeUpdate = barRepository.findAll().size();

        // Update the bar
        Bar updatedBar = barRepository.findOne(bar.getId());
        updatedBar
            .barName(UPDATED_BAR_NAME)
            .barAddress(UPDATED_BAR_ADDRESS)
            .categoryBar(UPDATED_CATEGORY_BAR);

        restBarMockMvc.perform(put("/api/bars")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedBar)))
            .andExpect(status().isOk());

        // Validate the Bar in the database
        List<Bar> barList = barRepository.findAll();
        assertThat(barList).hasSize(databaseSizeBeforeUpdate);
        Bar testBar = barList.get(barList.size() - 1);
        assertThat(testBar.getBarName()).isEqualTo(UPDATED_BAR_NAME);
        assertThat(testBar.getBarAddress()).isEqualTo(UPDATED_BAR_ADDRESS);
        assertThat(testBar.getCategoryBar()).isEqualTo(UPDATED_CATEGORY_BAR);
    }

    @Test
    @Transactional
    public void updateNonExistingBar() throws Exception {
        int databaseSizeBeforeUpdate = barRepository.findAll().size();

        // Create the Bar

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restBarMockMvc.perform(put("/api/bars")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bar)))
            .andExpect(status().isCreated());

        // Validate the Bar in the database
        List<Bar> barList = barRepository.findAll();
        assertThat(barList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteBar() throws Exception {
        // Initialize the database
        barRepository.saveAndFlush(bar);
        int databaseSizeBeforeDelete = barRepository.findAll().size();

        // Get the bar
        restBarMockMvc.perform(delete("/api/bars/{id}", bar.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Bar> barList = barRepository.findAll();
        assertThat(barList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Bar.class);
        Bar bar1 = new Bar();
        bar1.setId(1L);
        Bar bar2 = new Bar();
        bar2.setId(bar1.getId());
        assertThat(bar1).isEqualTo(bar2);
        bar2.setId(2L);
        assertThat(bar1).isNotEqualTo(bar2);
        bar1.setId(null);
        assertThat(bar1).isNotEqualTo(bar2);
    }
}
