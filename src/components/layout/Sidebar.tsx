import {Box, styled, Typography} from '@mui/material';
import {Link, useLocation} from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import StarIcon from '@mui/icons-material/Star';

const SidebarContainer = styled(Box)(({theme}) => ({
    width: '100px',
    height: '100vh',
    backgroundColor: theme.palette.background.default,
    borderRight: `1px solid ${theme.palette.divider}`,
    position: 'fixed',
    top: 0,
    left: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '100px',
    zIndex: 10
}));

const NavItem = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'active'
})<{ active?: boolean }>(({theme, active}) => ({
    width: '60%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: 'auto',
    padding: '16px 36px',
    borderRadius: '16px',
    color: active ? theme.palette.text.primary : theme.palette.text.secondary,
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'
    }
}));

const NavText = styled(Typography)(({theme}) => ({
    fontSize: '12px',
    marginTop: '4px',
}));

const Sidebar = () => {
    const location = useLocation();

    return (
        <SidebarContainer>
            <Link to="/" style={{ textDecoration: 'none', width: '100%' }}>
                <NavItem active={location.pathname === '/'}>
                    <HomeIcon fontSize="medium" />
                    <NavText>Home</NavText>
                </NavItem>
            </Link>
            <Link to="/favourite" style={{ textDecoration: 'none', width: '100%' }}>
                <NavItem active={location.pathname === '/favourite'}>
                    <StarIcon fontSize="medium" />
                    <NavText>Favourite</NavText>
                </NavItem>
            </Link>
        </SidebarContainer>
    );
};

export default Sidebar;

