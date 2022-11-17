package com.travel.security.jwt.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.travel.security.jwt.model.UserRole;


@Mapper
public interface UserRolesMapper {

	public void insertUserRoles(UserRole userRole);
	public int findByUserId(String userId);
}
