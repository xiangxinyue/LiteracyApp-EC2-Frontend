import React from "react";
import PhonemeIntro from "../../../components/student/phoneme/assign/assignintro";
import PhonemePart from "../../../components/student/phoneme/assign/phonemepart";
import AudioPart from "../../../components/student/phoneme/assign/audiopart";
import PhonemeHeader from "../../../components/student/phoneme/assets/header";
import PhonemeProgress from "../../../components/student/phoneme/assign/phoneme-progress";
import AudioProgress from "../../../components/student/phoneme/assign/audio-progress";
import { Container, CircularProgress } from "@material-ui/core";
import axios from "axios";

class PhonemeAssign extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      start: false,
      phonemeDone: false,
      phonemeAssign: [],
      id: "",
      progress: null,
      version: null
    };
  }

  handleAudioAssign = async (audioAssign) => {
    const { phonemeAssign, version } = this.state;
    await axios.post("/api/phoneme/student/assign", {
      phonemeAssign,
      audioAssign,
      version
    });
    window.location = "/student/phoneme";
  };

  componentDidUpdate = async () => {
    const { id, progress } = this.state;
    if (id !== "" && !progress) {
      const doc = await axios.get("/api/phoneme/student/progress/" + id);
      this.setState({
        progress: doc.data,
        phonemeAssign: doc.data.phonemeAssign,
      });
    }
  };

  // if save in the phoneme part, only save that part and generate audio later
  // if save in the audio part, save both and only resume audio part
  renderProgress = () => {
    const { progress, phonemeDone, phonemeAssign, version } = this.state;
    if (progress) {
      if (progress.phonemeAssign.length === 0) {
        return !phonemeDone ? (
          <PhonemeProgress
            progress={progress}
            version={version}
            handlePhonemeAssign={(data) =>
              this.setState({ phonemeAssign: data, phonemeDone: true })
            }
          />
        ) : (
            <AudioPart
              version={version}
              phonemeAssign={phonemeAssign}
              handleAudioAssign={(data) => this.handleAudioAssign(data)}
            />
          );
      } else {
        return (
          <AudioProgress
            progress={progress}
            version={version}
            phonemeAssign={progress.phonemeAssign}
            handleAudioAssign={(data) => this.handleAudioAssign(data)}
          />
        );
      }
    } else {
      return <CircularProgress />;
    }
  };

  render() {
    const { start, phonemeDone, id, phonemeAssign, version } = this.state;
    return (
      <div>
        <Container>
          {start ? (
            id === "" ? (
              !phonemeDone ? (
                <PhonemePart
                  version={version}
                  handlePhonemeAssign={(data) =>
                    this.setState({ phonemeAssign: data, phonemeDone: true })
                  }
                />
              ) : (
                  <AudioPart
                    version={version}
                    phonemeAssign={phonemeAssign}
                    handleAudioAssign={(data) => this.handleAudioAssign(data)}
                  />
                )
            ) : (
                this.renderProgress()
              )
          ) : (
              <div>
                <PhonemeHeader part="Training Assignment" />
                <PhonemeIntro
                  handleClick={(id, section) => this.setState({ start: !start, id, version: section })}
                />
              </div>
            )}
        </Container>
      </div>
    );
  }
}

export default PhonemeAssign;
