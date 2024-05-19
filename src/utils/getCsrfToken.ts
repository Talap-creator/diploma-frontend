// utils/getCsrfToken.ts
import Cookies from 'js-cookie';

export const getCsrfToken = (): string | undefined => {
    console.log(Cookies.get('csrftoken'));
  return Cookies.get('csrftoken');
};
