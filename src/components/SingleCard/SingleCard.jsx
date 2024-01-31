import React from 'react'

function SingleCard({name,price}) {
  return (
    <div className="card">
        <div className="name">{name}</div>
        <div className="name">{price}</div>

    </div>
  )
}

export default SingleCard