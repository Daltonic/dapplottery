import Head from 'next/head'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import SubHeader from '../components/SubHeader'
import { createJackpot } from '@/services/blockchain'

export default function Create() {
  const { wallet } = useSelector((state) => state.walletState)
  const router = useRouter()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [prize, setPrize] = useState('')
  const [ticketPrice, setTicketPrice] = useState('')
  const [expiresAt, setExpiresAt] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!wallet) return toast.warning('Wallet not connected')

    if (!title || !description || !imageUrl || !prize || !ticketPrice || !expiresAt) return
    const params = {
      title,
      description,
      imageUrl,
      prize,
      ticketPrice,
      expiresAt: new Date(expiresAt).getTime(),
    }

    await toast.promise(
      new Promise(async (resolve, reject) => {
        await createJackpot(params)
          .then(async () => {
            onReset()
            router.push('/')
            resolve()
          })
          .catch(() => reject())
      }),
      {
        pending: 'Approve transaction...',
        success: 'Jackpot created successfully 👌',
        error: 'Encountered error 🤯',
      }
    )
  }

  const onReset = () => {
    setTitle('')
    setDescription('')
    setImageUrl('')
    setPrize('')
    setTicketPrice('')
    setExpiresAt('')
  }

  return (
    <div>
      <Head>
        <title>Dapp Lottery - Create New Jackpot</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen">
        <SubHeader />
        <div className="flex flex-col justify-center items-center mt-20">
          <div className=" flex flex-col items-center justify-center my-5">
            <h1 className="text-2xl font-bold text-slate-800 py-5">Create Jackpots</h1>
            <p className="text-center text-sm text-slate-600">
              We bring a persolan and effective every project we work on. <br />
              which is why our client love why they keep coming back.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="w-full max-w-md">
            <div className="mb-4">
              <input
                className="appearance-none border rounded w-full py-2 px-3
                text-gray-700 leading-tight focus:outline-none
                focus:shadow-outline"
                id="title"
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <input
                className="appearance-none border rounded w-full py-2 px-3
                text-gray-700 leading-tight focus:outline-none
                focus:shadow-outline"
                id="imageUrl"
                type="url"
                placeholder="Image URL"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <input
                className="appearance-none border rounded w-full py-2 px-3
                text-gray-700 leading-tight focus:outline-none
                focus:shadow-outline"
                id="prize"
                type="number"
                step={0.01}
                min={0.01}
                placeholder="Prize"
                value={prize}
                onChange={(e) => setPrize(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <input
                className="appearance-none border rounded w-full py-2 px-3
                text-gray-700 leading-tight focus:outline-none
                focus:shadow-outline"
                id="ticketPrice"
                type="number"
                step={0.01}
                min={0.01}
                placeholder="Ticket price"
                value={ticketPrice}
                onChange={(e) => setTicketPrice(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <input
                className="appearance-none border rounded w-full py-2 px-3
                text-gray-700 leading-tight focus:outline-none
                focus:shadow-outline"
                id="expiresAt"
                type="date"
                value={expiresAt}
                onChange={(e) => setExpiresAt(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <textarea
                className="appearance-none border rounded w-full py-2 px-3
                text-gray-700 leading-tight focus:outline-none
                focus:shadow-outline"
                id="description"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="flex justify-center">
              <button
                className="w-full bg-[#0c2856] hover:bg-[#1a396c] text-white font-bold
                py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Submit Jackpot
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
