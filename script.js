var request;
var objJSON;
var id_mongo;

var indexedDB= window.indexedDB|| window.mozIndexedDB|| window.webkitIndexedDB||window.msIndexedDB|| window.shimIndexedDB;


function getRequestObject() {
   if ( window.ActiveXObject)  {
      return ( new ActiveXObject("Microsoft.XMLHTTP")) ;
   } else if (window.XMLHttpRequest)  {
      return (new XMLHttpRequest())  ;
   } else {
      return (null) ;
   }
}

function _doc()
{
   var result=`<div class="content" id="content1" style="display: block;" >
          <h2>Opis</h2>
          Projekt to prosty quiz który zbiera dane ankietowe aby później dokonać analizy
          Strona działa w trybie offline (brak połaczenia z bazą danych) oraz online. W trybie offline dane są zapisywane w przeglądarce (niezarejestrowany użytkownik - IndexedDB). Można je przejrzeć klikając na zakładkę "Przeglad danych offline".
          Zaraz po zalogowaniu przekazanie pomiędzy odpowiednimi bazami odbywa się automatycznie, po zalogowaniu użytkownika
          Bedąc zalogowanym dane z naszego quizu zapisywane sa na serwerze, możemy także podglądać statystyki tj. wykres słupkowy czy wykres zdobytych punktów od czasu (obrazuje on nasze postępy).
          <br><br>
          <div class="napis">Jezyk HTML5:</div><br>
          Korzystając z elementów języka HTML wykonano szkielet strony wraz z odpowiednim formatowaniem treści. Wykorzystano elementy takie jak: header, nav, section, footer.
          Przy użyciu elementu canvas wykonano przedstawienie graficzne wyników.<br><br>
          <div class="napis">CSS:</div><br>
          Wygląd naszej storny został zapisany za pomocą CSS<br><br>
          <div class="napis">REST</div><br>
          Zapytania do serwera oraz jego odpowiedzi spełniają założenia REST.<br><br>
          <div class="napis">Server</div><br>
          Do implementacji części serwerowej został użyty PHP. Dane są przechowywane w dwóch bazach MongoDB, jedna przechowuje dane z quizu, natomiast druga dane użytkowników.<br><br>
          <div class="napis">MongoDB, IndexedDB</div><br>
          Realizacja połączenia z bazami danych<br><br>
          <div class="napis">JavaScript:</div><br>
          Do obsługi aplikacji po stronie klienta został użyty JavaScript  <br>
          Quiz pochodzi z strony pasja informatyki
        </div>` 
     document.getElementById('data').innerHTML = result;
   document.getElementById('result').innerHTML = ''; 
}

window.onload = function() {
   if(sessionStorage.log && sessionStorage.log === "true") {
      displayButtons(true);
   }
   else {
      displayButtons(false);
   }
}

function displayButtons(logged) {
   
   if(logged) {
      var x= "inline";
      var y = "none";
   } else {
      var x= "none";
      var y = "inline";
   }

   document.getElementById("logOutB").style.display = x;
   document.getElementById("insOnB").style.display = x;
   document.getElementById("selOnB").style.display = x;
   document.getElementById("analizeB").style.display = x;

   document.getElementById("regB").style.display = y;
   document.getElementById("logB").style.display = y;
   document.getElementById("insOffB").style.display = y;
   document.getElementById("selOffB").style.display = y;
}

function _list() {
   document.getElementById('result').innerHTML = ''; 
   document.getElementById('data').innerHTML = '';  
   request = getRequestObject() ;
   request.onreadystatechange = function() {
      if (request.readyState == 4)    {
         objJSON = JSON.parse(request.response);
         var txt = "<div class='table'><table><tr><th>Nr</th><th>Data</th><th>Points</th><th>Pytanie1</th><th>Pytanie2</th><th>Pytanie3</th><th>Pytanie4</th><th>Pytanie5</th><th>Pytanie6</th></tr>";
         for ( var id in objJSON )  {
             txt +=  "<tr><td>" + id + "</td>" ;
             for ( var prop in objJSON[id] ) {             
                 if ( prop !== '_id' && prop !== 'id')
                   { txt += "<td>" + objJSON[id][prop] + "</td>";  }
             }
             txt +="</tr>";
         }
         txt += "</table></div>";
         document.getElementById('result').innerHTML = txt;
      }
   }
   request.open("GET", "rest/list", true);
   request.send(null);
}
 
