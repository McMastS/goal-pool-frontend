package middleware

import (
	"context"
	"log"
	"net/http"
	"strings"

	"firebase.google.com/go/auth"
)

type AuthMiddleware struct {
	Firebase *auth.Client
}

func (amw *AuthMiddleware) Middleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		bearerToken := r.Header.Get("Authorization")
		bearerToken = strings.TrimSpace(strings.Replace(bearerToken, "Bearer", "", 1))

		token, err := amw.Firebase.VerifyIDToken(context.Background(), bearerToken)
		if err != nil {
			http.Error(w, "Forbidden", http.StatusForbidden)
			return
		}

		log.Println(token)

		next.ServeHTTP(w, r)
	})
}
