import React from "react";
import Toggle from "./Toggle";

export default {
  component: Toggle,
  title: "Toggle"
};

export const Base = () => {
  // const [title, updateTitle] = useState('');

  // https://github.com/WordPress/gutenberg/pull/18031
  // useEffect(() => {
  // updateTitle(document.title);
  // }, []);

  return (
    <>
      <Toggle />
    </>
  );
};