function _ins_form(online) {
   var form1 = `
   <form name='add'>
   Data <input type='date' name='data'></input></br></br></br>
   <div style="width: 1000px;background-color: #777c27;margin-left:auto;margin-right:auto;margin-bottom:20px; padding:20px 20px">
   1. Które medium transmisyjne należy zastosować, aby połączyć dwa punkty dystrybucyjne odległe od siebie o 600 m?
   </div>					
	<div><label><input type="radio" value="A" name="pytanie1"> A. przewód koncentryczny </label></div>
	<div><label><input type="radio" value="B" name="pytanie1"> B. skrętkę UTP </label></div>
   <div><label><input type="radio" value="C" name="pytanie1"> C. światłowód </label></div>
	<div><label><input type="radio" value="D" name="pytanie1"> D. skrętkę STP </label></div>
   </br></br>
   <div style="width: 1000px;background-color: #777c27;margin-left:auto;margin-right:auto;margin-bottom:20px; padding:20px 20px">
   2. Która usługa serwerowa zapewnia automatyczną konfigurację parametrów sieciowych stacji roboczych?
   </div>					
	<div><label><input type="radio" value="A" name="pytanie2"> A. NAT </label></div>
	<div><label><input type="radio" value="B" name="pytanie2"> B. DHCP </label></div>
   <div><label><input type="radio" value="C" name="pytanie2"> C. WINS </label></div>
	<div><label><input type="radio" value="D" name="pytanie2"> D. DNS </label></div>		
   </br></br>
   <div style="width: 1000px;background-color: #777c27;margin-left:auto;margin-right:auto;margin-bottom:20px; padding:20px 20px">
   3. W firmowej sieci bezprzewodowej została uruchomiona usługa polegająca na tłumaczeniu nazw mnemonicznych. Jest to usługa
   </div>					
	<div><label><input type="radio" value="A" name="pytanie3"> A. DNS </label></div>
	<div><label><input type="radio" value="B" name="pytanie3"> B. RADIUS </label></div>
	<div><label><input type="radio" value="C" name="pytanie3"> C. DHCP </label></div>	
   <div><label><input type="radio" value="D" name="pytanie3"> D. RDS </label></div>		
   </br></br>	
   <div style="width: 1000px;background-color: #777c27;margin-left:auto;margin-right:auto;margin-bottom:20px; padding:20px 20px">
   4. Przydzielaniem adresów IP w sieci zajmuje się serwer
   </div>					
	<div><label><input type="radio" value="A" name="pytanie4"> A. DHCP </label></div>
	<div><label><input type="radio" value="B" name="pytanie4"> B. NMP </label></div>
	<div><label><input type="radio" value="C" name="pytanie4"> C. NetBIOS </label></div>	
   <div><label><input type="radio" value="D" name="pytanie4"> D. DNS </label></div>		
   </br></br>	
   <div style="width: 1000px;background-color: #777c27;margin-left:auto;margin-right:auto;margin-bottom:20px; padding:20px 20px">
   5. Topologia fizyczna, w której wszystkie urządzenia końcowe są bezpośrednio podłączone do jednego punktu centralnego, np. koncentratora lub przełącznika to topologia
   </div>					
	<div><label><input type="radio" value="A" name="pytanie5"> A. Magistrali</label></div>
	<div><label><input type="radio" value="B" name="pytanie5"> B. Siatki </label></div>
	<div><label><input type="radio" value="C" name="pytanie5"> C. Pierścienia </label></div>	
   <div><label><input type="radio" value="D" name="pytanie5"> D. Gwiazdy </label></div>		
   </br></br>	
   <div style="width: 1000px;background-color: #777c27;margin-left:auto;margin-right:auto;margin-bottom:20px; padding:20px 20px">
   6. Apache jest serwerem
   </div>					
	<div><label><input type="radio" value="A" name="pytanie6"> A. DHCP</label></div>
	<div><label><input type="radio" value="B" name="pytanie6"> B. WWW</label></div>
	<div><label><input type="radio" value="C" name="pytanie6"> C. DNS </label></div>	
   <div><label><input type="radio" value="D" name="pytanie6"> D. Baz danych </label></div>		
   </br></br>	
   <input type='button' class="button1" value='Wyślij' onclick=`;
   form1 += online ? "'_insert(this.form)'" : "'_insertOffline(this.form)'";
   form1 += " ></input></form>";
   document.getElementById('data').innerHTML = form1;
   document.getElementById('result').innerHTML = ''; 
}
 
