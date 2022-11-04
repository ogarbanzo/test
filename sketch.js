let mic, recorder, soundFile;
let state = 0;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


function setup() {
  createCanvas(400, 400);
  background(200);
  fill(0);
  text('Enable mic and click the mouse to begin recording', 20, 20);

  // create an audio in
  mic = new p5.AudioIn();

  // users must manually enable their browser microphone for recording to work properly!
  mic.start();

  // create a sound recorder
  recorder = new p5.SoundRecorder();

  // connect the mic to the recorder
  recorder.setInput(mic);

  // create an empty sound file that we will use to playback the recording
  // soundFile = new p5.SoundFile();
}

function mousePressed() {
  // ensure audio is enabled
  userStartAudio();

  if (state === 0) {
    soundFile = new p5.SoundFile();
    // Tell recorder to record to a p5.SoundFile which we will use for playback
    recorder.record(soundFile);

    background(255, 0, 0);
    text('Recording now! Click to stop.', 20, 20);
    state++;
  } else if (state === 1) {
    recorder.stop(); // stop recorder, and send the result to soundFile
    console.log('stop recording');

    const save = async() => {
      await sleep(1000);
      //play el archivo
      soundFile.play();
      // se guarda el archivo
      saveSound(soundFile, 'test.wav');
      console.log('save recording');
    }

    save();

    background(0, 255, 0);
    text('Recording stopped. Play & save', 20, 20);
    state = 0;

  }
}