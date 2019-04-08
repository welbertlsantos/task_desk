package com.welbertsantos.taskdesk.api.entity;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import com.welbertsantos.taskdesk.api.Enum.PrioridadeEnum;

@Document
public class Task {
	
	@Id
	private String id;
	
	@DBRef(lazy = true)
	private User user;
	
	private Date dataGravacao;
	
	private String titulo;
	
	private Integer codigoTask;
	
	private String descricao;
	
	private PrioridadeEnum prioridade;
	
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Date getDataGravacao() {
		return dataGravacao;
	}

	public void setDataGravacao(Date dataGravacao) {
		this.dataGravacao = dataGravacao;
	}

	public String getTitulo() {
		return titulo;
	}

	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}

	public Integer getCodigoTask() {
		return codigoTask;
	}

	public void setCodigoTask(Integer codigoTask) {
		this.codigoTask = codigoTask;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public PrioridadeEnum getPrioridade() {
		return prioridade;
	}

	public void setPrioridade(PrioridadeEnum prioridade) {
		this.prioridade = prioridade;
	}
	
}
