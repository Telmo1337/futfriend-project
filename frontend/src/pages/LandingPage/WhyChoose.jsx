import {
    Box,
    Grid,
    Stack,
    Typography,
    Divider,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

import { BEFORE_ITEMS, AFTER_ITEMS } from "./constants";



export default function WhyChoose() {
    return (
        <Box
            sx={{
                py: { xs: 10, md: 14 },
                px: 2,
                backgroundColor: "#ffffff",
            }}
        >
            <Stack spacing={8} alignItems="center">
                <Stack spacing={1} textAlign="center">
                    <Typography variant="h3" fontWeight={600}>
                        Todos já passámos por isto
                    </Typography>
                    <Typography color="text.secondary" maxWidth={620}>
                        Organizar jogos de futebol entre amigos costuma ser confuso.
                        O FutFriend muda isso.
                    </Typography>
                </Stack>

                {/* Before / After */}
                <Grid container spacing={6} maxWidth="md">

                    <Grid item xs={12} md={5}>
                        <Stack spacing={3}>
                            <Stack direction="row" spacing={1} alignItems="center">
                                <WarningAmberIcon color="error" />
                                <Typography variant="h5" fontWeight={600}>
                                    Antes
                                </Typography>
                            </Stack>

                            {BEFORE_ITEMS.map((item, index) => (
                                <Stack
                                    key={index}
                                    direction="row"
                                    spacing={2}
                                    alignItems="flex-start"
                                >
                                    <CloseIcon color="error" sx={{ mt: "2px" }} />
                                    <Typography color="text.secondary">
                                        {item}
                                    </Typography>
                                </Stack>
                            ))}
                        </Stack>
                    </Grid>

                    {/* Divider */}
                    <Grid
                        item
                        xs={12}
                        md={2}
                        sx={{ display: { xs: "none", md: "flex" }, justifyContent: "center" }}
                    >
                        <Divider orientation="vertical" flexItem />
                    </Grid>


                    <Grid item xs={12} md={5}>
                        <Stack spacing={3}>
                            <Stack direction="row" spacing={1} alignItems="center">
                                <AutoAwesomeIcon color="primary" />
                                <Typography variant="h5" fontWeight={600}>
                                    Depois
                                </Typography>
                            </Stack>

                            {AFTER_ITEMS.map((item, index) => (
                                <Stack
                                    key={index}
                                    direction="row"
                                    spacing={2}
                                    alignItems="flex-start"
                                >
                                    <CheckIcon color="success" sx={{ mt: "2px" }} />
                                    <Typography color="text.secondary">
                                        {item}
                                    </Typography>
                                </Stack>
                            ))}
                        </Stack>
                    </Grid>
                </Grid>
            </Stack>
        </Box>
    );
}
