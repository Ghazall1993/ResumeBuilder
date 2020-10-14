import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CustomModal from "components/CustomModal";
import DatePicker from "react-datepicker";
import Alert from 'react-bootstrap/Alert';
import ReactListInput from 'react-list-input';
import { Item, StagingItem } from "helpers/reactListInputHelper"
import showDateFromTo from "helpers/dateUtils";


export default function ExperienceForm({ data, onUpdate }) {
  const emptyExperience = {
    employer_name: "",
    employer_description: "",
    job_title: "",
    start_date: new Date(),
    end_date: new Date(),
    present: false,
    city: "",
    country: "",
    responsibilities: [],
    achievements: [],
  }

  const [showAddModal, setShowAddModal] = useState(false);
  // showEditModal conatins the id of the selected experience to be editted
  const [showEditModal, setShowEditModal] = useState(-1);
  const [newExperience, setNewExperience] = useState(emptyExperience);
  const [editExperience, setEditExperience] = useState({});


  const onHeadingChange = (event) => {
    onUpdate({ experience: { ...data, heading: event.target.value } });
  }

  const saveNewExperience = () => {
    const allExperiences = [...data.experiences, newExperience];
    onUpdate({ experience: { ...data, experiences: allExperiences } });
    setShowAddModal(false);
    setNewExperience(emptyExperience);
  }

  const onNewExperienceChange = (event) => {
    const name = event.target.id;
    const value = event.target.value;
    setNewExperience((prev) => ({ ...prev, [name]: value }));
  }

  const deleteExperience = (index) => {
    const allExperiences = [...data.experiences];
    allExperiences.splice(index, 1)
    setShowEditModal(-1)
    onUpdate({ experience: { ...data, experiences: allExperiences } });
  }

  const handleEditExperienceChange = (event) => {
    const name = event.target.id;
    const value = event.target.value;
    setEditExperience((prev) => ({ ...prev, [name]: value }));
  }

  const onNewInProgressChange = () => {
    setNewExperience((prev) => ({ ...prev, present: !newExperience.present, end_date: "" }));
  }

  const onExistingInProgressChange = () => {
    setEditExperience((prev) => ({ ...prev, present: !editExperience.present, end_date: "" }));
  }

  const saveEdittedExperience = () => {
    const allExperiences = [...data.experiences];
    allExperiences[showEditModal] = editExperience;
    onUpdate({ experience: { ...data, experiences: allExperiences } });
    setShowEditModal(-1);
  }

  return (
    <>
      <Alert variant="primary">
        <Alert.Heading>Let’s work on your experience!</Alert.Heading>
        <p>
          Start with your most recent job and work backwards. You can include relevant
          volunteer work, internships, and extracurricular activities too.
        </p>
      </Alert>

      <Form>
        <Form.Row>
          <Form.Group as={Col} xs={8} controlId="heading">
            <Form.Label>Heading</Form.Label>
            <Form.Control type="text"
              placeholder="E.g. Experience, Work Experience"
              value={data.heading}
              onChange={onHeadingChange} />
          </Form.Group>
        </Form.Row>
      </Form>


      {(data == null) ? "" :
        (data.experiences || []).map((item, index) => {
          return (
            <Card key={item.description}
              className="active-shadow mt-3"
              style={{ width: '28rem' }}
              onClick={() => {
                setShowEditModal(index)
                setEditExperience(item)
              }} >
              <Card.Body>
                <Card.Title>{item.employer_name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {showDateFromTo(item.start_date, item.end_date)}
                </Card.Subtitle>
                <Card.Text>
                  {item.responsibilities[0]}
                </Card.Text>
              </Card.Body>
            </Card>
          )
        }
        )}

      <div className="mb-3 mt-3">
        <Button type="button" className variant='primary'
          onClick={() => setShowAddModal(true)} size='m'>+ Add Experience</Button>
      </div>
      <CustomModal
        title="Add Experience"
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={() => saveNewExperience(newExperience)}
      >
        <ExperienceInformationForm experience={newExperience} onExperienceChange={onNewExperienceChange} onInProgressChange={onNewInProgressChange} />
      </CustomModal>

      <CustomModal
        title="Edit Experience"
        show={showEditModal > -1}
        onClose={() => setShowEditModal(-1)}
        onSubmit={() => saveEdittedExperience(editExperience)}
        onDelete={() => deleteExperience(editExperience)}
      >
        <ExperienceInformationForm experience={editExperience} onExperienceChange={handleEditExperienceChange} onInProgressChange={onExistingInProgressChange} />
      </CustomModal>
    </>)
}


function ExperienceInformationForm({ experience, onExperienceChange, onInProgressChange }) {
  return (
    <Form>
      <Form.Group controlId="employer_name">
        <Form.Label>Employer Name</Form.Label>
        <Form.Control
          size="md"
          type="text"
          required
          onChange={onExperienceChange}
          value={experience.employer_name}
        />
      </Form.Group>

      <Form.Group controlId="employer_description">
        <Form.Label>Employer Description</Form.Label>
        <Form.Control
          size="md"
          type="text"
          required
          onChange={onExperienceChange}
          value={experience.employer_description}
        />
      </Form.Group>

      <Form.Group controlId="job_title">
        <Form.Label>Job Title</Form.Label>
        <Form.Control
          size="md"
          type="text"
          required
          onChange={onExperienceChange}
          value={experience.job_title}
        />
      </Form.Group>

      <Form.Row>
        <Form.Group as={Col} controlId="start_date">
          <Form.Label>Start Date</Form.Label>
          <DatePicker className="form-control"
            selected={experience.start_date}
            onChange={(start_date) => onExperienceChange({ target: { id: 'start_date', value: start_date } })}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="end_date">
          <Form.Label>End Date</Form.Label>
          <DatePicker className="form-control" disabled={experience.present}
            selected={experience.end_date}
            onChange={(end_date) => onExperienceChange({ target: { id: 'end_date', value: end_date } })}
          />
        </Form.Group>

        <Form.Group className="align-self-end" id="checkbox" controlId="present">
          <Form.Check type="checkbox"
            label="Present"
            onChange={onInProgressChange}
            value={experience.present}
            defaultChecked={experience.present}
          />
        </Form.Group>

      </Form.Row>

      <Form.Row>
        <Form.Group as={Col} controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            size="md"
            type="text"
            required={true}
            onChange={onExperienceChange}
            value={experience.city}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="country">
          <Form.Label>Country</Form.Label>
          <Form.Control
            size="md"
            type="text"
            required
            onChange={onExperienceChange}
            value={experience.country}
          />
        </Form.Group>
      </Form.Row>

      <Form.Group controlId="exampleForm.ControlTextarea1">
        <Form.Label>Responsibilities</Form.Label>
        <ReactListInput
          initialStagingValue=''
          onChange={(res) => onExperienceChange({ target: { id: 'responsibilities', value: res } })}
          maxItems={5}
          ItemComponent={Item}
          StagingComponent={StagingItem}
          value={experience.responsibilities || []}
        />
      </Form.Group>

      <hr className="mt-4 mb-4" />

      <Form.Group controlId="exampleForm.ControlTextarea1">
        <Form.Label>Achievements</Form.Label>
        <ReactListInput
          initialStagingValue=''
          onChange={(res) => onExperienceChange({ target: { id: 'achievements', value: res } })}
          maxItems={5}
          ItemComponent={Item}
          StagingComponent={StagingItem}
          value={experience.achievements || []}
        />
      </Form.Group>
    </Form>

  )
}
