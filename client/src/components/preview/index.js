import React, { useState, useCallback } from "react";
import CustomerServiceTemplate from "../templates/customerService/CustomerServiceTemplate"
import { ButtonGroup, Button } from "react-bootstrap";
import "./preview.css"
import fileDownload from 'js-file-download';
import { Upload } from "./Upload";

export default function Preview({ onUpdate, data }) {

  const [showUpload, setShowUpload] = useState(false);
  const [showMenu, setShowMenu] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);

  const showImportBtn = () => Object.keys(data).length === 0

  const exportJSON = useCallback(() => {
    fileDownload(JSON.stringify(data), 'resume.json');
  }, [data])
  const onFileImported = (data) => {
    setShowMenu(true);
    setShowUpload(false)
    const importedData = JSON.parse(data)

    if (importedData.educations && importedData.educations.educationInfo) {
      convertDates(importedData.educations.educationInfo)
    }

    if (importedData.experience && importedData.experience.experiences) {
      convertDates(importedData.experience.experiences)
    }
    onUpdate(importedData)
  }
  function convertDates(items) {
    for (const item of items) {
      if (item.start_date!==""){
        item.start_date = new Date(item.start_date)
      }
      if (item.end_date!==""){
        item.end_date = new Date(item.end_date)
      }
    }
  }

  const handleClose = (e) => {
    e.target.style.display = 'none';
    setFullscreen(false);
  }

  return (
    <>
      <div className="non-printable">
        {showMenu &&
          <>
            <div className="bar-container">
              <ButtonGroup className="previw-bar mt-2">
                <Button
                  variant="light"
                  disabled={showImportBtn()}
                  onClick={() => {
                    try {
                      document.execCommand('print', false, null);
                    }
                    catch (e) {
                      window.print();
                    }
                  }}
                >Export to PDF</Button>
                <Button
                  disabled={showImportBtn()}
                  variant="light"
                  onClick={() => { setFullscreen(true) }}
                >
                  Fullscreen
            </Button>
                <Button
                  disabled={showImportBtn()}
                  variant="light"
                  onClick={exportJSON}
                >
                  Export JSON
          </Button>
                <Button
                  variant="light"
                  onClick={() => { setShowMenu(false); setShowUpload(true) }}
                >
                  Import JSON
            </Button>
              </ButtonGroup >
            </div>
          </>
        }
        {
          fullscreen &&
          <div className="overlay">
            <Button variant="secondary" onClick={handleClose}>
              Close
          </Button>
            <CustomerServiceTemplate data={data} />
          </div>
        }
        <div >
          {showUpload ? <Upload onFileImported={onFileImported} /> : <CustomerServiceTemplate data={data} />}
        </div>
      </div >
    </>
  )
}