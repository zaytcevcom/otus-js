import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {CssBaseline, ThemeProvider, createTheme} from '@mui/material';
import ProblemPage from './pages/ProblemPage';
import ProblemManagePage from './pages/ProblemManagePage';
import ProblemListPage from './pages/ProblemListPage';
import Header from './components/common/Header';

const theme = createTheme({
    palette: {
        primary: {
            main: '#263238',
        },
        secondary: {
            main: '#ffa726',
        },
    },
});

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<ProblemListPage />} />
                    <Route path="/problems" element={<ProblemListPage />} />
                    <Route path="/problem/:id" element={<ProblemPage />} />
                    <Route path="/manage" element={<ProblemManagePage />} />
                    <Route path="/manage/:id" element={<ProblemManagePage />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}
