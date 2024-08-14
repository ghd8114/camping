package com.example.server.repository;

import com.example.server.entity.Comment;
import com.example.server.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByReview(Review review);
}
