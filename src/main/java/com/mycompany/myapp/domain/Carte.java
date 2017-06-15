package com.mycompany.myapp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Carte.
 */
@Entity
@Table(name = "carte")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Carte implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "drink_1")
    private String drink1;

    @Column(name = "drink_2")
    private String drink2;

    @Column(name = "drink_3")
    private String drink3;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDrink1() {
        return drink1;
    }

    public Carte drink1(String drink1) {
        this.drink1 = drink1;
        return this;
    }

    public void setDrink1(String drink1) {
        this.drink1 = drink1;
    }

    public String getDrink2() {
        return drink2;
    }

    public Carte drink2(String drink2) {
        this.drink2 = drink2;
        return this;
    }

    public void setDrink2(String drink2) {
        this.drink2 = drink2;
    }

    public String getDrink3() {
        return drink3;
    }

    public Carte drink3(String drink3) {
        this.drink3 = drink3;
        return this;
    }

    public void setDrink3(String drink3) {
        this.drink3 = drink3;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Carte carte = (Carte) o;
        if (carte.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), carte.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Carte{" +
            "id=" + getId() +
            ", drink1='" + getDrink1() + "'" +
            ", drink2='" + getDrink2() + "'" +
            ", drink3='" + getDrink3() + "'" +
            "}";
    }
}
