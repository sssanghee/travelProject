package com.travel.security.jwt.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.travel.security.jwt.model.ERole;
import com.travel.security.jwt.model.Role;


@Mapper
public interface RoleMapper {
	public Role findByName(ERole roleUser);  
	public Role findById(Integer id);
}
