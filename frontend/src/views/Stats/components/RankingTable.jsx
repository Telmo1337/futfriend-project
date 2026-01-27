import { useEffect, useState } from "react";
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
  Stack,
  Typography,
  Chip,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import API from "@/api/axios";
import useAuth from "@/components/auth/hooks/useAuth";
import { calcWinRate } from "../utils/stats";

const rankingConfig = {
  victories: {
    label: "Vitórias",
    value: (u) => u.victories,
    showWinRate: true,
  },
  goals: {
    label: "Golos",
    value: (u) => u.goals,
    showWinRate: false,
  },
};

export default function RankingTable({ orderBy }) {
  const [users, setUsers] = useState([]);
  const { user } = useAuth();
  const config = rankingConfig[orderBy];

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    API.get(`/stats/ranking?by=${orderBy}`)
      .then(res => setUsers(res.data));
  }, [orderBy]);

  return (
    <Paper sx={{ p: { xs: 1.5, sm: 3 }, borderRadius: 3 }}>
      <Table size={isMobile ? "small" : "medium"}>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Jogador</TableCell>

            {!isMobile && (
              <TableCell align="right">{config.label}</TableCell>
            )}

            {!isMobile && config.showWinRate && (
              <TableCell align="right">Win rate</TableCell>
            )}
          </TableRow>
        </TableHead>

        <TableBody>
          {users.map((u, i) => {
            const isMe = u.id === user?.id;

            return (
              <TableRow
                key={u.id}
                sx={{
                  bgcolor: isMe ? "action.selected" : "inherit",
                }}
              >
                {/* POSIÇÃO */}
                <TableCell>
                  {i + 1}
                </TableCell>

                {/* JOGADOR */}
                <TableCell>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Avatar
                      sx={{
                        width: isMobile ? 32 : 40,
                        height: isMobile ? 32 : 40,
                      }}
                    >
                      {u.nickname.charAt(0).toUpperCase()}
                    </Avatar>

                    <Stack spacing={0}>
                      <Typography fontWeight={isMe ? 600 : 400}>
                        {u.nickname}
                      </Typography>

                      {isMobile && (
                        <Typography
                          variant="caption"
                          color="text.secondary"
                        >
                          {config.label}: {config.value(u)}
                          {config.showWinRate &&
                            ` • ${calcWinRate(u)}%`}
                        </Typography>
                      )}
                    </Stack>

                    {isMe && (
                      <Chip label="Tu" size="small" color="primary" />
                    )}
                  </Stack>
                </TableCell>

                {/* COLUNAS DESKTOP */}
                {!isMobile && (
                  <TableCell align="right">
                    {config.value(u)}
                  </TableCell>
                )}

                {!isMobile && config.showWinRate && (
                  <TableCell align="right">
                    {calcWinRate(u)}%
                  </TableCell>
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}
