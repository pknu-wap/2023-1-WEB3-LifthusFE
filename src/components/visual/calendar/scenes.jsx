import { useState } from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";

const Calendar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentEvents, setCurrentEvents] = useState([]);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const initialEvents = [
    {
      id: "1",
      title: "Event 1",
      start: "2023-06-01",
    },
    {
      id: "2",
      title: "Event 2",
      start: "2023-06-05",
    },
    {
      id: "3",
      title: "Event 3",
      start: "2023-06-10",
    },
  ];

  const handleDateClick = (selected) => {
    const selectedDateStr = selected.dateStr;
    const eventsOnSelectedDate = initialEvents.filter((event) => {
      return event.start === selectedDateStr;
    });
    setCurrentEvents(eventsOnSelectedDate);
  };
  // const handleDateClick = (selected) => {
  //   const selectedDateStr = selected.dateStr;
  //   window.open(`/popup?date=${selectedDateStr}`, "_blank", "width=400,height=400");
  // };

  /*Modal*/
  /*const open = document.getElementById("my_resume");
  const close = document.getElementById("close");
  const modal = document.querySelector(".modal_wrapper");
  
  open.addEventListener('click', function() {
    modal.style.display = "flex"; 
  })
  
  close.addEventListener('click', function() {
    modal.style.display = "none"; 
  })*/

  const handleEventClick = (selected) => {
    if (
      window.confirm(
        `정말 메모를 삭제 하시겠습니까?'${selected.event.title}'`
      )
    ) {
      selected.event.remove();
    }
  };

  return (
    <Box m="20px">
      <Header title="Calendar" subtitle="Full Calendar Interactive Page" />

      {/* CALENDAR */}
      <Box flex="1 1 70%" ml={isSmallScreen ? "0" : "15px"}>
        <FullCalendar
          height="75vh"
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
            listPlugin,
          ]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
          }}
          initialView="dayGridMonth"
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          eventsSet={(events) => setCurrentEvents(events)}
          initialEvents={initialEvents}
        />
      </Box>

      {/* CALENDAR SIDEBAR */}
      <Box
        flex="1 1 30%"
        backgroundColor={colors.primary[400]}
        p="15px"
        borderRadius="4px"
      >
        <Typography variant="h5">Events</Typography>
        <List>
          {currentEvents.map((event) => (
            <ListItem
              key={event.id}
              sx={{
                backgroundColor: colors.greenAccent[500],
                margin: "10px 0",
                borderRadius: "2px",
              }}
            >
              <ListItemText
                primary={event.title}
                secondary={
                  <Typography variant={isSmallScreen ? "body2" : "body1"}>
                    {formatDate(event.start, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default Calendar;