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
} from "@mui/material";
import API from "@/api/axios";

export default function RankingTable({ orderBy }) {
  const [users, setUsers] = useState([]);

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
            <TableCell align="right">
              {orderBy === "goals" ? "Golos" : "Vitórias"}
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {users.map((u, i) => (
            <TableRow key={u.id}>
              <TableCell>{i + 1}</TableCell>

              <TableCell>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar>
                    {u.nickname.charAt(0).toUpperCase()}
                  </Avatar>
                  <Typography>{u.nickname}</Typography>
                </Stack>
              </TableCell>

              <TableCell align="right">
                {orderBy === "goals" ? u.goals : u.victories}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
