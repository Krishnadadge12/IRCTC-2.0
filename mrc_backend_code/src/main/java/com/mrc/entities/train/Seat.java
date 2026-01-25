package com.mrc.entities.train;

import com.mrc.entities.BaseEntity;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
@Table(name="seats",
		uniqueConstraints = @UniqueConstraint(columnNames = {"coach_id", "seat_no"}))
@AttributeOverride(name="id",column=@Column(name="seat_no"))

//Lombok
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Seat extends BaseEntity {

	@ManyToOne
	@JoinColumn(name="coach_id", nullable=false)
	private Coach coach;
	
	@Enumerated(EnumType.STRING)
	private SeatType type;
	
	@Column(name="status")  //booked / vacant
	private SeatStatus booked;
	
	@Enumerated(EnumType.STRING)
	private TrainQuota quota;
	
}
