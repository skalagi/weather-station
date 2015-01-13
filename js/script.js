function stworzMiarkeLicznik(id,licznik){    
    var zakres;
    var divide=true;
    var skok;    
    var war =0;       
    var dz = 1;
    var num = 0;  
    var precise;
    var mH = new Array();
    var m = new Array();  
    var numA = new Array();
    
    if(licznik==1){zakres=960;skok=5; precise=55;}//960 - 1015
    if(licznik==2){zakres=0;skok=5; precise=55;war=35;dz=2;}//0-27
    if(licznik==3){zakres=0;skok=5;precise=50; war=45; dz=2;divide=false;}//0-100
        
    for(var i=zakres;i<=precise+zakres;i++){ 
		num+=4; if(licznik==3) num+=.35; 
		m[i]=document.createElement('div');
        document.getElementById('liczPods'+id).appendChild(m[i]);
        mH[i] = m[i].appendChild(document.createElement('div'));                                          
		m[i].style.transform = 'rotate('+ num +'deg)';                                     
                                            
        if(i%skok==0){ 
            numA[i] =(mH[i]).appendChild(document.createElement('h3'));
            mH[i].style.height ="1.5em";            
			  if(divide)numA[i].innerHTML=Math.floor(i /dz);    
              else numA[i].innerHTML=Math.floor(i *dz);            
            if(licznik==1){
                numA[i].style.transform= 'rotate(5deg)';
                numA[i].style.fontSize='.9em';
            }
            if(war!=0&&i>=war)numA[i].style.color = 'red'; }
        if(war!=0&&i>=war)mH[i].style.backgroundColor = 'red';
    }
}
function createMScale(id,precise,skok,dodac){
    var mH = new Array();
    var m = new Array();

    for(var i=precise;i>0;i--){   
		m[i]=document.createElement('div');
        document.getElementById(id).appendChild(m[i]); 
        if(i%skok==0){    
          m[i].style.backgroundColor='grey';
          m[i].style.width="1.5em";
          mH[i] =(m[i]).appendChild(document.createElement('h3'));
          mH[i].innerHTML=i*dodac;
        }
    }
}

function compassDirScale(num){
    var compass= document.getElementById('compass'+num); 
    var div = new Array();
    var text = new Array();
    var textN = ['N','NE','E','SE','S','SW','W','NW'];
    
    for(var i =0;i<8;i++){
        div[i] = compass.appendChild(document.createElement('div'));
        text[i] = div[i].appendChild(document.createElement('h3'));
        text[i].innerHTML = textN[i];        
        
        div[i].className ='jsCompassDiv';
        text[i].className ='jsCompassLabel';		
		if(i>=3 && i<=5) {
            text[i].style.transform='rotate(180deg)';
            text[i].style.marginTop='1%';            
		}
        div[i].style.transform='rotate('+i*45+'deg)';
    }
    
}

compassDirScale(1);
compassDirScale(2);
createMScale('miarka12',30,5,1);
createMScale('miarka2',30,5,2);
stworzMiarkeLicznik(1,2);
stworzMiarkeLicznik(2,2);
stworzMiarkeLicznik(3,1);
stworzMiarkeLicznik(4,3);


var width= $(window).width();
bottomPanel();

$(window).resize(function() {
    width=$(window).width();
    bottomPanel();
});

function bottomPanel(){
    if(width>1435){       
        $('#panel1').css('flex-direction','column');        
        $('#panel1').css('flex-grow','0');
    }else{
        $('#panel1').css('flex-direction','row');
        $('#panel1').css('flex-grow','1');        
    }   
}


function tenTempCol(tend){
    var col;
    
    if(tend.toLowerCase.charAt(0) == 'r') col='#5f0, #8f0 )'          
    else                                            col='lightgrey, #00aeee )'    
    $('#tempPanel h3').css('background','linear-gradient(to bottom left,'+col);    
}

function compass(num,procent) {    
    if(procent>=90 && procent<=270 ) pRotate=135;
    else pRotate=-45;    
    procent += 45;
    
    $('#cm'+num).css('transform','scale(.85) rotate('+procent+'deg)');    
    $('#cmL'+num).css('transform',' rotate('+pRotate+'deg)');    
}
function wind(num,speed){    
    var start=-113;    
    if(num==3)for(var i=0;i<speed-960;i++)start+= 112/27.5;   
    else if(num==4)for(var i=0;i<speed;i++)start+=111/50;    
    else for(var i=0;i<speed;i++)start+=112/13.5;           
   $('#strz'+num).css('transform','rotate('+start+'deg)' ); 
}

