package com.smartliving.webapp.user;

public class UserExistsException extends Exception {
  public UserExistsException(String s) {
    super(s);
  }
}
