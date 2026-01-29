package com.mrc.dtos;

import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class SearchTrainDTO {
	 private String source;
	 private String destination;
	 @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)  //
	 private LocalDate scheduleDate;
}
