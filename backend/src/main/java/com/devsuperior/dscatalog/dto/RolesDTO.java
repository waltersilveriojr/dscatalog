package com.devsuperior.dscatalog.dto;

import java.io.Serializable;

import com.devsuperior.dscatalog.entities.Roles;

public class RolesDTO  implements Serializable{

	private static final long serialVersionUID = 1L;

	private Long id;
	private String authority ;
	
	
	public RolesDTO() {
		// TODO Auto-generated constructor stub
	}


	public RolesDTO(Long id, String authority) {
		super();
		this.id = id;
		this.authority = authority;
	}
	
	public RolesDTO(Roles entity) {
		id = entity.getId();
		authority = entity.getAuthority();
	}


	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public String getAuthority() {
		return authority;
	}


	public void setAuthority(String authority) {
		this.authority = authority;
	}
	
	
}
