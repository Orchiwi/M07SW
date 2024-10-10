document.getElementById("trajectoire").addEventListener("click", trajectoire);
var isStartingPosition = false;
function trajectoire() {
  console.debug("Trajectoire ! ");
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var reponse = xhttp.responseText;
      let pagehtml = document.getElementById("section");
      pagehtml.innerHTML = reponse;

      console.debug("montrer plan");
      canvas = document.getElementById("canvas_trajectoire");
      ctx = canvas.getContext("2d");
      var img = new Image();
      img.src = "../img/plan.png";
      img.onload = function () {
        ctx.drawImage(img, 0, 0);
      };

      document.getElementById("nav_creer").addEventListener("click", showCreer);
      document
        .getElementById("tracer")
        .addEventListener("click", dessinerTrajectoire);
      document
        .getElementById("nav_charger")
        .addEventListener("click", showCharger);
      document
        .getElementById("effacer")
        .addEventListener("click", effacerTrajectoire);
    }
  };

  xhttp.open("GET", "trajectoire.html", true);
  xhttp.send();
  setCookie("page", "trajectoire", 1);
}

function showCreer() {
  document.getElementById("liste_trajectoire").style.display = "none";
  document.getElementById("creer_trajectoire").style.display = "block";
}

function showCharger() {
  document.getElementById("creer_trajectoire").style.display = "none";
  document.getElementById("liste_trajectoire").style.display = "block";
}

function dessinerTrajectoire() {
  let posx = document.getElementById("posx").value;
  let posy = document.getElementById("posy").value;
  let x = parseInt(posx);
  let y = parseInt(posy);
  if (!isStartingPosition) {
    try {
      isStartingPosition = true;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.moveTo(x - 5, y - 5);
      ctx.lineTo(x + 5, y + 5);
      ctx.moveTo(x + 5, y - 5);
      ctx.lineTo(x - 5, y + 5);
      ctx.moveTo(x, y);
      ctx.stroke();
    } catch (error) {
      console.error(
        `Erreur lors de la création de la croix de départ : ${error}`
      );
    }
    document.getElementById(
      "logdiv"
    ).innerHTML = `<div class="logtraj">start ${x} ${y}</div><div class="logtraj">command</div><div class="logtraj">takeoff</div>`;
  } else {
    try {
      ctx.lineTo(x, y);
      ctx.moveTo(x - 5, y - 5);
      ctx.lineTo(x + 5, y + 5);
      ctx.moveTo(x + 5, y - 5);
      ctx.lineTo(x - 5, y + 5);
      ctx.moveTo(x, y);
      ctx.stroke();
    } catch (error) {
      console.error(`Erreur lors de la création d'une croix: ${error}`);
    }
    document.getElementById(
      "logdiv"
    ).innerHTML += `<div class="logtraj">go ${x} ${y} 0 50</div>`;
  }
}

function effacerTrajectoire() {
  try {
    ctx.closePath();
    // ctx.save();
    // ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // console.log(canvas.width + "\n" + canvas.height)
    // ctx.restore();
    var img = new Image();
    img.src = "../img/plan.png";
    img.onload = function () {
      ctx.drawImage(img, 0, 0);
    };
    isStartingPosition = false;
  } catch (error) {
    console.error(error)
  }
}
