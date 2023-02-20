////////////////////////////////////////////////////////////////////////////////
//                                                                            //
//   javascript pgn conversion by Brothercake - http://www.brothercake.com/   //
//   this is a component script to ChessPlayer v2.2                           //
//                                                                            //
////////////////////////////////////////////////////////////////////////////////


var errorLog=false;// open log window on PGN conversion error

var firstLoad=true;
var idleTimer;
function checkIdle() {
	if(firstLoad) { window.focus(); firstLoad=false; }
	if(window.opener.closed) { window.close(); }
	else { idleTimer=setTimeout("checkIdle()",1000); }

	}

var thisDL=document.location.href;
var live=true;
if(thisDL.indexOf("http://")==-1) { live=false; }


var finalData = new Array;

//import pgn data
var ipTimer,dc;
var goTo=false;
function importPGN() {
	dc=document.forms["pgnChessForm"];

	if(!goTo){
		window.defaultStatus="Loading ...";
		document.getElementById("pgnselect").innerHTML='<table cellpadding=0 cellspacing=10 border=0 class=daco style="width:340px\;font-size:15px"><tr><td>Importing ...</td></tr></table>';
		goTo=true;
		setTimeout("importPGN()",0);
		}

	else if(goTo){
		var pgnRef;
		pgnRef=dc["pfi"].value;
		var shell = document.getElementById("shell");
		if(pgnRef!="") { shell.src=pgnRef; goTo=false; }
		clearTimeout(ipTimer);
		}

	}

function importServerPGN() {
	dc=document.forms["pgnChessForm"];
	
	goTo = true;
	document.getElementById("pgnselect").innerHTML='<table cellpadding=0 cellspacing=10 border=0 class=daco style="width:340px\;font-size:15px"><tr><td>Importing ...</td></tr></table>';

	processPgnImport();
	
	/*
	if(!goTo){
		window.defaultStatus="Loading ...";
		goTo=true;
		setTimeout("importServerPGN()",0);
		}

	else if(goTo){
		var pgnRef;
		pgnRef=dc["sfi"].options[dc.sfi.options.selectedIndex].value;
		var shell = document.getElementById("shell");
		if(pgnRef!="") { shell.src=pgnRef; goTo=false; }
		clearTimeout(ipTimer);
		}
	*/


	}


//auto-process pgn import
var pHtm;var pgnData;
var gameDesc=new Array;
var iChars = new Array("+","#","!","!!","?","??","!?","?!");
var nags=new Array;
for (na=0;na<140;na++){
	nags[na]="$"+na;
	}
var processTimer,theSrc;
function processPgnImport(pgnSrc){

	window.defaultStatus="Building list ...";

	//local
	if(typeof pgnSrc!="undefined") {
		//check for a document with .pgn, .txt or .tmp extension
		if(pgnSrc.length<=0) { return false; }
		pgnSrc=pgnSrc.toLowerCase();
		if((pgnSrc.indexOf(".pgn")==-1)&&(pgnSrc.indexOf(".txt")==-1)&&(pgnSrc.indexOf(".tmp")==-1)){return false;}
	
		//extract text
		pgnData = shell.document.documentElement.childNodes[1].innerText;

		//loop if unable to extract text due to document not loaded
		//theSrc=pgnSrc;
		//clearTimeout(processTimer);
		//if(pgnData==""){
			//alert("not ready");
		//	processTimer=setTimeout("processPgnImport(theSrc)",1000);
		//	}

		}
	//server
	else {
		pgnData = dc["shell"].value;
		}
		
	//process game text
	pgnData=pgnData.split('[Event "');
	if(pgnData.length<=0){return false;}
	for(j=0;j<pgnData.length;j++) {
		if(pgnData[(j+1)]) { pgnData[j]=pgnData[(j+1)]; }
		}
	pgnData.length--;
	//pgnData.splice(0,1);

	for(i=0;i<pgnData.length;i++){

		//games with commentary cant be processed, because period (.) is split delimiter, but may appear in commentary
		if(pgnData[i].indexOf("{")==-1&&pgnData[i].indexOf("}")==-1) {

			//make individual games
			pgnData[i]='[Event "'+pgnData[i];

			//split games into tags and movetext
			pgnData[i]=pgnData[i].split("\n1.");
			pgnData[i][1]="1."+pgnData[i][1];

			//remove disallowed special characters in tags
			if(pgnData[i][0].indexOf("&")!=-1){
				pgnData[i][0]=pgnData[i][0].replace(/[\&]/g,' and ');
				}
			if(pgnData[i][0].indexOf("=")!=-1){
				pgnData[i][0]=pgnData[i][0].replace(/[\=]/g,' equals ');
				}

			//split tags
			pgnData[i][0]=pgnData[i][0].split('[');
			for(j=0;j<pgnData[i][0].length;j++) {
				if(pgnData[i][0][(j+1)]) { pgnData[i][0][j]=pgnData[i][0][(j+1)]; }
				}
			pgnData[i][0].length--;
			//pgnData[i][0].splice(0,1);



			//if(i<9) { alert(pgnData[i].length); }
			if(pgnData[i].length>2) {
				for(j=2;j<pgnData[i].length;j++){
					pgnData[i][1]+=pgnData[i][j];
					}
				pgnData[i].length=2;
				}

			//break up tags into name and value
			for(j=0;j<pgnData[i][0].length;j++){
				pgnData[i][0][j]=pgnData[i][0][j].split(' "');
				if(pgnData[i][0][j].length==2){
					pgnData[i][0][j][1]=pgnData[i][0][j][1].replace('"]','');

					}
				}

			}


		if((i+1)==500) { break; }
		}









	// ** final thing ** compile and write game selector
	pHtm='';
	for(i=0;i<pgnData.length;i++){
		if(pgnData[i].length==2) {
			pHtm+='<table cellpadding=0 cellspacing=5 border=0 id="'+i+'" class=daco onmousedown="depress(this)" onmouseup="undepress(this)" onmouseover="groove(this)" onmouseout="ungroove(this)" style="width:352px\;position:relative\;left:4px\;border:1px solid #'+qStr["darkCOLOR"] + '\;font-size:12px">';
			pHtm+='<tr><td nowrap valign=top width=56><span id="gamespan'+i+'" style="position:relative\;left:0px\;top:0px">Game&nbsp;'+(i+1)+':</span></td><td nowrap valign=top><span id="dataspan'+i+'" style="position:relative\;left:0px\;top:0px">'+pgnData[i][0][0][1]+' Round '+pgnData[i][0][3][1]+' ( '+pgnData[i][0][2][1]+')<br>'+pgnData[i][0][4][1]+'&nbsp;&nbsp;vs&nbsp;&nbsp;'+pgnData[i][0][5][1]+'</span></td><td width=6>&nbsp;<br>&nbsp;</td></tr>';
			pHtm+='</td></tr></table>';
			}
		}
	document.getElementById("pgnselect").innerHTML=pHtm;

	window.defaultStatus="Done";
	return pgnData;
	}


