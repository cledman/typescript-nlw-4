import { createContext, useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';
import challenges from '../../challenges.json';

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    ammount: number;
}

interface ChallengesContextData {
    level: number, 
    currentExperience: number, 
    experienceToNextLevel: number,
    challengesCompleted: number, 
    activeChallenge: Challenge,
    levelUp: () => void,
    startNewChallenge: () => void,     
    resetChallenge: () => void,   
    completeChallenge: () => void, 
}

interface ChallengesProviderProps {
    children: ReactNode;
}

export const ChallengeContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({children} : ChallengesProviderProps) {
    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [challengesCompleted, setChallengescompleted] = useState(0);
    const [activeChallenge, setActiveChallenge] = useState(null);
    const experienceToNextLevel = Math.pow((level + 1) * 4,2);

    useEffect(()=> {
        Notification.requestPermission();
    }, []);

    useEffect(() => {
        Cookies.set('level', String(level));
        Cookies.set('currentExperience', String(currentExperience));
        Cookies.set('challengesCompleted', String(challengesCompleted));                
    }, [level, currentExperience, challengesCompleted]);

    function levelUp() {
      setLevel(level+1);
    }

    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];
        setActiveChallenge(challenge);

        new Audio('/notification.mp3').play();

        if(Notification.permission === 'granted'){
             new Notification('Novo desafio!', {
                 body: `Valendo ${challenge.amount} xp!`
             })
        }
    }

    function resetChallenge() {
       setActiveChallenge(null);
    }

    function completeChallenge() {
        if(!activeChallenge) {
            return;
        }

        const { amount } = activeChallenge;
        let finalExperience = currentExperience + amount;

        if(finalExperience >= experienceToNextLevel){
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }

        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengescompleted(challengesCompleted + 1);
    }

    return (
        <ChallengeContext.Provider 
            value={{ 
                level, 
                currentExperience, 
                challengesCompleted, 
                levelUp,
                startNewChallenge, 
                activeChallenge,
                resetChallenge,
                experienceToNextLevel,
                completeChallenge,
            }}
        >
            {children}
        </ChallengeContext.Provider>
    );
}