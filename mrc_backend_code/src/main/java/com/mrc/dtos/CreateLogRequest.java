package com.mrc.dtos;

import java.time.OffsetDateTime;
import java.time.ZoneOffset;

public class CreateLogRequest {

	 private String message;
	    private OffsetDateTime timestamp;

	    public CreateLogRequest() {}

	    public CreateLogRequest(String message) {
	        this.message = message;
	        this.timestamp = OffsetDateTime.now(ZoneOffset.UTC);
	    }

	    public String getMessage() {
	        return message;
	    }

	    public OffsetDateTime getTimestamp() {
	        return timestamp;
	    }

	    public void setMessage(String message) {
	        this.message = message;
	    }

	    public void setTimestamp(OffsetDateTime timestamp) {
	        this.timestamp = timestamp;
	    }
}
