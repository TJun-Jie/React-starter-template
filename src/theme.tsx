import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        fontFamily: ['"Montserrat"', 'Open Sans'].join(',')
       },
    palette: {
        info: {
            main: "#495C83"
        }
       }
})

export default theme;