package com.mrc.service;

import java.util.List;

import com.mrc.dtos.BookingRequestDto;
import com.mrc.dtos.BookingResponseDto;
import com.mrc.entities.Booking;
import com.mrc.entities.users.UserEntity;

public interface BookingService {
    BookingResponseDto createBooking(UserEntity user, BookingRequestDto dto);
    BookingResponseDto cancelBooking(Long bookingId, UserEntity user);
    BookingResponseDto cancelByAdmin(Long bookingId);
    List<BookingResponseDto> getBookingsForUser(UserEntity user);
}
