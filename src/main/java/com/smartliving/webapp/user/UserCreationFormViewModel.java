package com.smartliving.webapp.user;

import lombok.Getter;

import javax.validation.constraints.NotEmpty;

@Getter
@UserCreationFormConstraint
public class UserCreationFormViewModel {
    @NotEmpty
    private String username;

    @NotEmpty
    private String password;

    @NotEmpty
    private String confirmPassword;

    @NotEmpty
    private String email;
}