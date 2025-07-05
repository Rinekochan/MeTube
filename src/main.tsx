import { StrictMode, useState, useMemo } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ThemeProvider, CssBaseline, type PaletteMode } from "@mui/material";
import { createAppTheme } from "./styles/theme.ts";
import "./App.css";
import {ThemeContext} from "./context/ThemeContext.tsx";

const ThemedApp = () => {
    const [themeStyle, setThemeStyle] = useState<PaletteMode>('dark');

    const themeMode = useMemo(
        () => ({
            toggleThemeStyle: () => {
                setThemeStyle((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
            themeStyle,
        }),
        [themeStyle],
    );

    const theme = useMemo(() => createAppTheme(themeStyle), [themeStyle]);

    return (
        <ThemeContext value={themeMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline /> {/* This normalizes styles and applies theme background */}
                <App />
            </ThemeProvider>
        </ThemeContext>
    );
};

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ThemedApp />
    </StrictMode>
);
