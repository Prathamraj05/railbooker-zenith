
package com.railway.booking.service;

import com.railway.booking.model.Train;
import java.util.Date;
import java.util.List;

public interface TrainService {
    
    List<Train> getAllTrains();
    
    Train getTrainById(Long id);
    
    List<Train> searchTrains(Long sourceId, Long destinationId, Integer passengers);
    
    Train saveTrain(Train train);
    
    void deleteTrain(Long id);
}
