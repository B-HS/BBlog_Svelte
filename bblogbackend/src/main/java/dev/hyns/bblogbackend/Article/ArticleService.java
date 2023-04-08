package dev.hyns.bblogbackend.Article;

import org.springframework.http.ResponseEntity;

public interface ArticleService {
    ResponseEntity<ArticleDTO> readArticle(Long num);

    default ArticleDTO toDTO(Article entity){
        ArticleDTO dto = ArticleDTO.builder()
        .aid(entity.getAid())
        .title(entity.getTitle())
        .context(entity.getContext())
        .createdDate(entity.getCreatedDate())
        .hide(entity.getHide())
        .menu(entity.getMenu())
        .tags(entity.getTags().stream().map(v->v.getTag()).toList())
        .visitCnt(entity.getVisits().size())
        .build();
        return dto;
    }
}
