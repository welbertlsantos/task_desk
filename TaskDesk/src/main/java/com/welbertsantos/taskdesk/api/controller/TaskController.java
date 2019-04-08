package com.welbertsantos.taskdesk.api.controller;

import java.util.Date;
import java.util.Random;

import org.apache.catalina.servlet4preview.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
//import org.springframework.security.access.prepost.PreAuthorize;
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

import com.welbertsantos.taskdesk.api.entity.Task;
import com.welbertsantos.taskdesk.api.entity.User;
import com.welbertsantos.taskdesk.api.response.Response;
import com.welbertsantos.taskdesk.api.security.jwt.JwtTokenUtil;
import com.welbertsantos.taskdesk.api.service.TaskService;
import com.welbertsantos.taskdesk.api.service.UserService;

@RestController
@RequestMapping("/api/task")
@CrossOrigin(origins = "*")
public class TaskController {
	
	@Autowired
	private TaskService taskService;
	
	@Autowired
	protected JwtTokenUtil jwtTokenUtil;
	
	@Autowired
	private UserService userService;
	
	@PostMapping()
	//@PreAuthorize("hasAnyRole('ROLE_USUARIO')")
	public ResponseEntity<Response<Task>> create(HttpServletRequest request, @RequestBody Task task,
			BindingResult result){
		Response<Task> response = new Response<Task>();
		try {
			validateCreatedTask(task, result);
			if (result.hasErrors()) {
				result.getAllErrors().forEach(error -> response.getErros().add(error.getDefaultMessage()));
				return ResponseEntity.badRequest().body(response);
			}
			
			task.setUser(userFromRequest(request));
			task.setDataGravacao(new Date());
			task.setCodigoTask(generateCodigo());
			Task taskPersist = (Task)taskService.createOrUpdate(task);
			response.setData(taskPersist);
			
		}catch(Exception e) {
			response.getErros().add(e.getMessage());
			return ResponseEntity.badRequest().body(response);
		}
		
		return ResponseEntity.ok(response);
	}
	
	
	public void validateCreatedTask(Task task, BindingResult result) {
		if (task.getTitulo() == null || task.getTitulo().equals("")) {
			result.addError(new ObjectError("Task", "Título não informado."));
			return; 
		}
		
	}
	
	public User userFromRequest(HttpServletRequest request) {
		String token = request.getHeader("Authorization");
		String email = jwtTokenUtil.getUsernameFromToken(token);
		return userService.findByEmail(email);
	}
	
	private Integer generateCodigo() {
		Random random = new Random();
		return random.nextInt(9999);
	}
	
	@PutMapping()
	//@PreAuthorize("hasAnyRole('ROLE_USUARIO')")
	public ResponseEntity<Response<Task>> update(HttpServletRequest request, @RequestBody Task task,
			BindingResult result){
		Response<Task> response = new Response<Task>();
		try {
			validateUpdatedTask(task, result);
			if (result.hasErrors()) {
				result.getAllErrors().forEach(error -> response.getErros().add(error.getDefaultMessage()));
				return ResponseEntity.badRequest().body(response);
			}
			
			Task taskCurrent = taskService.findById(task.getId());
			task.setUser(taskCurrent.getUser());  
			task.setDataGravacao(taskCurrent.getDataGravacao());
			task.setCodigoTask(taskCurrent.getCodigoTask());
			
			Task taskPersist = taskService.createOrUpdate(task);
			response.setData(taskPersist);
			
		}catch(Exception e) {
			response.getErros().add(e.getMessage());
			return ResponseEntity.badRequest().body(response);
		}
		return ResponseEntity.ok(response);
	}
	
	public void validateUpdatedTask(Task task, BindingResult result) {
		if (task.getId() == null) {
			result.addError(new ObjectError("Task", "ID não informado."));
			return; 
		}
		if (task.getTitulo() == null) {
			result.addError(new ObjectError("Task", "Título não informado."));
			return; 
		}
	}
	
	@GetMapping(value = "{id}")
	//@PreAuthorize("hasAnyRole('ROLE_USUARIO')")
	public ResponseEntity<Response<Task>> findById(@PathVariable("id") String id){
	
		Response<Task> response = new Response<Task>();
		
		Task task = taskService.findById(id);
		
		if (task == null) {
			response.getErros().add("Id não encontrado:" + id);
			return ResponseEntity.badRequest().body(response);
		}
		response.setData(task);
		return ResponseEntity.ok(response);
	}
	
	@DeleteMapping(value = "{id}")	
	//@PreAuthorize("hasAnyRole('ROLE_USUARIO')")
	public ResponseEntity<Response<String>> delete(@PathVariable("id") String id){
	
		Response<String> response = new Response<String>();
		Task task = taskService.findById(id);
		if (task == null) {
			response.getErros().add("Id não encontrado:" + id);
			return ResponseEntity.badRequest().body(response);
		}
		taskService.delete(id);
		return ResponseEntity.ok(new Response<String>());
	}
	
	@GetMapping(value = "{page}/{count}")
	//@PreAuthorize("hasAnyRole('ROLE_USUARIO')")
	public ResponseEntity<Response<Page<Task>>> findAll(HttpServletRequest request, @PathVariable int page, @PathVariable int count){
	
		Response<Page<Task>> response = new Response<Page<Task>>();
		Page<Task> tasks = taskService.listTask(page, count);
		response.setData(tasks);
		return ResponseEntity.ok(response);
		
	}
	
	@GetMapping(value = "{page}/{count}/{codigoTask}/{titulo}/{prioridade}")
	//@PreAuthorize("hasAnyRole('ROLE_USUARIO')")
	public ResponseEntity<Response<Page<Task>>> findByParams(HttpServletRequest request, 
			@PathVariable ("page") int page, 
			@PathVariable ("count") int count,
			@PathVariable ("codigoTask") Integer codigoTask,
			@PathVariable ("titulo") String titulo,
			@PathVariable ("prioridade") String prioridade){
	
		titulo = titulo.equals("uninformed") ? "" : titulo;	
		prioridade = prioridade.equals("uninformed") ? "" : prioridade;

		Response<Page<Task>> response = new Response<Page<Task>>();
		Page<Task> tasks = null;	
		if (codigoTask > 0)
		{
			tasks =  taskService.findByCodigoTask(page, count, codigoTask);
		}else {
			tasks = taskService.findByParameters(page, count, titulo, prioridade);
		}
		
		response.setData(tasks);
		return ResponseEntity.ok(response);
	}
	
	
}
