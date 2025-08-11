package com.mart.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String name;
	private String email;
	private String password;
	private String phone;

	@Enumerated(EnumType.STRING) // Store enum as a string in DB
	private Role role;

	private LocalDateTime createdAt = LocalDateTime.now();
}
