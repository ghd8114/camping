package com.example.server.persistence;

import com.example.server.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    // 사용자 ID로 사용자 조회
    User findByUserId(String userId);

    // 이메일로 사용자 조회 (예제 추가)
    User findByUserEmail(String userEmail);

    // 필요한 추가 메소드 정의 가능
}
