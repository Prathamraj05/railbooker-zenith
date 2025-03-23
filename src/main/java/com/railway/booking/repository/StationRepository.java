
package com.railway.booking.repository;

import com.railway.booking.model.Station;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StationRepository extends JpaRepository<Station, Long> {
    
    Optional<Station> findByCode(String code);
    
    List<Station> findByNameContainingIgnoreCase(String name);
}
