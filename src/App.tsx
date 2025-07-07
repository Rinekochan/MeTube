import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {Box} from '@mui/material';
import Header from './components/layout/Header.tsx';
import Sidebar from './components/layout/Sidebar.tsx';
import HomePage from './pages/HomePage.tsx';
import VideoPage from './pages/VideoPage.tsx';
import SearchPage from './pages/SearchPage.tsx';
import {FavoritesProvider} from './context/FavoritesContext.tsx';
import {SidebarProvider, useSidebarContext} from './context/SidebarContext.tsx';

const App = () => {
    const { collapsed } = useSidebarContext();

    return (
        <Router>
            <SidebarProvider>
                <FavoritesProvider>
                    <Box sx={{display: 'flex', backgroundColor: 'theme.background.default', minHeight: '100vh'}}>
                        <Header/>
                        <Sidebar/>
                        <Box component="main" sx={{
                            flexGrow: 1,
                            minHeight: '100vh',
                            ml: collapsed ? '64px' : '150px',
                            mt: '64px',
                            p: 4
                        }}>
                            <Routes>
                                <Route path={"/"} element={<HomePage/>}/>
                                <Route path={"/video/:id"} element={<VideoPage/>}/>
                                <Route path={"/search"} element={<SearchPage/>}/>
                            </Routes>
                        </Box>
                    </Box>
                </FavoritesProvider>
            </SidebarProvider>
        </Router>
    );
};

export default App;