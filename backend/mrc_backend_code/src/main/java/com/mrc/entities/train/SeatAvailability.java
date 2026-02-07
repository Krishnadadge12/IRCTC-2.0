package com.mrc.entities.train;

import java.time.LocalDate;

import com.mrc.entities.BaseEntity;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "seats")
@AttributeOverride(
    name = "id",
    column = @Column(name = "seat_no")
)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SeatAvailability extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "coach_id", nullable = false)
    private Coach coach;

    @Enumerated(EnumType.STRING)
    @Column(name = "seat_type", nullable = false)
    private SeatType type;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private SeatStatus booked;

    @Enumerated(EnumType.STRING)
    @Column(name = "quota", nullable = false)
    private TrainQuota quota;

  
    @Column(name = "journey_date", nullable = true)
    private LocalDate journeyDate;
}
