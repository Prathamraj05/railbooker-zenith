
package com.railway.booking.repository;

import com.railway.booking.model.Booking;
import com.railway.booking.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    
    Optional<Booking> findByPnr(String pnr);
    
    List<Booking> findByUser(User user);
}
