package com.smartliving.webapp.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.MethodArgumentNotValidException;

@Service
public class UserService {
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User saveUser(UserCreationFormViewModel form) throws EmailExistsException {
        if(emailExists(form.getEmail())) {
            throw new EmailExistsException("There is already an account with this email address");
        }
        User newUser = createUser(form);
        try {
            userRepository.save(newUser);
        }
        catch(Exception ex) {
            // TODO: Handle error pls. Like for already existing users
        }
        return newUser;
    }

    private boolean emailExists(String email) {
        return userRepository.getUserByEmail((email)) != null;
    }

    private User createUser(UserCreationFormViewModel form) {
        User newUser = new User();
        newUser.setEmail(form.getEmail());
        newUser.setUsername(form.getUsername());
        newUser.setPassword(passwordEncoder.encode(form.getPassword()));
        return newUser;
    }
}
