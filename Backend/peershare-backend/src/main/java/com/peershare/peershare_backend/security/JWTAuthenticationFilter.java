package com.peershare.peershare_backend.security;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JWTAuthenticationFilter extends OncePerRequestFilter {

  @Autowired
  private JWTHelper jwtHelper;

  @Autowired
  private UserDetailsService userDetailsService;

  @Override
  protected void doFilterInternal(
      @NonNull HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull FilterChain filterChain)
      throws ServletException, IOException {
    String requestHeader = request.getHeader("Authorization");
    String username = null;
    String token = null;
    if (requestHeader != null && requestHeader.startsWith("Bearer")) {
      // looking good
      token = requestHeader.substring(7);
      try {

        username = this.jwtHelper.getUsernameFromToken(token);

      } catch (IllegalArgumentException e) {
        logger.info("Illegal Argument while fetching the username !!");
      } catch (ExpiredJwtException | MalformedJwtException e) {
        logger.info("Given jwt token is expired !!");
      }
      // logger.info("Some changed has done in token !! Invalid Token");
      catch (Exception e) {

      }

    } else {
      logger.info("Invalid Header Value !! ");
    }

    //
    if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {

      // fetch user detail from username
      UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
      Boolean validateToken = this.jwtHelper.validateToken(token, userDetails);
      if (validateToken) {

        // set the authentication
        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails,
            null,
            userDetails.getAuthorities());
        authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        SecurityContextHolder.getContext().setAuthentication(authentication);

      } else {
        logger.info("Validation fails !!");
      }

    }

    filterChain.doFilter(request, response);

  }
}
