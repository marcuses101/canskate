import React from 'react'
import {Link} from 'react-router-dom'

export default function PageNotFound({url='/'}) {
  return (
    <div className='PageNotFound'>
      <h2 className="heading error">PAGE NOT FOUND</h2>
      <br/><Link to={url}>Go back?</Link>
    </div>
  )
}