var gameString=new Array;
var gameOkay=true;


var tbData;
function groove(gob) { gob.style.border="1px outset #"+qStr['lightCOLOR']; }
function ungroove(gob) { gob.style.border="1px solid #"+qStr['darkCOLOR']; }
function depress(gob) {
	gob.style.border="1px inset #"+qStr['lightCOLOR'];
	document.getElementById("gamespan"+gob.id).style.left=1;
	document.getElementById("gamespan"+gob.id).style.top=1;
	document.getElementById("dataspan"+gob.id).style.left=1;
	document.getElementById("dataspan"+gob.id).style.top=1;
	tbData = document.getElementById("dataspan"+gob.id).innerHTML;
	if(typeof gameString[gob.id]=="undefined"){
		document.getElementById("dataspan"+gob.id).innerHTML="Converting ...";
		window.defaultStatus="Converting ...";
		}
	}
function undepress(gob) {
	gob.style.border="1px outset #"+qStr['lightCOLOR'];
	document.getElementById("gamespan"+gob.id).style.left=0;
	document.getElementById("gamespan"+gob.id).style.top=0;
	document.getElementById("dataspan"+gob.id).style.left=0;
	document.getElementById("dataspan"+gob.id).style.top=0;
	playPgnGame(parseInt(gob.id));
	}

var fpn=new Array('r','n','b','q','k','b','n','r','p','p','p','p','p','p','p','p','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','wp','wp','wp','wp','wp','wp','wp','wp','wr','wn','wb','wq','wk','wb','wn','wr');
var nameCol=new Array("a","b","c","d","e","f","g","h");
var cc=new Array;
i=0;var CL=0;var CN=8;
for (bv=0;bv<8;bv++){
	for (bh=0;bh<8;bh++){
		cc[i]=nameCol[CL]+CN;
		CL++;i++;
		if (CL>7){CL=0;CN--;}
		}
	}
var pInd = new Array("P","R","N","B","Q","K");

var sqp=new Array;
var sqn=new Array;
for(i=0;i<64;i++){
	sqn[i]=cc[i];
	sqp[sqn[i]]=new Array(fpn[i],i);
	}

var pRes = new Array("1-0","0-1","1/2-1/2","*");
var nums=new Array(0,1,2,3,4,5,6,7);
var grid=new Array;var gri=0;
var numCol=new Array;
for(i=0;i<8;i++){
	numCol[nameCol[i]]=i;
	for(j=0;j<8;j++){
		grid[gri]=new Array(j,i);
		gri++;
		}
	}

var wpAry=new Array(8,16);
var bpAry=new Array(-8,-16);
var kAry=new Array(1,9,8,7,-1,-7,-8,-9);
var nAry=new Array(6,10,15,17,-6,-10,-15,-17);
var rAry=new Array;
rAry[0]=new Array(1,2,3,4,5,6,7);
rAry[1]=new Array(8,16,24,32,40,48,56);
rAry[2]=new Array(-1,-2,-3,-4,-5,-6,-7);
rAry[3]=new Array(-8,-16,-24,-32,-40,-48,-56);
var bAry=new Array;
bAry[0]=new Array(-7,-14,-21,-28,-35,-42,-49,-56);
bAry[1]=new Array(9,18,27,36,45,54,63);
bAry[2]=new Array(7,14,21,28,35,42,49,56);
bAry[3]=new Array(-9,-18,-27,-36,-45,-54,-63);
var qAry=new Array;
for(i=0;i<rAry.length;i++){
	qAry[i]=new Array;
	for(j=0;j<rAry[i].length;j++){
		qAry[i][j]=rAry[i][j];
		}
	}
