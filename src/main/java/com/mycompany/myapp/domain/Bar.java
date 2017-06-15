package com.mycompany.myapp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Bar.
 */
@Entity
@Table(name = "bar")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Bar implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "bar_name")
    private String barName;

    @Column(name = "bar_address")
    private String barAddress;

    @Column(name = "category_bar")
    private String categoryBar;

    @OneToOne
    @JoinColumn(unique = true)
    private Carte firstcarte;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBarName() {
        return barName;
    }

    public Bar barName(String barName) {
        this.barName = barName;
        return this;
    }

    public void setBarName(String barName) {
        this.barName = barName;
    }

    public String getBarAddress() {
        return barAddress;
    }

    public Bar barAddress(String barAddress) {
        this.barAddress = barAddress;
        return this;
    }

    public void setBarAddress(String barAddress) {
        this.barAddress = barAddress;
    }

    public String getCategoryBar() {
        return categoryBar;
    }

    public Bar categoryBar(String categoryBar) {
        this.categoryBar = categoryBar;
        return this;
    }

    public void setCategoryBar(String categoryBar) {
        this.categoryBar = categoryBar;
    }

    public Carte getFirstcarte() {
        return firstcarte;
    }

    public Bar firstcarte(Carte carte) {
        this.firstcarte = carte;
        return this;
    }

    public void setFirstcarte(Carte carte) {
        this.firstcarte = carte;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Bar bar = (Bar) o;
        if (bar.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), bar.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Bar{" +
            "id=" + getId() +
            ", barName='" + getBarName() + "'" +
            ", barAddress='" + getBarAddress() + "'" +
            ", categoryBar='" + getCategoryBar() + "'" +
            "}";
    }
}
