package com.smartliving.webapp.user;

public class EmailExistsException extends Exception {
  public EmailExistsException(String s) {
    super(s);
  }
}
