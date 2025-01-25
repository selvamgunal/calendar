import React, { useState } from "react";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import Dayjs from "dayjs";
import "./MeetingBox.css";
import { Close } from "@mui/icons-material";
import GMeeting from "../GMeeting/GMeetingBox";

const MeetingBox = ({ meeting }) => {
  const [open, setOpen] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState(null);

  const handleClose = () => {
    setOpen(false);
  };

  const openGMeeting = (meetingData) => {
    setSelectedMeeting(meetingData);
  };

  const closeGMeeting = () => {
    setSelectedMeeting(null);
  };

  const firstMeeting = meeting && meeting.length > 0 ? meeting[0] : null;

  return (
    <>
      <Box className="meeting-box" onClick={() => setOpen(true)}>
        {firstMeeting && (
          <div className="meeting-content">
            <div className="blue-bg"></div>
            <div className="content-box" key={firstMeeting.id}>
              <div className="meet-info">
                {firstMeeting?.user_det?.job_id?.jobRequest_Title ||
                  "Not available"}
              </div>
              <div className="meet-info">
                {`Interviewer: ${
                  firstMeeting?.user_det?.handled_by?.firstName ||
                  "Not assigned"
                }`}
              </div>
              <div className="meet-info">
                {`Time: ${
                  firstMeeting?.start
                    ? Dayjs(firstMeeting.start).format("hh:mm A")
                    : "N/A"
                } - ${
                  firstMeeting?.end
                    ? Dayjs(firstMeeting.end).format("hh:mm A")
                    : "N/A"
                }`}
              </div>
              <div className="circle">{meeting && meeting.length}</div>
            </div>
          </div>
        )}
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle style={{ textAlign: "end" }}>
          <Close onClick={handleClose} style={{ cursor: "pointer" }} />
        </DialogTitle>
        <DialogContent style={{ minWidth: "550px" }}>
          {meeting &&
            meeting.map((item) => (
              <div
                className="meeting-content"
                key={item.id}
                style={{ marginBottom: "10px" }}
                onClick={() => openGMeeting(item)}
              >
                <div className="blue-bg"></div>
                <div className="content-box">
                  <div className="meet-info">
                    {item?.user_det?.job_id?.jobRequest_Title ||
                      "Not available"}
                  </div>
                  <div className="meet-info">
                    {item?.summary || "Not available"}
                  </div>
                  <div className="meet-info">
                    {`Interviewer: ${
                      item?.user_det?.handled_by?.firstName || "Not assigned"
                    }`}
                  </div>
                  <div className="meet-info">
                    {`Time: ${
                      item?.start
                        ? Dayjs(item.start).format("hh:mm A")
                        : "N/A"
                    } - ${
                      item?.end ? Dayjs(item.end).format("hh:mm A") : "N/A"
                    }`}
                  </div>
                </div>
              </div>
            ))}
        </DialogContent>
      </Dialog>

      {selectedMeeting && (
        <GMeeting
          open={Boolean(selectedMeeting)}
          data={selectedMeeting}
          close={closeGMeeting}
        />
      )}
    </>
  );
};

export default MeetingBox;
