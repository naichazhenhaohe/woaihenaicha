import React from 'react'
import { withRouter } from 'react-router-dom'
import root from '@/articles/root.json'
import LocationLogo from '@/img/8186b60.png'

function Box(props) {
  const { index, name, date, tags, loca: location } = props
  const ODD = +index % 2 !== 0
  function handleClick(index) {
    props.history.push('/article', root[index])
  }
  return (
    <div className={ODD ? 'feed-box odd' : 'feed-box even'} onClick={() => handleClick(index)}>
      <h2>{name}</h2>
      <div className="article-date">{date}</div>
      <div className="article-location">
        <img src={LocationLogo} alt="" />
        {location}
      </div>
      <div className="article-tags">
        {(tags || []).map((item, index) => (
          <span key={index} className="tag">
            {item}
          </span>
        ))}
      </div>
      <style jsx>{`
        .feed-box {
          background-color: #ffee33;
          color: #212121;
          letter-spacing: 2px;
          position: relative;
          margin-bottom: 48px;
          padding: 24px 18px;
          width: 75%;
          border-radius: 10px;
          user-select: none;
          cursor: pointer;
          &::before {
            content: '';
            position: absolute;
            border-left: 30px solid transparent;
            border-right: 30px solid transparent;
            border-bottom: 30px solid #ffee33;
            bottom: -15px;
          }
        }
        .even {
          margin-left: 25%;
          &::before {
            -webkit-transform: rotate(45deg);
            transform: rotate(45deg);
            right: 0;
          }
        }
        .odd::before {
          -webkit-transform: rotate(-45deg);
          transform: rotate(-45deg);
          left: 0;
        }
        h2 {
          font-size: 1.5rem;
          line-height: 40px;
          border-left: 3px solid #212121;
          padding-left: 12px;
        }
        .article-date {
          font-size: 1.3rem;
          font-weight: 500;
          opacity: 0.7;
          position: absolute;
          top: -30px;
          color: #ffffff;
          left: 0px;
        }
        .article-location,
        .article-tags {
          margin-top: 16px;
          img {
            width: 16px;
            margin-right: 5px;
            opacity: 0.87;
            vertical-align: middle;
          }
        }
        span {
          margin-right: 10px;
          &::before {
            content: '#';
            opacity: 0.5;
            padding-right: 2px;
            font-weight: 600;
          }
        }
      `}</style>
    </div>
  )
}

export default withRouter(Box)
