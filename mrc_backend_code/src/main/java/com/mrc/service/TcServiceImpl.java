package com.mrc.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mrc.custom_exceptions.ResourceNotFoundException;
import com.mrc.dtos.TcPassengerResponseDto;
import com.mrc.entities.passenger.Passenger;
import com.mrc.repository.PassengerRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TcServiceImpl implements TcService {

    private final PassengerRepository passengerRepository;

    @Override
    public List<TcPassengerResponseDto> getPassengersByTrain(Long trainId) {

        List<Passenger> passengers =
                passengerRepository.findByBooking_Train_Id(trainId);

        if (passengers.isEmpty()) {
            throw new ResourceNotFoundException(
                    "No passengers found for train id " + trainId
            );
        }

        return passengers.stream()
                .map(p -> new TcPassengerResponseDto(
                        p.getId(),
                        p.getName(),
                        p.getAge(),
                        p.getGender().name(),
                        p.getCoachNo(),
                        p.getSeatNo(),
                        p.getSeatLabel(),
                        p.getBooking().getPnr(),
                        p.getBooking().getId(), 
                        p.getBooking().getBookingStatus().name()
                ))
                .toList();
    }
}

