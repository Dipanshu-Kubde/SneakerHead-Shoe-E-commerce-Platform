package com.mart.controller;

import java.util.Collections;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.mart.config.JwtUtil;
import com.mart.dto.AuthRequest;
import com.mart.dto.GoogleTokenRequest;
import com.mart.dto.RegisterRequest;
import com.mart.entity.Role;
import com.mart.entity.User;
import com.mart.repository.UserRepository;

import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
	
	

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private JwtUtil jwtUtil;
    
//    @Value("${google.client.id}") 
//    private String googleClientId;
    private static final String CLIENT_ID = "234294153007-7bfgn1ff0nt8erpefbc3hjuorvbs9jc3.apps.googleusercontent.com";

    private GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(
            new NetHttpTransport(),
            GsonFactory.getDefaultInstance() // Use GsonFactory
        )
        .setAudience(Collections.singletonList(CLIENT_ID))
        .build();

//    @PostMapping("/api/auth/google")
//    public ResponseEntity<?> googleLogin(@RequestBody GoogleTokenRequest request) {
//        String tokenId = request.getToken();
//
//        if (tokenId == null || tokenId.isEmpty()) {
//            System.out.println("❌ No token received");
//            return ResponseEntity.badRequest().body("Missing Google token");
//        }
//
//        System.out.println("✅ Received token: " + tokenId);
//
//        // Continue with token verification (verifier.verify(tokenId), etc.)
//        return ResponseEntity.ok("Token received");
//    }
    
    @PostMapping("/google")
    public ResponseEntity<?> googleLogin(@RequestBody GoogleTokenRequest request) {
        String tokenId = request.getToken();
        System.out.println("✅ Received token: " + tokenId);

        try {
            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(
                    new NetHttpTransport(),
                    GsonFactory.getDefaultInstance()
            )
                    .setAudience(Collections.singletonList(CLIENT_ID))
                    .build();

            GoogleIdToken idToken = verifier.verify(tokenId);

            if (idToken == null) {
                System.out.println("❌ Invalid ID token");
                return ResponseEntity.status(401).body("Invalid ID token");
            }

            GoogleIdToken.Payload payload = idToken.getPayload();
            String email = payload.getEmail();
            String name = (String) payload.get("name");

            // Check if user exists or create
            User user = userRepository.findByEmail(email).orElseGet(() -> {
                User newUser = new User();
                newUser.setEmail(email);
                newUser.setName(name);
//                newUser.setRole("USER");
                return userRepository.save(newUser);
            });

            // TODO: Generate and return JWT
            // e.g., String jwt = jwtService.generateToken(user);
            // return ResponseEntity.ok(new AuthResponse(jwt));

            return ResponseEntity.ok("✅ Logged in user: " + user.getEmail());

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Server error");
        }
    }

    
    // ✅ Register a new user
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest request) {
        Optional<User> existing = userRepository.findByEmail(request.getEmail());
        if (existing.isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Email already registered");
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setPhone(request.getPhone());
//       user.setRole(request.getRole());
        Role role = Role.CUSTOMER; // default
        if (request.getRole() != null) {
            try {
                role = Role.valueOf(request.getRole().toUpperCase()); // convert string to enum
            } catch (IllegalArgumentException e) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Invalid role: " + request.getRole());
            }
        }
        user.setRole(role);

        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully");
    }


    // ✅ Login and receive JWT token
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest authRequest) {
        try {
            Authentication auth = authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            authRequest.getEmail(),
                            authRequest.getPassword()
                    )
            );
            
            String token = jwtUtil.generateToken(authRequest.getEmail());

            return ResponseEntity.ok(Map.of("token", token));
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid email or password");
        }
    }
}
