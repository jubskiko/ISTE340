import React, { useState, useEffect } from 'react';
import { Card, Image, Modal, Header, Button } from 'semantic-ui-react';
import getData from '../utils/getData';

import './People.css';

// This component displays the people information
const People = () => {
    const [loaded, setLoaded] = useState(false);
    const [peoObj, setPeoObj] = useState({ faculty: [], staff: [] });
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedPerson, setSelectedPerson] = useState(null);

    useEffect(() => {
        getData('people/')
            .then((json) => {
                setPeoObj(json);
                setLoaded(true);
            })
    }, []);

    //  Function to open the modal with the selected person
    const openModalWithPerson = (person) => {
        setSelectedPerson(person);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedPerson(null); // Reset selected person state
    };

    if (!loaded) {
        return <h1>...Loading People...</h1>;
    }

    return (
        <>
            <h1>{peoObj.title}</h1>
            <h3>{peoObj.subTitle}</h3>
            {['faculty', 'staff'].map((group) => (
                <>
                    <h3>{group.charAt(0).toUpperCase() + group.slice(1)}</h3>
                    <div className="peopleList">
                        {peoObj[group].map((person) => (
                            <Card key={person.email} className="personCard" onClick={() => openModalWithPerson(person)}>
                                <Image src={person.imagePath} ui centered className="personImage" />
                                <Card.Content>
                                    <Card.Header>{person.name}</Card.Header>
                                    <Card.Meta>{person.title}</Card.Meta>
                                </Card.Content>
                            </Card>
                        ))}
                    </div>
                </>
            ))}
            <Modal
                open={modalOpen}
                onClose={closeModal}
            >
                <Modal.Header>{selectedPerson?.name}</Modal.Header>
                <Modal.Content image>
                    <Image size='medium' src={selectedPerson?.imagePath} wrapped />
                    <Modal.Description>
                        <Header>{selectedPerson?.title}</Header>
                        {selectedPerson && Object.entries(selectedPerson).map(([key, value]) => (
                            value && <p key={key}><strong>{key.replace(/([A-Z])/g, ' $1').trim()}:</strong> {value}</p>
                        ))}
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='black' onClick={closeModal}>
                        Close
                    </Button>
                </Modal.Actions>
            </Modal>
        </>
    );
};

export default People;
