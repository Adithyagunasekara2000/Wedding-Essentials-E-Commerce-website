package com.wedding.ecommerce.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.wedding.ecommerce.dto.AuthResponse;
import com.wedding.ecommerce.dto.LoginRequest;
import com.wedding.ecommerce.dto.RegisterRequest;
import com.wedding.ecommerce.model.User;
import com.wedding.ecommerce.repository.UserRepository;
import com.wedding.ecommerce.util.JwtUtil;

import jakarta.annotation.PostConstruct;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepo;

    @Autowired
    private PasswordEncoder encoder;
    
    @Autowired
    private JwtUtil jwtUtil;

    public AuthResponse register(RegisterRequest request) {
        // Check if email already exists
        if (userRepo.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered");
        }
        
        // Create new user
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPhone(request.getPhone());
        user.setPassword(encoder.encode(request.getPassword()));
        user.setRole("USER"); 

        // Save user
        User savedUser = userRepo.save(user);
        
        // Generate JWT token
        String token = jwtUtil.generateToken(savedUser.getEmail());
        
        // Return response
        return new AuthResponse(
            savedUser.getId(),
            savedUser.getName(),
            savedUser.getEmail(),
            savedUser.getPhone(),
            token,
            savedUser.getRole() 
        );
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepo.findByEmail(request.getEmail())
            .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        
        if (encoder.matches(request.getPassword(), user.getPassword())) {
            // Generate JWT token
            String token = jwtUtil.generateToken(user.getEmail());
            
            // Return response
            return new AuthResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getPhone(),
                token,
                user.getRole()
            );
        } else {
            throw new BadCredentialsException("Invalid credentials");
        }
    }
    
    @PostConstruct
    public void createDefaultAdmin() {
        if (!userRepo.existsByEmail("admin@wedding.com")) {
            User admin = new User();
            admin.setName("Admin");
            admin.setEmail("admin@wedding.com");
            admin.setPhone("0000000000");
            admin.setPassword(encoder.encode("admin123")); // strong password in real use
            admin.setRole("ADMIN");
            userRepo.save(admin);
        }
    }
    
    public List<User> getAllUsers(){
    	return userRepo.findAll();
    }
    
    
}