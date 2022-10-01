import React, { useEffect, useState } from 'react'

const BackToTop = () => {

    const [backToTop, setBackToTop] = useState(false)

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if(window.scrollY > 10) {
                setBackToTop(true)
            } else {
                setBackToTop(false)
            }
        })
    },[])

    const scroll = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

  return (
    <div>
        <button>Bottom</button>
    </div>
  )
}

export default BackToTop