import { useState, createContext, useContext } from 'react';
import { SidebarContext } from '../context/SidebarContext.tsx';

export const useSidebar = () => {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error('useSidebar must be used within a SidebarProvider');
    }
    return context;
}

export const useSidebarState = () => {
    const [collapsed, setCollapsed] = useState(true);

    const toggleSidebar = () => {
        setCollapsed(prev => !prev);
    };

    return { collapsed, toggleSidebar };
};