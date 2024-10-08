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
      }
      
    }
    
    xhttp.open("GET","trajectoire.html",true);
    xhttp.send();
    setCookie("page","trajectoire",1)
  }
