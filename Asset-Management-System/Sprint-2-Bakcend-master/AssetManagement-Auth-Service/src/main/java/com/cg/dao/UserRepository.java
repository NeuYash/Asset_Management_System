package com.cg.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cg.bean.Users;

@Repository
public interface UserRepository extends JpaRepository<Users, Integer> {
	
	public Users findByUserNameAndPassword(String userName, String password);

	List<Users> findByUserType(String string);
}
