// components/CsrfTokenSetter.tsx
import { useEffect } from 'react';
import { setCsrfToken } from '../utils/setCsrfToken';

const CsrfTokenSetter: React.FC = () => {
  useEffect(() => {
    setCsrfToken();
  }, []);

  return null; // This component does not render anything
};

export default CsrfTokenSetter;
