import React from 'react'

export default function Progress() {
  document.addEventListener('DOMContentLoaded', function() {
    let winHeight = window.innerHeight
    let docHeight = document.documentElement.scrollHeight
    let progressBar = document.querySelector('#content_progress')
    progressBar.max = docHeight - winHeight
    progressBar.value = window.scrollY
    document.addEventListener('scroll', function() {
      progressBar.max = document.documentElement.scrollHeight - window.innerHeight
      progressBar.value = window.scrollY
    })
  })
  return (
    <>
      <progress id="content_progress" value="0" />
      <style jsx>{`
        progress {
          position: fixed;
          left: 0;
          top: 0;
          z-index: 1000;
          width: 100%;
          height: 5px;
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          border: none;
          background-color: transparent;
          color: #99ccff;
          &::-webkit-progress-bar {
            background-color: transparent;
          }

          &::-webkit-progress-value {
            background-color: #99ccff;
          }

          &::-moz-progress-bar {
            background-color: #99ccff;
          }
        }
      `}</style>
    </>
  )
}
