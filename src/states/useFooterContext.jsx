import { createContext, useContext, useState } from "react";

const FooterContext = createContext({
  hideFooter: false,
  setHideFooter: () => {},
});

export const FooterProvider = ({ children }) => {
  const [hideFooter, setHideFooter] = useState(false);
  return (
    <FooterContext.Provider value={{ hideFooter, setHideFooter }}>
      {children}
    </FooterContext.Provider>
  );
};

export const useFooterContext = () => useContext(FooterContext);
