
package com.railway.booking.service.impl;

import com.railway.booking.model.*;
import com.railway.booking.repository.*;
import com.railway.booking.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
public class BookingServiceImpl implements BookingService {
    
    @Autowired
    private BookingRepository bookingRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private TrainRepository trainRepository;
    
    @Autowired
    private TrainClassRepository trainClassRepository;
    
    @Override
    @Transactional
    public Booking createBooking(Long userId, Long trainId, Long trainClassId, Date journeyDate, List<Passenger> passengers) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        Train train = trainRepository.findById(trainId)
                .orElseThrow(() -> new RuntimeException("Train not found"));
        
        TrainClass trainClass = trainClassRepository.findById(trainClassId)
                .orElseThrow(() -> new RuntimeException("Train class not found"));
        
        // Check seat availability
        if (trainClass.getAvailableSeats() < passengers.size()) {
            throw new RuntimeException("Not enough seats available");
        }
        
        // Generate PNR
        String pnr = "PNR" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        
        // Calculate total fare
        BigDecimal totalFare = trainClass.getFare().multiply(new BigDecimal(passengers.size()));
        
        // Create booking
        Booking booking = new Booking();
        booking.setPnr(pnr);
        booking.setUser(user);
        booking.setTrain(train);
        booking.setTrainClass(trainClass);
        booking.setJourneyDate(journeyDate);
        booking.setTotalFare(totalFare);
        booking.setStatus("CONFIRMED");
        
        // Save booking first
        Booking savedBooking = bookingRepository.save(booking);
        
        // Add passengers to booking
        for (Passenger passenger : passengers) {
            passenger.setBooking(savedBooking);
            // In a real system, we would assign seat numbers here
        }
        
        // Update available seats
        trainClass.setAvailableSeats(trainClass.getAvailableSeats() - passengers.size());
        trainClassRepository.save(trainClass);
        
        return savedBooking;
    }
    
    @Override
    public Booking getBookingById(Long id) {
        return bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
    }
    
    @Override
    public Booking getBookingByPnr(String pnr) {
        return bookingRepository.findByPnr(pnr)
                .orElseThrow(() -> new RuntimeException("Booking not found with PNR: " + pnr));
    }
    
    @Override
    public List<Booking> getBookingsByUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return bookingRepository.findByUser(user);
    }
    
    @Override
    @Transactional
    public Booking updateBookingStatus(Long id, String status) {
        Booking booking = getBookingById(id);
        booking.setStatus(status);
        return bookingRepository.save(booking);
    }
    
    @Override
    @Transactional
    public void cancelBooking(Long id) {
        Booking booking = getBookingById(id);
        
        // Return seats to available pool
        TrainClass trainClass = booking.getTrainClass();
        trainClass.setAvailableSeats(trainClass.getAvailableSeats() + booking.getPassengers().size());
        trainClassRepository.save(trainClass);
        
        // Update booking status
        booking.setStatus("CANCELLED");
        bookingRepository.save(booking);
    }
}
