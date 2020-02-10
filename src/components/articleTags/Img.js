import React from 'react'

export default function Img({ ...props }) {
  console.log(props)
  // const image = require(`@/img/RunTask.png`)
  const image = require(`@/img${props.src}`)
  delete props.src
  return (
    <>
      <img {...props} src={image} alt="" />
      <style jsx>{`
        img {
          max-width: 100%;
        }
      `}</style>
    </>
  )
}
