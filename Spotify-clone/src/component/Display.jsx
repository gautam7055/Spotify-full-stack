import React, { useEffect, useRef } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import DisplayHome from './DisplayHome'
import DisplayAlbum from './DisplayAlbum'
import { useContext } from 'react'
import { PlayerContext } from '../context/PlayerContext'

const Display = () => {

  const { albumsData } = useContext(PlayerContext);

  const displayRef = useRef();
  const location = useLocation();
  const isAlbum = location.pathname.includes('album');
  const albumId = isAlbum ? location.pathname.split('/').pop() : '';
  // find album safely
  const currentAlbum = isAlbum ? albumsData.find((x) => x?._id == albumId) : null;
  const bgColor = currentAlbum ? currentAlbum.bgColour : '#121212';

  useEffect(()=>{
    if (isAlbum && currentAlbum) {
      displayRef.current.style.background = `linear-gradient(${bgColor},#121212)`;
    } else {
      displayRef.current.style.background = `#121212`;
    }
  },[isAlbum, currentAlbum, bgColor]);
    
  return (
    <div ref={displayRef} className='w-[100%] m-2 px-6 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0'>
      <Routes>
        <Route path='/' element={<DisplayHome/>} />
        <Route path='/album/:id' element={<DisplayAlbum album={albumsData.find((x)=> (x._id == albumId))} />} />
      </Routes>
    </div>
  )
}

export default Display
