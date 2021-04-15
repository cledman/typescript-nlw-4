import { CompletedChallenges } from '../components/CompletedChallenges';
import { Countdown } from '../components/Countdown';
import { ExperienceBar } from '../components/ExperienceBar';
import { Profile } from '../components/Profile';
import { ChallengeBox } from '../components/ChallengeBox';
import Head from 'next/head';
import styles from '../styles/pages/Home.module.css';
import { CountdownProvider } from '../contexts/CountDownContext';

export default function Home(props) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Início | move.it</title>
      </Head>
      <ExperienceBar />
      
      <CountdownProvider>
        <section>
          <div >
            <Profile />
            <CompletedChallenges />
            <Countdown />
          </div>
          <div>
            <ChallengeBox />
          </div>
        </section>
      </CountdownProvider>
    </div>
  )
}

//the "getServerSideProps"´s name is required 
// so we can choose wich information we can pass trough next.js to back or frontend
export const getServerSideProps = async () => {

  const user = {
    level: 1,
    currentExperience: 50,
    challengesCompleted: 2,
  }

  return {
    props: {}
  }
}
