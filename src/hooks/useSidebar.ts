import { useState } from 'react';

export const useSidebar = () => {
    const [collapsed, setCollapsed] = useState(true);

    const toggleSidebar = () => {
        setCollapsed(prev => !prev);
    };

    return { collapsed, toggleSidebar };
};