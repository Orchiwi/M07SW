// window.addEventListener("load", loadcorrectpage);
// document.getElementById("donneesdrone").addEventListener("click",recupererDonneesDrones);
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
            var pagehtml = document.getElementById( 'section' );
            pagehtml.innerHTML = reponse;

            
        }
    };
    xhttp.open("GET", "mainDrone.html", true);
    xhttp.send();
    setCookie("page","suivi",1); 
   recupererStatistique()
   


}

function recupererDonneesDrones(){

  console.debug("Donnees Drones ! ");
  // var xhttp = new XMLHttpRequest();
  // xhttp.onreadystatechange = function() {
  //     if (this.readyState == 4 && this.status == 200) {






//   let reponseAPI=JSON.parse(this.responseText);
// var table="<div ><table class='tableau_statistique '><tr class='centrer'><th>Numérodrône</th><th>Marque</th><th>Modèle</th><th>Référence</th><th>Dateachat</th><th>Action</th></tr>";
//  for(let i=0;i<reponseAPI.valeur.length;i++){
//  table+="<tr class='centrer'>";
//  let donneesVol=reponseAPI.valeur[i];
//  table+="<td>"+donneesVol.idvol+"</td>";
//  table+="<td>"+donneesVol.dateVol+"</td>";
//  table+="<td>"+donneesVol.iddrone+"</td>";
//  table+="<td>"+donneesVol.nom+"</td>";
//  table+="</tr>";
//  }
//  table+="</table></div>";
// document.getElementById("section").innerHTML=table;






// }
// };
// xhttp.open("GET", "mainDrone.html", true);
// xhttp.send();
// setCookie("page","suivi",1); 
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
