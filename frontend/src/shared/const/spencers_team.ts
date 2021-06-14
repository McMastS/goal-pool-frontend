export interface Player {
    id: number,
    name: string,
    team: string,
    gp: number,
    shots: number,
    shooting_percentage: number,
    goals: number,
}

export interface UserTeam {
    id: number,
    name: string,
    owner: string,
    players: Player[],
}

export const spencer_team: UserTeam = {
    id: 1,
    name: "Spencer's Team",
    owner: "Spencer McMaster",
    players: [
        { id: 1, name: "Alex Ovechkin", team: "Washington Capitals", gp: 43, shots: 101, shooting_percentage: 14, goals: 14},
        { id: 2, name: "Blake Wheeler", team: "Winnipeg Jets", gp: 45, shots: 84, shooting_percentage: 21, goals: 17},
        { id: 3, name: "Sean Monahan", team: "Calgary Flames", gp: 42, shots: 117, shooting_percentage: 7, goals: 8},
    ]
}