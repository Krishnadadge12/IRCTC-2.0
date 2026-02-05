package com.mrc.mapper;

import java.util.List;

import com.mrc.dtos.AdminBookingResponseDto;
import com.mrc.entities.Booking;

public interface AdminBookingMapper {

    AdminBookingResponseDto toDto(Booking booking);

    List<AdminBookingResponseDto> toDtoList(List<Booking> bookings);
}
