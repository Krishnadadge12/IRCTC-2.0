package com.mrc.entities.train;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import com.mrc.entities.BaseEntity;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

//JPA Annotations
@Entity															//Mandatory class level annotation
@Table(name="trains")											//declare table name

/*
 * To override inherited columns in subclass
 * id - name of the inherited property
 * column - used to specify column name
 */
@AttributeOverride(name="id",column=@Column(name="train_id"))	

//Lombok Annotations
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TrainEntity extends BaseEntity {
	
	@Column(name="train_no", unique = true, nullable=false)
	private Long trainNumber;
	
	@Column(name="train_name", length=100, nullable = false)
	private String trainName;
	
	@Column(name="source", length=200,nullable = false)
	private String source;
	
	@Column(name="destination",length=200,nullable = false)
	private String destination;
	
	@Column(name="dept_time")
	private LocalTime departureTime;
	
	@Column(name="arrival_time")
	private LocalTime arrivalTime;
	
	@Enumerated(EnumType.STRING)
	@Column(name="status")
	private TrainStatus trainStatus;
	
	@OneToMany(mappedBy = "train", 
			cascade = CascadeType.ALL,
			orphanRemoval = true)   /*if coach is removed, it will be deleted from db automatically. 
										if false, coach remains in db with train_id=null (creates orphan rows)*/
	private List<Coach> coaches;
	@Column(name="schedule_date")
	private LocalDate scheduleDate;
	
}
