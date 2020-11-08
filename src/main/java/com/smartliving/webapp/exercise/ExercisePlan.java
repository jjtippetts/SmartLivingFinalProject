package com.smartliving.webapp.exercise;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.smartliving.webapp.meal.Meal;
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

  public ExercisePlan(String name, List<ExerciseSetsReps> exercisesSetsReps, User user) {
    this.name = name;
    this.exercisesSetsReps = exercisesSetsReps;
    this.user = user;
  }
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;

  @NotEmpty
  private String name;

  @ManyToMany(cascade = CascadeType.ALL)
  private List<ExerciseSetsReps> exercisesSetsReps;

  @NotNull
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn (name="USER_ID")
  @JsonBackReference
  private User user;
}
