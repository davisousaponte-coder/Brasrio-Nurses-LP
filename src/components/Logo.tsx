import React from 'react';

interface LogoProps {
  className?: string;
  theme?: 'light' | 'dark';
}

export const Logo: React.FC<LogoProps> = ({ className = "h-14 w-auto", theme = 'dark' }) => {
  const isDark = theme === 'dark';
  
  // Direct link from the ImgBB page: https://ibb.co/fdNkrVY8
  // Direct image URL extracted: https://i.ibb.co/Xx57FfZy/Brasrio-sem-fundo.png
  const lightLogoUrl = "https://i.ibb.co/Xx57FfZy/Brasrio-sem-fundo.png";

  // Direct link from the ImgBB page: https://ibb.co/Q3Nww9F3
  // Direct image URL extracted: https://i.ibb.co/67PCCYR7/Brasrio-2-sem-fundo.png
  const darkLogoUrl = "https://i.ibb.co/67PCCYR7/Brasrio-2-sem-fundo.png";

  const logoUrl = isDark ? darkLogoUrl : lightLogoUrl;

  return (
    <img 
      src={logoUrl} 
      alt="BRASRIO Nurses" 
      className={`${className} object-contain`}
      referrerPolicy="no-referrer"
    />
  );
};
