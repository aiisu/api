/* Copyright 2013 Chris Wilson

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

window.AudioContext = window.AudioContext || window.webkitAudioContext;

var audioContext = new AudioContext();
var audioInput = null,
    realAudioInput = null,
    inputPoint = null,
    audioRecorder = null;
var rafID = null;
var analyserContext = null;
var canvasWidth, canvasHeight;
var recIndex = 0;
var timePass = 0;
var timeOut = 4000;
var xhr = new XMLHttpRequest();
var Url = "http://150.95.128.46/app_dev.php/api?key=1234&number=3&np=true";
var postData = Array();
var isrecord = false;
/* TODO:

- offer mono option
- "Monitor input" switch
*/

function saveAudio() {
    //audioRecorder.exportWAV( doneEncoding );
    // could get mono instead by saying
    audioRecorder.exportMonoWAV( doneEncoding );
    audioRecorder.clear();
    console.log("saved")
}

function gotBuffers( buffers ) {
    var canvas = document.getElementById( "wavedisplay" );

    drawBuffer( canvas.width, canvas.height, canvas.getContext('2d'), buffers[0] );

    // the ONLY time gotBuffers is called is right after a new recording is completed - 
    // so here's where we should set up the download.
    audioRecorder.exportWAV( doneEncoding );
}

function doneEncoding( blob ) {
  // Recorder.setupDownload( blob, "myRecording" + ((recIndex<10)?"0":"") + recIndex + ".wav" );
 
    console.log(postData.length);
	postData.push(blob);
    recIndex++;
}

function toggleRecording( isReocrd ) {
    if (!isReocrd) {
        // stop recording
        audioRecorder.stop();
     //   audioRecorder.getBuffers( gotBuffers );
     	saveAudio();
    } else {
        // start recording
        if (!audioRecorder)
            return;
        audioRecorder.clear();
        audioRecorder.record();
       
    }
    isrecord = isReocrd;
}

function convertToMono( input ) {
    var splitter = audioContext.createChannelSplitter(1);
    var merger = audioContext.createChannelMerger(1);

    input.connect( splitter );
    splitter.connect( merger, 0, 0 );
 //   splitter.connect( merger, 0, 1 );
    return merger;
}

function cancelAnalyserUpdates() {
    window.cancelAnimationFrame( rafID );
    rafID = null;
}

function updateAnalysers( time ) {
    if (isrecord) {
        var freqByteData = new Uint8Array(1);

        analyserNode.getByteFrequencyData(freqByteData);

        if (freqByteData[0] < 5) {
            if (timePass > 300) {
                timePass = 0;
                saveAudio();
                timeOut = 4000;
            } else {
                timePass++;
            }
        } else {
            timePass = 0;
        }
        if (timeOut < 1) {
            saveAudio();
            timeOut = 4000;
        }
        timeOut--;
    }
     rafID = window.requestAnimationFrame( updateAnalysers );
  }

function toggleMono() {
    if (audioInput != realAudioInput) {
        audioInput.disconnect();
        realAudioInput.disconnect();
        audioInput = realAudioInput;
    } else {
        realAudioInput.disconnect();
        audioInput = convertToMono( realAudioInput );
    }

    audioInput.connect(inputPoint);
}

function gotStream(stream) {
    inputPoint = audioContext.createGain();

    // Create an AudioNode from the stream.
    realAudioInput = audioContext.createMediaStreamSource(stream);
    audioInput = realAudioInput;
    audioInput.connect(inputPoint);
    //toggleMono();
   // audioInput = convertToMono( audioInput );

    analyserNode = audioContext.createAnalyser();
    analyserNode.fftSize = 2048;
    inputPoint.connect( analyserNode );

    audioRecorder = new Recorder( inputPoint );

    zeroGain = audioContext.createGain();
    zeroGain.gain.value = 0.0;
    inputPoint.connect( zeroGain );
    zeroGain.connect( audioContext.destination );
    updateAnalysers();
}

function initAudio() {
        if (!navigator.getUserMedia)
            navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        if (!navigator.cancelAnimationFrame)
            navigator.cancelAnimationFrame = navigator.webkitCancelAnimationFrame || navigator.mozCancelAnimationFrame;
        if (!navigator.requestAnimationFrame)
            navigator.requestAnimationFrame = navigator.webkitRequestAnimationFrame || navigator.mozRequestAnimationFrame;

    navigator.getUserMedia(
        {
            "audio": {
                "mandatory": {
                    "googEchoCancellation": "false",
                    "googAutoGainControl": "false",
                    "googNoiseSuppression": "false",
                    "googHighpassFilter": "false"
                },
                "optional": []
            },
        }, gotStream, function(e) {
            alert('Error getting audio');
            console.log(e);
        });

}

window.addEventListener('load', initAudio );
