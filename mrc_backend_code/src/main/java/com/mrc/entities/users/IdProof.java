package com.mrc.entities.users;

public enum IdProof {
	AADHAR("number"), PAN("number"), DRIVING_LICENSE("number");

	//Field to hold the associated value
	private final String number;
	
	//Private construct (implicitly private ctor, public/protected not allowed)
	IdProof(String number) {
		this.number=number;
	}

	//Getter to access the value.
	public String getNumber() {
		return number;
	}
}
