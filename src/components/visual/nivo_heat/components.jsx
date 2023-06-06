import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import { ResponsiveCalendar } from '@nivo/calendar';
import { mockHeatBoxData as data } from "../data/mockData";

const HeatBoxChart = ({ isDashboard = false }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    
return(
    <ResponsiveCalendar
    data={data}
    theme={{
        // added
        textColor: colors.grey[100],
        
      }}
        
        from="2015-03-01"
        to="2016-07-12"
        emptyColor="#eeeeee"
        colors={[ '#e1e2fe','#c3c6fd', '#a4a9fc', '#868dfb', '#6870fa', '#535ac8', '#3e4396',   ]}
        margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
        yearSpacing={40}
        monthBorderColor="#d2d0d0"
        dayBorderWidth={2}
        dayBorderColor="#ffffff"
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'row',
                translateY: 36,
                itemCount: 4,
                itemTextColor: '#ffffff', //don't need
                itemWidth: 42,
                itemHeight: 36,
                itemsSpacing: 14,
                itemDirection: 'right-to-left'
            }
        ]}
    />
    ); 
};
    
    export default HeatBoxChart;