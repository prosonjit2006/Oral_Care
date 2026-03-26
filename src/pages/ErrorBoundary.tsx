import { useRouteError } from "react-router-dom"


const ErrorBoundary = () => {
    const Error = useRouteError()

    console.log("err: ", Error);
    
  return (
    <div>
      {/* {Error} */}
      <h1 className="text-8xl text-black flex justify-center items-center h-screen">Error Page</h1>
    </div>
  )
}

export default ErrorBoundary
