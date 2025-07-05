import {Box, styled, Typography} from '@mui/material';
import {Link, useLocation} from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import StarIcon from '@mui/icons-material/Star';
import { useSidebar } from '../../hooks/useSidebar';

const SidebarContainer = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'collapsed'
})<{ collapsed?: boolean }>(({ theme, collapsed }) => ({
    width: collapsed ? '65px' : 'auto',
    height: '100vh',
    backgroundColor: theme.palette.background.default,
    borderRight: `1px solid ${theme.palette.divider}`,
    position: 'fixed',
    top: 0,
    left: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '90px',
    zIndex: 10,
}));

const NavItem = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'active' && prop !== 'collapsed'
})<{ active?: boolean, collapsed?: boolean }>(({theme, active, collapsed}) => ({
    width: collapsed ? '60%' : 'auto',
    display: 'flex',
    flexDirection: collapsed ? 'column' : 'row',
    alignItems: 'center',
    justifyContent: collapsed ? 'center' : 'flex-start',
    margin: collapsed ? 'auto' : 'auto 8px',
    padding: collapsed ? '12px 30px' : '16px 24px',
    gap: collapsed ? '0px' : '8px',
    borderRadius: '16px',
    color: active ? theme.palette.text.active : theme.palette.text.secondary,
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'
    }
}));

const NavText = styled(Typography, {
    shouldForwardProp: (prop) => prop !== 'collapsed'
})<{ collapsed?: boolean }>(({ collapsed }) => ({
    fontSize: collapsed ? '12px' : '14px',
    marginTop: '2px',
    marginLeft: collapsed ? 0 : '8px',
}));

const Sidebar = () => {
    const location = useLocation();
    const { collapsed } = useSidebar();

    return (
        <SidebarContainer collapsed={collapsed}>
            <Link to="/" style={{textDecoration: 'none', width: '100%'}}>
                <NavItem active={location.pathname === '/'} collapsed={collapsed}>
                    <HomeIcon fontSize="medium"/>
                    <NavText collapsed={collapsed}>Home</NavText>
                </NavItem>
            </Link>
            <Link to="/favourite" style={{textDecoration: 'none', width: '100%'}}>
                <NavItem active={location.pathname === '/favourite'} collapsed={collapsed}>
                    <StarIcon fontSize="medium"/>
                    <NavText collapsed={collapsed}>Favourite</NavText>
                </NavItem>
            </Link>
        </SidebarContainer>
    );
};

export default Sidebar;

