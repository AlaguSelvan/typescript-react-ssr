import React, { createContext, useState, useEffect } from 'react';

export const HomeContext = createContext({
  data: []
});

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
interface IProps {
  children?: any;
}

const HomeProvider = ({ children }: IProps) => {
  const [data, setData] = useState([]);
  // const [cartItems, setCartItems] = useState([]);
  // const [cartItemsCount, setCartItemsCount] = useState(0);
  // const [cartTotal, setCartTotal] = useState(0);
  const fetchData = async () => {
    const { data }: any = await fetch(
      'https://jsonplaceholder.typicode.com/users'
    );
    setData(data);
  };
  fetchData();

  useEffect(() => {
    fetchData();
  }, [data]);

  return (
    <HomeContext.Provider
      value={{
        data
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};

export default HomeProvider;
