import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Main from "../Main";

const theme = createTheme({
  palette: {
    primary: {
      main: "#38B6FF",
    },
    secondary: {
      main: "#fafafa",
    },
  },
});


function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <Main />
      <Footer />
    </ThemeProvider>
  );
}

export default App;
