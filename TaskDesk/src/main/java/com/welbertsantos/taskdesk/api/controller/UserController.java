package com.welbertsantos.taskdesk.api.controller;

import org.apache.catalina.servlet4preview.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
//import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.welbertsantos.taskdesk.api.entity.User;
import com.welbertsantos.taskdesk.api.response.Response;
import com.welbertsantos.taskdesk.api.service.UserService;

@RestController
@RequestMapping("api/user")
@CrossOrigin(origins ="*")
public class UserController {

	@Autowired
	private  UserService userService;
	
	@Autowired
	private PasswordEncoder passwordEnconder;
	
	@PostMapping
	//@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<Response<User>> create(HttpServletRequest request, @RequestBody User user,
			BindingResult result ){
		Response<User> response = new Response<User>();
		try {
			validadeCreatedUser(user, result);
			if (result.hasErrors()) {
				result.getAllErrors().forEach(error -> response.getErros().add(error.getDefaultMessage()));
				return ResponseEntity.badRequest().body(response);
			}
			user.setPassword(passwordEnconder.encode(user.getPassword()));
			User userPersited = (User) userService.createOrUpdate(user);
			response.setData(userPersited);
		}catch(DuplicateKeyException dE) {
			response.getErros().add("Email já gravado.");
			return ResponseEntity.badRequest().body(response);
		}
		catch(Exception e) {
			response.getErros().add(e.getMessage());
			return ResponseEntity.badRequest().body(response);
		}
		
		return ResponseEntity.ok(response);
			
	}
	
	private void validadeCreatedUser(User user, BindingResult result ) {
		if (user.getEmail() == null) {
			result.addError(new ObjectError("User", "Email não informado"));
		}
	}
	
	@PutMapping
	//@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<Response<User>> update(HttpServletRequest request, @RequestBody User user,
			BindingResult result){
		Response<User> response = new Response<User>();
		try {
			validadeUpdateUser(user, result);
			if (result.hasErrors()) {
				result.getAllErrors().forEach(error -> response.getErros().add(error.getDefaultMessage()));
				return ResponseEntity.badRequest().body(response);
			}
			user.setPassword(passwordEnconder.encode(user.getPassword()));
			User userPersist = (User) userService.createOrUpdate(user);
			response.setData(userPersist);
		}catch(Exception e) {
			response.getErros().add(e.getMessage());
			return ResponseEntity.badRequest().body(response);
			
		}
		return ResponseEntity.ok(response);
	}
	
	private void validadeUpdateUser(User user, BindingResult result ) {
		if (user.getId() == null) {
			result.addError(new ObjectError("User", "Id não informado"));
		}
		if (user.getEmail() == null) {
			result.addError(new ObjectError("User", "Email não informado"));
		}
	}
	
	@GetMapping(value = "{id}")
	//@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<Response<User>> findById(@PathVariable("id") String id){
		Response<User> response = new Response<User>();
		User user = (User) userService.findById(id);
		if (user == null) {
			response.getErros().add("Id não encontrado :" + id);
			return ResponseEntity.badRequest().body(response);
		}
		response.setData(user);
		return ResponseEntity.ok(response);
	}
	
	@DeleteMapping(value = "/{id}")
	@PreAuthorize("hasAnyRole('ADMIN')")
	public ResponseEntity<Response<String>> delete(@PathVariable("id") String id) {
		Response<String> response = new Response<String>();
		User user = userService.findById(id);
		if (user == null) {
			response.getErros().add("Id não encontrado : " + id);
			return ResponseEntity.badRequest().body(response);
		}
		userService.delete(id);
		return ResponseEntity.ok(new Response<String>());
	}
	
	@GetMapping(value = "{page}/{count}")
	//@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<Response<Page<User>>> findAll(@PathVariable int page, @PathVariable int count){
		
		Response<Page<User>> response = new Response<Page<User>>();
		Page<User> user = userService.findAll(page, count);
		response.setData(user);
		return ResponseEntity.ok(response);
	
	}
	
}
