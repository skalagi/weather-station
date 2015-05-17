var podstawowe = [
	"podstawowe",

	"temperatureCurrent",
	"temperatureReal",
	"temperatureDewPoint",
	"temperatureTrend",
	"temperatureAvg",

	"humidity",

	"pressureCurrent",
	"pressureTrend",

	"rainCurrent",
	"rainSum",

	"windCurrentSpeed",
	"windCurrentDir",
	"windGustSpeed",
	"windGustDir"
];

(function(){
	$.getJSON('json/podstawowe.json', function(data){
	var i = -1;
		$.map(data,function(val){
			if(typeof val === "object"){
				$.map(val,function(val){
					i++;changeText(podstawowe[i],val);
				});
			}else{
				i++;changeText(podstawowe[i],val);
			}
		});
	});
}());

//Gdy do changeText podamy tylko jeden argument to zwróci nam złapany element po podanym id.

function changeText(id, val){
	var elem = document.getElementById(id);
	if(arguments.length == 1){
		console.log(elem)
		return elem;
	}
	else{
		console.log("changeText",id+': '+val);
		if(elem)
			elem.innerHTML= val.toString();
		switch(id){
		case 'temperatureCurrent':
			changeText(podstawowe[1]+'Sensor').style.height = (val*2.9+13)+'%';
			break;
		}
	}
}