import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CustomModal from "components/CustomModal";
import ReactStars from 'react-stars'

export default function CoreCompetencyForm({ data, onUpdate }) {

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(-1);
  const [newSkill, setNewSkill] = useState({ name: "", rating: 1 });
  const [editSkill, setEditSkill] = useState({});


  const onHeadingChange = (event) => {
    const newData = { ...data, heading: event.target.value }
    onUpdate({ core_competencies: newData });
  }

  const onNewSkillChange = (event) => {
    const name = event.target.id;
    const value = event.target.value;
    setNewSkill((prev) => ({ ...prev, [name]: value }));
  }

  const saveNewSkill = (skill) => {
    const allSkills = [...data.skills, skill]
    const newData = { ...data, skills: allSkills };
    onUpdate({ core_competencies: newData });
    setShowAddModal(false);
    setNewSkill({ name: "", rating: 1 })
  }

  const onEditSkillChange = (event) => {
    const name = event.target.id;
    const changedSkill = { ...editSkill, [name]: event.target.value }
    setEditSkill(changedSkill);
  }

  const saveEdittedSkill = (skill) => {
    const newSkills = [...data.skills];
    newSkills[showEditModal] = skill;
    const newData = { ...data, skills: newSkills };
    onUpdate({ core_competencies: newData });
    setShowEditModal(-1);
  }


  const deleteSkill = (index) => {
    const newSkills = [...data.skills];
    newSkills.splice(index, 1)
    const newData = { ...data, skills: newSkills };
    setShowEditModal(-1)
    onUpdate({ core_competencies: newData });
  }

  return (
    <>
      <Alert variant="primary">
        <Alert.Heading>Your skills show us what you got!</Alert.Heading>
        <p>
          Highlight your proficiency with different skills,
          platforms, and technologies that the company is asking
          for in the job description. This will help boost your
          chances of beating the resume scanning robots as well
          as increasing relevance with anyone reading your resume.
        </p>
      </Alert>
      <Form>
        <Form.Row>
          <Form.Group as={Col} xs={8} controlId="heading">
            <Form.Label>Heading</Form.Label>
            <Form.Control type="text"
              placeholder="E.g. Core Competencies, Skills, Expertise"
              value={data.heading}
              onChange={onHeadingChange} />
          </Form.Group>
        </Form.Row>
      </Form>
      <Form.Label>Skills</Form.Label>
      {data.skills.map((item, index) => {
        return (
          <Card className="active-shadow mt-3" style={{ width: '20rem'}} onClick={() => {
            setShowEditModal(index)
            setEditSkill(item)
          }}>
            <Card.Body>
              <Card.Subtitle>{item.name}</Card.Subtitle>
              <ReactStars
                half={false}
                value={item.rating}
                count={5}
                size={24}
                color2={'#ffd700'}
                edit={false} />
            </Card.Body>
          </Card>
        )
      }
      )}
      <div className="mb-3 mt-3">
        <Button type="button" variant='primary' onClick={() => setShowAddModal(true)} size='m'>
          + Add Skill
        </Button>
      </div>
      <CustomModal
        title="Add Skill"
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={() => saveNewSkill(newSkill)}
      >
        <SkillForm skill={newSkill} changeHandler={onNewSkillChange} />
      </CustomModal>

      <CustomModal
        title="Edit Skill"
        show={showEditModal > -1}
        onClose={() => setShowEditModal(-1)}
        onSubmit={() => saveEdittedSkill(editSkill)}
        onDelete={() => deleteSkill(showEditModal)}
      >
        <SkillForm skill={editSkill} changeHandler={onEditSkillChange} />
      </CustomModal>
    </>
  );
};

function SkillForm({ skill, changeHandler }) {
  return (
    <Form>
      <Form.Row>
        <Form.Group as={Col} xs={5} controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control size="md" type="text" required
            value={skill.name}
            onChange={changeHandler} />
        </Form.Group>
        <Form.Group as={Col} xs={5} controlId="rating">
          <Form.Label>Rating</Form.Label>
          <ReactStars
            half={false}
            value={skill.rating}
            count={5}
            onChange={(rating) => changeHandler({ target: { id: 'rating', value: rating } })}
            size={24}
            color2={'#ffd700'} />
        </Form.Group>
      </Form.Row>
    </Form>
  )
}