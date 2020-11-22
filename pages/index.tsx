import { NextPage } from "next";
import styles from '../styles/home.module.scss';
import Navigation from "../components/nav/Navigation";

const Home: NextPage = () => {
  return (
    <>
      <Navigation />
      <div className="home">
      </div>
    </>

  );
};

export default Home;
