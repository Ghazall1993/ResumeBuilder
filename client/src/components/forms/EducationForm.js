import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import DatePicker from "react-datepicker";
import CustomModal from "../CustomModal";
import Alert from 'react-bootstrap/Alert';
import showDateFromTo from "helpers/dateUtils";

export default function EducationForm({ data, onUpdate }) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(-1);
  const [newEducation, setNewEducation] = useState({ institution: '', fieldOfStudy: '', typeOfDegree: '', GPA: '', start_date: new Date(), end_date: new Date(), in_progress: false });
  const [editEducation, setEditEducation] = useState({});


  const onHeadingChange = (event) => {
    onUpdate({ educations: { ...data, heading: event.target.value } });
  }

  const onNewEductionChange = (event) => {
    const name = event.target.id;
    const value = event.target.value;
    setNewEducation((prev) => ({ ...prev, [name]: value }));
  }

  const saveNewEducation = () => {
    debugger
    const allEducations = [...data.educationInfo, newEducation]
    onUpdate({ educations: { ...data, educationInfo: allEducations } });
    setShowAddModal(false);
    setNewEducation({ institution: '', fieldOfStudy: '', typeOfDegree: '', GPA: '', start_date: '', end_date: '', in_progress: false });
  }
  const onExistingEducationChange = (event) => {
    const name = event.target.id;
    const value = event.target.value;
    setEditEducation((prev) => ({ ...prev, [name]: value }));
  }

  const saveEdittedEducation = () => {
    const allEducations = [...data.educationInfo];
    allEducations[showEditModal] = editEducation;
    onUpdate({ educations: { ...data, educationInfo: allEducations } });
    setShowEditModal(-1);
  }
  const deleteEducation = (index) => {
    const allEducations = [...data.educationInfo];
    allEducations.splice(index, 1);
    onUpdate({ educations: { ...data, educationInfo: allEducations } });
  }
  const onNewInProgressChange = () => {
    setNewEducation((prev) => ({ ...prev, in_progress: !prev.in_progress, end_date: "" }));
  }
  const onExistingInProgressChange = () => {
    setEditEducation((prev) => ({ ...prev, in_progress: !prev.in_progress, end_date: "" }));
  }
  return (
    <>
      <Alert variant="primary">
        <Alert.Heading> Writing education in resume is mandatory!</Alert.Heading>
        <p>
          Share the degrees you’ve earned and schools you’ve attended.
          Remember, learning doesn’t stop when you graduate.
          This is a great place to add in any courses you’ve taken or certifications you’ve earned in the professional world as well!
        </p>
      </Alert>

      <Form>
        <Form.Row>
          <Form.Group as={Col} xs={8} controlId="heading">
            <Form.Label>Heading</Form.Label>
            <Form.Control type="text"
              placeholder="E.g. Educational Qualifications, Education"
              value={(data == null) ? "" : data.heading}
              onChange={onHeadingChange} />
          </Form.Group>
        </Form.Row>
      </Form>
      {(data == null) ? "" :
        data.educationInfo.map((item, index) => {
          return (
            <Card key={item.fieldOfStudy} border="primary" style={{ width: '28rem', margin: '.3rem' }}>
              <Card.Body>
                <Card.Title>{item.institution}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {showDateFromTo(item.start_date, item.end_date)}
                </Card.Subtitle>
                <Card.Text>
                  {item.typeOfDegree} - {item.fieldOfStudy}
                </Card.Text>
                <div>
                  <Button
                    variant="primary"
                    type="button"
                    style={{ margin: '.2rem' }}
                    onClick={() => {
                      setShowEditModal(index)
                      setEditEducation(item)
                    }
                    }>
                    EDIT
                  </Button>
                  <Button
                    variant="primary"
                    type="button"
                    onClick={() =>
                      deleteEducation(index)}
                  >
                    DELETE
                    </Button>
                </div>
              </Card.Body>
            </Card>
          )
        }
        )}
      <Button type="button" variant='primary'
        onClick={() => setShowAddModal(true)}
        size='md'>+ ADD Education</Button>
      <CustomModal
        title="Add Education"
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={saveNewEducation}
      >
        <EducationInformationForm education={newEducation} onEducationChange={onNewEductionChange} onInProgressChange={onNewInProgressChange} />
      </CustomModal>
      <CustomModal
        title="Edit Education"
        show={showEditModal > -1}
        onClose={() => setShowEditModal(-1)}
        onSubmit={saveEdittedEducation}
      >
        <EducationInformationForm education={editEducation} onEducationChange={onExistingEducationChange} onInProgressChange={onExistingInProgressChange} />
      </CustomModal >
    </>
  );
};

function EducationInformationForm({ education, onEducationChange, onInProgressChange }) {
  return (
    <Form>
      <Form.Row>
        <Form.Group as={Col} xs={12} controlId="institution">
          <Form.Label>Institution</Form.Label>
          <Form.Control size="md" type="text" required placeholder="Enter Institution"
            value={education.institution}
            onChange={onEducationChange} />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} xs={12} controlId="fieldOfStudy">
          <Form.Label>Field of Study</Form.Label>
          <Form.Control size="md" type="text" required
            placeholder="Enter Field of Study"
            value={education.fieldOfStudy}
            onChange={onEducationChange} />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} xs={6} controlId="typeOfDegree">
          <Form.Label>Type of Degree</Form.Label>
          <Form.Control size="md" type="text" required
            value={education.typeOfDegree}
            onChange={onEducationChange} />
        </Form.Group>
        <Form.Group as={Col} xs={4} controlId="GPA">
          <Form.Label>GPA</Form.Label>
          <Form.Control size="md" type="text"
            value={education.GPA}
            onChange={onEducationChange} />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} xs={6} controlId="start_date">
          <Form.Label>Start Date</Form.Label>
          <DatePicker selected={education.start_date}
            onChange={(start_date) => onEducationChange({ target: { id: 'start_date', value: start_date } })}
          />
        </Form.Group>
        <Form.Group as={Col} xs={6} controlId="end_date">
          <Form.Label>End Date</Form.Label>
          <DatePicker disabled={education.in_progress}
            selected={education.end_date}
            onChange={(end_date) => onEducationChange({ target: { id: 'end_date', value: end_date } })}
            value={education.end_date ? new Date(education.end_date) : new Date()}
          />
        </Form.Group>
        <Col xs="auto" style={{ position: 'absolute', right: '8rem', bottom: '5px' }}>
          <Form.Check
            type="checkbox"
            id="autoSizingCheck"
            className="my-1"
            label="In Progress"
            checked={education.in_progress}
            onChange={onInProgressChange}
          />
        </Col>
      </Form.Row>
    </Form>
  )
}