import React from "react";
import ReportCard from "./ReportCard/ReportCard";
import { Link } from "react-router-dom";
import useSkaterFromParamId from "../Hooks/useSkaterFromParamId";

export default function SkaterProgress() {
  const skater = useSkaterFromParamId();
  if (!skater.id) {
    return (
      <>
        <h2 className='header' style={{backgroundColor:'var(--red-light)'}}>Skater not found</h2><br/>
        <Link to='/progress/skater'>Go Back?</Link>
      </>
    );
  }

  return (
    <div className="SkaterProgress">
      <h2 className='header'>Progress</h2>
      <ul className="links">
        <li>
          <Link to={`/eval/skater/${skater.id}`}>Go to Evaluation</Link>
        </li>
      </ul>
      <ReportCard skater={skater} />
    </div>
  );
}
