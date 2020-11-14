package com.smartliving.webapp.user;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class UserCreationFormValidator implements ConstraintValidator<UserCreationFormConstraint, UserCreationFormViewModel> {

  @Override
  public void initialize(UserCreationFormConstraint constraint) {

  }

  @Override
  public boolean isValid(UserCreationFormViewModel form, ConstraintValidatorContext context) {
    return form.getPassword().equals(form.getConfirmPassword());
  }
}
