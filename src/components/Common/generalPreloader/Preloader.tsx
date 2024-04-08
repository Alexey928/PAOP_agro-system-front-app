import React from 'react';
import style from "./preloder.module.css"

const Preloader = () => {
    return (
        <div className={style.loadWrapper}>
            <div className={style.loadContainer}>
                <div style={{left:36,top:36,animationDelay:"0s"}}></div>
                <div style={{left:90,top:36,animationDelay:"0.125s"}}></div>
                <div style={{left:143,top:36,animationDelay:"0.25s"}}></div>
                <div style={{left:36,top:90,animationDelay:"0.875s"}}></div>
                <div style={{left:143,top:90,animationDelay:"0.375s"}}></div>
                <div style={{left:36,top:143,animationDelay:"0.75s"}}></div>
                <div style={{left:90,top:143,animationDelay:"0.625s"}}></div>
                <div style={{left:143,top:143,animationDelay:"0.5s"}}></div>
            </div>
        </div>
    );
};

export default Preloader;