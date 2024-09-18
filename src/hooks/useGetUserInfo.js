import React from 'react'

const useGetUserInfo = () => {
  const {userID, name, profilePhoto, isAuth} = JSON.parse(localStorage.getItem("auth")) || {};

  return {userID, name, profilePhoto, isAuth};
}

export default useGetUserInfo