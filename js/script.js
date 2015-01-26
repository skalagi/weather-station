function stworzMiarkeLicznik(id,licznik){    
    var zakres;
    var divide=true;
    var war =0;       
    var dz = 1;
    var num = 0;  
    var precise;
    var mH = new Array();
    var m = new Array();  
    var numA = new Array();
/*
    var a= 1;
    var b= (var) a;
                    */
    if(licznik==1){zakres=960; precise=55;}//960 - 1015
    if(licznik==2){zakres=0; precise=55;war=35;dz=2;}//0-27
    if(licznik==3){zakres=0;precise=50; war=45; dz=2;divide=false;}//0-100
        
    for(var i=zakres;i<=precise+zakres;i++){ 
		num+=4; if(licznik==3) num+=.35; 
		m[i]=document.createElement('div');
        document.getElementById('liczPods'+id).appendChild(m[i]);
        mH[i] = m[i].appendChild(document.createElement('div'));                                          
		m[i].style.transform = 'rotate('+ num +'deg)';                                     
                                            
        if(i%5==0){ 
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
function createTempMiar(id,precise,skok){
    var mH = new Array();
    var m = new Array();
    
    var temp = 40;

    for(var i=precise;i>0;i--){   
		m[i]=document.createElement('div');
        document.getElementById(id).appendChild(m[i]); 
        if(i%skok==0){    
          m[i].style.backgroundColor='grey';
          m[i].style.width="3em";
          mH[i] =(m[i]).appendChild(document.createElement('h4'));
          mH[i].innerHTML=temp;
            temp-=5;
        }
    }
}
var width= $(window).width();
bottomPanel();

$(window).resize(function() {
    width=$(window).width();
    bottomPanel();
});

$(window).unload(function() {
   $.ajax({
  type: "POST",
  url: "session.php",
  async: false,
  data: { log: "out", }
}); 
});

$(window).load(function() {
   $.ajax({
  type: "POST",
  url: "session.php",
  async: false,
  data: { log: "in", }
});
refdayrep(false);
});



function bottomPanel(){
    if(width>1500){       
        $('#panel1').css('flex-direction','column');        
        $('#panel1').css('flex-grow','0');        
        $('#panel1').css('order','4');
        $('#panel1').css('min-width','0');
        $('#raportDnia').css('flex-direction','column');  
        $('.RaportArrow').css('top','44%'); 
    }else{
        $('#panel1').css('flex-direction','row');
        $('#panel1').css('flex-grow','1');
        $('#panel1').css('order','-2');
        $('#panel1').css('min-width','90%');
        $('#raportDnia').css('flex-direction','row');
        $('.RaportArrow').css('top','41%'); 
    }   
}
var hint=false;
$(document).mousemove(function(event) {
    if(hint)
        $('#hint').css('left',event.pageX).css('top',event.pageY-$('#hint').height());
});
$('.labelek').mouseover(function(){
    if(!hint){
        hint=true;
        $('#hint').fadeIn(1000,function(){
            $('.labelek').mouseout(function(){                
                $('#hint').fadeOut(1000,function(){  
                hint=false;
                });    
            }); 
        });   
    } 
});
/*
    //kompas
    0 - compassArr1
    1 - compassArrSpan1
    2 - compassArr2
    3 - compassArrSpan1

    //wiatr
    4 - aktualny 
    5 - podmuch
    
    6 - cis
    7 - wilg
*/

var animCache = {};
animCache[0]=225;
animCache[2]=225;
animCache[1]=135;
animCache[3]=135;
animCache[4]=-113;
animCache[5]=-113;
animCache[6]=-113;
animCache[7]=-113;

function rotate(what,from,to,additionalTransform){
    $({deg: from}).animate({deg: to}, {
        duration: 3500,
        step: function(now){$('#'+what).css('transform',additionalTransform+ " rotate(" + now + "deg)");}
    });
}

function tenCol(tend,id,gradient){
    var col;
    var col1;  
    var col2;
    var per1 ='';
    var per2 ='';

    if(tend.toLowerCase().charAt(0) == 'r'){
        col1='#5f0 '
        col2 = '#8f0 )';
    }else if(tend.toLowerCase().charAt(1) == 't'){
        col1='#777 ';
        col2 = '#333 )';
    }else{
        col1='#00aeee ';
        col2 = 'lightgrey )';
    }    
    if(gradient){
        per1='5%';        
        per2='50%';
        col2='#444 ';
    }
    col=col1+per1 +','+col2+per2;
    if(gradient)
    $('#'+id).css('background','radial-gradient('+col); 
    else 
    $('#'+id).css('background','linear-gradient(to bottom left,'+col);  
}
function fillWithWater(perc){
    document.getElementById('humPercWater').style.background='linear-gradient(#07f '+perc+'%,transparent 10%)';    
}
function compass(num,procent) {    
    if(procent>=90 && procent<=270 ) pRotate=135;
    else pRotate=-45;    
    procent += 45;    

    var chosen1 = 0;
    var chosen2 = 1;
    
    if(num==2){chosen1=2;chosen2=3;}
    
    if(animCache[chosen1] != procent){
        rotate('cm'+num,animCache[chosen1],procent,"scale(0.85)");
        rotate('cmL'+num,animCache[chosen2],pRotate,'');
        animCache[chosen1]=procent;
        animCache[chosen2]=pRotate;
    }
}
function wind(num,speed){    
    var start=-113;    
    if(num==3)for(var i=0;i<speed-960;i++)start+= 112/27.5;   
    else if(num==4)for(var i=0;i<speed;i++)start+=111/50;    
    else for(var i=0;i<speed;i++)start+=112/13.5;   
   
    rotate('strz'+num,animCache[num+3],start,'');
    animCache[num+3]=start;
}

function miarka(id,water,p){
	if(water!=1) water--;
    var waterP=37.5;    
    for(var i=0;i<water;i++)waterP+= ($('.waterCont').height()-37.5)/p;    
    $('#'+id).animate({ height: waterP+'px'});
}

function temp(id, C){$('#'+id).css('height',52-C+'%' );}

compassDirScale(1);
compassDirScale(2);
createMScale('miarka12',30,5,1);
createMScale('miarka2',30,5,2);
createTempMiar('tempMiarka1',70,5); 
createTempMiar('tempMiarka2',70,5);
createTempMiar('tempMiarka3',70,5);
stworzMiarkeLicznik(1,2);
stworzMiarkeLicznik(2,2);
stworzMiarkeLicznik(3,1);
stworzMiarkeLicznik(4,3);
///PHP
setInterval("refresh();", 1000);
var ak_kmph=false;
var pod_kmph = false;
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
19 - Stacja online/offline
20 - Użytkowników online

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
16 - Info o przeglądarce
17 - Wysokość chmur
18 - Z kiedy dzienny raport

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


function jschangeday(day) {
	if(day) {
	 	 $.ajax({
			type: "POST",
			url: "session.php",
			dataType: "html",
			async: false,
			data: { changedayrep: "right", },
			success: function(response){                    
				$("#dayrep_k").html(response); 
				refdayrep(true);
			}
		});
	} else {
	 	 $.ajax({
			type: "POST",
			url: "session.php",
			dataType: "html",
			async: false,
			data: { changedayrep: "left", },
			success: function(response){                    
				$("#dayrep_k").html(response); 
				refdayrep(true);
			}
		});
	}

} 

	
function refdayrep(auto) {
 if(!auto) {
		$.ajax({
			type: "POST",
			url: "session.php",
			dataType: "html",
			async: false,
			data: { changedayrep: "false", },
			success: function(response) { $("#dayrep_k").html(response); }
		});
}
dzien = document.getElementById("dayrep_k").innerHTML.split("|");
	
		document.getElementById("daydate").innerHTML=dzien[18];
		document.getElementById("sunWsch").innerHTML=dzien[7];
		document.getElementById("sunZch").innerHTML=dzien[8];
		document.getElementById("dayLen").innerHTML=dzien[9];
		document.getElementById("moonWsch").innerHTML=dzien[10];
		document.getElementById("moonZch").innerHTML=dzien[11];
		document.getElementById("moonPhase").innerHTML=dzien[12];
		
		document.getElementById("tempDayMax").innerHTML=" "+dzien[0];
	    document.getElementById("wilDayMax").innerHTML=" "+dzien[1];
		document.getElementById("cisDayMax").innerHTML=" "+dzien[2];
		document.getElementById("tempDayMin").innerHTML=" "+dzien[13];    
	    document.getElementById("wilDayMin").innerHTML=" "+dzien[14];
		document.getElementById("cisDayMin").innerHTML=" "+dzien[15];
		
		document.getElementById("windDayBlow").innerHTML=" "+dzien[5];
	    document.getElementById("rainDay").innerHTML=" "+dzien[6];
		document.getElementById("clouds").innerHTML=dzien[17]+"m";
		
		var jaki_dzien;
		if(dzien[3]<20 || dzien[3]>=315) jaki_dzien="z północy";
		else if(dzien[3]>=20 && dzien[3]<70) jaki_dzien="z północnego wschodu";
		else if(dzien[3]>=70 && dzien[3]<110) jaki_dzien="ze wschodu";
		else if(dzien[3]>=110 && dzien[3]<160) jaki_dzien="z południowego wschodu";
		else if(dzien[3]>=160 && dzien[3]<215) jaki_dzien="z południa";
		else if(dzien[3]>=215 && dzien[3]<240) jaki_dzien="z południowego zachodu"
		else if(dzien[3]>=240 && dzien[3]<285) jaki_dzien="z zachodu";
		else if(dzien[3]>=285 && dzien[3]<315) jaki_dzien="z północego zachodu";
		document.getElementById("windDayDom").innerHTML=jaki_dzien;
		
		if( (dzien[16].indexOf("Mozilla")==-1 && dzien[16].indexOf("Chrome")==-1) || dzien[16].indexOf("Trident")!=-1) alert('Używasz niewspieranej przez tę stronę przeglądarki. Zalecamy używanie Chrome lub Firefox w najnowszej wersji.');
        }


function refresh() {
$('#busy').load(location.href + ' #flag');
var flagb = document.getElementById("flag").innerHTML.trim();
if(flagb=="1") {
	$('#podstawowe_p').load(location.href + ' #podstawowe_k');

	var podst = document.getElementById("podstawowe_k").innerHTML;
	podstawowe = podst.split("|");
	
	var akmph = Math.floor( ((3600*podstawowe[6])/1000) * 100)/100;
	var pkmph = Math.floor( ((3600*podstawowe[5])/1000) * 100)/100;

	
				document.getElementById("last").innerHTML=podstawowe[0]+"<br/>Dzisiejszy czas działania: "+podstawowe[18]+"<br/>"+podstawowe[19]+"<br/>Obecnych na stronie: "+podstawowe[20]; 
				document.getElementById("atemval").innerHTML=podstawowe[1]+"°C";
				temp('aTemp',Math.floor(podstawowe[1]));
				document.getElementById("wilval").innerHTML = podstawowe[2]+"%";
				wind(4, podstawowe[2]);
                fillWithWater(podstawowe[2]);
			    document.getElementById("pressval").innerHTML = podstawowe[13]+"<br/>"+
				podstawowe[3]+"hPa";
			    temp('srTemp',Math.floor(podstawowe[4]));
			    document.getElementById("srtemval").innerHTML=podstawowe[4]+"°C";
				
				if(pod_kmph) { document.getElementById("wPSpeed").innerHTML="Podmuch <br/>"+pkmph+"km/h"; wind(2, pkmph);  }
				else { document.getElementById("wPSpeed").innerHTML="Podmuch <br/>"+podstawowe[5]+"m/s"; wind(2, podstawowe[5]);  }
			    
				if(ak_kmph) { document.getElementById("wSpeed").innerHTML="Aktualny <br/>"+akmph+"km/h"; wind(1, akmph);  }
				else { document.getElementById("wSpeed").innerHTML="Aktualny <br/>"+podstawowe[6]+"m/s"; wind(1, podstawowe[6]); }
                    compass(1, parseInt(podstawowe[7])); 
					var jaki=" ";
					if(podstawowe[7]<20 || podstawowe[7]>=315) jaki="z północy";
					else if(podstawowe[7]>=20 && podstawowe[7]<70) jaki="z północnego wschodu";
					else if(podstawowe[7]>=70 && podstawowe[7]<110) jaki="ze wschodu";
					else if(podstawowe[7]>=110 && podstawowe[7]<160) jaki="z południowego wschodu";
					else if(podstawowe[7]>=160 && podstawowe[7]<215) jaki="z południa";
					else if(podstawowe[7]>=215 && podstawowe[7]<240) jaki="z południowego zachodu"
					else if(podstawowe[7]>=240 && podstawowe[7]<285) jaki="z zachodu";
					else if(podstawowe[7]>=285 && podstawowe[7]<315) jaki="z północego zachodu";
				
					document.getElementById("aktDirVal").innerHTML="Akualny: <br/>"+jaki;
					compass(2, parseInt(podstawowe[8]));
					var jaki_=" ";
						if(podstawowe[8]<20 || podstawowe[8]>=315) jaki_="z północy";
						else if(podstawowe[8]>=20 && podstawowe[8]<70) jaki_="z północnego wschodu";
						else if(podstawowe[8]>=70 && podstawowe[8]<110) jaki_="ze wschodu";
						else if(podstawowe[8]>=110 && podstawowe[8]<160) jaki_="z południowego wschodu";
						else if(podstawowe[8]>=160 && podstawowe[8]<215) jaki_="z południa";
						else if(podstawowe[8]>=215 && podstawowe[8]<240) jaki_="z południowego zachodu"
						else if(podstawowe[8]>=240 && podstawowe[8]<285) jaki_="z zachodu";
						else if(podstawowe[8]>=285 && podstawowe[8]<315) jaki_="z północego zachodu";
					document.getElementById("domDirVal").innerHTML="Dominujący: <br/>"+jaki_;
					temp('oTemp',Math.floor(podstawowe[9])); 
					document.getElementById("otemval").innerHTML=podstawowe[9]+"°C";
					miarka('water2', podstawowe[11], 60);
					document.getElementById("opadd").innerHTML=podstawowe[11]+"<br/>mm";
					miarka('water12', podstawowe[12], 30); 
					document.getElementById("aktopad").innerHTML=podstawowe[12]+"<br/>mm/h";
					wind(3, podstawowe[3]);
					
                    document.getElementById("pressval").innerHTML = podstawowe[13]+"<br/>"+podstawowe[3]+"hPa";                    
                    tenCol(podstawowe[13],'cisLicznik',true);
    
					document.getElementById("tentemp").innerHTML=podstawowe[14];
                    tenCol(podstawowe[14],'tempPanel h3',false);
    
                    document.getElementById("weather").innerHTML=podstawowe[15];    
                    document.getElementById("forecast").innerHTML=podstawowe[16];
    
					document.getElementById("dewDeg").innerHTML=podstawowe[17];					
					
					var cmlA = parseInt(podstawowe[7])+180;
					if(cmlA>360) cmlA -= 360;
					var cmlB = parseInt(podstawowe[8])+180;
					if(cmlB>360) cmlB -= 360;
					if(cmlA==360) cmlA=0; if(cmlB==360) cmlB=0;
					document.getElementById("cmL1").innerHTML = cmlA+'°';
					document.getElementById("cmL2").innerHTML = cmlB +'°';
 
 	  $.ajax({
  type: "POST",
  url: "session.php",
  data: { log: "ok", }
});
		
}


}

	
function aktwindclick() {
ak_kmph = !ak_kmph;
document.getElementById("flag").innerHTML='1';
refresh();
}

function podwindclick() {
pod_kmph = !pod_kmph;
document.getElementById("flag").innerHTML='1';
refresh();
}
