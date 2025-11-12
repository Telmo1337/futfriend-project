import { Card, CardContent, Typography } from "@mui/material";

const StatCard = ({ title, value }) => {
  return (
    <Card
      sx={{
        flex: 1,
        p: 2,
        borderRadius: 3,
        textAlign: "center",
        boxShadow: 2,
      }}
    >
      <CardContent>
        <Typography variant="h6" color="text.secondary">
          {title}
        </Typography>
        <Typography variant="h4" fontWeight="bold">
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default StatCard;
