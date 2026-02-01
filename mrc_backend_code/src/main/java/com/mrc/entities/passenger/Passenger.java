package com.mrc.entities.passenger;

import com.mrc.entities.BaseEntity;
import com.mrc.entities.Booking;
import com.mrc.entities.users.Gender;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "passengers")
@AttributeOverride(name = "id", column = @Column(name = "passenger_id"))

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Passenger extends BaseEntity {

    @Column(name = "name", length = 50, nullable = false)
    private String name;

    @Column(name = "age", nullable = false)
    private Integer age;

    @Enumerated(EnumType.STRING)
    @Column(name = "gender", nullable = false)
    private Gender gender;

    @Column(name = "seat_no", length = 5)
    private String seatNo;

    @Column(name = "coach_no", length = 5)
    private String coachNo;

    @ManyToOne
    @JoinColumn(name = "booking_id", nullable = false)
    private Booking booking;
    
    @Column(name = "seat_label", length = 10)
    private String seatLabel;

    @Column(name = "phone", length = 15)
    private String phone;

    @Column(name = "email", length = 100)
    private String email;

    @Column(name = "berth_preference")
    private String berthPreference;
}
