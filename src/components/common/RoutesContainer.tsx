import {useSidebarContext} from "../../context/SidebarContext.tsx";
import {Box} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import HomePage from "../../pages/HomePage.tsx";
import VideoPage from "../../pages/VideoPage.tsx";
import SearchPage from "../../pages/SearchPage.tsx";
import FavoritesPage from "../../pages/FavoritesPage.tsx";

const RoutesContainer = () => {
    const { collapsed } = useSidebarContext();
    return (
        <Box component="main" sx={{
            flexGrow: 1,
            minHeight: '100vh',
            ml: collapsed ? '0px' : '64px',
            mt: '64px',
            p: 4,
            transition: 'margin-left 0.2s ease-in-out',
        }}>
            <Routes>
                <Route path={"/"} element={<HomePage/>}/>
                <Route path={"/video/:id"} element={<VideoPage/>}/>
                <Route path={"/search"} element={<SearchPage/>}/>
                <Route path={"/favorites"} element={<FavoritesPage/>}/>
            </Routes>
        </Box>
    );
};

export default RoutesContainer;