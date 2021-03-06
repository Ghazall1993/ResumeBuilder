import React, { useEffect, useRef, useState } from "react";
import "./customerServiceStyle.css";
import CoreCompetenciesSection from "./CoreCompetenciesSection";
import EducationSection from "./EducationSection";
import ReferenceSection from "./ReferenceSection";
import ContactsSection from "./ContactsSection";
import TitleSection from "./TitleSection";
import SummarySection from "./SummarySection";
import ExperienceSection from "./ExperienceSection"

export default function CustomerServiceTemplate(props) {
  const pageRef = useRef(null);
  const [ratio, setRatio] = useState();
  const scaleStyle ={ transform: `scale(${ratio * .9})`, transformOrigin: 'top left ', overflow: 'hidden' };
  const noScaleStyle = { transformOrigin: 'top left ', overflow: 'hidden'  };
  // Computes the ratio of the resume regarding its parent element
  const handleResize = () => {
    if (pageRef.current && pageRef.current.parentElement && pageRef.current.parentElement.offsetWidth){
      setRatio(pageRef.current.parentElement.offsetWidth / pageRef.current.offsetWidth)
    }
  }
  useEffect(() => {
    window.addEventListener('resize', handleResize)
    handleResize()
  }, []);

  const data = props.data;

  const rightContent = (data.experience || data.summary) ?
    <div className="p-3 right-content" >
      <SummarySection heading={data.summary ? data.summary.heading : undefined} body={data.summary ? data.summary.body : undefined} />
      <ExperienceSection heading={data.experience ? data.experience.heading : undefined} experiences={data.experience ? data.experience.experiences : undefined} />
    </div> : null

  return (
    <div ref={pageRef} style={ props.noSclae? noScaleStyle:scaleStyle} className="container-fluid page printable">
      <div className="container-fluid row main-container" ref={props._ref}>

        <div className="col-4 borderd d-flex flex-column justify-content-around no-padding ">
          <div className="left-container">
            <CoreCompetenciesSection heading={data.core_competencies ? data.core_competencies.heading : undefined} skills={data.core_competencies ? data.core_competencies.skills : undefined} />
            <EducationSection heading={data.educations ? data.educations.heading : undefined} educationInfo={data.educations ? data.educations.educationInfo : undefined} />
            <ReferenceSection heading={data.references ? data.references.heading : undefined} referees={data.references ? data.references.referees : undefined} />
            <ContactsSection personal_info={data.personal_info ? data.personal_info : undefined} />
          </div>

        </div>

        <div className="col-8 no-padding right-container">
          <div className="title">
            <TitleSection personal_info={data.personal_info ? data.personal_info : undefined} />
          </div>
          {rightContent}
        </div>

      </div>
    </div>
  );
}