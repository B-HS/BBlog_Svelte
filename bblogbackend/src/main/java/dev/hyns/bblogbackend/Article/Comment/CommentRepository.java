package dev.hyns.bblogbackend.Article.Comment;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    Page<Comment>findDistinctAllByArticleAid(Pageable pageable, Long aid);
}