function miarka(id,water,p){
	if(water!=1) water--;
    var waterP=37.5;    
    for(var i=0;i<water;i++)waterP+= ($('.waterCont').height()-37.5)/p;    
    $('#'+id).animate({ height: waterP+'px'});
}

function temp(id, C){
    C+=25;var c=C+15;var start=395;
    for(var i=0;i<C ;i++){start-=6.5; c+=6}
    
	 $('#'+id).animate({ top: start+'px',});  
     $('#'+id).css('height',c+'px' );     
}

var podstawowe = new Array();
var dzien = new Array();

/*
podstawowe: 
0 - [data] [czas]
1 - [aktualna temperatura] (°C)
2 - [aktualna wilgotność] (%)
3 - [aktualne ciśnienie] (hPa)
4 - [średnia temperatura] (°C)
5 - [wiatr w porywach] (m/s)
6 - [aktualny wiatr] (m/s)
7 - [aktualny kierunek] (°)
8 - [dominujący kierunek] (°)
9 - [odczuwalna temperautra] (°C)
10 - [prędkość wiatru beauforta] ()
11 - [opad dobowy] (mm)
12 - [aktualny opad] (mm/h)
13 - [tendencja ciśnienia] [wartość] [hPa/h]
14 - [tendencja temperatury] [wartość] [°C/h]
15 - [prognoza 1]
16 - [prognoza 2]
17 - [punkt rosy] [°C]
18 - Liczba odczytów stacji

dzien: 
0 - [czas max temp] [wartość max temp] 
1 - [czas max wilgotnosci] [wartość max wilgotnosci] 
2 - [czas max cisnienia] [wartość max cisnienia] 
3 - [dominujący kierunek wiatru]
4 - [czas max wiatr] [predkosc max wiatr]
5 - [czas max powiew] [predkosc max powiew]
6 - [czas max opadu] [wartosc max opadu]
7 - [wschód słońa]
8 - [zachód słońa]
9 - [długość dnia]
10 - [wschód księżyca]
11 - [zachód księżyca]
12 - [faza księżyca]
13 - [czas min temp] [wartość min temp] 
14 - [czas min wilgotnosci] [wartość min wilgotnosci] 
15 - [czas min cisnienia] [wartość min cisnienia] 

id in html

sunWsch
sunZch
moonWsch
moonZch

tempDayMin - tempDayMax
wilDayMin - wilDayMax
cisDayMin - cisDayMax

dayLen - długość dnia
moonPhase - faza księżyca
forecast - prognoza pogody
windDayBlow  -rekord podmuchu
rainDay - deszcz mm/h
dewDeg - punkt rosy

cmL1 - aktualny kierunek wiatru
cmL2 - dominujący kierunek wiatru

*/
setInterval("refresh();", 9000);
function refresh() {
	$('#podstawowe_p').load(location.href + ' #podstawowe_k');
	$('#dayrep_p').load(location.href + ' #dayrep_k');

	var podst = document.getElementById("podstawowe_k").innerHTML;
	var dn = document.getElementById("dayrep_k").innerHTML;
	podstawowe = podst.split("|"); dzien = dn.split("|");
	var akmph = Math.floor( ((3600*podstawowe[6])/1000) * 100)/100;
	var pkmph = Math.floor( ((3600*podstawowe[5])/1000) * 100)/100;

	
				document.getElementById("last").innerHTML=podstawowe[0]+"<br/>Liczba dzisiejszych odczytów stacji: "+podstawowe[18]; 
				document.getElementById("atemval").innerHTML=podstawowe[1]+"°C";
				temp('aTemp',Math.floor(podstawowe[1]));
				document.getElementById("wilval").innerHTML = podstawowe[2]+"%";
				wind(4, podstawowe[2]);
			    document.getElementById("pressval").innerHTML = podstawowe[13]+"<br/>"+
				podstawowe[3]+"hPa";
			    temp('srTemp',Math.floor(podstawowe[4]));
			    document.getElementById("srtemval").innerHTML=podstawowe[4]+"°C";
				wind(2, podstawowe[5]); 
				document.getElementById("wPSpeed").innerHTML="Podmuch <br/>"+podstawowe[5]+"m/s";
			    wind(1, podstawowe[6]); 
				document.getElementById("wSpeed").innerHTML="Aktualny <br/>"+podstawowe[6]+"m/s";
				compass(1, parseInt(podstawowe[7])); 
					var jaki=" ";
					if(podstawowe[7]<20 || podstawowe[7]>=315) jaki="z północy";
					if(podstawowe[7]>=20 && podstawowe[7]<70) jaki="z północnego wschodu";
					if(podstawowe[7]>=70 && podstawowe[7]<110) jaki="ze wschodu";
					if(podstawowe[7]>=110 && podstawowe[7]<160) jaki="z południowego wschodu";
					if(podstawowe[7]>=160 && podstawowe[7]<215) jaki="z południa";
					if(podstawowe[7]>=215 && podstawowe[7]<240) jaki="z południowego zachodu"
					if(podstawowe[7]>=240 && podstawowe[7]<285) jaki="z zachodu";
					if(podstawowe[7]>=285 && podstawowe[7]<315) jaki="z północego zachodu";
				
					document.getElementById("aktDirVal").innerHTML="Akualny: <br/>"+jaki;

					compass(2, parseInt(podstawowe[8]));
					var jaki_=" ";
						if(podstawowe[8]<20 || podstawowe[8]>=315) jaki_="z północy";
						if(podstawowe[8]>=20 && podstawowe[8]<70) jaki_="z północnego wschodu";
						if(podstawowe[8]>=70 && podstawowe[8]<110) jaki_="ze wschodu";
						if(podstawowe[8]>=110 && podstawowe[8]<160) jaki_="z południowego wschodu";
						if(podstawowe[8]>=160 && podstawowe[8]<215) jaki_="z południa";
						if(podstawowe[8]>=215 && podstawowe[8]<240) jaki_="z południowego zachodu"
						if(podstawowe[8]>=240 && podstawowe[8]<285) jaki_="z zachodu";
						if(podstawowe[8]>=285 && podstawowe[8]<315) jaki_="z północego zachodu";
					document.getElementById("domDirVal").innerHTML="Dominujący: <br/>"+jaki_;
					temp('oTemp',Math.floor(podstawowe[9])); 
					document.getElementById("otemval").innerHTML=podstawowe[9]+"°C";
					miarka('water2', podstawowe[11], 60);
					document.getElementById("opadd").innerHTML=podstawowe[11]+"<br/>mm";
					miarka('water12', podstawowe[12], 30); 
					document.getElementById("aktopad").innerHTML=podstawowe[12]+"<br/>mm/h";
					wind(3, podstawowe[3]);
					document.getElementById("pressval").innerHTML = podstawowe[13]+"<br/>"+podstawowe[3]+"hPa";
					document.getElementById("tentemp").innerHTML=podstawowe[14];
                    tenTempCol(podstawowe[14]);
                
					document.getElementById("forecast").innerHTML="Pogoda: "+podstawowe[15]+"</br>Prognoza: "+podstawowe[16];
					document.getElementById("forecast").innerHTML="Pogoda: "+podstawowe[15]+"</br>Prognoza: "+podstawowe[16];
					document.getElementById("dewDeg").innerHTML=podstawowe[17];
					document.getElementById("cmL1").innerHTML = podstawowe[7]+'°';
					document.getElementById("cmL2").innerHTML = podstawowe[8]+'°';
			
		document.getElementById("sunWsch").innerHTML=dzien[7];
		document.getElementById("sunZch").innerHTML=dzien[8];
		document.getElementById("dayLen").innerHTML=dzien[9];
		document.getElementById("moonWsch").innerHTML=dzien[10];
		document.getElementById("moonZch").innerHTML=dzien[11];
		document.getElementById("moonPhase").innerHTML=dzien[12];
		
		document.getElementById("tempDayMax").innerHTML=" "+dzien[0]+"<b>°C</b>";
	    document.getElementById("wilDayMax").innerHTML=" "+dzien[1]+"<b>%</b>";
		document.getElementById("cisDayMax").innerHTML=" "+dzien[2]+"<b>hPa</b>";
		document.getElementById("tempDayMin").innerHTML=" "+dzien[13]+"<b>°C</b>";
	    document.getElementById("wilDayMin").innerHTML=" "+dzien[14]+"<b>%</b>";
		document.getElementById("cisDayMin").innerHTML=" "+dzien[15]+"<b>hPa</b>";
		
		document.getElementById("windDayBlow").innerHTML=" "+dzien[5]+"<b>m/s</b>";
	    document.getElementById("rainDay").innerHTML=" "+dzien[6];
	}

