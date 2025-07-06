import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {Box} from '@mui/material';
import Header from './components/layout/Header.tsx';
import Sidebar from './components/layout/Sidebar.tsx';
import HomePage from './pages/HomePage.tsx';
import VideoPage from './pages/VideoPage.tsx';
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
                    <Box component="main" sx={{flexGrow: 1, minHeight: '100vh', ml: sidebarState.collapsed ? '64px' : '150px', mt: '64px', p: 4 }}>
                        <Routes>
                            <Route path={"/"} element={<HomePage/>}/>
                            <Route path={"/video/:id"} element={<VideoPage/>}/>
                        </Routes>
                    </Box>
                </Box>
            </SidebarContext.Provider>
        </Router>
    );
};

export default App;