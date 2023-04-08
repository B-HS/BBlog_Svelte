package dev.hyns.bblogbackend.Security;

import java.io.IOException;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.RedirectStrategy;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final SiteManagerRepository srepo;
    private final JWTManager jwtManager;

    @Override
    @Transactional
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
            Authentication authentication) throws IOException, ServletException {
        SiteManager member = srepo.findById(1L).get();
        String token = jwtManager.tokenGenerate(member.getAdminId(), member.getNickname(), member.getImg(), 10L);
        member.updateToken(token);
        srepo.save(member);
        response.addCookie(new Cookie("token", token));
        response.getWriter().write("logged");
        super.onAuthenticationSuccess(request, response, authentication);
    }

    protected class NoRedirectStrategy implements RedirectStrategy {

        @Override
        public void sendRedirect(HttpServletRequest request,
                HttpServletResponse response, String url) throws IOException {

        }

    }

}