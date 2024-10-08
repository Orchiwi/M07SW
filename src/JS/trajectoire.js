document.getElementById("trajectoire").addEventListener("click",trajectoire)



 function trajectoire(){
    console.debug("Trajectoire ! ");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
      if(this.readyState == 4 && this.status == 200) {
        var reponse = xhttp.responseText;
        let pagehtml = document.getElementById('section');
        pagehtml.innerHTML = reponse;



        console.debug("montrer plan")
      canvas = document.getElementById('canvas_trajectoire');
     ctx = canvas.getContext('2d');
     var img = new Image();
     img.src = '../img/plan.png';
     img.onload = function () {
      ctx.drawImage(img, 0, 0);  
    }
    document.getElementById("nav_creer").addEventListener("click",showCreer)
    document.getElementById("nav_charger").addEventListener("click",showCharger)
      }
      
    }
    
    xhttp.open("GET","trajectoire.html",true);
    xhttp.send();
    setCookie("page","trajectoire",1)
  }

  function showCreer(){
    document.getElementById("liste_trajectoire").style.display="none"
    document.getElementById("creer_trajectoire").style.display="block"
  }

  function showCharger(){
     document.getElementById("creer_trajectoire").style.display="none"
    document.getElementById("liste_trajectoire").style.display="block"
   
  }