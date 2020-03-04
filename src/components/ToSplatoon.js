import React from 'react'
import logo from '@/img/squid.gif'
export default function ToSplatoon() {
  return (
    <div className="link-to-splatoon">
      <a href="http://naichazhenhaohe.top/splatoon">
        <img src={logo} alt="squid" />
      </a>
      <style jsx>
        {`
          .link-to-splatoon {
            cursor: pointer;
            position: fixed;
            left: 3vw;
            bottom: 5vh;
            max-width: 8vw;
            img {
              max-width: 100%;
            }
          }
        `}
      </style>
    </div>
  )
}
