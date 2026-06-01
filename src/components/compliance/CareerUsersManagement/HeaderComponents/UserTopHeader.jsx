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
} from "./UserTopHeader.styled";

const UserTopHeader = ({ data }) => {
  const rolesOptions = useSelector(
    (state) => state.userFilterSlice?.roles || [],
  );

  const roleLabel =
    rolesOptions.find((item) => item.value === data.role)?.label ||
    data.role ||
    "-";
  const profileImage =
    typeof data?.profile_photo === "string"
      ? data.profile_photo
      : data?.profile_photo?.[0]?.file_url || "";

  return (
    <Box sx={TopHeaderSx}>
      {/* LEFT: Avatar + Name */}
      <Box sx={TopHeaderLeftSx}>
        <Avatar src={profileImage} sx={AvatarSx}>
          {data.first_name?.[0]}
          {data.last_name?.[0]}
        </Avatar>
        <Box>
          <Typography fontWeight={600}>
            {data.first_name} {data.last_name}
          </Typography>
          <Typography variant="body2" sx={RoleTextSx}>
            {roleLabel}
          </Typography>
        </Box>
      </Box>

      {/* RIGHT: Dates */}
      <Box sx={TopHeaderRightSx}>
        <DateBlock
          label="Hire Date"
          value={
            data?.hire_date ? dayjs(data.hire_date).format("DD/MM/YYYY") : "-"
          }
        />
        <DateBlock
          label="Drug Test"
          value={
            data?.last_drug_test
              ? dayjs(data.last_drug_test).format("DD/MM/YYYY")
              : "-"
          }
          highlight
        />
      </Box>
    </Box>
  );
};

export default UserTopHeader;
