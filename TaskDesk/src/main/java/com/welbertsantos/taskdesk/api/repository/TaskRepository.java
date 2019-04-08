package com.welbertsantos.taskdesk.api.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.welbertsantos.taskdesk.api.entity.Task;

public interface TaskRepository extends MongoRepository<Task, String> {

	Page<Task> findByTituloIgnoreCaseContainingAndPrioridadeContainingOrderByDataGravacaoDesc
	(String titulo, String prioridade, Pageable page);
	
	Page<Task> findByCodigoTask(Integer codigoTask, Pageable page);
}
