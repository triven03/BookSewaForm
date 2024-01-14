import React from 'react'
import PulseLoader from 'react-spinners/PulseLoader';

const LoadingButton = ({title, loading, disable}) => {
  return (
    <button className="toggle-code" id="submit" disabled={disable}>
    {
      loading ? 
      <PulseLoader
        color="#e4e7e7"
        size={6}
      /> : title      
    }
    </button>
  )
}

export default LoadingButton