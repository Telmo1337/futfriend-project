import { Typography, Divider } from "@mui/material"

const GameInfoSection = ({ game }) => {
    return (
        <>
            <Typography variant="h6" mb={1}>
                {game.teamA} vs {game.teamB}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                 {game.location}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                 {new Date(game.date).toLocaleString("pt-PT")}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                 Tipo:{" "}
                {game.type === "FIVE_A_SIDE"
                    ? "5x5"
                    : game.type === "SEVEN_A_SIDE"
                        ? "7x7"
                        : "11x11"}
            </Typography>
            <Divider sx={{ my: 2 }} />
        </>
    )
}

export default GameInfoSection
