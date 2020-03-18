import React from 'react'
import Loadable from 'react-loadable'

function Loading(props) {
  if (props.error) {
    return <div>Error! <button onClick={props.retry}>Retry</button></div>
  } else if (props.timedOut) {
    return <div>Taking a long time... <button onClick={props.retry}>Retry</button></div>
  } else if (props.pastDelay) {
    return <div>Loading...</div>
  } else {
    return null
  }
}

export default function LoadableHOC(opts) {
  return Loadable(Object.assign({
    loading: Loading,
    delay: 5000,
    timeout: 5000
  }, opts))
}
