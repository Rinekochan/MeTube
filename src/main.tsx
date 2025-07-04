import { StrictMode, useState, useMemo, createContext } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ThemeProvider, CssBaseline, type PaletteMode } from "@mui/material";
import { createAppTheme } from "./styles/theme.ts";
import "./App.css";

// Create a theme context
export const ColorModeContext = createContext({
    toggleColorMode: () => {},
    mode: 'light' as PaletteMode
});

const ThemedApp = () => {
    const [mode, setMode] = useState<PaletteMode>('light');

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
            mode,
        }),
        [mode],
    );

    const theme = useMemo(() => createAppTheme(mode), [mode]);

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline /> {/* This normalizes styles and applies theme background */}
                <App />
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
};

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ThemedApp />
    </StrictMode>
);
