import React from "react";
import TrainCard from "../../../assets/cards/trainpagecard";
import { Container } from "@material-ui/core";

class FluencyTutorMain extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div>
        <div className="jumbotron">
          <h2>Welcome to Fluency Session Tutor Main Page</h2>
          <hr />
        </div>
        <Container>
          <h3>Review Students' Assignments and Performance</h3>
          <div className="row">
            <TrainCard
              title="Students' Access"
              page="/tutor/fluency/test"
              description="In this part, you can review students' access performance"
            />
            <TrainCard
              title="Students' Assignment"
              page="/tutor/fluency/assign"
              description="In this part, you can review students' assignment"
            />
            <TrainCard
              title="Students' Performance"
              page="/tutor/fluency/performance"
              description="In this part, you can check students' performance"
            />

          </div>
        </Container>
        <Container>
          <h3>Review Students' Assignments and Performance</h3>
          <div className="row">
            <TrainCard
              title="Modify Learning Materials"
              page="/tutor/fluency/materials"
              description="In this part, you can modify speed learning materials"
            />
            <TrainCard
              title="Modify Fluency Test Data"
              page="/tutor/fluency/testdata"
              description="In this part, you can modify speed training data"
            />
            <TrainCard
              title="Modify Fluency Assignment Data"
              page="/tutor/fluency/traindata"
              description="In this part, you can modify speed training data"
            />
          </div>
        </Container>
      </div>
    );
  }
}

export default FluencyTutorMain;
