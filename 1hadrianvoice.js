// Adam Rilatt
// Hadrian Personal Assistant

function say(s) {

  var msg = new SpeechSynthesisUtterance();
  var voices = window.speechSynthesis.getVoices();
  msg.voice = voices[7]; // Note: some voices don't support altering params
  msg.voiceURI = 'native';
  msg.volume = 1; // 0 to 1
  msg.rate = 1; // 0.1 to 10
  msg.pitch = 0.8; //0 to 2
  msg.text = s;
  msg.lang = 'en-GB';

  speechSynthesis.speak(msg);
};

function getWeather(location) {
  open('https://www.google.com/search?q=what%27s+the+weather+in+'+location, '_blank');
};

function openPage(page) {

  // navigates directly to a page
  switch (page) {

    case 'a new tab':
    case 'Google':
      open('https://www.google.com', '_blank')
      break;
    case 'Flex time manager':
    case 'flextime manager':
      open('https://www.flextimemanager.com/student', '_blank')
      break;
    case 'Skyward':
    case 'my grades':
      open('https://skyward.centralyork.org/scripts/wsisa.dll/WService=wsEAplus/seplog01.w', '_blank')
      break;
    case 'Schoology':
      open('https://schoology.centralyork.org/home/course-dashboard#/?_k=acwoor', '_blank')
      break;
    case 'Gmail':
    case 'my mail':
      open('https://mail.google.com/mail/u/0/#inbox', '_blank')
      break;
    default:
      say('what?');
      alert(page);
  }

}

function addVoiceReader () {

  if (annyang) {

    navigator.mediaDevices.getUserMedia({audio: true});

    // all commands go here
    var commands = {
    'stop listening' : function() { annyang.abort(); },
    'say *phrase' : say,
    'what\'s the weather in *location' : getWeather,
    'define *phrase' : function(phrase) { open('https://www.google.com/search?q=define+'+phrase, '_blank'); },
    'google *search' : function(search) { open('http://www.google.com/search?q='+search, '_blank'); },
    'open *page' : openPage,
    'search for *term on Wikipedia' : function(term) { open('https://en.wikipedia.org/wiki/'+term.replace(" ", "_"), '_blank'); },
    'tell me about *term' : function(term) { open('https://en.wikipedia.org/wiki/'+term.replace(" ", "_"), '_blank'); }
    };

    // Add the commands to the listener
    annyang.addCommands(commands);

    // start the listener
    annyang.start();

  }

}

chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
  if (request.msg == "begin") {
    addVoiceReader();
  }
})
