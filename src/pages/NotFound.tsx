import Lottie from 'lottie-react'
import notFound from '../services/json/notFound.json'

const NotFound = () => {
  return (
    <div className='h-screen w-full '>
      < Lottie animationData={notFound} loop className=' max-w-4xl mx-auto h-auto'/>
    </div>
  )
}

export default NotFound
