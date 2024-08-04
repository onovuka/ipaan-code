import { Typography, Box } from "@mui/material";
import logo from "@/assets/uctlogo.png";

function Header() {
  return (
    <Box mb="30px" display="flex" alignItems="center"> {/* Added alignItems */}
      <img
        src={logo}
        alt="IPAAN Logo"
        style={{ width: 150, height: 100
            , marginRight: 10, marginTop:-10 }}
      />
      <Box display="flex" flexDirection="column"> {/* Added Box for vertical layout */}
        <Typography variant="h2" fontWeight="bold" sx={{ m: "0 0 5px 0" }}>
          IPAAN
        </Typography>
        <Typography variant="h5">
          Internet Performance Analytics for African Networks
        </Typography>
      </Box>
    </Box>
  );
}

export default Header;