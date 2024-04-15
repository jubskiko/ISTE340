import React, { useState, useEffect } from 'react';
import { Accordion, Icon, Button, Modal, Header } from 'semantic-ui-react';
import getData from '../utils/getData';

// This component displays the minor information
const Minor = () => {
  const [minorsData, setMinorsData] = useState([]);
  const [coursesData, setCoursesData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState({});

  // Function to handle the click event on the accordion
  const handleClick = (index) => {
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  };

  // Function to handle the click event on the course button
  const handleCourseClick = (courseId) => {
    const course = coursesData.find(course => course.courseID === courseId);
    setSelectedCourse(course);
    setModalOpen(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      const minors = await getData('minors/');
      const courses = await getData('course/');  
      setMinorsData(minors.UgMinors);
      setCoursesData(courses);
      setLoaded(true);
    };

    fetchData();
  }, []);

  if (!loaded) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className='minor'>
      {minorsData.map((minor, index) => (
        <Accordion fluid styled key={index}>
          <Accordion.Title
            active={activeIndex === index}
            index={index}
            onClick={() => handleClick(index)}
          >
            <Icon name='dropdown' />
            {minor.title}
          </Accordion.Title>
          <Accordion.Content active={activeIndex === index}>
            <p>{minor.description}</p>
            <div>
              <strong>Courses:</strong>
              <div style={{ marginTop: '10px' }}>
                {minor.courses.map((course, courseIndex) => (
                  <Button key={courseIndex} basic color="blue" style={{ margin: '5px' }}
                    onClick={() => handleCourseClick(course)}>
                    {course}
                  </Button>
                ))}
              </div>
            </div>
          </Accordion.Content>
        </Accordion>
      ))}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Modal.Header>Course Information</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Header>{selectedCourse.title}</Header>
            <p>{selectedCourse.description}</p>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => setModalOpen(false)} color='red'>
            Close
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default Minor;
