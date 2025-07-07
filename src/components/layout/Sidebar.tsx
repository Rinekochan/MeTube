import {Box, styled, Typography} from '@mui/material';
import {Link, useLocation} from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import StarIcon from '@mui/icons-material/Star';
import {useSidebarContext} from "../../context/SidebarContext.tsx";

const SidebarContainer = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'collapsed'
})<{ collapsed?: boolean }>(({ theme, collapsed }) => ({
    width: '65px',
    height: '100vh',
    backgroundColor: theme.palette.background.default,
    borderRight: `1px solid ${theme.palette.divider}`,
    position: 'fixed',
    top: 0,
    left: collapsed ? -100 : 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '90px',
    zIndex: 10,
    transition: 'left 0.2s ease-in-out',
}));

const NavItem = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'active'
})<{ active?: boolean, collapsed?: boolean }>(({theme, active}) => ({
    width: '60%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 'auto',
    padding: '12px 30px',
    gap: '0px',
    borderRadius: '16px',
    color: active ? theme.palette.text.active : theme.palette.text.secondary,
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'
    }
}));

const NavText = styled(Typography)(() => ({
    fontSize: '12px',
    marginTop: '2px',
    marginLeft: 0,
}));

const Sidebar = () => {
    const location = useLocation();
    const { collapsed } = useSidebarContext();

    return (
        <SidebarContainer collapsed={collapsed}>
            <Link to="/" style={{textDecoration: 'none', width: '100%'}}>
                <NavItem active={location.pathname === '/'} collapsed={collapsed}>
                    <HomeIcon fontSize="medium"/>
                    <NavText>Home</NavText>
                </NavItem>
            </Link>
            <Link to="/favorites" style={{textDecoration: 'none', width: '100%'}}>
                <NavItem active={location.pathname === '/favorites'} collapsed={collapsed}>
                    <StarIcon fontSize="medium"/>
                    <NavText>Favorites</NavText>
                </NavItem>
            </Link>
        </SidebarContainer>
    );
};

export default Sidebar;

