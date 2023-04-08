package dev.hyns.bblogbackend.Article;

import java.util.HashMap;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
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

    @PostMapping("/write")
    ResponseEntity<Long> write(@RequestBody ArticleDTO dto) {
        return aser.writeArticle(dto);
    }

    @PostMapping("/modify")
    ResponseEntity<Long> modify(@RequestBody ArticleDTO dto) {
        return aser.modifyArticle(dto);
    }

    @DeleteMapping("/delete")
    ResponseEntity<Boolean> delete(@RequestBody ArticleDTO dto) {
        return aser.deleteArticle(dto.getAid());
    }

    @PostMapping("/list")
    ResponseEntity<HashMap<String, Object>> list(@RequestBody ArticleDTO dto) {
        return aser.articleList(dto.getMenu(), dto.getPage(), dto.getSize());
    }

    

}
