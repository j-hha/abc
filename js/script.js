window.onload = function() {

  // *************** DOM ELEMENTS ***************

  var inputBox = document.getElementById('input-section');
  var inputMenu = document.getElementById('input-menu');
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  var eraser = document.getElementById('eraser');
  var letter = document.getElementById('letter');
  var newLetter = document.getElementById('new-letter');
  var h1 = document.querySelector('h1');
  var abcSpan = document.getElementsByClassName('abc-span');
  var options = document.getElementById('options');
  var newLetterTxt = document.getElementById('new-letter-text');
  var newLetterIcon = document.getElementById('new-letter-icon');
  var randomLi = document.getElementById('random');
  var selectLi = document.getElementById('select');
  var header = document.querySelector('header');
  var wordForLetter = document.getElementById('word');


  // *************** VARIABLES TO BE USED LATER ***************

  var currentX;
  var currentY;
  var prevX;
  var prevY;
  var clicked = false;

  // ****** alphabeth letters and words ******
  var alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s'
  ,'t','u','v','w','y','x','z'];
  var currentLetter = alphabet[0];

  var abcWords = {
    'a': ['...'],
    'b': ['bridge'],
    'c': ['cab'],
    'd': ['dog'],
    'e': ['Empire State Building'],
    'f': ['ferry'],
    'g': ['Greenpoint'],
    'h': ['High Line'],
    'i': ['ice cream'],
    'j': ['Jane\'s Carousel'],
    'k': ['Knicks'],
    'l': ['Lincoln Center'],
    'm': ['museum'],
    'n': ['...'],
    'o': ['One World Trade Center'],
    'p': ['park'],
    'q': ['Queens'],
    'r': ['...'],
    's': ['subway'],
    't': ['train'],
    'u': ['United Nations'],
    'v': ['...'],
    'w': ['...'],
    'x': ['...'],
    'y': ['YMCA'],
    'z': ['zoo'],
  };


  for (var i = 0; i < alphabet.length; i++) {
    h1.innerHTML += '<span class="abc-span">' + alphabet[i] + '</span>';
  }

  h1.innerHTML += '<span class="non-abc-span"><a href="#main"><i class="fa fa-angle-down" aria-hidden="true"></i></a></span>';

  // *************** FUNCTIONS ***************

  var draw = function() {
    ctx.strokeStyle = 'deeppink';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(prevX,prevY);
    ctx.lineTo(currentX,currentY);
    ctx.stroke();
  }

  var getCoordinates = function(e) {
    var x = e.clientX - e.currentTarget.offsetLeft;
    var y = e.clientY;
    prevX = currentX;
    prevY = currentY;
    currentX = x;
    currentY = y;
    draw();
  };

  var start = function() {
    currentX = event.clientX - event.currentTarget.offsetLeft;
    currentY = event.clientY;
    canvas.addEventListener('mousemove', getCoordinates);
  };

  var end = function() {
    ctx.closePath();
    canvas.removeEventListener('mousemove', getCoordinates);
  };

  var writeLetter = function() {
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.font="25vmax 'Arial'";
    ctx.strokeStyle = "#808080";
    ctx.lineWidth = 3;
    ctx.strokeText(currentLetter, (canvas.offsetWidth / 2), (canvas.offsetHeight / 2));
  };

  var clearCanvas = function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    writeLetter();
  };

  var getWord = function() {
    for (var letter in abcWords) {
      if (currentLetter === letter.toUpperCase()) {
        wordForLetter.innerHTML = abcWords[letter][0];
      }
    }
  };

  var randomLetter = function() {
    var randomNum = Math.round(Math.random() * 25);
    console.log(alphabet[randomNum]);
    currentLetter = alphabet[randomNum].toUpperCase();
    clearCanvas();
    writeLetter();
    getWord();
  };

  var showOptions = function() {
    if(!clicked) {
      options.style.display = 'block';
      clicked = true;
    } else {
      options.style.display = 'none';
      clicked = false;
    }
  };

  var selectLetter = function() {
    canvas.scrollIntoView()
    currentLetter = this.innerHTML.toUpperCase();
    clearCanvas();
    writeLetter();
    getWord();
  };

  var showLetterOptions = function() {
    header.scrollIntoView();
  };

  var setCanvasDimensions = function() {
    var fivePercent = (document.querySelector('body').offsetHeight/100) * 5;
    canvas.height = inputBox.offsetHeight - fivePercent;
    canvas.width = inputBox.offsetWidth;
    inputMenu.style.height = (inputBox.offsetHeight - canvas.offsetHeight) + 'px';
    clearCanvas();
    writeLetter();
  }

  setCanvasDimensions();
  randomLetter();


  // *************** EVENT LISTENERS ***************

  for (var i = 0; i < abcSpan.length; i++) {
    abcSpan[i].addEventListener('click', selectLetter);
  }

  selectLi.addEventListener('click', showLetterOptions);
  randomLi.addEventListener('click', randomLetter);
  newLetter.addEventListener('click', showOptions);
  canvas.addEventListener('mousedown', start);
  canvas.addEventListener('mouseup', end);
  window.addEventListener('resize', setCanvasDimensions);
  eraser.addEventListener('click', clearCanvas);

}
