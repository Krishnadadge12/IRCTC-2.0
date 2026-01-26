package com.mrc.entities;

import java.time.LocalDateTime;
import java.util.List;

import com.mrc.entities.train.Coach;
import com.mrc.entities.train.SeatAvailability;
import com.mrc.entities.train.SeatPrice;
import com.mrc.entities.train.TrainEntity;
import com.mrc.entities.users.PassengerEntity;
import com.mrc.entities.users.UserEntity;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

//JPA annotations
@Entity 
@Table(name="bookings")
@AttributeOverride(name="id", column=@Column(name="b_id"))

//Lombok annotations
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Booking extends BaseEntity {
	
	@ManyToOne
	@JoinColumn(name="user_id",nullable = false)
	private UserEntity user;
	
	@ManyToOne
	@JoinColumn(name="train_id", nullable = false)
	private TrainEntity train;
	
	@ManyToOne
	@JoinColumn(name="coach_id", nullable = false)
	private Coach coach;
	
	@OneToOne
	@JoinColumn(name="seat_id", nullable = false)
	private SeatAvailability seat;
	
	@Column(name="source", length=200)
	private String source;
	
	@Column(name="destination", length=200)
	private String destination;
	
	@Column(name="booked_on")
	private LocalDateTime bookedOn;
	
	@Column(name="departure")
	private LocalDateTime departure;
	
	@Column(name="arrival")
	private LocalDateTime arrival;
	
	@ManyToOne
	@JoinColumn(name="price_id")
	private SeatPrice totalFare;
	
	@Enumerated(EnumType.STRING)
	@Column(name="status", nullable = false)
	private BookingStatus bookingStatus;    //if success-generate the PNR
	
	@OneToMany(
		    mappedBy = "booking",
		    cascade = CascadeType.ALL,
		    orphanRemoval = true
		)
		private List<PassengerEntity> passengers;
}
