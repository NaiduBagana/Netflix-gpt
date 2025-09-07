export const LOGO_URL = "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg";
export const USER_AVATAR =
  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
  export const API_OPTIONS = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer" + process.env.REACT_APP_TMDB_KEY,
    },
  };
export const IMG_URL = "https://image.tmdb.org/t/p/w500/";
export const BG_URL =
  "https://assets.nflxext.com/ffe/siteui/vlv3/8d617e19-3c3c-4c28-8998-c9b14dbc7200/web/IN-en-20250901-TRIFECTA-perspective_48d84d4e-9558-46b8-a0f3-8b2dc8478431_medium.jpg";