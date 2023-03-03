import { useState } from "react";
import { ThemeType } from "../components/ILayout";

const isBrowser = () => typeof window !== "undefined"

const useTheme = () => {
    const localTheme =  isBrowser() && window.localStorage.getItem('theme') as ThemeType;
    const initialTheme = localTheme || 'light' as ThemeType;
    const [ themeMode, setThemeMode ] = useState<ThemeType>(initialTheme);

    const setMode = (mode: ThemeType) => {
        isBrowser() && localStorage.setItem('theme', mode);
        setThemeMode(mode);

        const isComment = document.querySelector('iframe.utterances-frame');
        if (isComment) {
            const utterancesTheme = mode === 'light' ? "github-light" : "photon-dark" ;
            (
              document?.querySelector("iframe.utterances-frame")?.contentWindow.postMessage(
                { type: "set-theme", theme: utterancesTheme },
                "https://utteranc.es/"
              )
            )
        }
    };

    const themeToggler = () => {
        themeMode === 'light' ? setMode('dark') : setMode('light')
    }

    return { themeMode, themeToggler };
}

export default useTheme;