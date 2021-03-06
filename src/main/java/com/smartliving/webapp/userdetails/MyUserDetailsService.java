package com.smartliving.webapp.userdetails;

import com.smartliving.webapp.user.User;
import com.smartliving.webapp.user.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

/**
 * UserDetailsService loads user specific data.
 * Searches the database for the username. Returns the corresponding user as an argument to
 * MyUserDetails
 */
public class MyUserDetailsService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = this.userRepository.getUserByUsername(username);

        if (user == null) {
            throw new UsernameNotFoundException("Could not find user: " + username);
        }

        return new MyUserDetails(user);
    }
}
