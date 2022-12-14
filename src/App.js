import './App.css';
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from './Routes';
import Layout from './components/Layout'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blue, green, purple } from '@mui/material/colors';


function App() {

  const theme = createTheme({
    palette: {
      primary: {
        main: '#f44336'
      } ,
      success: green,
      secondary: blue,
      error: purple
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Layout >
          <AppRoutes />
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
