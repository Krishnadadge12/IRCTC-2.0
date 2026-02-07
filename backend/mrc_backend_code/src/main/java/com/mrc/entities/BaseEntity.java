package com.mrc.entities;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
//import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

//Lombok annotations
@Getter
@Setter
@ToString

//JPA annotation
@MappedSuperclass
public abstract class BaseEntity {
	//PK constraint
	@Id 
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	//auto ID generation - default id generation strategy - AUTO . To specify auto_increment : GenerationType.IDENTITY
	private Long id;
	@CreationTimestamp
	@Column(name="created_on")
	private LocalDate createdOn;
	@UpdateTimestamp
	@Column(name="last_updated")
	private LocalDateTime lastUpdated;
	
}