function _insert(form)  {
   if(_validate(form)) {
      var data = {};
      var points=0;
      data.id = form.data.value;
      data.date = form.data.value;
      data.pytanie1 = form.pytanie1.value;
      data.pytanie2 = form.pytanie2.value;
      data.pytanie3 = form.pytanie3.value;
      data.pytanie4 = form.pytanie4.value;
      data.pytanie5 = form.pytanie5.value;
      data.pytanie6 = form.pytanie6.value;
      if(data.pytanie1=='C')
      {
         points++;
      }
      if(data.pytanie2=='B')
      {
         points++;
      }
      if(data.pytanie3=='A')
      {
         points++;
      }
      if(data.pytanie4=='A')
      {
         points++;
      }
      if(data.pytanie5=='D')
      {
         points++;
      }
      if(data.pytanie6=='B')
      {
         points++;
      }
      data.points = points;

    txt = JSON.stringify(data);
    alert("Liczba zdobytych punktów "+points+"/6");
    document.getElementById('result').innerHTML = ''; 
    document.getElementById('data').innerHTML = '';  
    request = getRequestObject() ;
    request.onreadystatechange = function() {
       if (request.readyState == 4 && request.status == 200 ) {
         $array = JSON.parse(request.response);
         document.getElementById('result').innerHTML += "<p>" + $array["return"] + "</p>";
       }
    }
    request.open("POST", "rest/save", true);
    request.send(txt);
   }
}
var points=0;
      
function _insertOffline(form) {
   if(_validate(form)) {
      var data = {};
      data.id = form.data.value;
      data.date = form.data.value;
      data.pytanie1 = form.pytanie1.value;
      data.pytanie2 = form.pytanie2.value;
      data.pytanie3 = form.pytanie3.value;
      data.pytanie4 = form.pytanie4.value;
      data.pytanie5 = form.pytanie5.value;
      data.pytanie6 = form.pytanie6.value;
      if(data.pytanie1=='C')
      {
         points++;
      }
      if(data.pytanie2=='B')
      {
         points++;
      }
      if(data.pytanie3=='A')
      {
         points++;
      }
      if(data.pytanie4=='A')
      {
         points++;
      }
      if(data.pytanie5=='D')
      {
         points++;
      }
      if(data.pytanie6=='B')
      {
         points++;
      }
      let openRequest = indexedDB.open("quiz", 1);

       openRequest.onupgradeneeded = function() {
        db = openRequest.result;
        var objs = db.createObjectStore('quiz', {keyPath: 'id', autoIncrement: true});
      };

      openRequest.onerror = function() {
         alert("Error: " + openRequest.error);
      };

      openRequest.onsuccess = function() {
         db = openRequest.result;
         var tx= db.transaction('quiz', "readwrite");
         var store= tx.objectStore('quiz');
         store.put({id: data.id, date: data.date,points: points,pytanie1: data.pytanie1, pytanie2: data.pytanie2,pytanie3: data.pytanie3,pytanie4: data.pytanie4,pytanie5: data.pytanie5,pytanie6: data.pytanie6}); 
         alert("Liczba zdobytych punktów "+points+"/6");
         tx.oncomplete = function() {
             db.close();    
         };
      };
   }
}
   

