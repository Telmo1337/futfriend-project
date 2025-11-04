import { Typography, List, ListItem, ListItemText, Box } from "@mui/material";

const PlayerListSection = ({ playersGame, maxPlayersPerTeam }) => {
    const teamA = playersGame.filter((p) => p.team === "teamA");
    const teamB = playersGame.filter((p) => p.team === "teamB");

    const remainingA = maxPlayersPerTeam - teamA.length;
    const remainingB = maxPlayersPerTeam - teamB.length;

    return (
        <Box>
            <Typography variant="subtitle1" mb={1}>
                Equipa A ({teamA.length}/{maxPlayersPerTeam})
            </Typography>
            <List dense>
                {teamA.map((pg) => (
                    <ListItem key={pg.userId}>
                        <ListItemText
                            primary={`${pg.user?.firstName || ""} ${pg.user?.lastName || ""}`.trim() || "Sem nome"}
                            secondary={pg.user?.email}
                        />
                    </ListItem>
                ))}
                {remainingA > 0 && (
                    <Typography variant="body2" color="text.secondary">
                        {remainingA} vagas disponíveis
                    </Typography>
                )}
            </List>

            <Typography variant="subtitle1" mt={2} mb={1}>
                Equipa B ({teamB.length}/{maxPlayersPerTeam})
            </Typography>
            <List dense>
                {teamB.map((pg) => (
                    <ListItem key={pg.userId}>
                        <ListItemText
                            primary={`${pg.user?.firstName || ""} ${pg.user?.lastName || ""}`.trim() || "Sem nome"}
                            secondary={pg.user?.email}
                        />
                    </ListItem>
                ))}
                {remainingB > 0 && (
                    <Typography variant="body2" color="text.secondary">
                        {remainingB} vagas disponíveis
                    </Typography>
                )}
            </List>
        </Box>
    );
};

export default PlayerListSection;
