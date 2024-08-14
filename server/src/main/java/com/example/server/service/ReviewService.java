package com.example.server.service;

import com.example.server.entity.Comment;
import com.example.server.entity.Review;
import com.example.server.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ReviewService {
    @Autowired
    private ReviewRepository reviewRepository;

    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }

    public Review getReviewById(Long id) {
        return reviewRepository.findById(id).orElse(null);
    }

    public Review saveReview(Review review) {
        return reviewRepository.save(review);
    }

    public void deleteReview(Long id) {
        reviewRepository.deleteById(id);
    }

    @Transactional
    public Review updateReview(Long id, Review updatedReview) {
        Review review = reviewRepository.findById(id).orElseThrow(() -> new RuntimeException("Review not found"));
        review.setReview_head(updatedReview.getReview_head());
        review.setReview_content(updatedReview.getReview_content());
        review.setFile_path(updatedReview.getFile_path()); // 여기서 이름이 file_path와 일치해야 함
        review.setDate(updatedReview.getDate());
        review.setAuthor(updatedReview.getAuthor());
        review.setView_count(updatedReview.getView_count());

        review.getComments().clear();
        for (Comment comment : updatedReview.getComments()) {
            comment.setReview(review);
            review.getComments().add(comment);
        }

        return reviewRepository.save(review);
    }
}
