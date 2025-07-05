// Create a theme context
import {createContext} from "react";
import type {PaletteMode} from "@mui/material";

export const ThemeContext = createContext({
    toggleThemeStyle: () => {},
    themeStyle: 'dark' as PaletteMode
});