for(i=0;i<bAry.length;i++){
	qAry[(i+4)]=new Array;
	for(j=0;j<bAry[i].length;j++){
		qAry[(i+4)][j]=bAry[i][j];
		}
	}

var wck=true;
var wcq=true;
var bck=true;
var bcq=true;

var teAry=new Array;var te=0;
var testWin;
var wm,bm,mol,tm,nu,bk;
var prom="";
finalData["checkgame"]=new Array;

var pgnRoster=new Array("Event","Site","Date","Round","White","Black","Result","WhiteElo","BlackElo");


//load and convert a pgn import game
function playPgnGame(inu){

	gameOkay=true;

	//if game has not already been processed
	if(typeof gameString[inu]=="undefined") {

		finalData["checkgame"][inu]=new Array;
		finalData["game"]=new Array;
		finalData["tagRoster"]="";

		//split movetext
		pgnData[inu][1]=pgnData[inu][1].split('.');

		for(j=0;j<pgnData[inu][1].length;j++) {
			if(pgnData[inu][1][(j+1)]) { pgnData[inu][1][j]=pgnData[inu][1][(j+1)]; }
			}
		pgnData[inu][1].length--;
		//pgnData[inu][1].splice(0,1);

		//break up move text into individual moves
		for(j=0;j<pgnData[inu][1].length;j++){

			//filter for line breaks and NAGs
			pgnData[inu][1][j]=escape(pgnData[inu][1][j]);
			if(pgnData[inu][1][j].indexOf("%24")!=-1) {
				for(k=(nags.length-1);k>=0;k--){
					pgnData[inu][1][j]=pgnData[inu][1][j].replace(escape(nags[k]),"");
					}
				}
			pgnData[inu][1][j]=pgnData[inu][1][j].replace("%0D%0A","%20");

			pgnData[inu][1][j]=pgnData[inu][1][j].replace("%20%20","%20");
			pgnData[inu][1][j]=pgnData[inu][1][j].replace("%20%20","%20");
			pgnData[inu][1][j]=pgnData[inu][1][j].replace("%0D","%20");
			pgnData[inu][1][j]=pgnData[inu][1][j].replace("%20","");
			pgnData[inu][1][j]=unescape(pgnData[inu][1][j]);


			//alert(pgnData[inu][1][j]);

			//remove annotations
			for(k=0;k<iChars.length;k++){
				pgnData[inu][1][j]=pgnData[inu][1][j].replace(iChars[k],"");
				}

			//remove excess characters
			pgnData[inu][1][j]=escape(pgnData[inu][1][j]);
			while(pgnData[inu][1][j].indexOf("%0D%0A")!=-1){pgnData[inu][1][j]=pgnData[inu][1][j].replace("%0D%0A","%20");}
			pgnData[inu][1][j]=pgnData[inu][1][j].replace("%3D","=");
			pgnData[inu][1][j]=pgnData[inu][1][j].replace("%3D","=");

			//split movetext into moves
			pgnData[inu][1][j]=pgnData[inu][1][j].split("%20");
			pgnData[inu][1][j].length=2;

			}




		var mvt = pgnData[inu][1];
		//alert(inu+"\n\n"+mvt);

		//extract result
		for(i=0;i<pRes.length;i++){
			if(mvt[(mvt.length-1)][0]==pRes[i]) {
				finalData['Result']=mvt[(mvt.length-1)][0];
				mvt.length--;
				}
			if(mvt[(mvt.length-1)][1]==pRes[i]) {
				finalData['Result']=mvt[(mvt.length-1)][1];
				mvt[(mvt.length-1)][1]="---";
				}

			}


		//convert to smith notation
		var tStr;
		if(qStr){ tStr='<body bgcolor="#'+qStr["darkCOLOR"] + '"><span style="color:#'+qStr["lightCOLOR"] + '\; background-color:#'+qStr["darkCOLOR"] + '\; border-color:#'+qStr["lightCOLOR"] + '\; font-size:15px\; font-weight:bold\; font-family:comic sans ms,arial\;">'+(inu+1)+'</span><p><table cellpadding=0 cellspacing=5 border=0 style="color:#'+qStr["lightCOLOR"] + '\; background-color:#'+qStr["darkCOLOR"] + '\; border-color:#'+qStr["lightCOLOR"] + '\; font-size:13px\; font-weight:bold\; font-family:comic sans ms,arial\;">'; }
		else {tStr='<body><span style="font-size:15px\; font-weight:bold\; font-family:comic sans ms,arial\;">'+(inu+1)+'</span><p><table cellpadding=0 cellspacing=5 border=0 style="font-size:13px\; font-weight:bold\; font-family:comic sans ms,arial\;">'; }
		for (i=0;i<mvt.length;i++){


			var odd=false;
			if(i/2!=parseInt(i/2)&&i>0) { odd=true; }

			if(mvt[i][1]&&parseInt(mvt[i][1])!=mvt[i][1]) { 
				wm=mvt[i][0];

				for(j=0;j<iChars.length;j++){
					wm=wm.replace(iChars[j],"");
					}
				}

			if(mvt[i][1]&&parseInt(mvt[i][1])!=mvt[i][1]) { 
				bm=mvt[i][1];

				for(j=0;j<iChars.length;j++){
					bm=bm.replace(iChars[j],"");
					}
				}

			//**white
			prom="";
			if(wm&&wm.indexOf("=")!=-1) {
				var temProm = wm.split("=");
				wm=temProm[0];
				prom=temProm[1];
				}
			mol=wm.length;
			tm=new Array("","");

			//add pawn name
			if(mol==2) { wm="P"+wm; }
			mol=wm.length;

			//convert castling moves
			if(wm=="0-0") { wm="O-O"; }
			if(wm=="0-0-0") { wm="O-O-O"; }
			if(wm=="O-O") { wm="Kg1"; }
			if(wm=="O-O-O") { wm="Kc1"; }
			mol=wm.length;

			//split move data for conversion
			for(j=0;j<mol;j++){
				if(j<(mol-2)) { tm[0]+=wm.charAt(j); }
				else { tm[1]+=wm.charAt(j); }
				}

			//convert move (attacking pawn)
			if(tm[0].length==2&&tm[0].toLowerCase()==tm[0]){
				nu=sqp[tm[1]][1];
				var tosq=tm[0].charAt(0);
				tm[0]=tm[0].charAt(0)+(parseInt(tm[1].charAt(1))-1);
				if(fpn[(nu+7)]=="wp"&&sqn[(nu+7)].indexOf(tosq)!=-1) {
					fpn[(nu+7)]="X";
					if(fpn[nu]=="X") { fpn[(nu+8)]="X"; }
					}
				else if(fpn[(nu+9)]=="wp"&&sqn[(nu+9)].indexOf(tosq)!=-1) {
					fpn[(nu+9)]="X";
					if(fpn[nu]=="X") { fpn[(nu+8)]="X"; }
					}
				fpn[nu]="wp";
				if(prom!="") { fpn[nu]="w"+prom.toLowerCase(); }
				}

			//convert move (non-attacking pawn)
			else if(tm[0]=="P"){
				nu=sqp[tm[1]][1];
				for(k=0;k<wpAry.length;k++){
					if(fpn[(nu+wpAry[k])]=="wp") {
						fpn[(nu+wpAry[k])]="X";
						fpn[nu]="wp";
						tm[0]=sqn[(nu+wpAry[k])];
						if(prom!="") { fpn[nu]="w"+prom.toLowerCase(); }
						break;
						}
					}
				}

			//convert move (unambiguous bishop)
			else if(tm[0]=="B"||tm[0]=="Bx"){
				nu=sqp[tm[1]][1];
				for(l=0;l<bAry.length;l++){
					for(k=0;k<bAry[l].length;k++){
						if(fpn[(nu+bAry[l][k])]&&fpn[(nu+bAry[l][k])]=="wb") {
							if(grid[nu][0]!=grid[(nu+bAry[l][k])][0]&&grid[nu][1]!=grid[(nu+bAry[l][k])][1]) {
								fpn[(nu+bAry[l][k])]="X";
								fpn[nu]="wb";
								tm[0]=sqn[(nu+bAry[l][k])];
								break;
								}
							}
						if(fpn[(nu+bAry[l][k])]&&fpn[(nu+bAry[l][k])]!="X") { break; }
						if(grid[(nu+bAry[l][k])]&&(grid[(nu+bAry[l][k])][0]==7||grid[(nu+bAry[l][k])][1]==7||grid[(nu+bAry[l][k])][0]==0||grid[(nu+bAry[l][k])][1]==0)) { break; }
						}
					}
				}

			//convert move (ambiguous bishop)
			else if(tm[0].indexOf("B")!=-1){
				tm[0]=tm[0].replace("B","");
				tm[0]=tm[0].replace("x","");
				nu=sqp[tm[1]][1];
				for(l=0;l<bAry.length;l++){
					for(k=0;k<bAry[l].length;k++){
						if(fpn[(nu+bAry[l][k])]&&fpn[(nu+bAry[l][k])]=="wb") {
							if(sqn[(nu+bAry[l][k])].indexOf(tm[0])!=-1){
								fpn[(nu+bAry[l][k])]="X";
								fpn[nu]="wb";
								tm[0]=sqn[(nu+bAry[l][k])];
								break;
								}
							}
						if(fpn[(nu+bAry[l][k])]&&fpn[(nu+bAry[l][k])]!="X") { break; }
						}
					}
				}

			//convert move (unambiguous rook)
			else if(tm[0]=="R"||tm[0]=="Rx"){
				nu=sqp[tm[1]][1];
				for(l=0;l<rAry.length;l++){
					for(k=0;k<rAry[l].length;k++){
						if(fpn[(nu+rAry[l][k])]&&fpn[(nu+rAry[l][k])]=="wr") {
							if(grid[nu][0]==grid[(nu+rAry[l][k])][0]||grid[nu][1]==grid[(nu+rAry[l][k])][1]) {
								fpn[(nu+rAry[l][k])]="X";
								fpn[nu]="wr";
								tm[0]=sqn[(nu+rAry[l][k])];
								if(tm[0]=="a1") { wcq=false; }
								if(tm[0]=="h1") { wck=false; }
								break;
								}
							}
						if(fpn[(nu+rAry[l][k])]&&fpn[(nu+rAry[l][k])]!="X") { break; }
						if(l==0||l==2){
							if(grid[(nu+rAry[l][k])]&&(grid[(nu+rAry[l][k])][0]==7||grid[(nu+rAry[l][k])][0]==0)) { break; }
							}
						if(l==1||l==3){
							if(grid[(nu+rAry[l][k])]&&(grid[(nu+rAry[l][k])][1]==7||grid[(nu+rAry[l][k])][1]==0)) { break; }
							}
						}
					}
				}

			//convert move (ambiguous rook)
			else if(tm[0].indexOf("R")!=-1){
				tm[0]=tm[0].replace("R","");
				tm[0]=tm[0].replace("x","");
				nu=sqp[tm[1]][1];
				for(l=0;l<rAry.length;l++){
					for(k=0;k<rAry[l].length;k++){
						if(fpn[(nu+rAry[l][k])]&&fpn[(nu+rAry[l][k])]=="wr") {
							if(sqn[(nu+rAry[l][k])].indexOf(tm[0])!=-1){
								fpn[(nu+rAry[l][k])]="X";
								fpn[nu]="wr";
								tm[0]=sqn[(nu+rAry[l][k])];
								if(tm[0]=="a1") { wcq=false; }
								if(tm[0]=="h1") { wck=false; }
								break;
								}
							}
						if(fpn[(nu+rAry[l][k])]&&fpn[(nu+rAry[l][k])]!="X") { break; }
						}
					}
				}

			//convert move (unambiguous knight)
			else if(tm[0]=="N"||tm[0]=="Nx"){
				nu=sqp[tm[1]][1];
				for(k=0;k<nAry.length;k++){
					if(fpn[(nu+nAry[k])]&&fpn[(nu+nAry[k])]=="wn") {
						if(grid[(nu+nAry[k])]&&(grid[(nu+nAry[k])][0]!=grid[(nu)][0])&&(grid[(nu+nAry[k])][1]!=grid[(nu)][1])) {
							if((((grid[(nu+nAry[k])][0]-grid[nu][0])<=2)&&((grid[(nu+nAry[k])][0]-grid[nu][0])>=-2))&&(((grid[(nu+nAry[k])][1]-grid[nu][1])<=2)&&((grid[(nu+nAry[k])][1]-grid[nu][1])>=-2))) {
								fpn[(nu+nAry[k])]="X";
								fpn[nu]="wn";
								tm[0]=sqn[(nu+nAry[k])];
								break;
								}
							}
						}
					}
				}

			//convert move (ambiguous knight)
			else if(tm[0].indexOf("N")!=-1){
				tm[0]=tm[0].replace("N","");
				tm[0]=tm[0].replace("x","");
				nu=sqp[tm[1]][1];
				for(k=0;k<nAry.length;k++){
					if(fpn[(nu+nAry[k])]&&fpn[(nu+nAry[k])]=="wn") {
						//alert(sqn[(nu+nAry[k])]+" - "+tm[0]);
						if(sqn[(nu+nAry[k])].indexOf(tm[0])!=-1){
							fpn[(nu+nAry[k])]="X";
							fpn[nu]="wn";
							tm[0]=sqn[(nu+nAry[k])];
							break;
							}
						}
					}
				}

			//convert move (queen)
			else if(tm[0].indexOf("Q")!=-1){
				tm[0]=tm[0].replace("Q","");
				tm[0]=tm[0].replace("x","");
				nu=sqp[tm[1]][1];
				for(l=0;l<qAry.length;l++){
					for(k=0;k<qAry[l].length;k++){
						if(fpn[(nu+qAry[l][k])]&&fpn[(nu+qAry[l][k])]=="wq") {
							if(sqn[(nu+qAry[l][k])].indexOf(tm[0])!=-1){
								fpn[(nu+qAry[l][k])]="X";
								fpn[nu]="wq";
								tm[0]=sqn[(nu+qAry[l][k])];
								break;
								}
							}
						if(fpn[(nu+qAry[l][k])]&&fpn[(nu+qAry[l][k])]!="X") { break; }
						}
					}
				}

			//convert move (king)
			else if(tm[0].indexOf("K")!=-1){

				//if((i+1)==13) { alert(wck+" - "+wcq); }

				if(wck&&tm[1]=="g1") {
					tm[0]="e1";
					fpn[62]="wk";
					fpn[60]="X";
					fpn[63]="X";
					fpn[61]="wr";
					wck=false;
					wcq=false;
					}
				else if(wcq&&tm[1]=="c1") {
					tm[0]="e1";
					fpn[58]="wk";
					fpn[60]="X";
					fpn[56]="X";
					fpn[59]="wr";
					wck=false;
					wcq=false;
					}
				else {
					nu=sqp[tm[1]][1];
					for(k=0;k<kAry.length;k++){
						if(fpn[(nu+kAry[k])]&&fpn[(nu+kAry[k])]=="wk") {
							fpn[(nu+kAry[k])]="X";
							fpn[nu]="wk";
							tm[0]=sqn[(nu+kAry[k])];
							wck=false;
							wcq=false;
							break;
							}
						}
					}
				}

			finalData["game"][i]=tm[0]+tm[1]+",";

			if(errorLog) { tStr+='<tr><td>'+(i+1)+'.<td>&nbsp;&nbsp;</td><td>'+tm+'</td>'; }


			//**board layout after move
			var fsq='';var z=0;
			for(f=0;f<8;f++){
				for(g=0;g<8;g++){
					fsq+=fpn[z]+"  ";
					z++;
					}
				fsq+='\n';
				}
			//alert(fsq+"\n\n"+(i+1));



			//**black
			prom="";
			if(bm&&bm.indexOf("=")!=-1) {
				var temProm = bm.split("=");
				bm=temProm[0];
				prom=temProm[1];
				}
			mol=bm.length;
			tm=new Array("","");

			//**remove x
			//bm=bm.replace("x","");

			//if((i+1)==59) { alert(bm); }

			//add pawn name
			if(mol==2) { bm="P"+bm; }
			mol=bm.length;

			//convert castling moves
			if(bm=="0-0") { bm="O-O"; }
			if(bm=="0-0-0") { bm="O-O-O"; }
			if(bm=="O-O") { bm="Kg8"; }
			if(bm=="O-O-O") { bm="Kc8"; }
			mol=bm.length;

			//split move data for conversion
			for(j=0;j<mol;j++){
				if(j<(mol-2)) { tm[0]+=bm.charAt(j); }
				else { tm[1]+=bm.charAt(j); }
				}

			//convert move (attacking pawn)
			if(tm[0].length==2&&tm[0].toLowerCase()==tm[0]){
				nu=sqp[tm[1]][1];
				var tosq=tm[0].charAt(0);
				tm[0]=tm[0].charAt(0)+(parseInt(tm[1].charAt(1))+1);
				if(fpn[(nu-7)]=="p"&&sqn[(nu-7)].indexOf(tosq)!=-1) {
					fpn[(nu-7)]="X";
					if(fpn[nu]=="X") { fpn[(nu-8)]="X"; }
					}
				else if(fpn[(nu-9)]=="p"&&sqn[(nu-9)].indexOf(tosq)!=-1) {
					fpn[(nu-9)]="X";
					if(fpn[nu]=="X") { fpn[(nu-8)]="X"; }
					}
				fpn[nu]="p";
				if(prom!="") { fpn[nu]=prom.toLowerCase(); }
				}

			//convert move (non-attacking pawn)
			else if(tm[0]=="P"){
				nu=sqp[tm[1]][1];
				for(k=0;k<bpAry.length;k++){
					if(fpn[(nu+bpAry[k])]=="p") {
						fpn[(nu+bpAry[k])]="X";
						fpn[nu]="p";
						if(prom!="") { fpn[nu]=prom.toLowerCase(); }
						tm[0]=sqn[(nu+bpAry[k])];
						break;
						}
					}
				}

			//convert move (unambiguous bishop)
			else if(tm[0]=="B"||tm[0]=="Bx"){
				bk=false;
				nu=sqp[tm[1]][1];
				for(l=0;l<bAry.length;l++){
					for(k=0;k<bAry[l].length;k++){
						if(fpn[(nu+bAry[l][k])]&&fpn[(nu+bAry[l][k])]=="b") {
							if(grid[nu][0]!=grid[(nu+bAry[l][k])][0]&&grid[nu][1]!=grid[(nu+bAry[l][k])][1]) {
								fpn[(nu+bAry[l][k])]="X";
								fpn[nu]="b";
								tm[0]=sqn[(nu+bAry[l][k])];
								break;
								}
							}
						if(fpn[(nu+bAry[l][k])]&&fpn[(nu+bAry[l][k])]!="X") { break; }
						if(grid[(nu+bAry[l][k])]&&(grid[(nu+bAry[l][k])][0]==7||grid[(nu+bAry[l][k])][1]==7||grid[(nu+bAry[l][k])][0]==0||grid[(nu+bAry[l][k])][1]==0)) { break; }
						}
					}
				}

			//convert move (ambiguous bishop)
			else if(tm[0].indexOf("B")!=-1){
				tm[0]=tm[0].replace("B","");
				tm[0]=tm[0].replace("x","");
				nu=sqp[tm[1]][1];
				for(l=0;l<bAry.length;l++){
					for(k=0;k<bAry[l].length;k++){
						if(fpn[(nu+bAry[l][k])]&&fpn[(nu+bAry[l][k])]=="b") {
							if(sqn[(nu+bAry[l][k])].indexOf(tm[0])!=-1){
								fpn[(nu+bAry[l][k])]="X";
								fpn[nu]="b";
								tm[0]=sqn[(nu+bAry[l][k])];
								break;
								}
							}
						if(fpn[(nu+bAry[l][k])]&&fpn[(nu+bAry[l][k])]!="X") { break; }
						}
					}
				}

			//convert move (unambiguous rook)
			else if(tm[0]=="R"||tm[0]=="Rx"){
				nu=sqp[tm[1]][1];
				for(l=0;l<rAry.length;l++){
					for(k=0;k<rAry[l].length;k++){
						if(fpn[(nu+rAry[l][k])]&&fpn[(nu+rAry[l][k])]=="r") {
							if(grid[nu][0]==grid[(nu+rAry[l][k])][0]||grid[nu][1]==grid[(nu+rAry[l][k])][1]) {
								fpn[(nu+rAry[l][k])]="X";
								fpn[nu]="r";
								tm[0]=sqn[(nu+rAry[l][k])];
								if(tm[0]=="a8") { bcq=false; }
								if(tm[0]=="h8") { bck=false; }
								break;
								}
							}
						if(fpn[(nu+rAry[l][k])]&&fpn[(nu+rAry[l][k])]!="X") { break; }
						if(l==0||l==2){
							if(grid[(nu+rAry[l][k])]&&(grid[(nu+rAry[l][k])][0]==7||grid[(nu+rAry[l][k])][0]==0)) { break; }
							}
						if(l==1||l==3){
							if(grid[(nu+rAry[l][k])]&&(grid[(nu+rAry[l][k])][1]==7||grid[(nu+rAry[l][k])][1]==0)) { break; }
							}
						}
					}
				}

			//convert move (ambiguous rook)
			else if(tm[0].indexOf("R")!=-1){
				tm[0]=tm[0].replace("R","");
				tm[0]=tm[0].replace("x","");
				nu=sqp[tm[1]][1];
				for(l=0;l<rAry.length;l++){
					for(k=0;k<rAry[l].length;k++){
						if(fpn[(nu+rAry[l][k])]&&fpn[(nu+rAry[l][k])]=="r") {
							if(sqn[(nu+rAry[l][k])].indexOf(tm[0])!=-1){
								fpn[(nu+rAry[l][k])]="X";
								fpn[nu]="r";
								tm[0]=sqn[(nu+rAry[l][k])];
								if(tm[0]=="a8") { bcq=false; }
								if(tm[0]=="h8") { bck=false; }
								break;
								}
							}
						if(fpn[(nu+rAry[l][k])]&&fpn[(nu+rAry[l][k])]!="X") { break; }
						}
					}
				}

			//convert move (unambiguous knight)
			else if(tm[0]=="N"||tm[0]=="Nx"){
				nu=sqp[tm[1]][1];
				for(k=0;k<nAry.length;k++){
					if(fpn[(nu+nAry[k])]&&fpn[(nu+nAry[k])]=="n") {
						if(grid[(nu+nAry[k])]&&(grid[(nu+nAry[k])][0]!=grid[(nu)][0])&&(grid[(nu+nAry[k])][1]!=grid[(nu)][1])) {
							if((((grid[(nu+nAry[k])][0]-grid[nu][0])<=2)&&((grid[(nu+nAry[k])][0]-grid[nu][0])>=-2))&&(((grid[(nu+nAry[k])][1]-grid[nu][1])<=2)&&((grid[(nu+nAry[k])][1]-grid[nu][1])>=-2))) {
								fpn[(nu+nAry[k])]="X";
								fpn[nu]="n";
								tm[0]=sqn[(nu+nAry[k])];
								break;
								}
							}
						}
					}
				}

			//convert move (ambiguous knight)
			else if(tm[0].indexOf("N")!=-1){
				tm[0]=tm[0].replace("N","");
				tm[0]=tm[0].replace("x","");
				nu=sqp[tm[1]][1];
				for(k=0;k<nAry.length;k++){
					if(fpn[(nu+nAry[k])]&&fpn[(nu+nAry[k])]=="n") {
						//alert(sqn[(nu+nAry[k])]+" - "+tm[0]);
						if(sqn[(nu+nAry[k])].indexOf(tm[0])!=-1){
							fpn[(nu+nAry[k])]="X";
							fpn[nu]="n";
							tm[0]=sqn[(nu+nAry[k])];
							break;
							}
						}
					}
				}

			//convert move (queen)
			else if(tm[0].indexOf("Q")!=-1){
				tm[0]=tm[0].replace("Q","");
				tm[0]=tm[0].replace("x","");
				nu=sqp[tm[1]][1];
				for(l=0;l<qAry.length;l++){
					for(k=0;k<qAry[l].length;k++){
						if(fpn[(nu+qAry[l][k])]&&fpn[(nu+qAry[l][k])]=="q") {
							if(sqn[(nu+qAry[l][k])].indexOf(tm[0])!=-1){
								fpn[(nu+qAry[l][k])]="X";
								fpn[nu]="q";
								tm[0]=sqn[(nu+qAry[l][k])];
								break;
								}
							}
						if(fpn[(nu+qAry[l][k])]&&fpn[(nu+qAry[l][k])]!="X") { break; }
						}
					}
				}


			//convert move (king)
			else if(tm[0].indexOf("K")!=-1){

				if(bck&&tm[1]=="g8") {
					tm[0]="e8";
					fpn[6]="k";
					fpn[4]="X";
					fpn[7]="X";
					fpn[5]="r";
					bck=false;
					bcq=false;
					}
				else if(bcq&&tm[1]=="c8") {
					tm[0]="e8";
					fpn[2]="k";
					fpn[4]="X";
					fpn[0]="X";
					fpn[3]="r";
					bck=false;
					bcq=false;
					}
				else {
					nu=sqp[tm[1]][1];
					for(k=0;k<kAry.length;k++){
						if(fpn[(nu+kAry[k])]&&fpn[(nu+kAry[k])]=="k") {
							fpn[(nu+kAry[k])]="X";
							fpn[nu]="k";
							tm[0]=sqn[(nu+kAry[k])];
							bck=false;
							bcq=false;
							break;
							}
						}
					}
				}


			//identify empty values
			if(tm[0].length<2&&tm[0].indexOf("-")==-1) { tm[0]="X"; }

			//add to array
			finalData["game"][i]+=tm[0]+tm[1];

			if(errorLog) { tStr+='<td>&nbsp;&nbsp;&nbsp;</td><td>'+tm+'</td></tr>'; }



			//**board layout after move
			var fsq='';var z=0;
			//fsq+="\n\n"+(i+1)+"\n\n";
			for(f=0;f<8;f++){
				for(g=0;g<8;g++){
					fsq+=fpn[z]+"  ";
					//fsq+=fpn[(z-64)]+"  ";
					z++;
					}
				fsq+='\n';
				}
			//alert(fsq+"\n\n"+(i+1));


			}


		//convert data into player format game string

		//seven tag roster
		for(i=0;i<pgnData[inu][0].length;i++){
			//alert(pgnData[inu][0][i]);
			for(j=0;j<pgnRoster.length;j++){
				if(pgnData[inu][0][i][0]==pgnRoster[j])  {
					pgnData[inu][0][i][0]=escape(pgnData[inu][0][i][0]);
					pgnData[inu][0][i][0]=pgnData[inu][0][i][0].replace("%0D%0A","");
					pgnData[inu][0][i][0]=unescape(pgnData[inu][0][i][0]);
					pgnData[inu][0][i][1]=escape(pgnData[inu][0][i][1]);
					pgnData[inu][0][i][1]=pgnData[inu][0][i][1].replace("%0D%0A","");
					pgnData[inu][0][i][1]=unescape(pgnData[inu][0][i][1]);
					finalData["tagRoster"]+="&"+pgnData[inu][0][i][0]+"="+pgnData[inu][0][i][1];
					}
				}
			}


		var fdgl=(finalData["game"].length);
		if(finalData["game"][(fdgl-1)].indexOf(",---")!=-1) {
			finalData["game"][(fdgl-1)]=finalData["game"][(fdgl-1)].replace(",---","");
			}
		var gameTemp="";
		for(i=0;i<fdgl;i++){
			gameTemp+=finalData["game"][i];
			if(i<(fdgl-1)) { gameTemp+=","; }
			}
		finalData["game"]=gameTemp;
		finalData["checkgame"][inu]=finalData["game"];



		//alert(finalData["tagRoster"]);
		//alert(finalData["Result"]);
		//alert(finalData["game"]);



		//compile game string
		gameString[inu]="";
		gameString[inu]+=qStr['loc']+"?game="+finalData['game'];
		gameString[inu]+="&panels="+qStr['panels']+"&size="+qStr['size']+"&view=w&pieces="+qStr['pieces']+"&showLegal="+qStr['showLegal']+"&blockIllegal="+qStr['blockIllegal'];
		gameString[inu]+=finalData['tagRoster'];
		gameString[inu]+="&lightCOLOR="+qStr['lightCOLOR']+"&darkCOLOR="+qStr['darkCOLOR']+"&borderCOLOR="+qStr['borderCOLOR']+"&whiteSQUARES="+qStr['whiteSQUARES']+"&blackSQUARES="+qStr['blackSQUARES']+"&boardBACKING="+qStr['boardBACKING']+"&shadowCOLOR="+qStr['shadowCOLOR'];

	}


	//check for improperly processed game
	var gameOkay=true;
	if(finalData["checkgame"][inu].indexOf("X")!=-1) { gameOkay=false; }
	for(i=0;i<pInd.length;i++){
		if(finalData["checkgame"][inu].indexOf(pInd[i])!=-1) {
			gameOkay=false;
			}
		}


	//load chessboard
	if(gameOkay) {
		window.opener.location=gameString[inu];
		window.opener.focus();
		}


	//reset values
	fpn=new Array('r','n','b','q','k','b','n','r','p','p','p','p','p','p','p','p','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','wp','wp','wp','wp','wp','wp','wp','wp','wr','wn','wb','wq','wk','wb','wn','wr');
	wck=true;wcq=true;bck=true;bcq=true;
	teAry=new Array;te=0;
	finalData["game"]=new Array;
	finalData["tagRoster"]="";
	if(gameOkay) { document.getElementById("dataspan"+inu).innerHTML=tbData; }
	else {
		document.getElementById("dataspan"+inu).innerHTML="Unable to process PGN data";

		//report output on error
		if(errorLog){
			tStr+='</table>';
			if(qStr) { tStr+='<p><span style="color:#'+qStr["lightCOLOR"] + '\; background-color:#'+qStr["darkCOLOR"] + '\; border-color:#'+qStr["lightCOLOR"] + '\; font-size:15px\; font-weight:bold\; font-family:comic sans ms,arial\;">'+(inu+1)+'</span>'; }
			else { tStr+='<p><span style="font-size:15px\; font-weight:bold\; font-family:comic sans ms,arial\;">'+(inu+1)+'</span>'; }
			tStr+='</body>';
			var thw=240;
			var props="top=4,left="+(screen.width-thw-24)+",width="+thw+",height="+(screen.height-104)+",status=yes,menubar=no,toolbar=no,scrollbars=yes,resizable=yes";
			testWin=open("","testWin",props);
			testWin.document.write(tStr);
			}
		}
	window.defaultStatus="Done";


	}
