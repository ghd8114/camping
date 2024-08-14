package com.example.server.controller;

import com.example.server.entity.Comment;
import com.example.server.entity.Review;
import com.example.server.repository.CommentRepository;
import com.example.server.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {
    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private CommentRepository commentRepository;

    private DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    @GetMapping
    public List<Review> getAllReviews() {
        List<Review> reviews = reviewRepository.findAll();
        reviews.forEach(review -> {
            if (review.getDate() != null) {
                review.setFormattedDate(review.getDate().format(formatter));
            }
        });
        return reviews;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Review> getReviewById(@PathVariable("id") Long id) {
        Review review = reviewRepository.findById(id).orElseThrow(() -> new RuntimeException("Review not found"));
        if (review.getDate() != null) {
            review.setFormattedDate(review.getDate().format(formatter));
        }
        return ResponseEntity.ok(review);
    }

    @PostMapping
    public ResponseEntity<Review> createReview(@RequestBody Review review) {
        review.setDate(LocalDate.now());
        Review savedReview = reviewRepository.save(review);
        return ResponseEntity.ok(savedReview);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Review> updateReview(@PathVariable("id") Long id, @RequestBody Review updatedReview) {
        Review review = reviewRepository.findById(id).orElseThrow(() -> new RuntimeException("Review not found"));
        review.setReview_head(updatedReview.getReview_head());
        review.setReview_content(updatedReview.getReview_content());
        review.setFile_path(updatedReview.getFile_path());
        review.setDate(updatedReview.getDate());
        Review savedReview = reviewRepository.save(review);
        return ResponseEntity.ok(savedReview);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReview(@PathVariable("id") Long id) {
        reviewRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}/comments")
    public ResponseEntity<List<Comment>> getCommentsByReviewId(@PathVariable("id") Long id) {
        Review review = reviewRepository.findById(id).orElseThrow(() -> new RuntimeException("Review not found"));
        List<Comment> comments = commentRepository.findByReview(review);
        return ResponseEntity.ok(comments);
    }

    @PostMapping("/{id}/comments")
    public ResponseEntity<Comment> addCommentToReview(@PathVariable("id") Long id, @RequestBody Comment comment) {
        Review review = reviewRepository.findById(id).orElseThrow(() -> new RuntimeException("Review not found"));
        comment.setReview(review);
        Comment savedComment = commentRepository.save(comment);
        return ResponseEntity.ok(savedComment);
    }
}
