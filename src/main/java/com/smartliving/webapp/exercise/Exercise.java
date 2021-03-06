package com.smartliving.webapp.exercise;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotEmpty;

@Data
@Entity
public class Exercise {
  public Exercise() {}
  public Exercise(String name, String muscleGroup, String equipment) {
    this.name = name;
    this.muscleGroup = muscleGroup;
    this.equipment = equipment;
    this.metricWeight = false;
  }

  public Exercise(String name, String muscleGroup, String equipment, int weight, boolean isMetric) {
    this.name = name;
    this.muscleGroup = muscleGroup;
    this.equipment = equipment;
    this.weight = weight;
    this.metricWeight = isMetric;
  }

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;

  @NotEmpty
  private String name;

  @NotEmpty
  private String muscleGroup;

  @NotEmpty
  private String equipment;

  private int weight;

  private boolean metricWeight;
}
