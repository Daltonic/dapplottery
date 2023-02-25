import Head from 'next/head'
import DrawTime from '../../components/DrawTime'
import SubHeader from '../../components/SubHeader'

export default function Draws() {
  return (
    <div className="min-h-screen">
      <Head>
        <title>Dapp Lottery | Draws</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <SubHeader/>
        <DrawTime/>
    </div>
    </div>
  )
}
