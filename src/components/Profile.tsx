import { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.css';

export function Profile() {
    const { level } = useContext(ChallengeContext);
    return (
        <div className={styles.profileContainer}>
            <img src="https://avatars.githubusercontent.com/u/33430075?s=460&u=3cee3c87ad46b3e23c9f118a21afb29acd82af5d&v=4" alt="cledman"/>
            <div>
                <strong>Cledson</strong>
                <p>
                    <img src="icons/level.svg" alt="Level"/>
                    Level { level }
                </p>
            </div>            
        </div>
    );
}