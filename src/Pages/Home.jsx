import "./Home.css";

import CardList from "../Components/Lists/CardList";
import { Link } from "react-router-dom";
import ResumeCard from "../Components/Cards/ResumeCard";

const Home = () => {
  const resumes = ["Pixar", "Figma", "Notion", "Dolby", "ILM"];
  return (
    <>
      <Link to={"/profile"}>
        <button href='build.html' className='profile-btn'>
          <i className='fa-solid fa-user'></i>
        </button>
      </Link>
      <div className='container' id='resumes'>
        <h2>Resumes</h2>
        <CardList fullWidth={false}>
          {resumes.map((name, index) => (
            <ResumeCard key={"resume" + index} title={name} />
          ))}
          <button className='new-card-btn drop-shadow'>
            <i className='fa-solid fa-plus'></i>
          </button>
        </CardList>
      </div>
    </>
  );
};

export default Home;
