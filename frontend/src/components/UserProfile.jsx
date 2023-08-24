import React, { useState, useEffect } from 'react';
import { RiLogoutBoxRFill } from 'react-icons/ri';
import { useParams, useNavigate } from 'react-router-dom';

import { userCreatedPinsQuery, userQuery, userSavedPinsQuery } from '../Utils/data';
import { client } from '../client';
import Spinner from './Spinner';
import MasonryLayout from './MasonryLayout';

const randomImage = 'https://source.unsplash.com/1600x900/?outerspace,';
const confused = 'https://i.gifer.com/7VE.gif'

const UserProfile = () => {
  const [user, setUser] = useState(null)
  const [pins, setPins] = useState(null)
  const [activeView, setActiveView] = useState('created');
  const [activeBtn, setActiveBtn] = useState('created')
  const navigate = useNavigate();
  const {userId} = useParams()

  const activeBtnStyles = 'bg-black text-white font-bold p-2 rounded-full w-50 outline-none'
  const notActiveBtnStyles = 'bg-primary mr-4 text-black font-bold p-2 rounded-full w-50 outline-none'


  useEffect(() => {
    const query = userQuery(userId);

    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, [userId]);

  useEffect(() => {
    if(activeView === 'created'){
      const createdPinsQuery = userCreatedPinsQuery(userId)

      client.fetch(createdPinsQuery)
        .then((data) => {
          setPins(data)
        })
    }else{
      const savedPinsQuery = userSavedPinsQuery(userId)

      client.fetch(savedPinsQuery)
        .then((data) => {
          setPins(data)
        })      
    }
  }, [activeView, userId])

  const handleLogout = () => {
    localStorage.clear()
    navigate('/login');
  };

  if (!user) {
    return <Spinner message="Loading your profile😵‍💫" />;
  }

  return (
    <div className="relative pb-2 h-full justify-center items-center">
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7">
          <div className="flex flex-col justify-center items-center">
            <img
              src={randomImage}
              className="w-full h-370 2xl:h-510 shadow-lg object-cover"
              alt="banner-pic"
            />
            <img
              className="rounded-full w-20 h-20 -mt-10 shadow-xl object-cover"
              src={user.image}
              alt="user-pic"
            />
            <h1 className="font-bold text-3xl text-center mt-3">{user.userName}</h1>
            <div className="absolute top-0 z-1 right-0 p-4">
              {userId === user._id && (
                <button 
                  onClick={handleLogout}
                  className="bg-white p-2 rounded-full cursor-pointer"
                >
                  <RiLogoutBoxRFill fontSize={25}/>
                </button>
              )}
            </div>
          </div>
          <div className="text-center mb-7">
            <button
              type="button"
              onClick={() => setActiveView('created')} // Update this line
              className={`${activeView === 'created' ? activeBtnStyles : notActiveBtnStyles}`}
            >
              Your Wall 🤯
            </button>
            <button
              type="button"
              onClick={() => setActiveView('saved')} // Update this line
              className={`${activeView === 'saved' ? activeBtnStyles : notActiveBtnStyles}`}
            >
              Saved ♥️ 
            </button>
          </div>
          {pins?.length ? (
            <div className="px-2">
              <MasonryLayout pins={pins}/>
            </div>
          ):(
            <div className="flex justify-content items-center">
              <img src={confused} alt="confused-gif"/>
              Your wall seems to empty!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
