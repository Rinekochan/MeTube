import React, {useState} from 'react';
import {
    Box,
    AppBar,
    Toolbar,
    IconButton,
    InputBase,
    styled,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Switch,
    Typography,
    Divider
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import {useNavigate} from 'react-router-dom';
import {ThemeContext} from '../../context/ThemeContext';
import {useSidebarContext} from "../../context/SidebarContext.tsx";
import {useContext} from 'react';
import Logo from '../../assets/Logo.png';

const LogoContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    [theme.breakpoints.down('md')]: {
        display: 'none',
    },
}));

const LogoImage = styled('img')({
    height: '32px',
    marginRight: '8px',
});

const LogoText = styled(Typography)({
    fontWeight: 'bold',
    fontSize: '1.2rem',
});

const SearchContainer = styled(Box)(({ theme }) => ({
    flexGrow: 1,
    maxWidth: '600px',
    margin: '0 auto',
    position: 'relative',
    [theme.breakpoints.up('md')]: {
        transform: 'translateX(-10%)',
        maxWidth: '450px',
    },
    [theme.breakpoints.down('md')]: {
        maxWidth: 'none',
        margin: '0 16px',
    },
}));

const SearchInputBase = styled(InputBase)(({theme}) => ({
    backgroundColor: theme.palette.custom.searchBar,
    borderRadius: '20px',
    padding: '4px 16px',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
        padding: '4px 12px',
        fontSize: '14px',
    },
}));

const StyledSearchIcon = styled(Box)(({theme}) => ({
    position: 'absolute',
    right: '12px',
    top: '55%',
    transform: 'translateY(-48%)',
    color: theme.palette.text.secondary,
    [theme.breakpoints.down('sm')]: {
        right: '8px',
    },
}));

const Header = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [settingsOpen, setSettingsOpen] = useState(false);
    const navigate = useNavigate();
    const {toggleThemeStyle, themeStyle} = useContext(ThemeContext);
    const { toggleSidebar } = useSidebarContext();

    const handleSearchSubmit = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && searchQuery.trim()) {
            navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery('');
        }
    }

    const toggleDrawer = (open: boolean) => {
        setSettingsOpen(open);
    }

    return (
        <>
            <AppBar position="fixed" color="transparent" elevation={0} sx={{
                borderBottom: '1px solid',
                borderColor: 'divider',
                backgroundColor: 'background.default',
            }}>
                <Toolbar>
                    <IconButton edge={"start"} color={"inherit"} sx={{mr: 3}} onClick={toggleSidebar}>
                        <MenuIcon/>
                    </IconButton>

                    <LogoContainer onClick={() => navigate("/")}>
                        <LogoImage src={Logo} alt="MeTube Logo"/>
                        <LogoText>MeTube</LogoText>
                    </LogoContainer>

                    <SearchContainer>
                        <SearchInputBase
                            placeholder="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyPress={handleSearchSubmit}
                        />
                        <StyledSearchIcon>
                            <SearchIcon sx={{ fontSize: { xs: '20px', sm: '24px' } }}/>
                        </StyledSearchIcon>
                    </SearchContainer>

                    <IconButton color="inherit" onClick={() => toggleDrawer(true)} sx={{ml: 2}}>
                        <SettingsIcon/>
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Drawer
                anchor="right"
                open={settingsOpen}
                onClose={() => toggleDrawer(false)}
            >
                <Box
                    sx={{width: 250, p: 2}}
                    role="presentation"
                >
                    <Typography variant="h6" sx={{mb: 2}}>Settings</Typography>
                    <Divider/>
                    <List>
                        <ListItem>
                            <ListItemText primary="Dark Mode"/>
                            <Switch
                                edge="end"
                                checked={themeStyle === 'dark'}
                                onChange={toggleThemeStyle}
                                inputProps={{
                                    'aria-labelledby': 'dark-mode-toggle'
                                }}
                            />
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
        </>
    );
};

export default Header;