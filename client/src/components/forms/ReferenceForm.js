import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CustomModal from "../CustomModal";

export default function ReferenceForm({ data, onUpdate }) {
  const emtpyReference = { name: "", email: "" };
  const [showAddModal, setShowAddModal] = useState(false);
  // showEditModal contains the id of the selected skill to be editted
  const [showEditModal, setShowEditModal] = useState(-1);
  const [newReference, setNewReference] = useState(emtpyReference);
  const [editReference, setEditReference] = useState({});

  const onHeadingChange = (event) => {
    onUpdate({ references: { ...data, heading: event.target.value } });
  }

  const onReferenceChange = (event) => {
    const name = event.target.id;
    const value = event.target.value;
    setNewReference((prev) => ({ ...prev, [name]: value }));
  }
  const saveNewReference = () => {
    const allReferees = [...data.referees, newReference]
    onUpdate({ references: { ...data, referees: allReferees } });
    setShowAddModal(false);
    setNewReference(emtpyReference);
  }

  const onExistingReferenceChange = (event) => {
    const name = event.target.id;
    const value = event.target.value;
    setEditReference((prev) => ({ ...prev, [name]: value }));
  }

  const saveEdittedReference = () => {
    const allReferences = [...data.referees];
    allReferences[showEditModal] = editReference;
    onUpdate({ references: { ...data, referees: allReferences } });
    setShowEditModal(-1);
  }

  const deleteReference = (index) => {
    const allReferences = [...data.referees];
    allReferences.splice(index, 1);
    onUpdate({ references: { ...data, referees: allReferences } });
  }


  return (
    <>
      <Alert variant="primary">
        <Alert.Heading>Create a reference List!</Alert.Heading>
        <p>
          Many potential employers ask for a list of references in a job application or at the end of a job interview.
          That’s why it’s a good idea to have a list of references handy when you’re applying for a new job.
        </p>
      </Alert>

      <Form>
        <Form.Row>
          <Form.Group as={Col} xs={8} controlId="heading">
            <Form.Label>Heading</Form.Label>
            <Form.Control type="text"
              placeholder="E.g. References"
              value={data.heading}
              onChange={onHeadingChange} />
          </Form.Group>
        </Form.Row>
      </Form>
      {
        data.referees.map((item, index) => {
          if (!item.name || !item.email) {
            return (
              <Card border="primary" style={{ width: '20rem', margin: '.5rem' }}>
                <Card.Body>
                  <div>
                    Reference upon request
                  </div>

                  <div className="mt-3">
                    <Button variant="primary" type="button" style={{ margin: '.2rem' }}
                      onClick={() => {
                        setShowEditModal(index)
                        setEditReference(item)
                      }
                      }>Edit</Button>
                    <Button variant="danger" type="button"
                      onClick={() => deleteReference(index)}>Delete</Button>
                  </div>
                </Card.Body>
              </Card>
            );
          } else {
            return (
              <Card border="primary" style={{ width: '20rem', margin: '.5rem' }}>
                <Card.Body>
                  <Card.Subtitle>Name:</Card.Subtitle>
                  <Card.Text>
                    {item.name}
                  </Card.Text>
                  <Card.Subtitle>Email:</Card.Subtitle>
                  <Card.Text>
                    {item.email}
                  </Card.Text>
                  <div>
                    <Button variant="primary" type="button" style={{ margin: '.2rem' }}
                      onClick={() => {
                        setShowEditModal(index)
                        setEditReference(item)
                      }
                      }>Edit</Button>
                    <Button variant="danger" type="button"
                      onClick={() => deleteReference(index)}>Delete</Button>
                  </div>
                </Card.Body>
              </Card>
            )
          }
        })
      }
      <Button type="button" variant='primary'
        onClick={() => setShowAddModal(true)} size='m'>+ Add Reference</Button>
      <CustomModal
        title="Add Reference"
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={saveNewReference}
      >
        <ReferenceInformationForm reference={newReference} onReferenceChange={onReferenceChange} />
      </CustomModal>
      <CustomModal
        title="Edit Referee"
        show={showEditModal > -1}
        onClose={() => setShowEditModal(-1)}
        onSubmit={saveEdittedReference}
      >
        <ReferenceInformationForm reference={editReference} onReferenceChange={onExistingReferenceChange} />
      </CustomModal>
    </>
  );
};

function ReferenceInformationForm({ reference, onReferenceChange }) {
  return (
    <Form>
      <Form.Row>
        <Form.Group as={Col} xs={5} controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            size="md"
            type="text"
            required
            onChange={onReferenceChange}
            value={reference.name}
            disabled={reference.req}
          />
        </Form.Group>
        <Form.Group as={Col} xs={5} controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            size="md"
            type="email"
            required
            onChange={onReferenceChange}
            value={reference.email}
            disabled={reference.req}
          />
        </Form.Group>
      </Form.Row>
    </Form>
  )
}