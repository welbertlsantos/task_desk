package com.welbertsantos.taskdesk.api.service;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

import com.welbertsantos.taskdesk.api.entity.Task;

@Component
public interface TaskService {

	Task createOrUpdate(Task task);
	
	Task findById(String id);
	
	void delete(String id);
	
	Page<Task> listTask (int page, int count);
	
	Page<Task> findByParameters(int page, int count, String titulo, String prioridade);
	
	Page<Task> findByCodigoTask (int page, int count, Integer codigoTask);
	
	Iterable<Task> findAll();
	
	
}
