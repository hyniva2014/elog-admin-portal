import { CarrierNameText, PopupMessageContainer, RequestedCountText } from "./RequestDevice.styled";

const RequestDevicePopupMessage = ({
  available,
  requested,
  carrierName,
}) => {
 if (available === 0) {
       return (
         <PopupMessageContainer>
           No devices are available in stock for{" "}
           <CarrierNameText>{carrierName}</CarrierNameText>.
         </PopupMessageContainer>
       );
     }
 
     if (available < requested) {
       return (
         <PopupMessageContainer>
           Only <RequestedCountText>{available}</RequestedCountText> devices are
           available out of <RequestedCountText>{requested}</RequestedCountText>{" "}
           requested devices for <CarrierNameText>{carrierName}</CarrierNameText>
           .
         </PopupMessageContainer>
       );
     }

return (
      <PopupMessageContainer>
        Are you sure you want to approve{" "}
        <RequestedCountText>{requested}</RequestedCountText> requested devices
        to <CarrierNameText>{carrierName}</CarrierNameText>?
      </PopupMessageContainer>
    );
};

export default RequestDevicePopupMessage;