import React from 'react'
import { NavLink } from 'react-router-dom'
import image from './leoEvent.png'
import './Event.css'
import { handleClick } from '../../onClick'

function Event() {
  return (
    <>
    <div className='event-main-div  sm:px-4 sm:py-8 py-2 px-2 overflow-hidden gevent'>
    <div className='border-2 border-gray-600 rounded-md pb-5 boxDivEvent'>
          <div className='headingEvent flex  justify-center items-center rounded-t-2xl gevent-heading'>
            <h1 className="text-4xl font-black bg-gradient-to-r from-blue-800 via-blue-900 to-blue-800 text-transparent bg-clip-text ">OUR EVENTS</h1>
          </div>
          <div className ="event-main rounded-b-2xl">
          <div className="event-info  gevent-info">
              <h1 className="text-3xl text-gray-700 font-black text-center">ORPHANAGE VISIT</h1>
              <p className="px-10 py-10 text-center">Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptatibus eligendi enim, cum minus reiciendis hic aliquid dolorem, qui repudiandae aspernatur
              vero voluptas, facilis repellendus nesciunt commodi molestiae delectus quam possimus?Lorem ipsum,
              dolor sit amet consectetur adipisicing elit. Explicabo nihil quisquam, dolores eos minima optio
              delectus!
              </p>
              <button className="my-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded gmore-event">
                  <NavLink to="/events" onClick={handleClick}>See all events!</NavLink>
              </button>
          </div>   
          <div className="event-image gevent-img">
              <img src={image} alt="ok"/>
          </div> 
          </div>
    </div>
    </div>
    </>
  )
}

export default Event