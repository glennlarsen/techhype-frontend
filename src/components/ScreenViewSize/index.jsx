import { useMediaQuery } from "react-responsive";

export const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 1200 });
  return isDesktop ? children : null;
};

export const Tablet = ({ children }) => {
  const isTablet = useMediaQuery({ minWidth: 781, maxWidth: 1200 });
  return isTablet ? children : null;
};

export const TabletAndDesktop = ({ children }) => {
  const isTablet = useMediaQuery({ minWidth: 901 });
  return isTablet ? children : null;
};

export const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 900 });
  return isMobile ? children : null;
};
