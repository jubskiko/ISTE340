import React, { useState, useEffect } from 'react';
import { Segment, Header, List, Statistic } from 'semantic-ui-react';
import getData from '../utils/getData';
import './Info.css';

//  This component displays the information about the employment statistics, degree statistics, random employers, and random careers
const Info = () => {
    const [infoData, setInfoData] = useState(null);

    useEffect(() => {
        getData('employment/') 
            .then((data) => {
                setInfoData(data);
            })
    }, []);

    if (!infoData) {
        return <div>Loading...</div>;
    }

    const getRandomElements = (array, n) => {
        const shuffled = array.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, n);
    };

    //  Get 10 random employers and careers
    const randomEmployers = getRandomElements(infoData.employers.employerNames, 10);
    const randomCareers = getRandomElements(infoData.careers.careerNames, 10);

    return (
        <Segment className="infoSegment">
            <Header as='h2' className="infoHeader">{infoData.introduction.title}</Header>
            {infoData.introduction.content.map((item, index) => (
                <div key={index} className="infoContent">
                    <Header as='h3'>{item.title}</Header>
                    <p>{item.description}</p>
                </div>
            ))}

            <Header as='h2' className="infoHeader">{infoData.degreeStatistics.title}</Header>
            <Statistic.Group className="infoStatistic">
                {infoData.degreeStatistics.statistics.map((stat, index) => (
                    <Statistic key={index}>
                        <Statistic.Value>{stat.value}</Statistic.Value>
                        <Statistic.Label>{stat.description}</Statistic.Label>
                    </Statistic>
                ))}
            </Statistic.Group>

            <Header as='h2' className="infoHeader">Employers</Header>
            <List className="infoList">
                {randomEmployers.map((employer, index) => (
                    <List.Item key={index}>{employer}</List.Item>
                ))}
            </List>

            <Header as='h2' className="infoHeader">Careers</Header>
            <List className="infoList">
                {randomCareers.map((career, index) => (
                    <List.Item key={index}>{career}</List.Item>
                ))}
            </List>
        </Segment>
    );
};

export default Info;
