package com.smartliving.webapp.user;

import javax.validation.Constraint;
import javax.validation.Payload;

import static java.lang.annotation.ElementType.TYPE;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import static java.lang.annotation.RetentionPolicy.RUNTIME;

@Constraint(validatedBy = UserCreationFormValidator.class)
@Target({ TYPE })
@Retention(RUNTIME)
public @interface UserCreationFormConstraint {
   String message() default "Entered passwords do not match.";
   Class<?>[] groups() default {};
   Class<? extends Payload>[] payload() default {};
}
