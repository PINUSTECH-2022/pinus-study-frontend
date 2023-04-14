/**
 * Format: color_name_opacity
 * If opacity is not defined, then it is 100% by default.
 */
export const Colors = {
    blue: "#1F2E6E",
    blue_accent: "#222638",
    red: "#FF3A3A",
    red_accent: "#CD3838",
    dark_grey: "#2D2D2F",
    dark_grey_75: "#2D2D2F75",
    light_grey: "#8F8F8F",
    light_grey_75: "#8F8F8F75",
    light_grey_50: "#8F8F8F50",
    light_grey_25: "#8F8F8F25",
    light_grey_two: "#D9D9D9", // input background color
    white: "#F5F5F5",
    pure_white: "#FFFFFF",
    white_accent: "#BDBDBD", // for pressed module threads
    yellow: "#EFB61E",
    yellow_accent: "#c2910e",
    black: "#000000",
    light_black: "#444444",
}

export const API_URL = 'http://localhost:8080';
// export const API_URL = 'https://pinus-study-backend-deployment-production.up.railway.app';

export const LOGIN_URL = `${API_URL}/login`;
export const USER_URL = `${API_URL}/user`;
