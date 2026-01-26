package com.mrc.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.mrc.entities.train.SeatType;
import com.mrc.dtos.BookingRequestDto;
import com.mrc.entities.Booking;
import com.mrc.entities.BookingStatus;
import com.mrc.entities.train.SeatAvailability;
import com.mrc.entities.train.SeatPrice;
import com.mrc.entities.train.SeatStatus;
import com.mrc.entities.train.TrainEntity;
import com.mrc.entities.users.PassengerEntity;
import com.mrc.entities.users.UserEntity;
import com.mrc.repository.BookingRepository;
import com.mrc.repository.PassengerRepository;
import com.mrc.repository.SeatAvailabilityRepository;
import com.mrc.repository.SeatPriceRepository;
import com.mrc.repository.TrainRepository;
import com.mrc.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class BookingServiceImpl implements BookingService{
	private final UserRepository userRepository;
    private final TrainRepository trainRepository;
    private final SeatAvailabilityRepository seatAvailabilityRepository;
    private final SeatPriceRepository seatPriceRepository;
    private final BookingRepository bookingRepository;
    private final PassengerRepository passengerRepository;
    private final ModelMapper modelMapper;

    @Override
    public Booking bookTicket(BookingRequestDto request, Authentication auth) {
    	UserEntity user=userRepository.findByEmail(auth.getName())
    			.orElseThrow(() ->  new RuntimeException("User not found"));

    	 TrainEntity train = trainRepository.findById(request.getTrain())
                 .orElseThrow(() -> new RuntimeException("Train not found"));
    	 
    	 List<SeatAvailability> availableSeats =
                 seatAvailabilityRepository.findSeatForBooking(
                         train.getId(),
                         request.getCoachType(),
                         request.getQuota()
                 );
    	 if (availableSeats.isEmpty()) {
             throw new RuntimeException("No seats available");
         }
    	 
    	
    	 

    	 Booking booking = new Booking();
    	    booking.setSource(request.getSource());
    	    booking.setDestination(request.getDestination());
    	    booking.setUser(user);
    	    booking.setTrain(train);
         booking.setDeparture(
                 LocalDateTime.of(
                         request.getBookedOn(),
                         train.getDepartureTime()
                 )
         );
         
         booking.setArrival(
                 LocalDateTime.of(
                         request.getBookedOn(),
                         train.getArrivalTime()
                 )
         );
         booking.setBookedOn(LocalDateTime.now());
         booking.setBookingStatus(BookingStatus.CONFIRMED);
       
         booking = bookingRepository.save(booking);
         for (var passengerDto : request.getPassengers()) {

             SeatAvailability seat = availableSeats.stream()
                     .filter(s -> s.getType() == passengerDto.getBerthPreference())
                     .findFirst()
                     .orElse(availableSeats.get(0));

             seat.setBooked(SeatStatus.BOOKED);
             availableSeats.remove(seat);

             SeatPrice price = seatPriceRepository
                     .findSeatPrice(
                             train.getId(),
                             request.getCoachType(),
                             seat.getType()
                     )
                     .orElseThrow(() -> new RuntimeException("Seat price not configured"));

             booking.setTotalFare(price);

             PassengerEntity passenger =
                     modelMapper.map(passengerDto, PassengerEntity.class);
             passenger.setBooking(booking);

             passengerRepository.save(passenger);
         }
         return booking;
   }
  } 
