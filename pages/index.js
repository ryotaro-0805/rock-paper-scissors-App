import Head from 'next/head'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'

export default function Home() {

  const judge = {
    rock: { rock: 'Draw', paper: 'Loss', scissors: 'Win' },
    paper: { rock: 'Win', paper: 'Draw', scissors: 'Loss' },
    scissors: { rock: 'Loss', paper: 'Win', scissors: 'Draw' }
  }

  const [myHand, setMyHand] = useState('');
  const [comHand, setComHand] = useState('');
  const [result, setResult] = useState('Victory or Defeat');
  const [status, setStatus] = useState(1);
  const [handleAble, setHandleAble] = useState(false);
  const [winNum, setWinNum] = useState(0);
  const [drawNum, setDrawNum] = useState(0);
  const [lossNum, setLossNum] = useState(0);

  useEffect(() => {
    const num = Math.floor(Math.random() * 3);
    num === 0 && setComHand('rock');
    num === 1 && setComHand('paper');
    num === 2 && setComHand('scissors');
  }, [status]);

  const getHand = async (hand) => {
    const res = judge[hand][comHand];
    console.log(res);
    setHandleAble(true);
    setMyHand(hand);
    setResult(res);
    res === 'Win' && setWinNum((inData) => inData + 1);
    res === 'Draw' && setDrawNum((inData) => inData + 1);
    res === 'Loss' && setLossNum((inData) => inData + 1);
  }

  const nextFnc = () => {
    setHandleAble(false);
    setStatus((status) => status + 1)
    setMyHand('');
    setComHand('');
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <h2>Rock-Paper-Scissors App</h2>
      </header>
      <main className={styles.main}>
        <div className={styles.my}>
          <h3>{status}回目の勝負</h3>
          {!myHand && <h3>Select your Hand!</h3>}
          {/* <button className={styles.button} onClick={() => getHand('rock')} disabled={handleAble}>✊</button>
        <button className={styles.button} onClick={() => getHand('paper')} disabled={handleAble}>✋</button>
        <button className={styles.button} onClick={() => getHand('scissors')} disabled={handleAble}>✌</button> */}
          <button className={styles.button} onClick={() => getHand('rock')} disabled={handleAble}>Rock</button>
          <button className={styles.button} onClick={() => getHand('paper')} disabled={handleAble}>Paper</button>
          <button className={styles.button} onClick={() => getHand('scissors')} disabled={handleAble}>Scissors</button>

          {myHand && <p>自分:{myHand}</p>}
          {!myHand && <p>自分:Push Button</p>}
          {myHand && <p>相手:{comHand}</p>}
          {!myHand && <p>相手:Thinking</p>}

          {myHand && <h2 className={styles.myHand}>{result}</h2>}
          {myHand && <button className={styles.button} onClick={nextFnc}>Next</button>}
          <h3>{`${winNum}勝　${lossNum}敗　${drawNum}引分け`}</h3>
        </div>
      </main>
      <footer className={styles.footer}><h2>Created by Ryotaro</h2></footer>
    </div>
  )
}
