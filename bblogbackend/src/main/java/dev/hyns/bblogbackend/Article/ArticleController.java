package dev.hyns.bblogbackend.Article;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(value = "article")
@RequiredArgsConstructor
public class ArticleController {
    private final ArticleService aser;

    @PostMapping("/read")
    ResponseEntity<ArticleDTO> read(@RequestBody ArticleDTO dto) {
        return aser.readArticle(dto.getAid());
    }
}
