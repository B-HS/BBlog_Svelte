package dev.hyns.bblogbackend.Article;

import java.util.List;
import java.util.Set;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class ImageController {
    private final ArticleService aser;

    @PostMapping("/image/upload")
    public ResponseEntity<Set<String>> imageUpload(List<MultipartFile> files) {
        return new ResponseEntity<>(aser.ImgUpload(files), HttpStatus.OK);
    }

    @GetMapping("/image/{name}")
    public ResponseEntity<byte[]> imageRead(@PathVariable("name") String name) {
        byte[] file = (byte[]) aser.ImgRead(name).get(0);
        return new ResponseEntity<>(file, HttpStatus.OK);
    }
}
