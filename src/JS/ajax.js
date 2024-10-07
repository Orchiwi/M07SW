// window.addEventListener("load", loadcorrectpage);

document.getElementById("nav_suivi").addEventListener("click", suivi);







// function loadcorrectpage()
// {
//     let page = getCookie("page");
//     console.debug("cookie page : " + page);
//     if(page == "suivi")
//     {
//         suivi();
//     }
//     else if(page == "message")
//     {
//         message();
//     }
//     else
//     {
//         presentation();
//     }

// }

function suivi() {
    console.debug("Suivi ! ");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var reponse = xhttp.responseText;
            // console.debug(reponse);
            let pagehtml = document.getElementById( 'section' );
            pagehtml.innerHTML = reponse;

            
        }
    };
    xhttp.open("GET", "mainDrone.html", true);
    xhttp.send();
    setCookie("page","suivi",1); 
    
   recupererStatistique()
  //  document.getElementById("donneesdrone").addEventListener("click",recupererDonneesDrones);
   


}



function GraphShow(idvol) {
  console.debug("Graph ! ");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var reponse = xhttp.responseText;
            // console.debug(reponse);
            var pagehtml = document.getElementById( 'section' );
            pagehtml.innerHTML = reponse;

            
        }
    };
    xhttp.open("GET", "Graph.html", true);
    xhttp.send();
    setCookie("page","graph",1); 
    RecupererMesure(idvol)
}
function recupererDonneesDrones(){

  console.debug("Donnees Drones ! ");
  // var xhttp = new XMLHttpRequest();
  // xhttp.onreadystatechange = function() {
  //     if (this.readyState == 4 && this.status == 200) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    let reponseAPI=JSON.parse(this.responseText);
    console.log(reponseAPI.length)
    var table="<div ><table class='tableau_statistique '><tr class='centrer'><th>Numérodrône</th><th>Marque</th><th>Modèle</th><th>Référence</th><th>Dateachat</th></tr>";
 for(let i=0;i<reponseAPI.length;i++){
 table+="<tr class='centrer'>";
 let donneesVol=reponseAPI[i];
 table+="<td>"+donneesVol.iddrone+"</td>";
 table+="<td>"+donneesVol.marque+"</td>";
 table+="<td>"+donneesVol.modele+"</td>";
 table+="<td>"+donneesVol.refDrone+"</td>";
 table+="<td>"+donneesVol.dateAchat+"</td>";
 table+="</tr>";
 }
 table+="</table></div>";
document.getElementById("section").innerHTML=table;
  }
};

  xhttp.open(
      "GET",
      "http://172.20.21.202/~morlet/M07SW/restAPI/rest.php/drone"
    );
    xhttp.send();
}






function recupererDonneesVols(){

  console.debug("Donnees Vols ! ");
  // var xhttp = new XMLHttpRequest();
  // xhttp.onreadystatechange = function() {
  //     if (this.readyState == 4 && this.status == 200) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    let reponseAPI=JSON.parse(this.responseText);
    console.log(reponseAPI.length)
    var table="<div ><table class='tableau_statistique '><tr class='centrer'><th>NuméroVol</th><th>NuméroUtilisateur</th><th>Date du Vol</th><th>NuméroDrone</th><th>Action</th></tr>";
 for(let i=0;i<reponseAPI.length;i++){
 table+="<tr class='centrer'>";
 let donneesVol=reponseAPI[i];
 table+="<td>"+donneesVol.idvol+"</td>";
 table+="<td>"+donneesVol.idutilisateur+"</td>";
 table+="<td>"+donneesVol.dateVol+"</td>";
 table+="<td>"+donneesVol.iddrone+"</td>";
 table+="<td>"+"<button class='buttongraph' data-idvol="+donneesVol.idvol+">test</button>"+"</td>";
 table+="</tr>";
//  console.log("<td>"+"<button id='graph"+donneesVol.idvol+"'>test</button>"+"</td>")
//  document.getElementById('graph'+donneesVol.idvol).addEventListener("click",GraphShow);
 }
 }
 table+="</table></div>";
