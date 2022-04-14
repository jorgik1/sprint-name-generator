import React from 'react'
import ReactTooltip from 'react-tooltip'
import {Typography} from "@mui/material";

interface IProps {
    text: string;
}

export default function Result({text}: IProps) {
    function copyToClipboard(text: string) {
        navigator.clipboard.writeText(text).then(() => {
            ReactTooltip.rebuild();
        });
    }
    return (
        <div>
            <Typography variant="h2" onClick={() =>{copyToClipboard(text);}} data-tip="Copied!" data-event='click focus'>{text}</Typography>
            <ReactTooltip globalEventOff='click' />
        </div>

)
}
