window.onload = function() {
  var inputBox = document.getElementById('input-section');
  var inputMenu = document.getElementById('input-menu');
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  var eraser = document.getElementById('eraser');

  var currentX;
  var currentY;
  var prevX;
  var prevY;

  var alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s'
  ,'t','u','v','w','y','x','z'];


  var setCanvasDimensions = function() {
    var fivePercent = (document.querySelector('body').offsetHeight/100) * 5;
    canvas.height = inputBox.offsetHeight - fivePercent;
    canvas.width = inputBox.offsetWidth;
    console.log(inputBox.offsetHeight - canvas.offsetHeight);
    inputMenu.style.height = (inputBox.offsetHeight - canvas.offsetHeight) + 'px';
    console.log(inputMenu.offsetHeight);

    console.log('input box :' + inputBox.offsetHeight, inputBox.offsetWidth);
    console.log('canvas :' + canvas.offsetHeight, canvas.offsetWidth);
  }

  setCanvasDimensions();

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

  var clearCanvas = function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  var randomLetter = function() {
    var randomNum = Math.round(Math.random() * 25);
    console.log(alphabet[randomNum]);
    return alphabet[randomNum];
  };

  randomLetter();



  canvas.addEventListener('mousedown', start);
  canvas.addEventListener('mouseup', end);
  window.addEventListener('resize', setCanvasDimensions);
  eraser.addEventListener('click', clearCanvas);

}
