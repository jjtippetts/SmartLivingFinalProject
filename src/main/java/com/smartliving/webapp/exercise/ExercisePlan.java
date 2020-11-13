package com.smartliving.webapp.exercise;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.smartliving.webapp.user.User;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.List;

@Data
@Entity
public class ExercisePlan {
  public ExercisePlan() {}

  public ExercisePlan(String name, List<ExercisePlanExercise> exercises, User user) {
    this.name = name;
    this.exercises = exercises;
    this.user = user;
  }
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;

  @NotEmpty
  private String name;

  @ManyToMany(cascade = CascadeType.ALL)
  private List<ExercisePlanExercise> exercises;

  @NotNull
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn (name="USER_ID")
  @JsonBackReference
  private User user;
}
