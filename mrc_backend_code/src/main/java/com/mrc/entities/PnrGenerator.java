package com.mrc.entities;

public class PnrGenerator {
	 public static String generate(Long bookingId) {
	        return "PNR" + System.currentTimeMillis() + bookingId;
	    }
}
