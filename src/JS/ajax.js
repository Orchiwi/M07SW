window.addEventListener("load", loadcorrectpage);
document.getElementById("nav_suivi").addEventListener("click", suivi);



function loadcorrectpage()
{
    let page = getCookie("page");
    console.debug("cookie page : " + page);
    if(page == "suivi")
    {
        suivi();
    }
    // else if(page == "message")
    // {
    //     message();
    // }
    // else
    // {
    //     presentation();
    // }

}

function suivi() {
    console.debug("Suivi ! ");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var reponse = xhttp.responseText;
            console.debug(reponse);
            var pagehtml = document.getElementById( 'section' );
            pagehtml.innerHTML = reponse;

            
        }
    };
    xhttp.open("GET", "mainDrone.html", true);
    xhttp.send();
    setCookie("page","suivi",1); 
    recupererStatistique()


}

function recupererStatistique(){
    const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var reponse = this.responseText;

      var jsondata = JSON.parse(reponse);
      // console.log(jsondata[0].instant);

      // document.getElementById("reponse").innerHTML = html;

      console.log(reponse[0]);
      document.getElementById("nbdrone").textContent = reponse
    }
  };

    xhttp.open(
        "GET",
        "http://172.20.21.202/~morlet/M07SW/restAPI/rest.php/nbdrone"
      );
      xhttp.send();
    }
