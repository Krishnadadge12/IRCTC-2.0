package com.mrc.util;

import java.time.LocalDate;
import org.springframework.stereotype.Component;

@Component
public class PnrGenerator {

	public String generate(Long trainNo, LocalDate journeyDate) {
	    return trainNo + "-" +
	           journeyDate.toString().replace("-", "") +
	           "-" +
	           System.currentTimeMillis() % 100000;
	}

}
