package com.example.server.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "review")
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long review_id;

    private String user_id;
    private Integer review_num;
    private Integer review_no;
    private String review_head;
    private String review_content;
    private LocalDate post_date;
    private LocalDate modi_date;
    private String author;
    private LocalDate date;
    private String file_path;
    private Integer view_count;

    @OneToMany(mappedBy = "review", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Comment> comments;

    @Transient
    private String formattedDate;

    // Getters and setters
    public Long getReview_id() {
        return review_id;
    }

    public void setReview_id(Long review_id) {
        this.review_id = review_id;
    }

    public String getUser_id() {
        return user_id;
    }

    public void setUser_id(String user_id) {
        this.user_id = user_id;
    }

    public Integer getReview_num() {
        return review_num;
    }

    public void setReview_num(Integer review_num) {
        this.review_num = review_num;
    }

    public Integer getReview_no() {
        return review_no;
    }

    public void setReview_no(Integer review_no) {
        this.review_no = review_no;
    }

    public String getReview_head() {
        return review_head;
    }

    public void setReview_head(String review_head) {
        this.review_head = review_head;
    }

    public String getReview_content() {
        return review_content;
    }

    public void setReview_content(String review_content) {
        this.review_content = review_content;
    }

    public LocalDate getPost_date() {
        return post_date;
    }

    public void setPost_date(LocalDate post_date) {
        this.post_date = post_date;
    }

    public LocalDate getModi_date() {
        return modi_date;
    }

    public void setModi_date(LocalDate modi_date) {
        this.modi_date = modi_date;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getFile_path() {
        return file_path;
    }

    public void setFile_path(String file_path) {
        this.file_path = file_path;
    }

    public Integer getView_count() {
        return view_count;
    }

    public void setView_count(Integer view_count) {
        this.view_count = view_count;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }

    public String getFormattedDate() {
        return formattedDate;
    }

    public void setFormattedDate(String formattedDate) {
        this.formattedDate = formattedDate;
    }
}
