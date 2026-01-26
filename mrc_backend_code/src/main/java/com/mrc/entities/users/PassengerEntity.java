package com.mrc.entities.users;

import java.time.LocalDate;



import com.mrc.entities.BaseEntity;
import com.mrc.entities.Booking;
import com.mrc.entities.train.SeatType;
import com.mrc.entities.users.Gender;
import com.mrc.entities.users.UserRole;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@Entity					//mandatory cls level annotation
@Table(name="passenger")    //to declare table name
/*
 * To override the inherited column names in the sub class entities -
 * id - name of the inherited prop
 * column - used to sepcify the col name
 */
@AttributeOverride(name="id",column = @Column(name="passenger_id"))

//Lombok annotations
@NoArgsConstructor
@Getter
@Setter
@ToString(exclude = "booking")
public class PassengerEntity extends BaseEntity{
	@Column(name = "full_name", length = 50, nullable = false)
    private String name;

    @Column(nullable = false)
    private Integer age;

    @Enumerated(EnumType.STRING)
    @Column(length = 10, nullable = false)
    private Gender gender;

    @Column(length = 100)
    private String email;

    @Column(length = 15)
    private String phone;

    @Enumerated(EnumType.STRING)
    @Column(name = "berth_preference", length = 20)
    private SeatType berthPreference;

    // Many passengers belong to one booking
    @ManyToOne
    @JoinColumn(name = "booking_id", nullable = false)
    private Booking booking;
}
	

