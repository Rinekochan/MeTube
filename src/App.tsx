import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import Header from './components/layout/Header.tsx';
import Sidebar from './components/layout/Sidebar.tsx';
import HomePage from './pages/HomePage.tsx';

const App = () => {
    return (
        <Router>
            <Box sx ={{ display: 'flex', backgroundColor: 'theme.background.default', minHeight: '100vh'}}>
                <Header />
                <Sidebar />
                <Box component="main" sx={{ flexGrow: 1, minHeight: '100vh' }}>
                    <Routes>
                        <Route path={"/"} element={<HomePage />} />
                    </Routes>
                </Box>
            </Box>
        </Router>
    );
};

export default App;