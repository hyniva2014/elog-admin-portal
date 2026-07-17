import React, { useCallback, useEffect, useRef, useState } from "react";
import { Box, Typography } from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DevicesIcon from "@mui/icons-material/Devices";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonIcon from "@mui/icons-material/Person";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import SecurityIcon from "@mui/icons-material/Security";
import DnsIcon from "@mui/icons-material/Dns";
import LinkIcon from "@mui/icons-material/Link";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CodeIcon from "@mui/icons-material/Code";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import AndroidIcon from "@mui/icons-material/Android";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import {
  AlertCard,
  AlertContent,
  AlertCardChevron,
} from "./AlertCenterScreenCard.styles.jsx";

import {
  ALERT_CENTRE_MODULES,
  getCleanTitle,
  REPORTED_SITE_MAP,
  INCIDENT_EVENT_TYPES_MAP,
  getSeverityColor,
} from "./AlertCategoryConfig";

const AlertCardItem = ({ item, isSelected, onSelect }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    if (isSelected && cardRef.current) {
      setTimeout(() => {
        cardRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "nearest",
        });
      }, 50);
    }
  }, [isSelected]);

  const { severity = "Medium", created_at, date, time } = item;

  const handleClick = useCallback(() => {
    onSelect(item);
  }, [item, onSelect]);

  const displayTitle = getCleanTitle(item);

  const [resolvedLocation, setResolvedLocation] = useState("-");

  const latitude = item.latitude;
  const longitude = item.longitude;
  const location = item.location;

  useEffect(() => {
    if (location && location !== "-") {
      setResolvedLocation(location);
    } else if (latitude && longitude) {
      setResolvedLocation(`${latitude}, ${longitude}`);
    } else {
      setResolvedLocation("-");
    }
  }, [location, latitude, longitude]);

  const getDetailFields = () => {
    const details = [];
    const moduleNum = Number(item.alert_module);

    switch (moduleNum) {
      case ALERT_CENTRE_MODULES.ELD_DEVICE_MONITORING:
      case ALERT_CENTRE_MODULES.ASSET_MANAGEMENT:
        details.push({
          icon: BusinessIcon,
          value: item.company_name || item.carrier_name || "-",
        });
        details.push({
          icon: DevicesIcon,
          value: item.device_serial_number || item.serial || "-",
        });
        break;

      case ALERT_CENTRE_MODULES.INCIDENT_MANAGEMENT:
        details.push({
          icon: BusinessIcon,
          value: item.company_name || item.carrier_name || "-",
        });
        details.push({
          icon: PersonIcon,
          value: item.driver_name || "-",
        });
        details.push({
          icon: LocalShippingIcon,
          value: item.truck_number || "-",
        });
        details.push({
          icon: null,
          value: severity,
          isSeverity: true,
        });
        break;

      case ALERT_CENTRE_MODULES.MOBILE_MODULE:
        details.push({
          icon: BusinessIcon,
          value: item.company_name || item.carrier_name || "-",
        });
        details.push({
          icon: AndroidIcon,
          value: `Android ${item.android_version || "-"}`,
        });
        details.push({
          icon: PhoneAndroidIcon,
          value: item.device_name || "-",
        });
        break;

      case ALERT_CENTRE_MODULES.CARRIER_REQUESTS:
        details.push({
          icon: BusinessIcon,
          value: item.company_name || item.carrier_name || "-",
        });
        details.push({
          icon: PersonIcon,
          value: item.reported_by || "-",
        });
        break;

      case ALERT_CENTRE_MODULES.SECURITY:
        details.push({
          icon: PersonIcon,
          value: item.email || "-",
        });
        details.push({
          icon: DnsIcon,
          value: item.network_ip || "-",
        });
        break;

      case ALERT_CENTRE_MODULES.SYSTEM_MONITORING:
      case ALERT_CENTRE_MODULES.APPLICATION_ERRORS:
        let apiLabel = "-";
        if (item.message && item.message.includes("POST")) {
          apiLabel =
            "POST " + item.message.split("POST")[1].split(":")[0].trim();
        } else if (item.message && item.message.includes("GET")) {
          apiLabel = "GET " + item.message.split("GET")[1].split(":")[0].trim();
        }
        details.push({
          icon: BusinessIcon,
          value: item.company_name || item.carrier_name || "-",
        });
        details.push({
          icon: CodeIcon,
          value: apiLabel,
        });
        details.push({
          icon: ShowChartIcon,
          value: item.error_rate ? `Error Rate: ${item.error_rate}` : "-",
        });
        break;

      case ALERT_CENTRE_MODULES.INTEGRATION:
        details.push({
          icon: BusinessIcon,
          value: item.company_name || item.carrier_name || "-",
        });
        break;

      default:
        if (item.company_name) {
          details.push({
            icon: BusinessIcon,
            value: item.company_name,
          });
        }
        break;
    }

    return details;
  };

  const getSecondRowFields = () => {
    const details = [];
    const moduleNum = Number(item.alert_module);

    if (moduleNum === ALERT_CENTRE_MODULES.INCIDENT_MANAGEMENT) {
      if (item.reported_site) {
        details.push({
          icon: DevicesIcon,
          value: REPORTED_SITE_MAP[item.reported_site] || "-",
        });
      }
      if (item.module_reported_from) {
        details.push({
          icon: CodeIcon,
          value: INCIDENT_EVENT_TYPES_MAP[item.module_reported_from] || "-",
        });
      }
    }

    return details;
  };

  const detailFields = getDetailFields();
  const secondRowFields = getSecondRowFields();
  const formattedTime =
    created_at || date || time
      ? new Date(created_at || date || time).toLocaleString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      : "-";

  const moduleNum = Number(item.alert_module);
  const isIncident = moduleNum === ALERT_CENTRE_MODULES.INCIDENT_MANAGEMENT;

  return (
    <AlertCard ref={cardRef} active={isSelected} onClick={handleClick}>
      <AlertContent
        style={{
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Typography
            style={{ fontSize: "15px", fontWeight: 700, color: "#111827" }}
          >
            {displayTitle}
          </Typography>
          <Typography
            style={{
              fontSize: "13px",
              fontWeight: 600,
              color: getSeverityColor(severity?.toLowerCase()),
            }}
          >
            {severity}
          </Typography>
        </Box>

        <Box
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
            width: "100%",
          }}
        >
          {detailFields.map((field, idx) => {
            if (field.isSeverity) {
              return null; 
            }
            const IconComp = field.icon;
            return (
              <React.Fragment key={idx}>
                {idx > 0 && <span style={{ color: "#D1D5DB" }}>|</span>}
                <Box
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    color: "#4B5563",
                    fontSize: "13px",
                  }}
                >
                  <IconComp style={{ fontSize: "16px", color: "#9CA3AF" }} />
                  <span>{field.value}</span>
                </Box>
              </React.Fragment>
            );
          })}
        </Box>

        {isIncident && secondRowFields.length > 0 && (
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "12px",
              width: "100%",
            }}
          >
            {secondRowFields.map((field, idx) => {
              const IconComp = field.icon;
              return (
                <React.Fragment key={idx}>
                  {idx > 0 && <span style={{ color: "#D1D5DB" }}>|</span>}
                  <Box
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      color: "#4B5563",
                      fontSize: "13px",
                    }}
                  >
                    <IconComp style={{ fontSize: "16px", color: "#9CA3AF" }} />
                    <span>{field.value}</span>
                  </Box>
                </React.Fragment>
              );
            })}
          </Box>
        )}

        <Box
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            width: "100%",
            marginTop: "2px",
          }}
        >
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              color: "#6B7280",
              fontSize: "13px",
            }}
          >
            <LocationOnIcon style={{ fontSize: "16px", color: "#9CA3AF" }} />
            <span>{resolvedLocation}</span>
          </Box>
          <span style={{ color: "#D1D5DB" }}>|</span>
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              color: "#6B7280",
              fontSize: "13px",
            }}
          >
            <AccessTimeIcon style={{ fontSize: "16px", color: "#9CA3AF" }} />
            <span>{formattedTime}</span>
          </Box>
        </Box>
      </AlertContent>
      <AlertCardChevron>
        <ChevronRightIcon fontSize="small" />
      </AlertCardChevron>
    </AlertCard>
  );
};

export default AlertCardItem;
