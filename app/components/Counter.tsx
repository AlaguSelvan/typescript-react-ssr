import React from 'react'

const Counter = () => {
  const [count, setCount] = React.useState(0)
  return (
    <div>
      <p>Count: ${count}</p>
      <button onClick={() => setCount(count + 1)}>Add 1</button>
    </div>
  )
}

export default Counter