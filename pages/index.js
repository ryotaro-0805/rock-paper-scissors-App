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
  const [conWin, setConWin] = useState(0);
  useEffect(() => {
    // const num = Math.floor(Math.random() * 3);
    const num = Math.floor(Math.random() * 1);
    num === 0 && setComHand('rock');
    num === 1 && setComHand('paper');
    num === 2 && setComHand('scissors');
  }, [status]);
  const getHand = (hand) => {
    const res = judge[hand][comHand];
    setHandleAble(true);
    setMyHand(hand);
    setResult(res);
    if (res === 'Win') {
      setWinNum((inData) => inData + 1);
      setConWin((inData) => inData + 1)
    } else if (res === 'Draw') {
      setDrawNum((inData) => inData + 1);
    } else if (res === 'Loss') {
      setLossNum((inData) => inData + 1);
      setConWin(0);
    }
  }
  const nextFnc = () => {
    setHandleAble(false);
    setStatus((status) => status + 1)
    setMyHand('');
    setComHand('');
    conWin > 4 && setConWin(0);
  }
  const clearFnc = () => {
    setStatus(1);
    setWinNum(0);
    setLossNum(0);
    setDrawNum(0);
    setConWin(0);
  }
  const mainStyle = [styles.main, styles.sub1, styles.sub2, styles.sub3, styles.sub4];
  const hand = [{ rock: '✊' }, { paper: '✋' }, { scissors: '✌' }];

  return (
    <>
      <Head>
        <title>Rock-Paper-Scissors App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      </Head>
      {conWin < 5 ?
        <div className={styles.container}>
          <header className={styles.header}>
            <div>
              <h2>
                <span className="material-symbols-outlined">waving_hand</span>
                Rock-Paper-Scissors App
              </h2>
              <h3>You are Winner if you would win 5 times continuously!</h3>
            </div>
          </header>
          <main className={
            conWin > 1 ? `${mainStyle[0]} ${mainStyle[conWin - 1]}` : mainStyle[0]
          }>
            <div className={styles.my}>
              <h3>{status}回目の勝負</h3>
              {!myHand && <h3>Select your Hand!</h3>}
              {hand.map((array, index) => (
                <button key={index} className={styles.button} onClick={() => getHand(Object.keys(array))} disabled={handleAble}>{Object.values(array)}</button>
              ))}
              {myHand ? <p>自分:{myHand}</p> : <p>自分:Push Button</p>}
              {myHand ? <p>相手:{comHand}</p> : <p>相手:Thinking</p>}

              {myHand ? <h2 className={`${styles.myHand}
        ${result === 'Win' ? styles.myHandWin :
                  result === 'Loss' ? styles.myHandLoss :
                    styles.myHandDraw}
            `}>{result}</h2> : <h2 className={styles.myHand}>Win or Loss</h2>}
              {myHand && <button className={styles.button_next} onClick={nextFnc}>NEXT</button>}
              <h3>{`${winNum}勝　${lossNum}敗　${drawNum}引分け`}</h3>
            </div >
            {!myHand && <button onClick={clearFnc}>CLEAR</button>}
            <p>連続{conWin}勝中</p>
          </main >
          <footer className={styles.footer}>
            <h2>
              <span className="material-symbols-outlined">star</span>
              2022-Dec. ~Created by Ryotaro~
            </h2>
          </footer>
        </div >
        :
        <div className={styles.winner}>
          <div>
            <h2>You are Winner!!</h2>
            <p>Thank you for playing</p>
            <button onClick={nextFnc}>Challenge Again</button>
            <p className={styles.endName}>Congratulations!!<br /><span className="material-symbols-outlined">
              rocket_launch
            </span> This App is created by Ryotaro</p>
          </div>
        </div>
      }
    </>
  )
}
