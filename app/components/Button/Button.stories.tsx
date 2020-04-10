import React from 'react'
import Button from './Button'

export default {
  component: Button,
  title: 'Button'
}

export const Base = () => {
  // const [title, updateTitle] = useState('');

  // https://github.com/WordPress/gutenberg/pull/18031
  // useEffect(() => {
  // updateTitle(document.title);
  // }, []);

  return (
    <>
      <Button />
      {/* <p>title: {title}</p> */}
    </>
  )
}
