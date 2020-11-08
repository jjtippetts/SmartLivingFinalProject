package com.smartliving.webapp.exercise;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Data
@Entity
public class ExerciseSetsReps implements Serializable {
  public ExerciseSetsReps() {}

  public ExerciseSetsReps(int sets, int reps, Exercise exercise) {
    this.sets = sets;
    this.reps = reps;
    this.exercise = exercise;
  }

  @Id
  private int sets;
  @Id
  private int reps;

  @ManyToOne(cascade = CascadeType.MERGE)
  private Exercise exercise;
}
