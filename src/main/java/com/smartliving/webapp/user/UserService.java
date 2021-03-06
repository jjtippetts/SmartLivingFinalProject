package com.smartliving.webapp.user;

import com.smartliving.webapp.userdetails.MyUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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

    public User getUser(long userId) throws UserNotFoundException {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            throw new UserNotFoundException(userId);
        }

        return user;
    }

    public User getUser(String username) throws UserNotFoundException {
        User user = userRepository.getUserByUsername(username);
        if (user == null) {
            throw new UserNotFoundException(username);
        }

        return user;
    }

    public User saveUser(UserCreationFormViewModel form) throws EmailExistsException, UserExistsException {
        if(emailExists(form.getEmail())) {
            throw new EmailExistsException("There is already an account with this email address");
        }
        if(userExists(form.getUsername())) {
            throw new UserExistsException("There is already an account with this username");
        }
        User newUser = createUser(form);
        userRepository.save(newUser);

        return newUser;
    }

    private boolean emailExists(String email) {
        return userRepository.getUserByEmail((email)) != null;
    }

    private boolean userExists(String username) {
        return userRepository.getUserByUsername((username)) != null;
    }

    private User createUser(UserCreationFormViewModel form) {
        User newUser = new User();
        newUser.setEmail(form.getEmail());
        newUser.setUsername(form.getUsername());
        newUser.setPassword(passwordEncoder.encode(form.getPassword()));
        return newUser;
    }
}
