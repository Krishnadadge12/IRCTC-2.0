package com.mrc.dtos;


public class CreateLogRequest {

	 private String message;
	   

	    public CreateLogRequest() {}

	    public CreateLogRequest(String message) {
	        this.message = message;
	    }

	    public String getMessage() {
	        return message;
	    }


	    public void setMessage(String message) {
	        this.message = message;
	    }

}
