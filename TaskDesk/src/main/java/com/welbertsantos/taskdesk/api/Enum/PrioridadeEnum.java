package com.welbertsantos.taskdesk.api.Enum;

public enum PrioridadeEnum {
	
	Urgente,
	Normal,
	Baixa;
	
	public static PrioridadeEnum getStatusPrioridade(String status) {
		switch(status) {
			case "Urgente" : return Urgente;
			case "Normal" : return Normal;
			case "Baixa" : return Baixa;
			default : return Normal;
		}
		
	}
}
