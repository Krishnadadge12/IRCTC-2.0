package com.mrc.entities.train;

import java.math.BigDecimal;

import com.mrc.entities.BaseEntity;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
// jakarta.persistence.GeneratedValue;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

//JPA annotations 

@Entity

//uniqueContraints - ensures combination of {trainId, coachType, seatType} is unique
@Table(name="seat_fare", 
		uniqueConstraints = @UniqueConstraint(columnNames= {"train_id","coachType","seatType"}))
@AttributeOverride(name="id",column = @Column(name="price_id"))

//Lombok annotations
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class SeatPrice extends BaseEntity {

    @ManyToOne 
    @JoinColumn(name = "train_id", nullable = false)	 //creates a foreign key in this table
    private TrainEntity train;

    @Enumerated(EnumType.STRING)
    private Tier coachType;

    @Enumerated(EnumType.STRING)
    private SeatType seatType;

    private BigDecimal price;
}
