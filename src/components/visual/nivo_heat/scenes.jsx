import { Box } from "@mui/material";
import HeatBoxChart from "../..visual/nivo_heat/components";

const Heat = () => {
  return (
    <Box m="20px">
      <Header title="HeatBox Chart" subtitle="Simple Heat Box" />
      <Box height="75vh">
        <HeatBoxChart/>
      </Box>
    </Box>
  );
};

export default Heat;
