// Create a theme context
import {createContext} from "react";
import type {PaletteMode} from "@mui/material";

export const ThemeContext = createContext({
    toggleColorMode: () => {},
    mode: 'light' as PaletteMode
});
