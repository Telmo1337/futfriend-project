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

  useEffect(() => {
    API.get(`/stats/ranking?by=${orderBy}`)
      .then(res => setUsers(res.data));
  }, [orderBy]);

  return (
    <Paper sx={{ p: 3, borderRadius: 3 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Jogador</TableCell>
            <TableCell align="right">{config.label}</TableCell>
            {config.showWinRate && (
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
                sx={{ bgcolor: isMe ? "action.selected" : "inherit" }}
              >
                <TableCell>
                  {i + 1}
                  {i < 3 && (
                    <Chip
                      size="small"
                      label={["🥇", "🥈", "🥉"][i]}
                      sx={{ ml: 1 }}
                    />
                  )}
                </TableCell>

                <TableCell>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar>
                      {u.nickname.charAt(0).toUpperCase()}
                    </Avatar>

                    <Typography fontWeight={isMe ? 600 : 400}>
                      {u.nickname}
                    </Typography>

                    {isMe && (
                      <Chip label="Tu" size="small" color="primary" />
                    )}
                  </Stack>
                </TableCell>

                <TableCell align="right">
                  {config.value(u)}
                </TableCell>

                {config.showWinRate && (
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

