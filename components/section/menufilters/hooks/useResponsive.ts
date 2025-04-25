import { useMediaQuery } from 'react-responsive';

export const useResponsive = () => {
  const isTablet = useMediaQuery({ query: '(max-width: 1023px)' });
  const isDesktop = useMediaQuery({ query: '(min-width: 1024px)' });
  
  return {
    isTablet,
    isDesktop,
  };
};