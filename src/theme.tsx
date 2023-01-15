import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        fontFamily: ['"Montserrat"', 'Open Sans'].join(',')
       },
    palette: {
        primary: {
            main: "#495C83"
        },
        success: {
            main: "#06c258"
        },
        error: {
            main: "#FF7276"
        }
       }
})

export default theme;