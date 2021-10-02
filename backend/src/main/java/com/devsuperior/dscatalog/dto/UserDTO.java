package com.devsuperior.dscatalog.dto;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import com.devsuperior.dscatalog.entities.User;

public class UserDTO implements Serializable{

	private static final long serialVersionUID = 1L;

	private Long id;
	@NotBlank(message = "Campo Obrigatorio")
	private String firstName;

	@NotBlank(message = "Campo Obrigatorio")
	private String lastName;

	@Email(message = "Favor entrar com um email válido")
	private String email;
	
	private Set<RolesDTO> roles = new HashSet<>();
	
	public UserDTO() {
		// TODO Auto-generated constructor stub
	}

	
	public UserDTO(Long id, String firstName, String lastName, String email) {
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
	}

	
	public UserDTO(User entity) {
		id = entity.getId();
		firstName = entity.getFirstName();
		lastName = entity.getLastName();
		email = entity.getEmail();		
		entity.getRoles().forEach(role -> this.roles.add(new RolesDTO(role)));  
		
	}

	
	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public String getFirstName() {
		return firstName;
	}


	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}


	public String getLastName() {
		return lastName;
	}


	public void setLastName(String lastName) {
		this.lastName = lastName;
	}


	public String getEmail() {
		return email;
	}


	public void setEmail(String email) {
		this.email = email;
	}


	public Set<RolesDTO> getRoles() {
		return roles;
	}

	
	
	
}
