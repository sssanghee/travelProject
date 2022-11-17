package com.travel.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
public class Image {
	
//	private long boardIdx;
//	private String id;
//	private String originalFileName;
//	private String storedFilePath;
//	private long fileSize;
	private String fileName;
	
}