function _validate(form) {  
   if(form.data.value=="" || form.pytanie1.value==""|| form.pytanie2.value==""|| form.pytanie4.value==""|| form.pytanie4.value==""|| form.pytanie5.value==""||form.pytanie6.value=="") {
      alert("Wypełnij wszystkie pola wymagane.");
      return false;
   }
   else {
      var date = form.data.value;
      var parts = date.split("-");
      if( parseInt(parts[0])< 2022 ) {
         alert("Podaj datę w zakresie od stycznia 2022");
         return false;
      }
      else {
         var today = new Date();
         var d = String(today.getDate());
         var m = String(today.getMonth() + 1).padStart(2, '0'); 
         if(parts[1] == m && parseInt(parts[2]) > parseInt(d) || parseInt(parts[1]) > parseInt(m)) {
            alert("Nie podawaj daty z przyszłości.");
            return false;
         }
      }
      return true;
   }
}
function draw(canvasId,zima, lato, jesien, wiosna) {
   var max= Math.max(zima,lato,jesien,wiosna)
   var canvas = document.getElementById(canvasId);
   var context = canvas.getContext("2d");
   context.clearRect(0, 0, canvas.width, canvas.height);
   if (max == 0) {
       context.fillStyle = 'blue';
       context.fillRect(20, 300 - 20 - 5, 105, 5);
       context.fillStyle = 'green';
       context.fillRect(145, 300 - 20 - 5, 105, 5);
       context.fillStyle = 'yellow';
       context.fillRect(270, 300 - 20 - 5, 105, 5);
       context.fillStyle = 'red';
       context.fillRect(395, 300 - 20 - 5, 105, 5);
   }
   context.font = "bold 12px sans-serif";
   context.textBaseline = "top";
   
   context.fillStyle = 'blue';
   context.fillText(zima, 60, 5+260 * (1 - zima / max) );
   context.fillRect(20, 20 + (260 * (1 - zima / max)), 105, (260 * zima) / max);
   context.fillStyle = 'black';
   context.strokeRect(20, 20 + (260 * (1 - zima / max)), 105, (260 * zima) / max);

   context.fillStyle = 'green';
   context.fillText(lato, 185, 5+260 * (1 - lato / max) );
   context.fillRect(145, 20 + (260 * (1 - lato / max)), 105, (260 * lato) / max);
   context.fillStyle = 'black';
   context.strokeRect(145, 20 + (260 * (1 - lato / max)), 105, (260 * lato) / max);

   context.fillStyle = 'yellow';
   context.fillText(jesien, 310, 5+260 * (1 - jesien / max) );
   context.fillRect(270, 20 + (260 * (1 - jesien / max)), 105, (260 * jesien) / max);
   context.fillStyle = 'black';
   context.strokeRect(270, 20 + (260 * (1 - jesien / max)), 105, (260 * jesien) / max);

   context.fillStyle = 'red';
   context.fillText(wiosna, 435, 5+260 * (1 - wiosna / max) );
   context.fillRect(395, 20 + (260 * (1 - wiosna / max)), 105, (260 * wiosna) / max);
   context.fillStyle = 'black';
   context.strokeRect(395, 20 + (260 * (1 - wiosna / max)), 105, (260 * wiosna) / max);

   context.font = "bold 14px sans-serif";
   context.textBaseline = "bottom";
   context.fillStyle = 'blue';
   context.fillText("A", 70, 298);
   context.fillStyle = 'green';
   context.fillText("B", 195, 298);
   context.fillStyle = 'yellow';
   context.fillText("C", 320, 298);
   context.fillStyle = 'red';
   context.fillText("D", 445, 298);
}
function _listOffline() {
   let openRequest = indexedDB.open("quiz", 1);


   openRequest.onupgradeneeded = function() {
      db = openRequest.result;
      var objs = db.createObjectStore('quiz', {keyPath: 'id', autoIncrement: true});
   };
    var txt = "<div class='table'><table><tr><th>Nr</th><th>Data</th><th>Points</th><th>Pytanie1</th><th>Pytanie2</th><th>Pytanie3</th><th>Pytanie4</th><th>Pytanie5</th><th>Pytanie6</th></tr>";
    const wrongMap = new Map()
      wrongMap['pytanie1'] = [0,0,0,0];
      wrongMap['pytanie2'] = [0,0,0,0];
      wrongMap['pytanie3'] = [0,0,0,0];
      wrongMap['pytanie4'] = [0,0,0,0];
      wrongMap['pytanie5'] = [0,0,0,0];
      wrongMap['pytanie6'] = [0,0,0,0];
   openRequest.onsuccess = function() {
      db = openRequest.result;
      var tx= db.transaction('quiz', "readwrite");
      var store= tx.objectStore('quiz');
      var g = store.getAll();
      g.onsuccess = function() {
         var res = g.result;
         var i = 0;
        for(const item of res) {
           txt += "<tr><td>" + i + "</td>";
           for(const field in item) {
               if(field !== "id")
               {
                  if(item[field]=='A')
                  {
                     wrongMap[field][0]++;
                  }
                  else if(item[field]=='B')
                  {
                     wrongMap[field][1]++;
                  }
                  else if(item[field]=='C')
                  {
                     wrongMap[field][2]++;
                  }
                  else if(item[field]=='D')
                  {
                     wrongMap[field][3]++;
                  }
                  txt += "<td>" + item[field] + "</td>";
               }
                  
           }
           txt += "</tr>";
           i++;
        }
        txt += "";
        txt += `</br></br></table></div>`
        document.getElementById('data').innerHTML = '';
        document.getElementById('result').innerHTML = txt;
    };
      tx.oncomplete = function() {
          db.close();    
      };
      
    }
    openRequest.onerror = function() {
      alert("Error: " + openRequest.error);
   };
}


