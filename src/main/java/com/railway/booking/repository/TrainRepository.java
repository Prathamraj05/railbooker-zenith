
package com.railway.booking.repository;

import com.railway.booking.model.Train;
import com.railway.booking.model.Station;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface TrainRepository extends JpaRepository<Train, Long> {
    
    List<Train> findBySourceStationAndDestinationStation(Station source, Station destination);
    
    @Query("SELECT t FROM Train t JOIN t.trainClasses tc WHERE t.sourceStation.id = :sourceId AND t.destinationStation.id = :destId AND tc.availableSeats >= :passengers")
    List<Train> findAvailableTrains(Long sourceId, Long destId, Integer passengers);
}
