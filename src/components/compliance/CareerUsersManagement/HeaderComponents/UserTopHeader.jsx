import { Avatar, Box, Typography } from "@mui/material";
import DateBlock from "./DateBlock";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import {
  TopHeaderSx,
  TopHeaderLeftSx,
  AvatarSx,
  RoleTextSx,
  TopHeaderRightSx,
  UserNameTextSx,
} from "./UserTopHeader.styled";

const getProfileImage = (profilePhoto) => {
  if (typeof profilePhoto === "string") return profilePhoto;
  return profilePhoto?.[0]?.file_url || "";
};

const getFormattedDate = (date) => {
  if (!date) return "-";
  return dayjs(date).format("DD/MM/YYYY");
};

const getInitials = (data) => {
  return `${data.first_name?.[0] || ""}${data.last_name?.[0] || ""}`;
};

const UserTopHeader = ({ data }) => {
  const roleLabel = data.role;
  const profileImage = getProfileImage(data?.profile_photo);
  const userInitials = getInitials(data);
  const hireDate = getFormattedDate(data?.hire_date);
  const drugTestDate = getFormattedDate(data?.last_drug_test);

  return (
    <Box sx={TopHeaderSx}>
      <Box sx={TopHeaderLeftSx}>
        <Avatar src={profileImage} sx={AvatarSx}>
          {userInitials}
        </Avatar>
        <Box>
          <Typography sx={UserNameTextSx}>
            {data.first_name} {data.last_name}
          </Typography>
          <Typography variant="body2" sx={RoleTextSx}>
            {roleLabel || "No Role Assigned"}
          </Typography>
        </Box>
      </Box>

      {/* RIGHT: Dates */}
      <Box sx={TopHeaderRightSx}>
        <DateBlock label="Hire Date" value={hireDate} />
        <DateBlock label="Drug Test" value={drugTestDate} highlight />
      </Box>
    </Box>
  );
};

export default UserTopHeader;
