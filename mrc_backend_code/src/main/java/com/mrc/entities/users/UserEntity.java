package com.mrc.entities.users;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.mrc.entities.BaseEntity;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

//JPA annotations


@Entity					//mandatory cls level annotation
@Table(name="users")    //to declare table name
/*
 * To override the inherited column names in the sub class entities -
 * id - name of the inherited prop
 * column - used to specify the col name
 */
@AttributeOverride(name="id",column = @Column(name="user_id"))

//Lombok annotations
@NoArgsConstructor
@Getter
@Setter
@ToString(exclude = "password")

public class UserEntity extends BaseEntity implements UserDetails{
	
	@Column(name="first_name",length = 30)  //to declare varchar size
	private String firstName;
	@Column(name="last_name",length = 30)   //to declare varchar size
	private String lastName;
	/*
	 * In case of java.util.Date , Calendar ... - @Temporal
	 */
	private LocalDate dob;
	@Column(length = 100,unique = true, nullable = false)     //add unique constraint
	private String email;
	
	@Column(length = 500,nullable = false)  //NOT NULL constraint
	private String password;
	
	@Column(length=10, unique = true, nullable=false)
//	@Transient 								//skip from persistence -no col generation
//	private String confirmPassword;
	private String phone;
	
	@Enumerated(EnumType.STRING)
	private Gender gender;
	
	@Column(name="id_proof",length=20)
	@Enumerated(EnumType.STRING)
	private IdProof idProof;
	
	@Enumerated(EnumType.STRING) 			//col type - enum | varchar : enum constants
	@Column(name="user_role")
	private UserRole userRole;
	
	@Enumerated(EnumType.STRING)
	@Column(name="status")
	private UserStatus userStatus;
	
	//implement methods of UserDetails i/f
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		// TODO Auto-generated method stub
		return List.of(new SimpleGrantedAuthority(this.userRole.name()));
	}

	@Override
	public String getUsername() {
		return this.email;
	}

	public UserEntity(String firstName, String lastName, LocalDate dob, String email, String password, String phone) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.dob = dob;
		this.email = email;
		this.password = password;
		this.phone = phone;
	}
	@Override
	public boolean isAccountNonExpired() {
	    return true;
	}

	@Override
	public boolean isAccountNonLocked() {
	    return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
	    return true;
	}

	@Override
	public boolean isEnabled() {
	    return this.userStatus == UserStatus.ACTIVE;
	}


}
