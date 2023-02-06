package com.cg.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.cg.bean.Response;
import com.cg.bean.Users;
import com.cg.service.UserService;

@RestController
@CrossOrigin
public class UserController {

	@Autowired
	UserService userService;

	@Autowired
	Response response;

	@GetMapping("")
	public String sayName() {
		return " In user microservice";
	}

	@PostMapping("login")
	public Response loginUser(@RequestBody Users user) {

		Users user1 = userService.findByUserNameAndPassword(user.getUserName(), user.getPassword());

		if (user1 == null) {
			return null;
		}
		response.setUserName(user1.getUserName());
		response.setUserType(user1.getUserType());
		return response;
	}

	@PostMapping("addManager")
	public Users addUser(@RequestBody Users user) {
		user.setUserType("manager");
		return userService.save(user);
	}

	@GetMapping("getManagers")
	public List<Users> viewManager() {
		return userService.findByUserType("manager");
	}

	@PutMapping("updateManager")
	public Users updateManager(@RequestBody Users user) {
		return userService.save(user);
	}

	@DeleteMapping("deleteManager/{userId}")
	public void deleteAsset(@PathVariable int userId) {
		userService.deleteById(userId);
	}
}
