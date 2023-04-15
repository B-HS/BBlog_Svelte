package dev.hyns.bblogbackend.Article;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import dev.hyns.bblogbackend.Article.Article.Menu;

public interface ArticleRepository extends  JpaRepository<Article, Long>{
    Page<Article> findDistinctAllByMenu(Pageable pageable, Menu menu);
    Optional<Article> findOneByMenuEqualsOrderByAidDesc(Menu menu);
}
