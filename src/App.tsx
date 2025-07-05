import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {Box} from '@mui/material';
import Header from './components/layout/Header.tsx';
import Sidebar from './components/layout/Sidebar.tsx';
import HomePage from './pages/HomePage.tsx';
import {SidebarContext} from './context/SidebarContext.tsx';
import {useSidebarState} from './hooks/useSidebar';

const App = () => {
    const sidebarState = useSidebarState();

    return (
        <Router>
            <SidebarContext.Provider value={sidebarState}>
                <Box sx={{display: 'flex', backgroundColor: 'theme.background.default', minHeight: '100vh'}}>
                    <Header/>
                    <Sidebar/>
                    <Box component="main" sx={{flexGrow: 1, minHeight: '100vh'}}>
                        <Routes>
                            <Route path={"/"} element={<HomePage/>}/>
                        </Routes>
                    </Box>
                </Box>
            </SidebarContext.Provider>
        </Router>
    );
};

export default App;