package app.auth;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

//Цепочка фильтров, проверяющих токен.
// После проверки передает запрос и ответ следующими фильтру с помощью цепочки.
// filterChain.doFilter(req, res)
//Токен - это специальный код, разрешающий доступ к данным конкретного пользователя.
public class TokenFilter extends GenericFilterBean {
    private TokenProvider tokenProvider;
    public TokenFilter(TokenProvider tokenProvider) {
        this.tokenProvider = tokenProvider;
    }
    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain filterChain)
            throws IOException, ServletException {

        String token = tokenProvider.resolveToken((HttpServletRequest) req);
        if (token != null && tokenProvider.validateToken(token)) {
            Authentication auth = tokenProvider.getAuthentication(token);
            SecurityContextHolder.getContext().setAuthentication(auth);
        }
        //Следующий фильтр
        filterChain.doFilter(req, res);
    }
}
