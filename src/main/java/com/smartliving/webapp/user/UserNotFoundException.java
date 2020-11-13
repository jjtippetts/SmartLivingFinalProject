package com.smartliving.webapp.user;

public class UserNotFoundException extends Exception {
    public UserNotFoundException(Long id) {
        super("Could not find user " + id);
    }

    public UserNotFoundException(String username) {
        super("Could not find username: " + username);
    }
}
