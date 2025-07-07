import React, {createContext, type ReactNode, useContext} from 'react';
import {useSidebar} from "../hooks/useSidebar";

export const SidebarContext = createContext({
    collapsed: true,
    toggleSidebar: () => {},
});

export const SidebarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const sidebarUtils = useSidebar();

    return (
        <SidebarContext.Provider value={sidebarUtils}>
            {children}
        </SidebarContext.Provider>
    );
};

export const useSidebarContext = () => {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error('useSidebar must be used within a SidebarProvider');
    }
    return context;
}

