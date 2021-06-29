import React from "react";
import styles from "@/styles/Loading.module.css";

const Loading = () => (

    <div className={styles.skCubeGrid}>
        <div className={`${styles.skCube} ${styles.skCube1}`}/>
        <div className={`${styles.skCube} ${styles.skCube2}`}/>
        <div className={`${styles.skCube} ${styles.skCube3}`}/>
        <div className={`${styles.skCube} ${styles.skCube4}`}/>
        <div className={`${styles.skCube} ${styles.skCube5}`}/>
        <div className={`${styles.skCube} ${styles.skCube6}`}/>
        <div className={`${styles.skCube} ${styles.skCube7}`}/>
        <div className={`${styles.skCube} ${styles.skCube8}`}/>
        <div className={`${styles.skCube} ${styles.skCube9}`}/>
    </div>
);

export default Loading;