function _reg_form() {
   var form2 = `</br><form name='reg'>
               Email </br>
               <input class="edit1" type='text' name='email'></input></br>
               Hasło </br>
               <input class="edit1" type='password' name='haslo'></input></br>
               <input class ="button1" type='button' value='Zarejestruj się' onclick='_reg(this.form)' ></input></form>
               </br>`;
   document.getElementById('data').innerHTML = form2;
   document.getElementById('result').innerHTML = ''; 
}

function _reg(form) {
   if(_validateReg(form)) {
   var user = {};
    user.email = form.email.value;
    user.pass = md5(form.haslo.value);
    txt = JSON.stringify(user);

    document.getElementById('result').innerHTML = ''; 
    document.getElementById('data').innerHTML = '';  
    request = getRequestObject() ;
    request.onreadystatechange = function() {
       if (request.readyState == 4 && request.status == 200 ) {
          $array = JSON.parse(request.response);
          document.getElementById('result').innerHTML = "<p>" + $array["return"] + "</p>";
       }
    }
    request.open("POST", "rest/reg", true);
    request.send(txt);
   }
}

function _validateReg(form) {
   if(form.email.value=="" || form.haslo.value=="") {
      alert("Wypełnij wszystkie pola wymagane.");
      return false;
   }
   else
      return true;
}

function _log_form() {
   var form3 = `</br><form name='log'>
               Email</br>
               <input class="edit1" type='text' name='email'></input></br>
               Hasło</br>
               <input class="edit1" type='password' name='haslo'></input></br>
               <input class ="button1" type='button' value='Zaloguj się' onclick='_log(this.form)' ></input></form>
               </br>`;
   document.getElementById('data').innerHTML = form3;
   document.getElementById('result').innerHTML = '';
}

function _log(form) {
   var user = {};
    user.email = form.email.value;
    user.pass = md5(form.haslo.value);
    txt = JSON.stringify(user);

    document.getElementById('result').innerHTML = ''; 
    document.getElementById('data').innerHTML = '';  
    request = getRequestObject() ;
    request.onreadystatechange = function() {
       if (request.readyState == 4 && request.status == 200 )    {
         $array = JSON.parse(request.response);
          document.getElementById('result').innerHTML = "<p>" + $array["return"] + "</p>";
          if($array["return"] === "Uzytkownik zalogowany.") {
            if (typeof(Storage) !== "undefined") {
               sessionStorage.log = true;
               displayButtons(true);
             } else {
               document.getElementById("result").innerHTML = "Sorry, your browser does not support web storage...";
             }
             _moveOnline();
          }
       }
    }
    request.open("POST", "rest/log", true);
    request.send(txt);
}

