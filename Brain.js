import Cortex from "./Cortex.js";
class Brain{
    constructor(){
        //video/webcamera as input
        this.visual_coretx = new Cortex();
        //audio/microphone as input = cortex needs continuous input
        this.audio_cortex = new Cortex();
        //motor controls for the little hamster ball :)
        this.motor_cortex = new Cortex();
        //dream layer -  init with stream of data from self process... weirdest to set up...
        //some sort of self reflection... preffer closer to hardware level.
        this.id= new Cortex();

        //output of visual / audio /motor / id are feed into ego for final decision;
        
        this.ego = new Cortex();
    }



}
export default Brain



