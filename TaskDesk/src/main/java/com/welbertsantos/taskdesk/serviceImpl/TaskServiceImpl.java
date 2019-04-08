package com.welbertsantos.taskdesk.serviceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.welbertsantos.taskdesk.api.entity.Task;
import com.welbertsantos.taskdesk.api.repository.TaskRepository;
import com.welbertsantos.taskdesk.api.service.TaskService;

@Service
public class TaskServiceImpl implements TaskService {

	@Autowired
	private TaskRepository taskRepository;
	
	
	public Task createOrUpdate(Task task) {
		return this.taskRepository.save(task);
	}

	
	public Task findById(String id) {
		return this.taskRepository.findOne(id);
	}

	
	public void delete(String id) {
		this.taskRepository.delete(id);
	}

	
	public Page<Task> listTask(int page, int count) {
		Pageable pages = new PageRequest(page, count);
		return this.taskRepository.findAll(pages);
	}

	
	public Page<Task> findByCodigoTask(int page, int count, Integer codigoTask) {
		Pageable pages = new PageRequest(page, count);
		return this.taskRepository.findByCodigoTask(codigoTask, pages);
	}

	
	public Iterable<Task> findAll() {
		return this.taskRepository.findAll();
	}

	public Page<Task> findByParameters(int page, int count, String titulo, String prioridade) {
		Pageable pages = new PageRequest(page, count);
		return this.taskRepository.findByTituloIgnoreCaseContainingAndPrioridadeContainingOrderByDataGravacaoDesc(titulo, prioridade, pages);
	}

}
