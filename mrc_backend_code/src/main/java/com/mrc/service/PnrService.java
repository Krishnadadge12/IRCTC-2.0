package com.mrc.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mrc.custom_exceptions.ResourceNotFoundException;
import com.mrc.dtos.PassengerResponseDto;
import com.mrc.dtos.PnrStatusResponseDto;
import com.mrc.entities.Booking;
import com.mrc.repository.BookingRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PnrService {

    private final BookingRepository bookingRepository;

    public PnrStatusResponseDto getPnrStatus(String pnr) {

        Booking booking = bookingRepository.findByPnr(pnr)
                .orElseThrow(() ->
                        new ResourceNotFoundException("PNR not found"));

        PnrStatusResponseDto dto = new PnrStatusResponseDto();

        dto.setPnr(booking.getPnr());
        dto.setTrainNumber(Long.toString(booking.getTrain().getTrainNumber()));
        dto.setTrainName(booking.getTrain().getTrainName());
        dto.setSource(booking.getSource());
        dto.setDestination(booking.getDestination());
        dto.setJourneyDate(booking.getJourneyDate());
        dto.setReservationQuota(booking.getTotalFare().getQuota().name());
        dto.setCoachType(booking.getCoach().getCoachType().name());
        dto.setBookingStatus(booking.getBookingStatus());
        dto.setBookedOn(booking.getBookedOn());

        List<PassengerResponseDto> passengers =
                booking.getPassengers().stream().map(p -> {
                	PassengerResponseDto pd = new PassengerResponseDto();

                	pd.setFullName(p.getName());
                	pd.setAge(p.getAge());
                	pd.setGender(p.getGender().name());

                	pd.setBerthPreference(p.getBerthPreference());
                	pd.setPhone(p.getPhone());
                	pd.setEmail(p.getEmail());

                	pd.setSeatNo(p.getSeatNo());
                	pd.setCoachNo(p.getCoachNo());
                	pd.setSeatLabel(p.getSeatLabel());
                    return pd;
                }).toList();

        dto.setPassengers(passengers);

        return dto;
    }
}
