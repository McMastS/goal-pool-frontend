package api

// Request sent when drafting a player to a team.
type DraftPlayerRequest struct {
	// ID of the team the player is drafted by.
	TeamId float64 `json:"teamId"`
	// ID of the player being drafted.
	PlayerId float64 `json:"playerId"`
}
