package com.travel.security.jwt.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.travel.security.jwt.model.User;



@Mapper
public interface UserMapper {

	public User findByUsername(String username);
	public User findById(String id);
	public User findByIdAll(String id);
	public void insertUser(User user);
}
