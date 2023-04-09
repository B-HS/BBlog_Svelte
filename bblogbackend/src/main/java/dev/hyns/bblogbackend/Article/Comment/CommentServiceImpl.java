package dev.hyns.bblogbackend.Article.Comment;

import java.util.HashMap;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {
    private final PasswordEncoder encoder;
    private final CommentRepository crepo;

    @Override
    @Transactional
    public ResponseEntity<Long> commentWrite(CommentDTO dto) {
        dto.setPw(encoder.encode(dto.getPw()));
        return new ResponseEntity<>(crepo.save(toEntity(dto)).getRid(), HttpStatus.OK);
    }

    @Override
    @Transactional
    public ResponseEntity<Long> commentModify(CommentDTO dto) {
        Comment target = crepo.findById(dto.getRid())
                .orElseThrow(() -> new IllegalArgumentException("Article not exist"));
        if (encoder.matches(dto.getPw(), target.getPw())) {
            target.updateComment(dto);
        }
        return new ResponseEntity<>(crepo.save(target).getRid(), HttpStatus.OK);
    }

    @Override
    @Transactional
    public ResponseEntity<Boolean> commentDelete(CommentDTO dto) {
        crepo.deleteById(dto.getAid());
        return new ResponseEntity<>(true, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<HashMap<String, Object>> commentList(Integer page, Integer size, long aid) {
        HashMap<String, Object> result = new HashMap<>();
        Page<Comment> entities = crepo.findDistinctAllByArticleAid(PageRequest.of(page, size, Direction.DESC, "rid"),
                aid);
        result.put("comments", entities.getContent().stream().map(v -> toDTO(v)).toList());
        result.put("total", entities.getTotalPages());
        return new ResponseEntity<HashMap<String, Object>>(result, HttpStatus.OK);
    }

}