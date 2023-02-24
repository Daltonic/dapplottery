import Head from 'next/head'
import Header from "../components/Header";
import Jackpot from "../components/Jackpot";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Head>
        <title>Dapp Lottery</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <Header />
        <Jackpot />
      </div>
    </div>
  )
}
