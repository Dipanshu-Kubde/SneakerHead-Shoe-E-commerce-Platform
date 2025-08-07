package com.mart.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UserRequest {
    @NotBlank private String name;
    @Email private String email;
    @Size(min = 6) private String password;
    @Pattern(regexp = "\\d{10}") private String phone;
    @NotBlank private String role;
}
