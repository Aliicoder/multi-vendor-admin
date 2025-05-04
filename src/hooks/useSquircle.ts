import { useEffect, useState } from "react";

const useSquircle = () =>{
  const [cornerRadius, setCornerRadius] = useState(16);

  const updateCornerRadius = () => {
    if (window.matchMedia("(min-width: 1024px)").matches) {
      setCornerRadius(16);
    } else if (window.matchMedia("(min-width: 768px)").matches) {
      setCornerRadius(16); 
    } else {
      setCornerRadius(8); 
    }
  };

  useEffect(() => {
    updateCornerRadius();
    window.addEventListener("resize", updateCornerRadius);
    return () => {
      window.removeEventListener("resize", updateCornerRadius);
    };
  }, []);

  return cornerRadius
}

export default useSquircle