import React from 'react'

const Meeting = ({params}:{params:{id:String}}) => {
  return (
    <div>Meeting: #{params.id}</div>
  )
}

export default Meeting