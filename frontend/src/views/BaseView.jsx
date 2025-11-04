/* eslint-disable no-unused-vars */
// src/views/BaseView.jsx
import { Box, Typography, CircularProgress, Alert } from "@mui/material";
import { motion } from "framer-motion";

const BaseView = ({ title, loading, error, children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" fontWeight="bold" mb={2}>
          {title}
        </Typography>

        {loading && <CircularProgress />}
        {error && <Alert severity="error">{error}</Alert>}

        {!loading && !error && children}
      </Box>
    </motion.div>
  );
};

export default BaseView;
