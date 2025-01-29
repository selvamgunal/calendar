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
  const meetingDetails = [
    { label: "Position:", value: data?.user_det?.job_id?.jobRequest_Title },
    { label: "Interview Round:", value: data?.summary },
    { label: "Created By:", value: data?.user_det?.job_id?.jobRequest_createdBy || "Camila lopez" },
    { label: "Interview Date:", value: data?.start ? dayjs(data.start).format("Do MMM YYYY") : "N/A" },
    { label: "Interview Time:", value: data?.start && data?.end ? `${dayjs(data.start).format("hh:mm A")} to ${dayjs(data.end).format("hh:mm A")}` : "N/A" },
    { label: "Interview with:", value: data?.user_det?.candidate?.candidate_firstName },
    { label: "Interview via:", value: "Google Meet" },
  ];

  const meetingLink = calendarMeeting.link;
  const openLink = () => {
    window.open(meetingLink);
  };

  return (
    <Dialog open={open} onClose={() => close(false)} maxWidth="sm" fullWidth>
      <DialogTitle>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div className="meeting-title">Meeting Info</div>
          <Close onClick={() => close(false)} style={{ cursor: "pointer" }} />
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
            <img src={Google} width={100} height={100} alt="Google Meet" />
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
            {meetingDetails.map((item, index) => (
              <div className="meeting-info" key={index}>
                <span className="label">{item.label} </span>
                <span className="value">{item.value}</span>
              </div>
            ))}
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default GMeeting;
