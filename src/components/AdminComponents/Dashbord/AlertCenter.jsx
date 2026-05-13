import { Box, Paper, Typography } from "@mui/material";

const CommonAlertCenter = ({
  title = "Alert Center",
  viewAllText = "View All",
  alerts = [],
  onViewAll,
}) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        paddingTop: 0,
        border: "1px solid #E5E7EB",
        borderRadius: 2,
        height: 360,
        overflow: "auto",
      }}
    >
      <Box>
        {/* Header */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
          sx={{
            position: "sticky",
            top: 0,
            zIndex: 10,
            background: "#fff",
            py: 1,
          }}
        >
          <Typography fontSize={18} fontWeight={700} color="#0F172A">
            {title}
          </Typography>

          <Typography
            onClick={onViewAll}
            sx={{
              fontSize: 11,
              fontWeight: 500,
              color: "#64748B",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            {viewAllText}
          </Typography>
        </Box>

        {/* Alert Cards */}
        <Box display="flex" flexDirection="column" gap={1}>
          {alerts.map((item, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "stretch",
                background: "#F8FAFC",
                borderRadius: "10px",
                overflow: "hidden",
                minHeight: 90,
                border: "1px solid rgba(226,232,240,0.8)",
              }}
            >
              {/* Left Color Bar */}
              <Box
                sx={{
                  width: "6px",
                  backgroundColor: item.color,
                }}
              />

              {/* Content */}
              <Box
                sx={{
                  flex: 1,
                  p: 2,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                {/* Left Content */}
                <Box>
                  <Typography
                    sx={{
                      fontSize: 14,
                      fontWeight: 400,
                      color: "#475569",
                      mb: 1,
                    }}
                  >
                    {item.severity}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: 20,
                      fontWeight: 500,
                      color: "#0F172A",
                      lineHeight: 1.4,
                    }}
                  >
                    {item.message}
                  </Typography>
                </Box>

                {/* Time */}
                <Typography
                  sx={{
                    fontSize: 16,
                    fontWeight: 500,
                    color: "#64748B",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.time}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Paper>
  );
};

export default CommonAlertCenter;
