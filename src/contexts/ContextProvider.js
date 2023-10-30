// appใหญ่อาจจะมีหลายcontext
import { initiateSort } from "@syncfusion/ej2/spreadsheet";
import React, { createContext, useContext, useState} from "react";

const StateContext = createContext();

const initialState = {
    chat: false,
    cart: false,
    userProfile:false,
    notification:false,
}

export const ContextProvider = ({ children}) => {
    const [activeMenu, setActiveMenu] = useState(true);
    const [isClicked, setisClicked] = useState(initialState)
    const [screenSize, setScreenSize] = useState(undefined)
    const [currentColor, setCurrentColor] = useState('#03C9D7');
    const [currentMode, setCurrentMode] = useState('Light');
    const [themeSettings, setThemeSettings] = useState(false);
    
    const setMode = (e) => {
        setCurrentMode(e.target.value);
        localStorage.setItem('themeMode', e.target.value);
    };
    
    const setColor = (color) => {
        setCurrentColor(color);
        localStorage.setItem('colorMode',color);
    }

    const handleClick = (clicked) => setisClicked({ ...initialState, [clicked]: true});

    return (
        <StateContext.Provider
            value={{
                activeMenu,
                setActiveMenu,
                isClicked,
                setisClicked,
                handleClick,
                screenSize, 
                setScreenSize,
                currentColor,
                setCurrentColor,
                currentMode,
                setCurrentMode,
                themeSettings, setThemeSettings,
                setMode,setColor
                // activeMenu: activeMenu
            }}
        >
            {children}
        </StateContext.Provider>
    )    
} 

export const useStateContext = () => useContext(StateContext);