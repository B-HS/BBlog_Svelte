package dev.hyns.bblogbackend.Article;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ArticleServiceImpl implements ArticleService {
    private final ArticleRepository arepo;

    @Override
    public ResponseEntity<ArticleDTO> readArticle(Long num) {
        Article result = arepo.findById(num).orElseThrow(() -> new IllegalArgumentException("Article not exist"));
        return new ResponseEntity<ArticleDTO>(toDTO(result), HttpStatus.OK);
    }

}
