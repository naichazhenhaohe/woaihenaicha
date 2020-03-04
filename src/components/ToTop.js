import React from 'react'

export default function ToTop(props) {
  const handleClick = () => {
    props.theRef.current.scrollTo({ top: 0, behavior: 'smooth' })
  }
  return (
    <main onClick={handleClick}>
      <div className="back-to-top">
        <span className="up-arrow"></span>
      </div>
      <style jsx>{`
        main {
          position: fixed;
          bottom: 5vh;
          right: 5vw;
          transform: rotate(45deg);
          width: 50px;
          height: 50px;
          cursor: pointer;
        }
        .back-to-top {
          width: 20px;
          height: 20px;
          background: #ffee33;
          z-index: 1;
          margin: 15px;
          .up-arrow {
            position: fixed;
            top: 16px;
            left: 16px;
            width: 20px;
            height: 20px;
            background: #333333;
            z-index: 2;
          }
        }
      `}</style>
    </main>
  )
}
