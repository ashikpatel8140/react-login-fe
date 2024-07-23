import React from "react";
import useAxios from "../../hooks/useAxios";
import { useDispatch } from "react-redux";
import { resetUser } from "../../features/user/userSlice";

interface HomePros {}
const Home: React.FC<HomePros> = () => {
  const dispatch = useDispatch();
  const axios  = useAxios();

  const getTodos = async () => {
    const response = await axios.get('/todo');
    console.log(response);
    
  }

  const logout = () => {
    dispatch(resetUser());
    localStorage.removeItem("user")
  }

  return (
    <>
      <div>
        <button className="btn btn-primary"  onClick={getTodos}>Get Data</button>
        <button className="btn btn-primary"  onClick={logout}>logout</button>
      </div>
    </>
  );
};

export default Home
