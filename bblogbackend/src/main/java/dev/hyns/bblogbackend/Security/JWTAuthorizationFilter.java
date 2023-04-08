package dev.hyns.bblogbackend.Security;

import java.io.IOException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JWTAuthorizationFilter extends OncePerRequestFilter {
    private final JWTManager jwtManager;
    private final UserDetailsServiceImpl udserimpl;
    private final SiteManagerRepository srepo;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String token = request.getHeader("token");
        
        if (token == null) {
            filterChain.doFilter(request, response);
            return;
        }

        SiteManager member = srepo.findById(1L).orElseThrow(() -> new UsernameNotFoundException("INVALID USER"));
        if(member.getToken() == token){
            SecurityContextHolder.getContext().setAuthentication(getAuthentication(member.getAdminId()));
            String newToken = jwtManager.tokenGenerate(member.getAdminId(), member.getNickname(), member.getImg(), 10L);
            response.addCookie(new Cookie("token", newToken));
            filterChain.doFilter(request, response);
        }
    }

    public Authentication getAuthentication(String email) {
        UserDetails userDetails = udserimpl.loadUserByUsername(email);
        return new UsernamePasswordAuthenticationToken(userDetails, userDetails.getPassword(),
                userDetails.getAuthorities());
    }

}