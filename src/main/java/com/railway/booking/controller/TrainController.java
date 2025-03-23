
package com.railway.booking.controller;

import com.railway.booking.model.Train;
import com.railway.booking.service.TrainService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trains")
public class TrainController {
    
    @Autowired
    private TrainService trainService;
    
    @GetMapping
    public ResponseEntity<List<Train>> getAllTrains() {
        return ResponseEntity.ok(trainService.getAllTrains());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Train> getTrainById(@PathVariable Long id) {
        return ResponseEntity.ok(trainService.getTrainById(id));
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<Train>> searchTrains(
            @RequestParam Long sourceId,
            @RequestParam Long destinationId,
            @RequestParam(defaultValue = "1") Integer passengers) {
        return ResponseEntity.ok(trainService.searchTrains(sourceId, destinationId, passengers));
    }
    
    @PostMapping
    public ResponseEntity<Train> createTrain(@RequestBody Train train) {
        return ResponseEntity.ok(trainService.saveTrain(train));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Train> updateTrain(@PathVariable Long id, @RequestBody Train train) {
        train.setId(id);
        return ResponseEntity.ok(trainService.saveTrain(train));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTrain(@PathVariable Long id) {
        trainService.deleteTrain(id);
        return ResponseEntity.noContent().build();
    }
}
