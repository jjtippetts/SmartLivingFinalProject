package com.smartliving.webapp.exercise;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Data
@Entity
public class ExercisePlanExercise implements Serializable {
  public ExercisePlanExercise() {}

  public ExercisePlanExercise(int sets, int reps, int weight, boolean isMetric, Exercise exercise) {
    this.sets = sets;
    this.reps = reps;
    this.weight = weight;
    this.isMetric = isMetric;
    this.exercise = exercise;
  }

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long Id;
  private int sets;
  private int reps;
  private int weight;
  private boolean isMetric;

  @ManyToOne(cascade = CascadeType.MERGE)
  private Exercise exercise;
}
