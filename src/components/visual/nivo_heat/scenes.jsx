import { Box } from "@mui/material";
import Header from "../../components/Header";
import HeatBoxChart from "../../components/HeatBoxChart";

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