function _moveOnline() {
   let openRequest = indexedDB.open("quiz", 1);

   openRequest.onupgradeneeded = function() {
      db = openRequest.result;
      var objs = db.createObjectStore('quiz', {keyPath: 'id', autoIncrement: true});
   };

   openRequest.onerror = function() {
      alert("Error: " + openRequest.error);
   };

    var data = {};
    var txt;
    openRequest.onsuccess = function() {
      db = openRequest.result;
      var tx= db.transaction('quiz', "readwrite");
      var store= tx.objectStore('quiz');
      var g = store.getAll();
      g.onsuccess = function() {
         var res = g.result;
        for(const item of res) {
               data.id = item["id"];
               data.date = item["date"];
               data.points = item["points"];
               data.pytanie1 = item["pytanie1"];
               data.pytanie2 = item["pytanie2"];
               data.pytanie3 = item["pytanie3"];
               data.pytanie4 = item["pytanie4"];
               data.pytanie5 = item["pytanie5"];
               data.pytanie6 = item["pytanie6"];
               txt = JSON.stringify(data);
               sendOne(txt);
        }
      };
      store.clear();
      tx.oncomplete = function() {
         db.close();
      };
    }
}

function sendOne(txt) {
    request = getRequestObject() ;
    request.onreadystatechange = function() {
       if (request.readyState == 4 && request.status == 200 )    {
          $array = JSON.parse(request.response);
          document.getElementById('result').innerHTML += "<p>" + $array["return"] + "</p>";
          }
       }
    request.open("POST", "rest/saveUpdate", true);
    request.send(txt);
}

function _log_out() {
    document.getElementById('result').innerHTML = ''; 
    document.getElementById('data').innerHTML = '';  
    request = getRequestObject() ;
    request.onreadystatechange = function() {
       if (request.readyState == 4 && request.status == 200 )    {
         $array = JSON.parse(request.response);
         document.getElementById('result').innerHTML = "<p>" + $array["return"] + "</p>";
         sessionStorage.log = false;
         displayButtons(false);
       }
    }
    request.open("POST", "rest/logOut", true);
    request.send(null);
}

