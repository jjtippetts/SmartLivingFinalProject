package com.smartliving.webapp.exercise;

import com.smartliving.webapp.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ExercisePlanRepository extends JpaRepository<ExercisePlan, Long> {
  @Override
  Optional<ExercisePlan> findById(Long aLong);

  List<ExercisePlan> findByUser(User user);
}
