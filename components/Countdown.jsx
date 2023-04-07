import { useState, useEffect } from 'react'

const Countdown = ({ timestamp }) => {
  const [timeLeft, setTimeLeft] = useState(timestamp - Date.now())

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(timestamp - Date.now())
    }, 1000)

    return () => clearInterval(interval)
  }, [timestamp])

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24))
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000)

  return timestamp && Date.now() < timestamp ? (
    <div className="flex items-center justify-center space-x-3 flex-wrap">
      <div className="bg-white text-sm w-16 h-16 flex items-center flex-col justify-center rounded-md space-y-2 ">
        <p className="text-3xl text-gray-600 -light">{days}</p>
        <p className="text-xs font-semibold">DAYS</p>
      </div>
      <div className="bg-white text-sm w-16 h-16 flex items-center flex-col justify-center rounded-md space-y-2 ">
        <p className="text-3xl text-gray-600 -light">{hours}</p>
        <p className="text-xs font-semibold">HOURS</p>
      </div>
      <div className="bg-white text-sm w-16 h-16 flex items-center flex-col justify-center rounded-md space-y-2 ">
        <p className="text-3xl text-gray-600 -light">{minutes}</p>
        <p className="text-xs font-semibold">MINUTES</p>
      </div>
      <div className="bg-white text-sm w-16 h-16 flex items-center flex-col justify-center rounded-md space-y-2 ">
        <p className="text-3xl text-gray-600 -light">{seconds}</p>
        <p className="text-xs font-semibold">SECONDS</p>
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center space-x-3 flex-wrap">
      <div className="bg-white text-sm w-16 h-16 flex items-center flex-col justify-center rounded-md space-y-2 ">
        <p className="text-3xl text-gray-600 -light">00</p>
        <p className="text-xs font-semibold">DAYS</p>
      </div>
      <div className="bg-white text-sm w-16 h-16 flex items-center flex-col justify-center rounded-md space-y-2 ">
        <p className="text-3xl text-gray-600 -light">00</p>
        <p className="text-xs font-semibold">HOURS</p>
      </div>
      <div className="bg-white text-sm w-16 h-16 flex items-center flex-col justify-center rounded-md space-y-2 ">
        <p className="text-3xl text-gray-600 -light">00</p>
        <p className="text-xs font-semibold">MINUTES</p>
      </div>
      <div className="bg-white text-sm w-16 h-16 flex items-center flex-col justify-center rounded-md space-y-2 ">
        <p className="text-3xl text-gray-600 -light">00</p>
        <p className="text-xs font-semibold">SECONDS</p>
      </div>
    </div>
  )
}

export default Countdown