document.getElementById("section").innerHTML=table;
var elements = document.getElementsByClassName("buttongraph");

 var myFunction = function() {
     var attribute = this.getAttribute("data-idvol");
     alert(attribute);
 };
 
 for (var i = 0; i < elements.length; i++) {
  let idvol = elements[i].getAttribute("data-idvol")
     elements[i].addEventListener('click', function(){GraphShow(idvol)}, false);
     
  }
};

  xhttp.open(
      "GET",
      "http://172.20.21.202/~morlet/M07SW/restAPI/rest.php/vol"
    );
    xhttp.send();
}





function recupererDonneesUtilisateurs(){

  console.debug("Donnees Utilisateurs ! ");
  // var xhttp = new XMLHttpRequest();
  // xhttp.onreadystatechange = function() {
  //     if (this.readyState == 4 && this.status == 200) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    let reponseAPI=JSON.parse(this.responseText);
    console.log(reponseAPI.length)
    var table="<div ><table class='tableau_statistique '><tr class='centrer'><th>NuméroUtilisateur</th><th>nom</th><th>prénom</th><th>email</th><th>naissance</th><th>pseudo</th></tr>";
 for(let i=0;i<reponseAPI.length;i++){
 table+="<tr class='centrer'>";
 let donneesVol=reponseAPI[i];
 table+="<td>"+donneesVol.idutilisateur+"</td>";
 table+="<td>"+donneesVol.nom+"</td>";
 table+="<td>"+donneesVol.prenom+"</td>";
 table+="<td>"+donneesVol.email+"</td>";
 table+="<td>"+donneesVol.naissance+"</td>";
 table+="<td>"+donneesVol.pseudo+"</td>";
 table+="</tr>";
 }
 table+="</table></div>";
document.getElementById("section").innerHTML=table;
  }
};

  xhttp.open(
      "GET",
      "http://172.20.21.202/~morlet/M07SW/restAPI/rest.php/utilisateur"
    );
    xhttp.send();
}


function recupererStatistique(){

  const stat = ['nbdrone', 'nbvol', 'nbutilisateur'];

  stat.forEach((nbstat) =>{
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var reponse = this.responseText;

      // var jsondata = JSON.parse(reponse);
      // console.log(jsondata[0].instant);

      // document.getElementById("reponse").innerHTML = html;

      console.log(reponse[0]);
      document.getElementById(nbstat).textContent = reponse
    }
  };

    xhttp.open(
        "GET",
        "http://172.20.21.202/~morlet/M07SW/restAPI/rest.php/" + nbstat
      );
      xhttp.send();
    }
);



    }










    function Graph(idetat, h) {
      // const context = document.getElementById("monGraphe").getContext("2d");
      // context.clearRect(
      //   0,
      //   0,
      //   document.getElementById("monGraphe").width,
      //   document.getElementById("monGraphe").height
      // );
      var ctx = document.getElementById("monGraphe");
      new Chart(ctx, {
        type: "line",
        options: {
          scales: {
            vitesse: { type: "linear", display: true, position: "left" },
            regime: { type: "linear", display: true, position: "right" },
          },
        },
        data: {
          labels: idetat,
          datasets: [
            {
              label: "h",
              data: h,
              borderColor: "magenta",
              borderWidth: 1,
              yAxisID: "h",
            },
          ],
        },
      });
    }
    
    function RecupererMesure(idvol) {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          var reponse = this.responseText;
          var jsondata = JSON.parse(reponse);
    
          var idetat = [];
          var h = [];
          for (let i = 0; i < jsondata.length; i++) {
            idetat[i] = jsondata[i].idetat;
            h[i] = jsondata[i].h;
          }
          console.log(idetat,h)
          console.log("http://172.20.21.202/~morlet/M07SW/restAPI/rest.php/etat/"+idvol+"/h")
          Graph(idetat,h);
        }
      };
      // let datedebut = document.getElementById("datedebut").value;
      // let datefin = document.getElementById("datefin").value;
      // console.log("\n\n\n\n"+idvol)
      xhttp.open(
        "GET",
        "http://172.20.21.202/~morlet/M07SW/restAPI/rest.php/etat/"+idvol+"/h"
        //  +
          // datedebut +
          // "/" +
          // datefin
      );
      xhttp.send();
    }


