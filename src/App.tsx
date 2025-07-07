import {BrowserRouter as Router} from 'react-router-dom';
import {Box} from '@mui/material';
import Header from './components/layout/Header.tsx';
import Sidebar from './components/layout/Sidebar.tsx';
import {FavoritesProvider} from './context/FavoritesContext.tsx';
import {SidebarProvider} from './context/SidebarContext.tsx';
import RoutesContainer from "./components/common/RoutesContainer.tsx";

const App = () => {
    return (
        <Router>
            <FavoritesProvider>
                <SidebarProvider>
                    <Box sx={{display: 'flex', backgroundColor: 'theme.background.default', minHeight: '100vh'}}>
                        <Header/>
                        <Sidebar/>
                        <RoutesContainer />
                    </Box>
                </SidebarProvider>
            </FavoritesProvider>
        </Router>
    );
};

export default App;