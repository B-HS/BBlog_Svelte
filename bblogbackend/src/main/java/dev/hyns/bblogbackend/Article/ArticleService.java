package dev.hyns.bblogbackend.Article;

import java.util.HashMap;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import dev.hyns.bblogbackend.Article.Article.Menu;
import dev.hyns.bblogbackend.Article.Tag.Tag;

public interface ArticleService {
    ResponseEntity<ArticleDTO> readArticle(Long num);
    ResponseEntity<Long> writeArticle(ArticleDTO dto);
    ResponseEntity<Long> modifyArticle(ArticleDTO dto);
    ResponseEntity<Boolean> deleteArticle(Long num);
    ResponseEntity<HashMap<String, Object>> articleList(Menu menu, Integer page, Integer size);
    Set<String> ImgUpload(List<MultipartFile> files);
    List<Object> ImgRead(String name);

    default ArticleDTO toDTO(Article entity) {
        ArticleDTO dto = ArticleDTO.builder()
                .aid(entity.getAid())
                .title(entity.getTitle())
                .context(entity.getContext())
                .createdDate(entity.getCreatedDate())
                .hide(entity.getHide())
                .menu(entity.getMenu())
                .tags(entity.getTags().stream().map(v -> v.getTag()).toList())
                .visitCnt(entity.getVisits().size())
                .thumbnail(entity.getThumbnail())
                .build();
        return dto;
    }

    default Article toEntity(ArticleDTO dto) {
        Article entity = Article.builder()
                .aid(dto.getAid())
                .title(dto.getTitle())
                .context(dto.getContext())
                .hide(dto.getHide())
                .menu(dto.getMenu())
                .tags(dto.getTags().stream()
                        .map(v -> Tag.builder().article(Article.builder().aid(dto.getAid()).build()).build())
                        .collect(Collectors.toSet()))
                .thumbnail(dto.getThumbnail())
                .build();
        return entity;
    }
}