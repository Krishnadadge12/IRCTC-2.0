package com.mrc.entities;



import jakarta.persistence.AttributeOverride;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "queries")   
@AttributeOverride(name = "id", column = @Column(name = "q_id"))
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Query extends BaseEntity {

  
    @Column(name = "email", length = 200, nullable = false)
    private String email;

    @Column(name = "message", length = 400, nullable = false)
    private String message;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private QueryStatus status;
}
