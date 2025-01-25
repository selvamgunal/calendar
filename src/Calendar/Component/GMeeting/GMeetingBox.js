import React from "react";
import {
  Button,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import "./GMeetingBox.css";
import dayjs from "dayjs";
import { Close } from "@mui/icons-material";
import Google from "../../Icons/google_logo.png";
import { calendarMeeting } from "../../CalendarData/CalendarData";

const GMeeting = ({ data, open, close }) => {
  let Round = `Interview Round : ${data?.summary}`;
  let Date = data?.start
    ? `Interview Date : ${dayjs(data.start).format("Do MMM YYYY")}`
    : null;
  let Time =
    data?.start && data?.end
      ? `Interview Time : ${dayjs(data.start).format("hh:mm A")} to ${dayjs(
          data.end
        ).format("hh:mm A")}`
      : null;
  let Interviewer = `Interview with : ${data?.user_det?.candidate?.candidate_firstName}`;
  const meetingLink = calendarMeeting.link;


  const openLink = () => {
    window.open(meetingLink)
}

  return (
    <>
           <Dialog open={open} onClose={() => close(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div></div>
            <div>
              <Close onClick={() => close(false)} />
            </div>
          </div>
        </DialogTitle>
        <DialogContent>
          <Box display="flex" gap={2}>
            <Box
              className="popup-left"
              display="flex"
              flexDirection="column"
              alignItems="center"
              gap={2}
            >
              <img src={Google} width={100} height={100} />

              <Button
                variant="contained"
                color="primary"
                className="join-button"
                onClick={openLink}
              >
                Join
              </Button>
            </Box>

            <Box className="popup-right">
              <div className="meeting-title">Meeting Info</div>
              <div className="meeting-info">{Round}</div>
              <div className="meeting-info">{Date}</div>
              <div className="meeting-info">{Time}</div>
              <div className="meeting-info">{Interviewer}</div>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GMeeting;
