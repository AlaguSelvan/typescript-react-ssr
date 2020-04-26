import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';

const Home = () => {
  const home = useSelector((state: any) => state.HomeReducer.userData);
  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  const fetchUserData = async () => {
    const { data } = await axios.get(
      'https://jsonplaceholder.typicode.com/users'
    );
    console.log(data);
    setData(data);
    setIsFetching(false);
  };

  useEffect(() => {
    fetchUserData();
    // return () => {
    //   cleanup
    // }
  }, []);

  return (
    <div>
      <p>Home Page...</p>
      <div style={{ display: 'flex' }}>
        <div>
          <b>Initial Data from Server</b>
          <ul>
            {home.map(({ name }: any, index: number) => (
              <li key={index}>{name}</li>
            ))}
          </ul>
        </div>
        <div>
          <b>Data from Client</b>
          {!isFetching ? (
            <ul>
              {data.map(({ name }: any, index: number) => (
                <li key={index}>{name}</li>
              ))}
            </ul>
          ) : (
            <p>Fetching...</p>
          )}
        </div>
        {/* <Button /> */}
      </div>
      <Link to="/about">
        <p>goto next 👉 page</p>
      </Link>
    </div>
  );
};

export default Home;
