package com.travel.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Like {
	private String id;
	private long boardIdx;
	private String reactUser;
}
