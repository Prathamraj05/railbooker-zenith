
package com.railway.booking.service.impl;

import com.railway.booking.model.Train;
import com.railway.booking.repository.TrainRepository;
import com.railway.booking.service.TrainService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TrainServiceImpl implements TrainService {
    
    @Autowired
    private TrainRepository trainRepository;
    
    @Override
    public List<Train> getAllTrains() {
        return trainRepository.findAll();
    }
    
    @Override
    public Train getTrainById(Long id) {
        return trainRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Train not found with id: " + id));
    }
    
    @Override
    public List<Train> searchTrains(Long sourceId, Long destinationId, Integer passengers) {
        return trainRepository.findAvailableTrains(sourceId, destinationId, passengers);
    }
    
    @Override
    public Train saveTrain(Train train) {
        return trainRepository.save(train);
    }
    
    @Override
    public void deleteTrain(Long id) {
        trainRepository.deleteById(id);
    }
}
