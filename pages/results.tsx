import Head from 'next/head'
import Result from '../components/Result'
import SubHeader from '../components/SubHeader'

export default function Draws() {
  return (
    <div className="min-h-screen">
      <Head>
        <title>Dapp Lottery | Results</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <SubHeader />
        <Result />
      </div>
    </div>
  )
}
