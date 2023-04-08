package dev.hyns.bblogbackend.Article.Visit;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "visit")
public class VisitController {

    private final VisitService vser;

    @GetMapping("b")
    public ResponseEntity<Boolean> visitPages(@RequestBody VisitDTO visit) {
        return vser.visit(visit);
    }
}
