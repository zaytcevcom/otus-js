import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProblemPage from './pages/ProblemPage';
import ProblemManagePage from './pages/ProblemManagePage';
import ProblemListPage from './pages/ProblemListPage';
import Header from './components/common/Header';

export default function App() {
    return (
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
    );
}
