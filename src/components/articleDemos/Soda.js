import React from 'react'
import './Soda.css'

export default function Soda() {
  return (
    <div class="container">
      <div class="bar">
        <div class="top">
          <div class="cycle red">
            <span></span>
          </div>
          <span class="text">今日已用</span>
          <span style={{ float: 'right', marginRight: '1vw' }}>7%</span>
        </div>
        <div class="progress sparkle">
          <div class="progress-bar red" style={{ width: '7%' }}></div>
        </div>
      </div>
      <div class="bar">
        <div class="top">
          <div class="cycle yellow">
            <span></span>
          </div>
          <span class="text">过去已用</span>
          <span style={{ float: 'right', marginRight: '1vw' }}>24%</span>
        </div>
        <div class="progress sparkle">
          <div class="progress-bar yellow" style={{ width: '24%' }}></div>
        </div>
      </div>
      <div class="bar">
        <div class="top">
          <div class="cycle green">
            <span></span>
          </div>
          <span class="text">剩余流量</span>
          <span style={{ float: 'right', marginRight: '1vw' }}>69%</span>
        </div>
        <div class="progress sparkle">
          <div class="progress-bar green" style={{ width: '69%' }}></div>
        </div>
      </div>
    </div>
  )
}