function _analize() {
   var form4 = `<div class="table">
   Progres wyniki</br></br>
   <canvas id='canvas' width='1080' height='600'></canvas>
<div class="canv">
   Pytanie1</br>
   <canvas id='canvas1' width='520' height='300'></canvas>
</div>
<div class="canv">
   Pytanie2</br>
   <canvas id='canvas2' width='520' height='300'></canvas>
</div>
<div class="canv">
   Pytanie3</br>
   <canvas id='canvas3' width='520' height='300'></canvas>
</div>
<div class="canv">
   Pytanie4</br>
   <canvas id='canvas4' width='520' height='300'></canvas>
</div>
<div class="canv">
   Pytanie5</br>
   <canvas id='canvas5' width='520' height='300'></canvas>
</div>
<div class="canv">
   Pytanie6</br>
   <canvas id='canvas6' width='520' height='300'></canvas>
</div></div>`;
   document.getElementById('data').innerHTML = form4;
   document.getElementById('result').innerHTML = '';
   _getData();
   var canv = document.getElementById("canvas");
   var ctx = canv.getContext("2d");
   ctx.strokeStyle = "Black";
   ctx.beginPath();
   ctx.moveTo(30, 586);
   ctx.lineTo(1030, 586);
   ctx.stroke(); 

   ctx.beginPath();
   ctx.moveTo(30, 10);
   ctx.lineTo(30, 586);
   ctx.stroke();

   var tempLabel = [6,5,4,3,2,1,0];
   for(var i = 0; i < 7; i++) {
      ctx.beginPath();
      ctx.moveTo(25, 10 + i*96);
      ctx.lineTo(35, 10 + i*96);
      ctx.stroke();
      ctx.fillText(tempLabel[i], 1, 10 + i*96 + 3);
   }

   
   var temp=[31,59,90,120,151,181];
   var temp1=["czerwiec","maj","kwiecien","marzec","luty","styczeń"];
   for(var i = 0; i*1000/181 < 1000; i++) {
      ctx.beginPath();
      ctx.moveTo(30 + i*1000/181, 581);
      ctx.lineTo(30 + i*1000/181, 591);
      if(temp.includes(i+1))
      {
         ctx.beginPath();
         ctx.moveTo(30 + (i)*1000/181, 571);
         ctx.lineTo(30 + (i)*1000/181, 600);
         ctx.fillText(temp1.pop(), (i)*1000/181-70, 600);
      }
      ctx.stroke();
   }
   
}
function _getData() {
   const wrongMap = new Map()
   wrongMap['pytanie1'] = [0,0,0,0];
   wrongMap['pytanie2'] = [0,0,0,0];
   wrongMap['pytanie3'] = [0,0,0,0];
   wrongMap['pytanie4'] = [0,0,0,0];
   wrongMap['pytanie5'] = [0,0,0,0];
   wrongMap['pytanie6'] = [0,0,0,0];
   var array1= new Array();
   var array2= new Array();
   request = getRequestObject() ;
   request.onreadystatechange = function() {
      if (request.readyState == 4)    {
         objJSON = JSON.parse(request.response);
         for ( var id in objJSON )  {
            for ( var prop in objJSON[id] ) {   
               if(prop=="points")
               {
                  array1.push(objJSON[id][prop]);
               }
               if(prop=="date")
               {
                  array2.push(objJSON[id][prop]);
               }
               if(objJSON[id][prop]=='A')
               {
                  wrongMap[prop][0]++;
               }
               else if(objJSON[id][prop]=='B')
               {
                  wrongMap[prop][1]++;
               }
               else if(objJSON[id][prop]=='C')
               {
                  wrongMap[prop][2]++;
               }
               else if(objJSON[id][prop]=='D')
               {
                  wrongMap[prop][3]++;
               }
            }
        }
        var canv = document.getElementById("canvas");
        var ctx = canv.getContext("2d");
         for(var i = 0; i < array1.length; i++) {
            var temp=[31,59,90,120,151,181];
            var dzien=0;
            for(var j=0;j<parseInt(array2[i].split('-')[1])-1;j++)
            {
               dzien+=temp[j];
            }
            dzien+=parseInt(array2[i].split('-')[2]);
            ctx.beginPath();
            ctx.arc(30+dzien*1000/181, 10 + (6-array1[i])*96 , 3, 0, 2 * Math.PI);
            ctx.fill();
            ctx.stroke();
         }

         draw("canvas1",wrongMap['pytanie1'][0],wrongMap['pytanie1'][1],wrongMap['pytanie1'][2],wrongMap['pytanie1'][3]);
         draw("canvas2",wrongMap['pytanie2'][0],wrongMap['pytanie2'][1],wrongMap['pytanie2'][2],wrongMap['pytanie2'][3]);
         draw("canvas3",wrongMap['pytanie3'][0],wrongMap['pytanie3'][1],wrongMap['pytanie3'][2],wrongMap['pytanie3'][3]);
         draw("canvas4",wrongMap['pytanie4'][0],wrongMap['pytanie4'][1],wrongMap['pytanie4'][2],wrongMap['pytanie4'][3]);
         draw("canvas5",wrongMap['pytanie5'][0],wrongMap['pytanie5'][1],wrongMap['pytanie5'][2],wrongMap['pytanie5'][3]);
         draw("canvas6",wrongMap['pytanie6'][0],wrongMap['pytanie6'][1],wrongMap['pytanie6'][2],wrongMap['pytanie6'][3]);

      }
   }
   request.open("GET", "rest/list", true);
   request.send(null);
}
