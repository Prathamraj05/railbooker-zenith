
package com.railway.booking.service;

import com.railway.booking.model.Booking;
import java.util.Date;
import java.util.List;

public interface BookingService {
    
    Booking createBooking(Long userId, Long trainId, Long trainClassId, Date journeyDate, List<Passenger> passengers);
    
    Booking getBookingById(Long id);
    
    Booking getBookingByPnr(String pnr);
    
    List<Booking> getBookingsByUser(Long userId);
    
    Booking updateBookingStatus(Long id, String status);
    
    void cancelBooking(Long id);
}
