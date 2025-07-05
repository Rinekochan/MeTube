import { StrictMode, useState, useMemo } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ThemeProvider, CssBaseline, type PaletteMode } from "@mui/material";
import { createAppTheme } from "./styles/theme.ts";
import "./App.css";
import {ThemeContext} from "./context/ThemeContext.tsx";

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
        <ThemeContext value={colorMode}>
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
