import * as Speech from "expo-speech";
// context foreground or background
class ExpoSpeech {
  constructor(language, rate, pitch) {
    this.language = null;
    this.rate = null;
    this.pitch = null;
    language ? (this.language = language) : (this.language = "en-US");
    rate ? (this.rate = rate) : (this.rate = 0.5);
    pitch ? (this.pitch = pitch) : (this.pitch = 1);
    option = {
      language: this.language,
      rate: this.rate,
      pitch: this.pitch,
    };
  }
  activityStart() {
    console.log("activityStart");
    Speech.speak("Activity Start", this.option);
  }
  activityStop() {
    console.log("activityStop");
    Speech.speak("Activity Stop", this.option);
  }
  activityPause() {
    console.log("activityPause");
    Speech.speak("Activity Pause", this.option);
  }
  speakText(text) {
    Speech.speak(text, this.option);
  }
}
export default ExpoSpeech;
