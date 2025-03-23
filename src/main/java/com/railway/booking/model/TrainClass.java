
package com.railway.booking.model;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "train_classes")
public class TrainClass {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "train_id", nullable = false)
    private Train train;
    
    @Column(nullable = false)
    private String className; // e.g., SLEEPER, AC_1, AC_2, AC_3
    
    @Column(nullable = false)
    private Integer availableSeats;
    
    @Column(nullable = false)
    private BigDecimal fare;
    
    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Train getTrain() {
        return train;
    }

    public void setTrain(Train train) {
        this.train = train;
    }

    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className;
    }

    public Integer getAvailableSeats() {
        return availableSeats;
    }

    public void setAvailableSeats(Integer availableSeats) {
        this.availableSeats = availableSeats;
    }

    public BigDecimal getFare() {
        return fare;
    }

    public void setFare(BigDecimal fare) {
        this.fare = fare;
    }
}
