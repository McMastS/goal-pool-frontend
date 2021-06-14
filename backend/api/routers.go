package api

import (
	"fmt"
	"net/http"
	"strings"

	"github.com/gorilla/mux"
)

type Route struct {
	Name        string
	Method      string
	Pattern     string
	HandlerFunc http.HandlerFunc
}

type Routes []Route

func NewRouter() *mux.Router {
	router := mux.NewRouter().StrictSlash(true)

	// firebase := config.SetupFirebase()
	// authMiddleware := middleware.AuthMiddleware{Firebase: firebase}
	// router.Use(authMiddleware.Middleware)

	for _, route := range routes {
		var handler http.Handler
		handler = route.HandlerFunc
		handler = Logger(handler, route.Name)

		router.
			Methods(route.Method).
			Path(route.Pattern).
			Name(route.Name).
			Handler(handler)
	}

	return router
}

func Index(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hello World!")
}

var routes = Routes{
	Route{
		"Index",
		"GET",
		"/",
		Index,
	},

	Route{
		"DraftPost",
		strings.ToUpper("Post"),
		"/draft",
		DraftPost,
	},

	Route{
		"LoginPost",
		strings.ToUpper("Post"),
		"/login",
		LoginPost,
	},

	Route{
		"RegisterPost",
		strings.ToUpper("Post"),
		"/register",
		RegisterPost,
	},

	Route{
		"StandingsGet",
		strings.ToUpper("Get"),
		"/standings/{leagueId}",
		StandingsGet,
	},

	Route{
		"TeamGet",
		strings.ToUpper("Get"),
		"/team/{teamId}",
		TeamGet,
	},
}
