//CPGv2.2


// set page background color;
document.bgColor=lC;

//find colors or images
var wsq="bgcolor="+wQ;
if(wQ.indexOf(".gif")!=-1||wQ.indexOf(".jpg")!=-1){
	wsq="background="+wQ;
	}
var bsq="bgcolor="+bQ;
if(bQ.indexOf(".gif")!=-1||bQ.indexOf(".jpg")!=-1){
	bsq="background="+bQ;
	}
var bsu="background-color:"+boardBACKING;



//preload images
var pn=new Array('r','n','b','q','k','b','n','r','p','p','p','p','p','p','p','p','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','wp','wp','wp','wp','wp','wp','wp','wp','wr','wn','wb','wq','wk','wb','wn','wr');
var imgs=new Array;
for(i=0;i<pn.length;i++){
	if(pn[i]!="X"){
		imgs[pn[i]]=new Image;
		imgs[pn[i]].src=pf+pn[i]+".gif";
		}
	}
imgs["X"]=new Image;
imgs["X"].src="_program/_icons/X.gif";


var tb='<table border=0 cellspacing=0 cellpadding=';
var stb='</table>';
var ctb='</td></tr>'+stb;



// total reset
var pla=false;
var down=true;
function allReset(activate){

	if (!pla){
		return false;
		}

	dc=document.forms["chessform"];

	// reset notation covers
	lCov.style.top=arT-16;
	nCov.style.left=arL+(sqS*3)+(sqS*8)+2;
	down=true;

	// redefine initial arrays
	bCCr=true;
	wCCr=true;
	bCCl=true;
	wCCl=true;
	XiP=arL;
	YiP=arT;
	pp=new Array;
	bb=new Array;
	bw=new Array;
	bnb=new Array;
	bnw=new Array;
	pn=new Array('r','n','b','q','k','b','n','r','p','p','p','p','p','p','p','p','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','wp','wp','wp','wp','wp','wp','wp','wp','wr','wn','wb','wq','wk','wb','wn','wr');
	Dfn=new Array('r','n','b','q','k','b','n','r','p','p','p','p','p','p','p','p','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','wp','wp','wp','wp','wp','wp','wp','wp','wr','wn','wb','wq','wk','wb','wn','wr');
	xn=new Array;
	alSt="-r-n-b-q-k-b-n-r-p-p-p-p-p-p-p-p-wr-wn-wb-wq-wk-wb-wn-wr-wp-wp-wp-wp-wp-wp-wp-wp";

	// reset black bin
	blF=false;
	XiP=arL+sqS;
	YiP=arT;
	i=0;
	img=15;
	for (bh=0;bh<2;bh++){
		for (bv=0;bv<8;bv++){
			bb[i]=new Array(XiP,YiP);
			bnb[i]="X";
			bS[i].style.left=bb[i][0];
			bS[i].style.top=bb[i][1];
			bI[i].src=imgs[pn[img]].src;
			YiP+=sqS;
			i++;
			img--;
			}
		YiP=arT;XiP-=sqS;
		}

	// reset board pieces
	XiP=arL+(sqS*3);
	YiP=arT;
	i=0;
	for (bv=0;bv<8;bv++){
		for (bh=0;bh<8;bh++){
			pp[i]=new Array(XiP,YiP);
			pI[i].src=imgs["X"].src;
			pS[i].style.visibility="hidden";
			pS[i].style.left=pp[i][0];
			pS[i].style.top=pp[i][1];
			XiP+=sqS;
			i++;
			}
		XiP=arL+(sqS*3);YiP+=sqS;
		}

	// reset white bin
	whF=false;
	XiP=arL+(sqS*11)+(5*2)+20;
	YiP=arT;
	i=0;
	img=48;
	for (bh=0;bh<2;bh++){
		for (bv=0;bv<8;bv++){
			bw[i]=new Array(XiP,YiP);
			bnw[i]="X";
			wS[i].style.left=bw[i][0];
			wS[i].style.top=bw[i][1];
			wI[i].src=imgs[pn[img]].src;
			YiP+=sqS;
			i++;
			img++;
			}
		YiP=arT;XiP+=sqS;
		}

	//castle status
	dc["wccr"].value=wCCr;
	dc["bccr"].value=bCCr;
	dc["wccl"].value=wCCl;
	dc["bccl"].value=bCCl;

	// reset game counter
	gaP=new Array;
	moves=-1;


	if (activate){

		//handle recorded game
		shownIt=false;
		dc["gp"].value=0;

		star="";
		dc["ant"].value="";
		if(annt[0]&&annt[0]!=""){star="*";dc["ant"].value=annt[0];}
		var lsNum=Math.round((reco.length-1)/2);if(lsNum==0){lsNum="..";}


		dc["gpv"].value=".."+star+" /"+lsNum;

		//start again at entry point string
		var eString=dc["entry"].value;
		if (eString!=""){
			dc["start"].value=eString;
			if(pla){allReset(false);}setP('custom');
			// start again with blank but active board
			}else{
			dc["start"].value="8/8/8/8/8/8/8/8 w KQkq - 0 1";
			if(pla){allReset(false);}setP('custom');
			}
		}
	}



// board left and top
var arL,arT;
arL=4+bsPos;
arT=76+bsPos;


//pieces can castle
var bCCr=true;
var wCCr=true;
var bCCl=true;
var wCCl=true;

// logfile moves array
var moL=new Array;
var moC=new Array;
var loN=0;

// square codes
var lCo=new Array('a','b','c','d','e','f','g','h');
var cc=new Array;
var sqid=new Array;

//recording enabled
var ato=false;

//reco
var reco=new Array;
var rNum=0;
var chessTimer;
var gMoves=new Array;
var finalPos="";
var savG=new Array;
var savN=new Array;
var paC="";
var allC=false;
var pcfM=new Array;
var pcfXd=new Array;
var fenXd=new Array;
var annt=new Array;
var star="";
var ckC=0;
var taNa=new Array("Event","Site","Date","Round","White","Black","Result","WhiteElo","BlackElo","WhiteNationality","BlackNationality");
var taVa=new Array(aE,aS,aD,aR,aW,aB,aRe,aWE,aBE,aWN,aBN);

//validation
var tVal=new Array;
var tNVal=new Array;
var tvNum=0;
var aSq=new Array;
var valEnp=-1;

var xIC='<img src="'+imgs["X"].src+'" width=14 height=14 border=0 alt="">';

// compile chessboard
var cb='';
var odd=0;



cb+='<div style="z-index:1\;position:absolute\;left:'+(arL+(sqS*3)-18)+'px\;top:'+(arT-18)+'px\;">';
cb+=tb+'2><tr><td bgcolor="'+bC+'">';


cb+=tb+'0 '+bsu+'>';
cb+=tb+'0 style="'+bsu+'">';
cb+='<tr>';
cb+='<td>'+xIC+'</td>';
cb+='<td><span style="font-size:8px;font-family:arial;color:'+bC+';"><img src="'+imgs["X"].src+'" width=2 height=11></span></td>';
var letters=new Array('A','B','C','D','E','F','G','H');
for (i=7;i>=0;i--){
	cb+='<td width="'+sqS+'" align=center><span style="cursor:default;font-size:8px;font-family:arial;color:'+bC+';">'+letters[i]+'</span></td>';
	}
cb+='<td>'+xIC+'</td>';
cb+='</tr>';
cb+='<tr>';
cb+='<td height="'+sqS+'" align=center><span style="cursor:default;font-size:8px;font-family:arial;color:'+bC+';">8</span></td>';
cb+='<td colspan=9 rowspan=8 align=center>';

cb+=tb+'2 width='+((sqS*8)+4)+' height='+((sqS*8)+4)+'><tr><td bgcolor="'+bC+'"><table border=0 cellspacing=0 cellpadding=0 bgcolor="'+lC+'"><tr><td>';
cb+=tb+'0 width='+(sqS*8)+' height='+(sqS*8)+' bgcolor="'+lC+'">';

i=0;
var CL=0;
var CN=8;

for (bv=0;bv<8;bv++){
	cb+='<tr>';
	for (bh=0;bh<8;bh++){
		// square name
		cc[i]=lCo[CL]+CN;
		//square ident
		sqid[i]=new Array(bv,bh);
		// square
		odd++;
		var cellBG=wsq;
		var ssnC=dC;
		if ((parseInt(odd/2))==(odd/2)){
			cellBG=bsq;
			ssnC=lC;
			}
		var ssn='';
		var sno=i;
		if (showSquareInfo=="names"){sno=cc[i];}
		if (showSquareInfo=="both"){sno=i+"<br>"+cc[i];}
		if (showSquareInfo!=""){ssn='<span style="font-size:9px\;font-family:verdana\;color:'+ssnC+'">'+sno+'</span>';}
		cb+='<td width='+sqS+' height='+sqS+' align=center valign=middle '+cellBG+'><img src="'+imgs["X"].src+'" width=1 height=1 alt="" border=0>'+ssn+'</td>';
		CL++;i++;
		if (CL>7){CL=0;CN--;}
		}
	cb+='</tr>';
	odd+=1;
	}

cb+=stb;
cb+=ctb;
cb+=ctb;

var oTD='<td height="'+sqS+'" align=center><span style="cursor:default;font-size:8px;font-family:arial;color:'+bC+';">';

cb+='</td>';
cb+=oTD+'1</span></td>';
cb+='</tr>';
var j=7;
for (i=2;i<9;i++){
	cb+='<tr>';
	cb+=oTD+j+'</span></td>';
	cb+=oTD+i+'</span></td>';
	cb+='</tr>';
	j--;
	}
cb+='<tr>';
cb+='<td>'+xIC+'</td>';
cb+='<td><img src="'+imgs["X"].src+'" width=2 height=11></td>';
for (i=0;i<8;i++){
	cb+='<td width="'+sqS+'" align=center><span style="cursor:default;font-size:8px;font-family:arial;color:'+bC+';">'+letters[i]+'</span></td>';
	}
cb+='<td>'+xIC+'</td>';
cb+='</tr>';
cb+=stb;


cb+=ctb;
cb+='</div>';




// make inital piece position and identity arrays
var XiP=arL;
var YiP=arT;

var pp=new Array;
var on=new Array;
var mp=new Array;
var gaP=new Array;var moves=-1;
var bb=new Array;
var bw=new Array;
var bnb=new Array;
var bnw=new Array;
var Dfn=new Array('r','n','b','q','k','b','n','r','p','p','p','p','p','p','p','p','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','wp','wp','wp','wp','wp','wp','wp','wp','wr','wn','wb','wq','wk','wb','wn','wr');
var fpn=new Array('r','n','b','q','k','b','n','r','p','p','p','p','p','p','p','p','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','wp','wp','wp','wp','wp','wp','wp','wp','wr','wn','wb','wq','wk','wb','wn','wr');
var xn=new Array;



// board piece objects
var pS=new Array;
var pI=new Array;

//square names to numbers
var sqn=new Array;
var iq=0;
for(jq=8;jq>0;jq--){
	for(nq=0;nq<8;nq++){
		sqn[iq]=lCo[nq]+jq;
		iq++;
		}
	}

//create an array of pieces indexed by square name
var sqp=new Array;
for(i=0;i<64;i++){
	sqp[cc[i]]=new Array(Dfn[i],i);
	}





// script string for default board layout
var alSt="-r-n-b-q-k-b-n-r-p-p-p-p-p-p-p-p-wr-wn-wb-wq-wk-wb-wn-wr-wp-wp-wp-wp-wp-wp-wp-wp";

var xDe=new Array;

// prx sensitivity
var prx=sqS/2;


// html string
var pc='';

// compile black bin images

var XiP=arL+sqS;
var YiP=arT;

var i=0;
var img=15;

for (bh=0;bh<2;bh++){
	for (bv=0;bv<8;bv++){
		bb[i]=new Array(XiP,YiP);
		bnb[i]="X";
		pc+='<span id="binb'+i+'" style="visibility:visible\;z-index:1\;position:absolute\;left:'+bb[i][0]+'px\;top:'+bb[i][1]+'px\;" onmouseover="setpieceid(this)" onmouseout="setpieceid(null)">';
		pc+='<img name="binbpeace'+i+'" src="'+imgs["X"].src+'" width='+sqS+' height='+sqS+'>';
		pc+='</span>';
		YiP+=sqS;
		i++;
		img--;
		}
	YiP=arT;XiP-=sqS;
	}




// compile last move borders
pc+='<span id="lm0" style="z-index:2\;visibility:hidden\;position:absolute\;left:'+(arL+(sqS*3))+'px\;top:'+arT+'px\;">';
var pvTA=tb+'0 style="border:2px solid red"><tr><td><img src="'+imgs["X"].src+'" width='+(sqS-4)+' height='+(sqS-4)+' alt="" border=0>'+ctb;
pc+=pvTA;
pc+='</span>';
pc+='<span id="lm1" style="z-index:2\;visibility:hidden\;position:absolute\;left:'+(arL+(sqS*3))+'px\;top:'+arT+'px\;">';
pc+=pvTA;
pc+='</span>';







// compile chessboard images

var XiP=arL+(sqS*3);
var YiP=arT;

var vmm='';

// store code separately 
var nsc=new Array;

i=0;odd=0;

for (bv=0;bv<8;bv++){
	for (bh=0;bh<8;bh++){
		pp[i]=new Array(XiP,YiP);
		on[i]=new Array(XiP,YiP);
		nsc[i]='';

		//legal move markers
		vmm+='<span id="square'+i+'" style="position:absolute\;width:'+sqS+'px\;height:'+sqS+'px;visibility:hidden\;z-index:2\;position:absolute\;left:'+(pp[i][0])+'px\;top:'+(pp[i][1])+'px\;"><img src="_program/_icons/valid.gif" width='+sqS+' height='+sqS+' alt="" border=0></span>';
		nsc[i]+='<span id="play'+i+'" style="visibility:hidden\;z-index:4\;position:absolute\;left:'+pp[i][0]+'px\;top:'+pp[i][1]+'px\;" onmouseover="init()\;setpieceid(this)" onmouseout="setpieceid(null)">';
		var shadFilter="";
		if(ie5p&&shadowCOLOR!=""){
			shadFilter= ' style="filter:shadow(color='+shadowCOLOR+',direction=135,strength=1,enabled=false)"';
			}
		nsc[i]+='<img name="peace'+i+'" id="peace" src="'+imgs["X"].src+'" width='+sqS+' height='+sqS+shadFilter+'>';
		nsc[i]+='</span>';
		pc+=nsc[i];
		XiP+=sqS;
		i++;
		}
	XiP=arL+(sqS*3);YiP+=sqS;

	}



// compile white bin images

var XiP=arL+(sqS*11)+(5*2)+20;
var YiP=arT;

i=0;
img=48;

for (bh=0;bh<2;bh++){
	for (bv=0;bv<8;bv++){
		bw[i]=new Array(XiP,YiP);
		bnw[i]="X";
		pc+='<span id="binw'+i+'" style="visibility:visible\;z-index:1\;position:absolute\;left:'+bw[i][0]+'px\;top:'+bw[i][1]+'px\;" onmouseover="setpieceid(this)" onmouseout="setpieceid(null)">';
		pc+='<img name="binwpeace'+i+'" src="'+imgs["X"].src+'" width='+sqS+' height='+sqS+'>';
		pc+='</span>';
		YiP+=sqS;
		i++;
		img++;
		}
	YiP=arT;XiP+=sqS;
	}



// compile notation covers
var nc='';
nc+='<span id="lcover" style="'+bsu+'\;z-index:10\;position:absolute\;left:'+(arL+(sqS*3))+'px\;top:'+(arT-16)+'px\; width:'+(sqS*8)+'px\;height:14px\;"><img src="'+imgs["X"].src+'" height=1 width=1 border=0 alt=""></span>';
nc+='<span id="ncover" style="'+bsu+'\;z-index:10\;position:absolute\;left:'+(arL+(sqS*3)+(sqS*8)+2)+'px\;top:'+(arT)+'px\; width:14px\;height:'+(sqS*8)+'px\;"><img src="'+imgs["X"].src+'" height=1 width=1 border=0 alt=""></span>';





// draw the chessboard, blank pieces and notation covers
if (!exclude){
	document.open();
	document.write(vmm);
	document.write(cb);
	document.write(nc);
	document.write(pc);
	document.close();
	}


//compile array of square IDs
var sq=new Array;
var sqc=new Array;
for (i=0;i<64;i++){
	sq[i]=document.getElementById("square"+i);
	}



// notation cover objects
var lCov=document.getElementById("lcover");
var nCov=document.getElementById("ncover");




// black bin piece objects
var bS=new Array;
var bI=new Array;
var blF=false;
// white bin piece objects
var wS=new Array;
var wI=new Array;
var whF=false;

// build bin id arrays
for (i=0;i<16;i++){
	bS[i]=document.getElementById("binb"+i);
	bI[i]=document.getElementById("binb"+i).firstChild;
	wS[i]=document.getElementById("binw"+i);
	wI[i]=document.getElementById("binw"+i).firstChild;
	}



// plot start positions



var s;
var qFound=false;
var lastmove=false;
var movea='';
var moveb='';

var lmS=new Array;
lmS[0]=document.getElementById("lm0");
lmS[1]=document.getElementById("lm1");





// hide last position indicators
function hideLastMove(){
	// reset last move indicators
	lmS[0].style.visibility="hidden";
	lmS[1].style.visibility="hidden";
	}



// find and move last position indicators
var shownIt=false;
function findLastMove(lastmove){
	if (lastmove&&lastmove!=''){
		if(shownIt){return false;}
		shownIt=true;
		movea=lastmove.charAt(0)+lastmove.charAt(1);
		moveb=lastmove.charAt(2)+lastmove.charAt(3);
		for (i=0;i<64;i++){
			if (cc[i]==movea){
				lmS[0].style.left=on[i][0];
				lmS[0].style.top=on[i][1];
				lmS[0].style.visibility="visible";
				}
			if (cc[i]==moveb){
				lmS[1].style.left=on[i][0];
				lmS[1].style.top=on[i][1];
				lmS[1].style.visibility="visible";
				}
			}
		}
	}



var flNum=-1;
var qsLast='';
var lpdone=false;
var storeQS='';
var inputV="";
var iRecorder=new Array;
var ui=false;
var dc;
var firstLast="";
var prvC=-1;
var panels=new Array(true,true,true,true,true);
var secu=false;
var cecu=false;
var cecu="%26nbsp%3B%3CSPAN%20class%3Ddaco%3EChessPlayer%20v2.0%20by%20%3C/SPAN%3E%3CA%20class%3Ddaco%20style%3D%22CURSOR%3A%20hand%3B%20TEXT-DECORATION%3A%20none%22%20href%3D%22http%3A//www.brothercake.com/%22%20target%3D_blank%3E%3CIMG%20class%3Dlogo%20height%3D16%20alt%3D%22%22%20src%3D%22_program/_icons/favicon.gif%22%20width%3D16%20border%3D0%3EBrothercake%3C/A%3E%3CSPAN%20class%3Ddaco%3E%20in%20association%20with%20%3C/SPAN%3E%3CA%20class%3Ddaco%20style%3D%22CURSOR%3A%20hand%3B%20TEXT-DECORATION%3A%20none%22%20href%3D%22http%3A//www.chessworld.net/%22%20target%3D_blank%3EChessWorld.net%3C/A%3E%3CILAYER%20id%3Dmsg%3E%3C/ILAYER%3E";

function setP(layout,lastmove,logurl,viewauto){

	dc=document.forms["chessform"];

	secu=document.getElementById("msg");
	//if(secu&&secu.length&&secu.length>1){if(secu[0].innerHTML!=unescape(cecu)){secu[0].innerHTML="";secu=false;}}

	if(!secu){return false;}

	// first time setup
	if (!pla){

		window.defaultStatus="Compiling ...";

		// assign button names
		dc["sv"].value="Switch viewpoint";
		dc["ato"].value="Record";
		dc["ato"].title="Record";
		dc["rp"].value="Play";
		dc["rp"].title="Play through";
		dc["gp"].value="0";
		dc["ls"].value=-1;
		dc["gpv"].value=".. /..";
		dc["b"].value="«";
		dc["rw"].value="<";
		dc["ff"].value=">";
		dc["e"].value="»";
		dc["sp"].value="« In";
		dc["op"].value="« Out";
		dc["vr"].value=-1;
		dc["vw"].value=true;
		dc["ant"].value="";

		if(showLEGAL){dc["slm"].checked=true;}
		if(blockILLEGAL){dc["dim"].checked=true;}

		dc["aE"].value=taVa[0];
		dc["aS"].value=taVa[1];
		dc["aD"].value=taVa[2];
		dc["aR"].value=taVa[3];
		dc["aW"].value=taVa[4];
		dc["aB"].value=taVa[5];
		dc["aRe"].value=taVa[6];
		dc["aWE"].value=taVa[7];
		dc["aBE"].value=taVa[8];
		dc["aWN"].value=taVa[9];
		dc["aBN"].value=taVa[10];

		dc["newg"].value="New game";
		dc["clrb"].value="Clear";

		dc["andan"].style.visibility="visible";
			
		//reset reco
		if(!gIn){
			reco=new Array;
			rNum=0;
			reco[rNum]=dc["start"].value;
			rNum++;
			}

		//if game input, add values to reco
		if(gIn){

			var lsNum=Math.round((reco.length-1)/2);if(lsNum==0){lsNum="..";}



			if(firstLast!=""){
				//alert(flNum);
				dc["ls"].value=(flNum);
				dc["gp"].value=(flNum+1);
				star="";
				dc["ant"].value="";
				if(annt[(flNum+1)]&&annt[(flNum+1)]!=""){star="*";dc["ant"].value=annt[(flNum+1)];}
				var gpVal=(flNum+1)/2;
				if(parseFloat(gpVal)!=parseInt(gpVal)){gpVal=Math.round(gpVal);gpVal+=".";}
				else{if(gpVal>0){gpVal+="..";}else{gpVal="..";}}
				dc["gpv"].value=gpVal+star+" /"+lsNum;
				}else{
				dc["ls"].value=-1;
				dc["gp"].value=0;
				star="";
				dc["ant"].value="";
				if(annt[0]&&annt[0]!=""){star="*";dc["ant"].value=annt[0];}
				dc["gpv"].value=".."+star+" /"+lsNum;
				}

			}

		//change form text to indicate processed game
		dc["ato"].disabled=false;
		dc["ato"].value="Record";
		dc["ato"].title="Record";
		if(gIn) {
			dc["reco"].options[1].style.color=bC;
			dc["reco"].options[2].style.color=bC;
			dc["reco"].options[3].style.color=bC;
			if(ie5p&&enablePgnImport) { dc["reco"].options[8].style.color=bC; }
			else { dc["reco"].options[7].style.color=bC; }
			}
		//turn off input conversion
		gIn=false;

		}



	// look for query string
	if (!qFound){

			getQuery(true);

			// if position specified
			if (location.search){

				var qInfo="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
				if(qStr['pos']){qInfo=qStr['pos'];}
				qFound=true;

				// if panel preferences specified
				if (qStr['panels']){
					panels=qStr['panels'].split(",");

					var tabs=new Array("cog","vog","rog","mog","pog");
					for(j=0;j<5;j++){
						if(panels[j]=="false"){showP[j]=false;dog(tabs[j]+"-tab").click();}
						}

					dc["panels"].value=qStr['panels'];
					}

				// if last move specified
				if (qStr['last']){
					//findLastMove(qStr['last']);
					qsLast=qStr['last'];
					}

				// if recorded game input
				if (qStr['game']){
					storeQS=qStr['game'];

					//if last move is specified, set board to final position
					if(qStr['last']){
						firstLast=qStr['last'];
						//qInfo=qStr['finalpos'];
						}

					processGame(qStr['game']);
					}

				//if fixed alternative view specified
				if (qStr['view']){
					inputV=qStr['view'];
					}


				//if validation/display specified
				if (qStr['showLegal']){
						if (qStr['showLegal']=="true"){
							showLEGAL=true;
							dc["slm"].checked=true;
							}
						if (qStr['showLegal']=="false"){
							showLEGAL=false;
							dc["slm"].checked=false;
							}
						}
				if (qStr['blockIllegal']){
						if (qStr['blockIllegal']=="true"){
							blockILLEGAL=true;
							dc["dim"].checked=true;
							}
						if (qStr['blockIllegal']=="false"){
							blockILLEGAL=false;
							dc["dim"].checked=false;
							}
						}

				//show last position if specified
				if(firstLast!=""){
					//alert(flNum);
					qInfo=reco[(flNum+1)];
					//firstLast="";
					lgc=dog("logcell"+(flNum+1));
					if(showP[3]){
						dog("movetable").scrollTop=lgc.offsetTop-2;
						}
					lgc.style.backgroundColor=lC;
					lgc.style.color=dC;
					prvC=(flNum+1);
					}

				//display
				dc["start"].value=qInfo;
				dc["current"].value=qInfo;
				dc["entry"].value=qInfo;
				if(pla){allReset(false);}setP('custom');
				return false;
				}
		}


	// find if start position was specified
	if (exclude||layout==null||layout==""){return false;}


	// find last move
	findLastMove(lastmove);


	// write custom position to text field and initialise
	if (layout!="custom"&&layout!=""){
		if (moves>-1){return false;}
		var presetLayout=layout;
		dc["start"].value=presetLayout;
		dc["entry"].value=presetLayout;
		if(pla){allReset(false);}setP('custom');
		return false;
		}

	if (moves>-1){return false;}

	// bin numbers
	var ibb=0;var ibw=0;
	dc["vbb"].value=ibb;
	dc["vbw"].value=ibw;

	s=0;
	//extract basic position string
	var sInfo=dc["start"].value.split(" ");
	var sPos=sInfo[0];

	//compenate if extra FEN info is not there or fully there
	if(!sInfo[1]){
		sInfo[1]="w";
		VW=true;
		dc["vw"].value=VW;
		}

	//extra FEN information
	for(i=0;i<sInfo.length;i++){
		xDe[i]=sInfo[i];
		}
	xDe[4]=parseInt(xDe[4]);
	xDe[5]=parseInt(xDe[5]);
	//alert(xDe[1]+"\n"+xDe[2]+"\n"+xDe[3]+"\n"+xDe[4]+"\n"+xDe[5]);

	//FEN information to hidden form
	dc["ctm"].value=xDe[1];
	//castle status
	if(xDe[2].indexOf("K")!=-1){wCCr=true;}else{wCCr=false;}
	if(xDe[2].indexOf("Q")!=-1){wCCl=true;}else{wCCl=false;}
	if(xDe[2].indexOf("k")!=-1){bCCr=true;}else{bCCr=false;}
	if(xDe[2].indexOf("q")!=-1){bCCl=true;}else{bCCl=false;}
	dc["wccr"].value=wCCr;
	dc["bccr"].value=bCCr;
	dc["wccl"].value=wCCl;
	dc["bccl"].value=bCCl;
	dc["enp"].value=xDe[3];
	if(xDe[3]!="-"){
		for(xd=0;xd<sqn.length;xd++){
			if(xDe[3]==sqn[xd]){enpn=xd;}
			}
		}
	dc["hmc"].value=xDe[4];
	dc["fmc"].value=xDe[5];

	// add first position to game progress array
	if (moves<0){
		moves++;
		gaP[moves]=dc["start"].value;
		moves++;
		}


	// filter position string for slash, space and line breaks
	while ((sPos.indexOf("/")!=-1)||(sPos.indexOf(/[\ ]/g)!=-1)||(sPos.indexOf(/\n?\r?/g)!=-1)){
		sPos=sPos.replace('/','');
		sPos=sPos.replace(/[\ ]/g,'');
		sPos=sPos.replace(/\n?\r?/g,'');
		}


	// build name and position arrays - convert blank numbers into "X"s and filled squares into piece names
	for (i=0;i<sPos.length;i++){
		var st=sPos.charAt(i);
		var nt=Number(st);
		if(s<64){
			if ((nt*1)>=0){
				st=Number(st);
				//s=0;
				//alert(s+"-"+on[s]);
				for (ps=0;ps<st;ps++){
					xn[s]="X";
					//alert(on[s]);
					mp[s]=new Array(on[s][0],on[s][1]);
					s++;
					}
				}else{
				xn[s]=st;
				mp[s]=new Array(on[s][0],on[s][1]);
				var tpn=xn[s].toLowerCase();
				if (tpn!=xn[s]){xn[s]="w"+tpn;}
				alSt=alSt.replace('-'+xn[s],'');
				//alert(alSt);
				s++;
				}
			}
		}



	//build id arrays
	for (as=0;as<64;as++){
		pS[as]=document.getElementById("play"+as);
		pI[as]=document.getElementById("play"+as).firstChild;
		}


	var dObj=new Array;
	var stringValid=false;


	// if string is valid
	if (xn.length==64){
		// draw pieces
		for (i=0;i<64;i++){
			if (pn[i]!="X"){
				// set pieces
				pI[i].src=imgs[pn[i]].src;
				}
			}


		// enable form
		dc["op"].disabled=false;
		dc["sv"].disabled=false;
		stringValid=true;
		// shift pieces to start positions
		movePieces();
		// initialise event detection
		init();

		//single view switch
		if(inputV!=""){
			if(inputV=="b"&&!pla){dc["sv"].click();}
			}

		// enable reset function
		pla=true;

		//hide last position indicators if already visible
		if(lmS[0]&&lmS[0].style.visibility=="visible"){hideLastMove();lpdone=true;}

		//indicate last move
		if(qsLast!=""&&!lpdone){findLastMove(qsLast);}

		window.defaultStatus="Done";

		}else{
		dc["start"].value="Incorrect input string";
		window.defaultStatus="Incorrect input string";
		gaP[1]='';
		gaP[0]='';
		moves=-1;
		}

	}




// move pieces to start position once drawn
function movePieces(){

	// bin status
	var ibb=dc["vbb"].value;
	var ibw=dc["vbw"].value;

	for (i=0;i<64;i++){

		// if default location not the same as input location
		if(pn[i]!=xn[i]){

			// change image srcs if images can be swapped
			if (xn[i]!="X"){
				pI[i].src=imgs[xn[i]].src;
				// swap names
				var tempXN=xn[i];
				xn[i]=pn[i];
				pn[i]=tempXN;

				// or assign Xs if piece has been taken
				}else{
				pI[i].src=imgs["X"].src;
				pn[i]="X";
				}

			}
		}

	// compare arrays to find which pieces are in the bin
	var found=new Array;
	for (i=0;i<64;i++){
		found[i]=false;
		}

	for (j=0;j<64;j++){
		for (i=0;i<64;i++){
			if (!found[i]){
				if (Dfn[j]==pn[i]){
					Dfn[j]="f";
					found[i]=true;
					}
				}
			}
		}

	// reset bin pieces to blank
	for (i=0;i<16;i++){
		bI[i].src=imgs["X"].src;
		wI[i].src=imgs["X"].src;
		}


	// draw bin pieces
	for (i=0;i<64;i++){
		if (Dfn[i]!="f"){
			//alert(Dfn[i]+" - "+i);
			// white bin
			if (Dfn[i].indexOf("w")!=-1){
				if (wI[ibw]){wI[ibw].src=imgs[Dfn[i]].src;}
				bnw[ibw]=Dfn[i];
				ibw++;
				// black bin
				}else{
				if (bI[ibb]){bI[ibb].src=imgs[Dfn[i]].src;}
				bnb[ibb]=Dfn[i];
				ibb++;
				}

			}

		// show chess pieces
		pS[i].style.visibility="visible";
		}

	// write bin fullness to form
	var ibb=dc["vbb"].value=ibb;
	var ibw=dc["vbw"].value=ibw;


	// show bin pieces
	for (i=0;i<16;i++){
		bS[i].style.visibility="visible";wS[i].style.visibility="visible";
		}

	}







// reload page at different scale
function scaleReload(){
	if(!secu){dc["scale"].options[0].selected=true;return false;}
	var scrScale=dc["scale"].options[document.forms.chessform.scale.selectedIndex].value;
	var scrLoc='';
	var nQS=window.location.search.substr(1);
	nQS=nQS.replace("&size="+sqS,"");
	nQS=nQS.replace("&pieces="+pf.replace('/',''),"");
	nQS=nQS.replace("&showLegal="+showLEGAL,"");
	nQS=nQS.replace("&blockIllegal="+blockILLEGAL,"");
	nQS=nQS.replace("&view=b","");
	nQS=nQS.replace("&view=w","");
	nQS=nQS.replace("&panels="+dc['panels'].value,"");
	for(j=0;j<taNa.length;j++){
		nQS=nQS.replace("&"+taNa[j]+"="+taVa[j],"");
		}
	var colStr="&view=w";
	if(inputV=="b"){colStr="&view=b";}
	if(nQS){scrLoc=pageName+"?"+nQS+"&panels="+dc['panels'].value+"&size="+parseInt(squareSIZE*scrScale)+colStr+"&pieces="+pf.replace('/','')+"&showLegal="+showLEGAL+"&blockIllegal="+blockILLEGAL;}
	else{
		findPieceIds();
		var scrPos=dc["entry"].value;
		scrLoc=pageName+"?pos="+scrPos+"&panels="+dc['panels'].value+"&size="+parseInt(squareSIZE*scrScale)+colStr+"&pieces="+pf.replace('/','')+"&showLegal="+showLEGAL+"&blockIllegal="+blockILLEGAL;
		}
	for(j=0;j<taNa.length;j++){
		scrLoc+="&"+taNa[j]+"="+taVa[j];
		}
	self.document.location=scrLoc
	}




var dragokay=false;
var moveokay=false;
var movedone=false;

var activated=false;


function init(){
	if (!activated){
		document.onmousedown=mouseDown;
		document.onmousemove=mouseMove;
		document.onmouseup=mouseUp;
		document.ondblclick=changePiece;
		activated=true;
		}
	}


function doNothing(){}
function uninit(){
	document.onmousedown=doNothing;
	document.onmousemove=doNothing;
	document.onmouseup=doNothing;
	activated=false;
	}

var forced=false;



var ICOut = false;
//is the king in check
function isInCheck(selfSq) {
	
	//theoretical board position for validation
	if(selfSq) {
		//remove self square
		var aSqLen = aSq.length;
		for(i=0;i<aSqLen;i++){
			if(aSq[i]==selfSq) { 
				aSq.splice(i,1);
				}
			}
		window.status = aSq;
		
		aSqLen = aSq.length;
		for(i=0;i<aSqLen;i++){

			
			
			
			}		
		
		ICOut=false;
		}
	
	//generic "is king in check"
	else {
		//window.status = "generic";
		ICOut=true;
		}


	var asqLen = aSq.length;

	}



// change any square to any piece
function changePiece(){

	// check event came from the board
	var ckx=dc["kxinfo"].value;
	var cky=dc["kyinfo"].value;
	if ((ckx<on[0][0]||ckx>(on[7][0]+sqS)) || (cky<on[0][1]||cky>(on[63][1]+sqS))){return false;}

	// find piece id from hidden form
	var piece=dc["pieceid"].value;
	var cmName=prompt("Enter piece code","");
	// if invalid
	if (cmName==""||cmName==null) return false;
	// check if black or white
	var tempCM=cmName.toLowerCase();
	var iokay=false
	for (i=0;i<9;i++){if (tempCM==fpn[i]||tempCM=="x"){iokay=true;}}
	if(!iokay){
		return false;
		}else{
		if (tempCM=="x"){cmName="X";}
		else if (tempCM!=cmName){
			cmName="w"+tempCM;
			}
		}
	// change image and identity
	if(cmName=="X"){pI[piece].src=imgs["X"].src;}
	else{pI[piece].src=imgs[cmName].src;}
	pn[piece]=cmName;
	}






//to check if two pieces are the same color
var pAt=new Array;
var same=false;
function comC(scA,scB){
	same=false;
	if(scA.indexOf("g")!=-1){scA=scA.replace("g","w");}
	if(scA.indexOf("v")!=-1){scA=scA.replace("v","");}
	if(scA&&scB){
		if ((scA.indexOf("w")!=-1&&scB.indexOf("w")!=-1) || (scA.indexOf("w")!=-1&&scB.indexOf("v")!=-1) || (scA.indexOf("w")==-1&&scB.indexOf("w")==-1)){
			same=true;
			}
		}
	}




//automated comparisons
function com(aObj,bObj){
	if(pAt[bObj]&&pAt[bObj]!="X"){
		comC(aObj,pAt[bObj]);
		if(same){bObj=vmr;}
		}
	}




//find which moves are valid
var fakeView=false;
var showingValid=false;
var vmr=-1;var vpn=-1;var decn;
function findValidMoves(vmp,vmn,remote){

	pAt=new Array;

	//alert(vmp.offsetLeft);

	// get square id
	for (i=0;i<64;i++){
		// find square names
		if (vmp.style.pixelLeft==on[i][0]&&vmp.style.pixelTop==on[i][1]){
			vmr=i;
			}


		//check each square for a piece
		for (j=0;j<64;j++){
			// find all board objects
			if (pS[j].style.pixelLeft==on[i][0]&&pS[j].style.pixelTop==on[i][1]){
				pAt[i]=pn[j];
				}
			}
		}

	dc["vr"].value=vmr+"-"+vmn;

	//validations
	var sqR;
	var sqm;
	var vc=0;
	var vd=false;

	fakeView=false;

	if(dc["vw"].value=="false"){
		fakeView=true;
		if(vmn.indexOf("w")!=-1){vmn=vmn.replace("w","");vmn="g"+vmn;}
		else{vmn="v"+vmn;}
		}

	//white pawn
	if(vmn=="wp"||vmn=="vp"){
		sqR=new Array(vmr);
		if(sqid[vmr][0]==6){
			sqR=new Array(vmr);
			sqR[2]=vmr-7;
			if(pAt[sqR[2]]=="X"||(sqid[sqR[2]]&&sqid[sqR[2]][0]==sqid[vmr][0])){sqR[2]=vmr;}
			else{comC(vmn,pAt[sqR[2]]);if(same){sqR[2]=vmr;}}
			sqR[3]=vmr-9;
			if(pAt[sqR[3]]=="X"||(sqid[sqR[3]]&&sqid[sqR[3]][0]==sqid[vmr][0])){sqR[3]=vmr;}
			else{comC(vmn,pAt[sqR[3]]);if(same){sqR[3]=vmr;}}
			sqR[1]=vmr-8;
			if(pAt[sqR[1]]!="X"){sqR[1]=vmr;}
			else{
				sqR[4]=vmr-16;
				if(pAt[sqR[4]]!="X"){sqR[4]=vmr;}
				}
			}
		else if(sqid[vmr][0]<6){
			sqR=new Array(vmr);
			sqR[2]=vmr-7;
			if(pAt[sqR[2]]=="X"||(sqid[sqR[2]]&&sqid[sqR[2]][0]==sqid[vmr][0])){sqR[2]=vmr;}
			else{comC(vmn,pAt[sqR[2]]);if(same){sqR[2]=vmr;}}
			sqR[3]=vmr-9;
			if(pAt[sqR[3]]=="X"||(sqid[sqR[3]]&&sqid[sqR[3]][0]==sqid[vmr][0])){sqR[3]=vmr;}
			else{comC(vmn,pAt[sqR[3]]);if(same){sqR[3]=vmr;}}
			sqR[1]=vmr-8;
			if(pAt[sqR[1]]!="X"){sqR[1]=vmr;}
			}
		for(j=0;j<sqR.length;j++){
			if(String(parseInt(sqR[j]/8))!="NaN"){
				if((parseInt(vmr/8)-parseInt(sqR[j]/8))>1){if((vmr-sqR[j])!=16){sqR[j]=vmr;}}
				}
			}
		//en-passent square
		decn=dc["enp"].value;
		if(decn!="-"){
			epn=sqp[decn][1];
			if(fakeView){epn=63-epn;}
			if((epn>=16&&epn<=23)&&(vmr>=24&&vmr<=31)&&(vmr==(epn+9)||vmr==(epn+7))){sqR[sqR.length]=epn;}
			}else{
			epn=-1;
			}
		}
	//black pawn
	if(vmn=="p"||vmn=="gp"){
		sqR=new Array(vmr);
		if(sqid[vmr][0]==1){
			sqR=new Array(vmr);
			sqR[2]=vmr+7;
			if(pAt[sqR[2]]=="X"||(sqid[sqR[2]]&&sqid[sqR[2]][0]==sqid[vmr][0])){sqR[2]=vmr;}
			else{comC(vmn,pAt[sqR[2]]);if(same){sqR[2]=vmr;}}
			sqR[3]=vmr+9;
			if(pAt[sqR[3]]=="X"||(sqid[sqR[3]]&&sqid[sqR[3]][0]==sqid[vmr][0])){sqR[3]=vmr;}
			else{comC(vmn,pAt[sqR[3]]);if(same){sqR[3]=vmr;}}
			sqR[1]=vmr+8;
			if(pAt[sqR[1]]!="X"){sqR[1]=vmr;}
			else{
				sqR[4]=vmr+16;
				if(pAt[sqR[4]]!="X"){sqR[4]=vmr;}
				}
			}
		else if(sqid[vmr][0]>1){
			sqR=new Array(vmr);
			sqR[2]=vmr+7;
			if(pAt[sqR[2]]=="X"||(sqid[sqR[2]]&&sqid[sqR[2]][0]==sqid[vmr][0])){sqR[2]=vmr;}
			else{comC(vmn,pAt[sqR[2]]);if(same){sqR[2]=vmr;}}
			sqR[3]=vmr+9;
			if(pAt[sqR[3]]=="X"||(sqid[sqR[3]]&&sqid[sqR[3]][0]==sqid[vmr][0])){sqR[3]=vmr;}
			else{comC(vmn,pAt[sqR[3]]);if(same){sqR[3]=vmr;}}
			sqR[1]=vmr+8;
			if(pAt[sqR[1]]!="X"){sqR[1]=vmr;}
			}
		for(j=0;j<sqR.length;j++){
			if(String(parseInt(sqR[j]/8))!="NaN"){
				if((parseInt(sqR[j]/8)-parseInt(vmr/8))>1){if((sqR[j])-vmr!=16){sqR[j]=vmr;}}
				}
			}
		//en-passent square
		decn=dc["enp"].value;
		if(decn!="-"){
			epn=sqp[decn][1];
			if(fakeView){epn=63-epn;}
			if((epn>=40&&epn<=47)&&(vmr>=32&&vmr<=39)&&(vmr==(epn-9)||vmr==(epn-7))){sqR[sqR.length]=epn;}
			}else{
			epn=-1;
			}
		}
	//knight
	if(vmn=="n"||vmn=="gn"||vmn=="wn"||vmn=="vn"){
		sqR=new Array(vmr,vmr);
		for(j=0;j<(6-sqid[vmr][1]);j++){
			sqR[2]=vmr-6;
			com(vmn,sqR[2]);
			sqR[3]=vmr+10;
			com(vmn,sqR[3]);
			}
		for(j=0;j<(sqid[vmr][1]-1);j++){
			sqR[4]=vmr+6;
			com(vmn,sqR[4]);
			sqR[5]=vmr-10;
			com(vmn,sqR[5]);
			}
		for(j=0;j<(6-sqid[vmr][0]);j++){
			for(k=0;k<(7-sqid[vmr][1]);k++){
				sqR[6]=vmr+17;
				com(vmn,sqR[6]);
				}
			for(k=0;k<(sqid[vmr][1]);k++){
				sqR[7]=vmr+15;
				com(vmn,sqR[7]);
				}
			}
		for(j=0;j<(sqid[vmr][0]-1);j++){
			for(k=0;k<(7-sqid[vmr][1]);k++){
				sqR[8]=vmr-15;
				com(vmn,sqR[8]);
				}
			for(k=0;k<(sqid[vmr][1]);k++){
				sqR[9]=vmr-17;
				com(vmn,sqR[9]);
				}
			}
		}
	//king
	if(vmn=="wk"||vmn=="vk"||vmn=="k"||vmn=="gk"){
		//alert(sqid[vmr]);
		//(row,column)
		sqR=new Array(vmr,vmr);
		for(j=0;j<sqid[vmr][1];j++){
			if(sqid[(vmr-1)]&&(sqid[vmr][1]-sqid[(vmr-1)][1]==1)){
				sqR[2]=vmr-1;
				com(vmn,sqR[2]);
				}
			if(sqid[(vmr-9)]&&(sqid[vmr][1]-sqid[(vmr-9)][1]==1&&sqid[vmr][0]-sqid[(vmr-9)][0]==1)){
				sqR[3]=vmr-9;
				com(vmn,sqR[3]);
				}
			}
		for(j=0;j<(7-sqid[vmr][1]);j++){
			if(sqid[(vmr+1)]&&(sqid[(vmr+1)][1]-sqid[vmr][1]==1)){
				sqR[4]=vmr+1;
				com(vmn,sqR[4]);
				}
			if(sqid[(vmr+9)]&&(sqid[(vmr+9)][1]-sqid[vmr][1]==1&&sqid[(vmr+9)][0]-sqid[vmr][0]==1)){
				sqR[5]=vmr+9;
				com(vmn,sqR[5]);
				}
			}
		for(j=0;j<sqid[vmr][0];j++){
			if(sqid[(vmr-8)]&&(sqid[vmr][0]-sqid[(vmr-8)][0]==1)){
				sqR[6]=vmr-8;
				com(vmn,sqR[6]);
				}
			if(sqid[(vmr-7)]&&(sqid[vmr][0]-sqid[(vmr-7)][0]==1&&sqid[(vmr-7)][1]-sqid[vmr][1]==1)){
				sqR[7]=vmr-7;
				com(vmn,sqR[7]);
				}
			}
		for(j=0;j<(7-sqid[vmr][0]);j++){
			if(sqid[(vmr+8)]&&(sqid[(vmr+8)][0]-sqid[vmr][0]==1)){
				sqR[8]=vmr+8
				com(vmn,sqR[8]);
				}
			if(sqid[(vmr+7)]&&(sqid[vmr][1]-sqid[(vmr+7)][1]==1&&sqid[(vmr+7)][0]-sqid[vmr][0]==1)){
				sqR[9]=vmr+7
				com(vmn,sqR[9]);
				}
			}
		var caq=new Array(60,4);
		var pccd=new Array(wCCr,wCCl,bCCr,bCCl);
		if(fakeView){
			caq=new Array(59,3);
			pccd=new Array(bCCl,bCCr,wCCl,wCCr);
			}
		if(vmr==caq[0]){
			if(pccd[0]){sqR[10]=vmr+2;}
			if(pccd[1]){sqR[11]=vmr-2;}
			}
		if(vmr==caq[1]){
			if(pccd[2]){sqR[12]=vmr+2;}
			if(pccd[3]){sqR[13]=vmr-2;}
			}
		}
	//rook and queen
	if(vmn=="vr"||vmn=="wr"||vmn=="r"||vmn=="gr"||vmn=="wq"||vmn=="vq"||vmn=="q"||vmn=="gq"){
		sqR=new Array(vmr);
		sqm=1;
		vd=false;vc=0;
		for(j=0;j<sqid[vmr][1];j++){
			sqR[sqm]=vmr-(j+1);
			if(vc==0){
				comC(vmn,pAt[sqR[sqm]]);
				}
			if(!vd&&pAt[sqR[sqm]]&&pAt[sqR[sqm]]!="X"){
				if(same){vc=2;}
				else{vc=1;}
				vd=true;
				}
			if(vc==2){vc=0;vd=false;break;}
			if(vc==1){vc=2;}
			sqm++;
			}
		vd=false;vc=0;
		for(j=0;j<(7-sqid[vmr][1]);j++){
			sqR[sqm]=vmr+(j+1);
			if(vc==0){
				comC(vmn,pAt[sqR[sqm]]);
				}
			if(!vd&&pAt[sqR[sqm]]&&pAt[sqR[sqm]]!="X"){
				if(same){vc=2;}
				else{vc=1;}
				vd=true;
				}
			if(vc==2){vc=0;vd=false;break;}
			if(vc==1){vc=2;}
			sqm++;
			}
		vd=false;vc=0;
		for(j=0;j<sqid[vmr][0];j++){
			sqR[sqm]=vmr-((j+1)*8);
			if(vc==0){
				comC(vmn,pAt[sqR[sqm]]);
				}
			if(!vd&&pAt[sqR[sqm]]&&pAt[sqR[sqm]]!="X"){
				if(vmn.indexOf("q")!=-1){
					if(same){
						if(sqid[vmr][0]==7){vc=1;}
						else{vc=2;}
						}
					}
				if(vmn.indexOf("r")!=-1){
					if(sqid[vmr][0]==7){
						break;
						}
					else if(same){
						{vc=2;}
						}
					else{
						vc=1;
						}
					}
				else{vc=1;}
				vd=true;
				}
			if(vc==2){vc=0;vd=false;break;}
			if(vc==1){vc=2;}
			sqm++;
			}

		vd=false;vc=0;
		for(j=0;j<(7-sqid[vmr][0]);j++){
			sqR[sqm]=vmr+((j+1)*8)
			if(vc==0){
				comC(vmn,pAt[sqR[sqm]]);
				}
			if(!vd&&pAt[sqR[sqm]]&&pAt[sqR[sqm]]!="X"){
				if(same||vmn.indexOf("r")!=-1){vc=2;}
				else{vc=1;}
				vd=true;
				}
			if(vc==2){vc=0;vd=false;break;}
			if(vc==1){vc=2;}
			sqm++;
			}

		}
	//bishop and queen
	if(vmn=="wb"||vmn=="vb"||vmn=="b"||vmn=="gb"||vmn=="wq"||vmn=="vq"||vmn=="q"||vmn=="gq"){
		if(vmn=="wb"||vmn=="vb"||vmn=="b"||vmn=="gb"){
			sqR=new Array(vmr);
			sqm=1;
			}
		vd=false;vc=0;
		for(j=0;j<sqid[vmr][1];j++){
			sqR[sqm]=vmr-(j+1)-(8*(j+1));
			if(vc==0){
				comC(vmn,pAt[sqR[sqm]]);
				}
			if(!vd&&pAt[sqR[sqm]]&&pAt[sqR[sqm]]!="X"){
				if(same){vc=2;}
				else{vc=1;}
				vd=true;
				}
			if(vc==2){vc=0;vd=false;break;}
			if(vc==1){vc=2;}
			sqm++;
			}
		vd=false;vc=0;
		for(j=0;j<(7-sqid[vmr][1]);j++){
			sqR[sqm]=vmr+(j+1)+(8*(j+1));
			if(vc==0){
				comC(vmn,pAt[sqR[sqm]]);
				}
			if(!vd&&pAt[sqR[sqm]]&&pAt[sqR[sqm]]!="X"){
				if(same){vc=2;}
				else{vc=1;}
				vd=true;
				}
			if(vc==2){vc=0;vd=false;break;}
			if(vc==1){vc=2;}
			sqm++;
			}

		vd=false;vc=0;
		for(j=0;j<sqid[vmr][1];j++){
			sqR[sqm]=vmr+((j+1)*8)-(j+1);
			if(vc==0){
				comC(vmn,pAt[sqR[sqm]]);
				}
			if(!vd&&pAt[sqR[sqm]]&&pAt[sqR[sqm]]!="X"){
				if(same){vc=2;}
				if(sqid[vmr][1]==7){vc=2;}else{vc=1;}
				vd=true;
				}
			if(vc==2){vc=0;vd=false;break;}
			if(vc==1){vc=2;}
			sqm++;
			}
		vd=false;vc=0;
		for(j=0;j<(7-sqid[vmr][1]);j++){
			sqR[sqm]=vmr-((j+1)*8)+(j+1);
			if(vc==0){
				comC(vmn,pAt[sqR[sqm]]);
				}
			if(!vd&&pAt[sqR[sqm]]&&pAt[sqR[sqm]]!="X"){
				vc=2;
				vd=true;
				}
			if(vc==2){vc=0;vd=false;break;}
			if(vc==1){vc=2;}
			sqm++;
			}
		}



	//compile valid moves
	if(sqR&&sqR.length>=1){

		tVal=new Array;
		tNVal=new Array;
		for(i=0;i<sqR.length;i++){
			if(sq[sqR[i]]&&pAt[sqR[i]]){

				//alert(pAt[sqR[i]]);

				//store values
				tVal[i]=sqR[i];
				tNVal[i]="*";

				//king cannot be a target square
				if(pAt[sqR[i]].indexOf("k")!=-1){
					tNVal[i]=tVal[i];
					tVal[i]="*";
					}

				//final check for same-color pieces
				if(pAt[sqR[i]]!="X"){
					comC(vmn,pAt[sqR[i]]);
					if(same){
						tNVal[i]=tVal[i];
						tVal[i]="*";
						}
					}

				}
			}


		//store aSq for validation
		aSq=new Array;
		var sASQ=new Array;
		var asn=0;

		for(i=0;i<sqR.length;i++){
			if(sq[sqR[i]]){
				//find markers
				if(tVal[i]!="*"){
					if(ato){
						comC(vmn,dc["ctm"].value);
						if(!same){tVal[i]="*";}
						}
					aSq[asn]=tVal[i];
					sASQ[asn]=tVal[i];
					asn++;
					}
				}
			}
		aSq[asn]=vmr;
		
		
		//final output
		//dc["ant"].value=aSq;
		
		//would king be in check
		if(vmn=="wk"||vmn=="vk"||vmn=="k"||vmn=="gk"){ isInCheck(vmr); }


		//show markers
		for(i=0;i<sqR.length;i++){
			if(sq[sqR[i]]){
				//show markers
				if(showLEGAL&&tVal[i]!="*"){
					if(sq[tVal[i]]){sq[tVal[i]].style.visibility="visible";}
					}
				}
			}




		//alert(tVal);
		showingValid=true;
		return aSq;

		if(remote) {
			alert(aSq);

			}

		}
	return false;
	}







function hideValidMoves(){
	if(showingValid){
		for(i=0;i<64;i++){
			sq[i].style.visibility="hidden";
			}
		showingValid=false;
		}
	}







function mouseDown(e){

	// hide last move indicators
	hideLastMove()

	// filter mouse button and find mouse position
	if (event.button!=1) return true;
	var x=event.x;
	var y=event.y;
	// store initial mouse location
	dc["kxinfo"].value=x;
	dc["kyinfo"].value=y;
	// find piece id from hidden form
	var piece=dc["pieceid"].value;
	var group=dc["info"].value;
	// verify its a piece and find inital location

	if ((group.indexOf("X")==-1)&&(group.indexOf("-")!=-1)){

		// if main board piece
		var tempId=pS[piece];

		//find/show valid moves
		if(showLEGAL||blockILLEGAL){
			if (group.indexOf("play")!=-1){
				findValidMoves(pS[piece],pn[piece]);
				}
			}

		// if white bin piece
		if (group.indexOf("binw")!=-1){

			if(blockILLEGAL) { dc["dim"].click(); }

			// clear bin space
			var tempId=wS[piece];
			wI[piece].src=imgs["X"].src;
			// look for blank board piece to swap it with
			var foundSpace=false;
			for (i=0;i<64;i++){
				if (!foundSpace){
					// swap identities and write to form
					if (pn[i]=="X"){
						pI[i].src=imgs[bnw[piece]].src;
						pn[i]=bnw[piece];
						xn[i]=bnw[piece];
						pS[i].style.left=pp[i][0];
						pS[i].style.top=pp[i][1];
						dc["info"].value="play"+i+" - "+i;
						dc["pieceid"].value=i;
						forced=true;
						foundSpace=true;
						}
					}
				}
			bnw[piece]="X";
			}

		// if black bin piece
		if (group.indexOf("binb")!=-1){

			if(blockILLEGAL) { dc["dim"].click(); }

			// clear bin space
			var tempId=bS[piece];
			bI[piece].src=imgs["X"].src;
			// look for blank board piece to swap it with
			var foundSpace=false;
			for (i=0;i<64;i++){
				if (!foundSpace){
					// swap identities and write to form
					if (pn[i]=="X"){
						pI[i].src=imgs[bnb[piece]].src;
						pn[i]=bnb[piece];
						xn[i]=bnb[piece];
						pS[i].style.left=pp[i][0];
						pS[i].style.top=pp[i][1];
						dc["info"].value="play"+i+" - "+i;
						dc["pieceid"].value=i;
						var tempI=i;
						forced=true;
						foundSpace=true;
						}
					}
				}
			bnb[piece]="X";
			}

		// store initial mouse positions
		sx=x-(tempId.offsetLeft);sy=y-(tempId.offsetTop);

		if(ie5p&&shadowCOLOR!=""){
			if(tempId.firstChild.filters[0]){
				tempId.firstChild.filters[0].enabled=true;
				tempId.style.left=x-sx-1;
				tempId.style.top=y-sy-1;
				}
			}

		// approve dragging
		movedone=false;
		dragokay=true;
		}
	return true;
	}



function mouseMove(e){

	// reset for bin piece transfer
	if (forced){return false;}

	// find mouse position
	var x=event.x;
	var y=event.y;

	if(ie5p&&shadowCOLOR!=""){x--;y--;}

	// find piece id from hidden form
	var piece=dc["pieceid"].value;
	// move piece and raise z order
	var group=dc["info"].value;
	var tempId=pS[piece];
	// if dragging is approved
	if (dragokay&&((group.indexOf("X")==-1)&&(group.indexOf("-")!=-1))){
		tempId.style.zIndex+=20;
		tempId.style.left=x-sx;
		tempId.style.top=y-sy;
		}
	return false
	}

var	n=0;
var outString=new Array;





// build output string array
function addToOutputString(obGroup){

	// find src of object at each location
	outString[n]=obGroup.src.replace(".gif","");

	// convert to name code
	var fk0=outString[n].charAt((outString[n].length-2));
	var fk1=outString[n].charAt((outString[n].length-1));
	outString[n]=fk0+fk1;
	if (outString[n].indexOf("/")!=-1){outString[n]=outString[n].replace("/","");}

	}


var oString;


//convert "X"s to number
var Xfs="";var fs="";
function convertX(Xfs){

	Xfs=Xfs.replace(/XXXXXXXX/g,'8');
	Xfs=Xfs.replace(/XXXXXXX/g,'7');
	Xfs=Xfs.replace(/XXXXXX/g,'6');
	Xfs=Xfs.replace(/XXXXX/g,'5');
	Xfs=Xfs.replace(/XXXX/g,'4');
	Xfs=Xfs.replace(/XXX/g,'3');
	Xfs=Xfs.replace(/XX/g,'2');
	Xfs=Xfs.replace(/X/g,'1');

	fs=Xfs;
	}



// convert output string to standard format
function convertOutputString(oString,writeForm,doSwitch,manualS,fr,cdo,tno,ccd){

		// convert to standard format
		var finalString='';


		//invert output string for black viewpoint
		if(!VW){oString.reverse();}

		// convert white piece names
		for (i=0;i<64;i++){
				var chr=oString[i];
				if (chr.indexOf("w")!=-1){
					chr=chr.replace("w","");
					oString[i]=chr.toUpperCase();
					}
			}

		// add slashes
		for (i=0;i<64;i++){
			finalString+=oString[i];
			if (i==7||i==15||i==23||i==31||i==39||i==47||i==55){finalString+="/";}
			}

		// convert "X"s to number
		convertX(finalString);
		finalString=fs;

		//check castling availability
		var ccStr='';
		if(wCCr){ccStr+="K";}
		if(wCCl){ccStr+="Q";}
		if(bCCr){ccStr+="k";}
		if(bCCl){ccStr+="q";}
		if(ccStr==''){ccStr='-';}
		xDe[2]=ccStr;

		//add extra FEN information to output string
		finalString+=" "+xDe[1]+" "+xDe[2]+" "+xDe[3]+" "+xDe[4]+" "+xDe[5];

		//recorded output
		if(ato&&!manualS){

			//get rNum from form
			rNum=parseInt(dc["gp"].value)+1;
			reco.length=rNum;
			moL.length=rNum-1;
			moC.length=rNum-1;
			gIn=false;
			reco[rNum]=finalString;
			dc["start"].value=reco[rNum];
			dc["current"].value=reco[rNum];
			dc["gp"].value=rNum;
			star="";

			prvC=rNum;

			dc["ant"].value="";
			if(annt[rNum]&&annt[rNum]!=""){star="*";dc["ant"].value=annt[rNum];}

			if(rNum>0){
				dc["reco"].options[1].style.color=bC;
				dc["reco"].options[2].style.color=bC;
				dc["reco"].options[3].style.color=bC;
				if(ie5p&&enablePgnImport) { dc["reco"].options[8].style.color=bC; }
				else { dc["reco"].options[7].style.color=bC; }
				}

			var gpVal=rNum/2;
			if(parseFloat(gpVal)!=parseInt(gpVal)){gpVal=Math.round(gpVal);gpVal+=".";}
			else{if(gpVal>0){gpVal+="..";}else{gpVal="..";}}
			var lsNum=Math.round((reco.length-1)/2);if(lsNum==0){lsNum="..";}


			dc["gpv"].value=gpVal+star+" /"+lsNum;

			//increase log array number
			rNum++;
			}

		//manual output
		if (writeForm){
			if(manualS){dc["current"].value=finalString;}
			}else if(!gIn){
			moC[loN]=finalString;
			}
		moves++;




	}



// game progress array;
var gameWin;

// find location of objects and produce output string
function findPieceIds(manS){

if (moves>-1){
		n=0;
		outString=new Array;

		// find page location to extract image src
		var ddl=document.location.href;

		// find all objects
		for (i=0;i<64;i++){
			for (j=0;j<64;j++){
				// check main board objects
				if (pS[j].style.pixelLeft==on[i][0]&&pS[j].style.pixelTop==on[i][1]){
					addToOutputString(pI[j]);
					}
				}
			n++;
			}

		convertOutputString(outString,true,false,manS);
		}
	}






// validate move
function validateMove(vmx,vmy,vcd,vp,vg){


// manual move into bin

	if (vcd<16){

		// put it in the bin
		var ibb=dc["vbb"].value;
		var ibw=dc["vbw"].value;

		// if piece is close to a black bin square and is black
		if ((pn[vp].indexOf("w")==-1) && ((vmx>(bb[cd][0]-prx)&&vmx<(bb[cd][0]+prx))&&(vmy>(bb[cd][1]-prx)&&vmy<(bb[cd][1]+prx)))){

			var biS=false;
			if (ibb>=16){
				blF=true;
				for (d=0;d<16;d++){
					if (!biS){if (bnb[d]=="X"){ibb=d;biS=true;}}
					}
				if(d==16&&biS==false){
					return false;
					}
				}
			bI[ibb].src=imgs[pn[vp]].src;
			bnb[ibb]=pn[vp];
			pI[vp].src=imgs["X"].src;
			pn[vp]="X";
			if (!blF){ibb++;}else{ibb=16;}
			}

		// if piece is close to a white bin square and is white
		if ((pn[vp].indexOf("w")!=-1) && ((vmx>(bw[cd][0]-prx)&&vmx<(bw[cd][0]+prx))&&(vmy>(bw[cd][1]-prx)&&vmy<(bw[cd][1]+prx)))){

			var biS=false;
			if (ibw>=16){
				whF=true;
				for (d=0;d<16;d++){
					if (!biS){if (bnw[d]=="X"){ibw=d;biS=true;}}
					}
				if(d==16&&biS==false){
					return false;
					}
				}
			wI[ibw].src=imgs[pn[vp]].src;
			bnw[ibw]=pn[vp];
			pI[vp].src=imgs["X"].src;
			pn[vp]="X";
			if (!whF){ibw++;}else{ibw=16;}
			}

		dc["vbb"].value=ibb;
		dc["vbw"].value=ibw;

		}


// normal move

	// if piece is close to another square
	if ((vmx>(pp[cd][0]-prx)&&vmx<(pp[cd][0]+prx))&&(vmy>(pp[cd][1]-prx)&&vmy<(pp[cd][1]+prx))){

		// if landing piece is not the same color or blank
		if ((pn[vcd]!="X"&&pn[vp]!="X") &&  (((pn[vcd].indexOf("w")!=-1)&&(pn[vp].indexOf("w")!=-1))||((pn[vcd].indexOf("w")==-1)&&(pn[vp].indexOf("w")==-1)))){
			moveokay=false;
			}else{
			moveokay=true;

			//block invalid moves
			if(blockILLEGAL){
				// find square
				var newRef;
				for (i=0;i<64;i++){
					if (pp[vcd][0]==on[i][0]&&pp[vcd][1]==on[i][1]){
						newRef=i;
						}
					}

				var itsOkay=false;

				for(j=0;j<aSq.length;j++){
					if(newRef==aSq[j]){itsOkay=true;}
					}

				if(itsOkay){
					moveokay=true;
					var tvcd=sqn[vcd];
					sqn[vcd]=sqn[vp];
					sqn[vp]=tvcd;
					}else{
					moveokay=false;
					}
				}


			//whose turn is it
			if((xDe[1]=="w"&&pn[vp].indexOf("w")==-1)||(xDe[1]=="b"&&pn[vp].indexOf("w")!=-1)){
				if(ato){moveokay=false;}
				}

			}
		}else{
		moveokay=false;
		}
	}





// reassign ids after move
function reassignIDs(){
	dc["largetext"].value=pp;

	}




// ** set and read cookie by Ronnie.T.Moore - http://javascript.internet.com/
var expDays,expDate;
function getExpiry(eNum){
expDays=eNum;
expDate=new Date();
expDate.setTime(expDate.getTime()+ (24 * 60 * 60 * 1000 * expDays));
return expDate
}
function getCookieVal (offset){
var endstr=document.cookie.indexOf (";", offset);
if (endstr==-1)
endstr=document.cookie.length;
return unescape(document.cookie.substring(offset, endstr));
}
function GetCookie (name){
var arg=name+"=";
var alen=arg.length;
var clen=document.cookie.length;
var i=0;
while (i < clen){
var j=i+alen;
if (document.cookie.substring(i, j)==arg)
return getCookieVal (j);
i=document.cookie.indexOf(" ", i)+1;
if (i==0) break;
}
return null;
}

function SetCookie (name, value){
var argv=SetCookie.arguments;
var argc=SetCookie.arguments.length;
var expires=(argc > 2) ? argv[2] : null;
var path=(argc > 3) ? argv[3] : null;
var domain=(argc > 4) ? argv[4] : null;
var secure=(argc > 5) ? argv[5] : false;
document.cookie=name+"="+escape (value)+
((expires==null) ? "" : (";expires="+expires.toGMTString()))+
((path==null) ? "" : (";path="+path))+
((domain==null) ? "" : (";domain="+domain))+
((secure==true) ? ";secure" : "");
}
//************************************************************************************



//create line breaks to restrict line lengths
var ohtm=true;
if(outputToNotepad){ohtm=false;}
var lenInfo,tempLen;
function checkLen(lenData){
	var ln=75;if(ohtm){ln=150;}
	//alert(lenInfo.length);
	if(lenInfo.length>ln){
		if(ohtm){tempLen="<br>"+tempLen;}
		else{tempLen="\n"+tempLen;}
		if(ohtm){tempLen=tempLen.replace("&nbsp;","");}
		else{tempLen=tempLen.replace(" ","");}
		lenInfo="";
		}

	}


// create log export
var fenWin,outputWindow,EXPobj;
function generateExport(expFrom){
	outputWindow=false;
	EXPobj=new Array;

	if(expFrom=="fen"){
		if(moC.length<1){return false;}
		//check array is full
		var logFull=true;
		for(f=0;f<moC.length;f++){
			if(!moC[f]||moC[f]==""){logFull=false;}
			}
		if(gIn&&!logFull){return false;}

		//compile output
		for(i=0;i<reco.length;i++){
			EXPobj[i]="";
			if(i==0){
				for(j=0;j<taNa.length;j++){
					if(ohtm){EXPobj[i]+="<tr><td><font color='#000066' face=verdana size=2>";}
					EXPobj[i]+="["+taNa[j]+" \""+taVa[j]+"\"]";
					if(ohtm){EXPobj[i]+="</td></tr>";}
					else{EXPobj[i]+="\n";}
					}
				if(ohtm){EXPobj[i]+="<tr><td><br></td></tr>";}
				else{EXPobj[i]+="\n";}
				}
		else{
			if(ohtm){EXPobj[i]+="<tr><td><font color='#000066' face=verdana size=2>";}
				EXPobj[i]+=reco[i];
				if(annt[i]){
					if(ohtm){
						EXPobj[i]+="&nbsp;</font>";
						}else{
						EXPobj[i]+=" ";
						}
					if(ohtm){EXPobj[i]+="<font color='#993333' face=verdana size=2>";}
					EXPobj[i]+="{"+annt[i]+"}";
					if(ohtm){EXPobj[i]+="</font>";}
					}
				else{
					if(ohtm){EXPobj[i]+="</td><td>&nbsp;";}
					else{EXPobj[i]+=" ";}
					}
				if(ohtm){EXPobj[i]+="</td></tr>";}
				else{EXPobj[i]+="\n";}
				}
			}
		if(ohtm){outputWindow=true;}
		else{outputWindow=false;}
		}

	if(expFrom=="smith"){

		var logObj=moL;

		if(logObj.length<1){return false;}
		//check array is full
		var logFull=true;
		for(f=0;f<logObj.length;f++){
			if(!logObj[f]||logObj[f]==""){logFull=false;}
			}
		if(gIn&&!logFull){return false;}

		//compile output
		var fCount=1;
		lenInfo="";
		for(i=0;i<logObj.length;i++){
			EXPobj[i]="";
			if(i==0){
				for(j=0;j<taNa.length;j++){
					if(ohtm){EXPobj[i]+="<tr><td><font color='#000066' face=verdana size=2>";}
					EXPobj[i]+="["+taNa[j]+" \""+taVa[j]+"\"]";
					if(ohtm){EXPobj[i]+="</td></tr>";}
					else{EXPobj[i]+="\n";}
					}
				if(ohtm){EXPobj[i]+="<tr><td><br></td></tr>";}
				else{EXPobj[i]+="\n";}
				}
			else{
				if(i==1){
					if(ohtm){EXPobj[i]+="<tr><td><font color='#000066' face=verdana size=2>";}
					if(ohtm){tempLen=fCount+".&nbsp;"+logObj[(i-1)];}
					else{tempLen=fCount+". "+logObj[(i-1)];}
					lenInfo+=tempLen;
					checkLen(lenInfo);
					EXPobj[i]+=tempLen;
					if(ohtm){EXPobj[i]+="</font>";}
					if(annt[i]){
						if(ohtm){EXPobj[i]+="<font color='#993333' face=verdana size=2>";}
						tempLen="{"+annt[i]+"}"
						lenInfo+=tempLen;
						checkLen(lenInfo);
						EXPobj[i]+=tempLen;
						if(ohtm){EXPobj[i]+="</font>";}
						}
					}
				if((i>0&&parseInt(i/2)==i/2)||annt[i]){
					if(i>0&&parseInt(i/2)==i/2){fCount++;}
					if(ohtm){EXPobj[i]+="<font color='#000066' face=verdana size=2>";}
					if(ohtm){tempLen="&nbsp;"+fCount+".";}
					else{tempLen=" "+fCount+".";}
					if((parseInt(i/2)!=i/2)&&annt[i]){tempLen+="..";}
					lenInfo+=tempLen
					checkLen(lenInfo);
					EXPobj[i]+=tempLen;
					//if((parseInt(i/2)!=i/2)&&annt[i]){EXPobj[i]+="..";}
					if(ohtm){EXPobj[i]+="</font>";}
					}
				if(ohtm){EXPobj[i]+="<font color='#000066' face=verdana size=2>";}
				if(ohtm){tempLen="&nbsp;"+logObj[i];}
				else{tempLen=" "+logObj[i];}
				lenInfo+=tempLen
				checkLen(lenInfo);
				EXPobj[i]+=tempLen;
				if(ohtm){EXPobj[i]+="</font>";}
				if(annt[(i+1)]){
					if(ohtm){EXPobj[i]+="<font color='#993333' face=verdana size=2>";}
					tempLen="{"+annt[(i+1)]+"}";
					lenInfo+=tempLen;
					checkLen(lenInfo);
					EXPobj[i]+=tempLen;
					if(ohtm){EXPobj[i]+="</font>";}
					}
				if(i==(logObj.length-1)){
					if(ohtm){EXPobj[i]+="</td></tr>";}
					}
				}


			}
		if(ohtm){outputWindow=true;}
		else{outputWindow=false;}
		}

	if(expFrom=="query"){
		if(reco.length<=1){return false;}
		//check array is full
		var logFull=true;
		for(f=0;f<moL.length;f++){
			if(!moL[f]||moL[f]==""||!moC[f]||moC[f]==""){logFull=false;}
			}
		if(gIn&&!logFull){return false;}

		//compile output
		var colStr="&view=w";
		if(inputV=="b"){colStr="&view=b";}
		EXPobj[i]="";

		if(ohtm){
			EXPobj[i]+='<p><font size=2 face=verdana>This is the raw game data; copy and paste this entire string into the <b>import (Player format)</b> prompt to recreate the game:</font>';
			EXPobj[i]+='<p><form name="stringform"><textarea cols=75 rows=5>';
			}

		var mot='';
		for(j=0;j<moL.length;j++){
			mot+=moL[j];
			if(j!=(moL.length-1)) { mot+=','; }
			}

		var exp='';
		exp+="game="+mot+"&last="+moL[(moL.length-1)]+"&panels="+dc['panels'].value+"&size="+sqS+colStr+"&pieces="+pf.replace('/','')+"&showLegal="+showLEGAL+"&blockIllegal="+blockILLEGAL;
		for(j=0;j<taNa.length;j++){
			exp+="&"+taNa[j]+"="+taVa[j];
			}
		var qCols="&lightCOLOR="+lC+"&darkCOLOR="+dC+"&borderCOLOR="+bC+"&whiteSQUARES="+wQ+"&blackSQUARES="+bQ+"&boardBACKING="+boardBACKING+"&shadowCOLOR="+shadowCOLOR;
		qCols=qCols.replace(/[\#]/g,'');
		exp+=qCols;

		var ddl=document.location.href;
		ddl=ddl.split(pageName);
		if(pagePath!="") { ddl[0]=pagePath; }

		EXPobj[i]+=exp;
		if(ohtm){
			EXPobj[i]+='</textarea>';

			if((ddl[0].indexOf("http://")==-1)&&(pagePath=="")) {
				ddl[0]="http://www.brothercake.com/chess/ChessPlayer/";
				}

			EXPobj[i]+='<p><font size=2 face=verdana>This is the game data built into a link, which is suitable for copying and pasting into an email, or a forum which understands internet links (most do). Others will be able to play-through and analyse your game simply by clicking the link:</font>';
			EXPobj[i]+='<p><textarea name="linkhtml" cols=75 rows=5>'+ddl[0]+pageName+'?'+exp+'</textarea>';

			var def = 'Click here to play through the game';
			EXPobj[i]+='<p><font size=2 face=verdana>This is the same link in HTML format, which you can paste into the source code of an HTML email or web page:</font>';
			EXPobj[i]+='<p><textarea name="linkcode" cols=75 rows=5>&lt;a href="'+ddl[0]+pageName+'?'+exp+'" target="_blank"&gt;'+def+'&lt;/a&gt;</textarea>';

			EXPobj[i]+='</form>';
			}

		if(ohtm){outputWindow=true;}
		else{outputWindow=false;}
		}

	//output data
	var fenStr="";
	if(ohtm){fenStr+='<html><head><meta name="generator" content="ChessPlayer v2.2 by Brothercake"><title>'+taVa[0]+'</title></head><body bgcolor=white>'+tb+'0>';}
	for(f=0;f<EXPobj.length;f++){
		if(EXPobj[f]){fenStr+=EXPobj[f];}
		}
	if(ohtm){fenStr+=stb+"</body></html>";}

	//write html to browser window
	if(outputWindow){
		if(fenWin){fenWin.close();}
		fenWin=window.open("","fenWin");
		fenWin.document.open();
		fenWin.document.write(fenStr);
		fenWin.document.close();
		}

	//write plain text
	else{
		dc["VBOutput"].value=fenStr;
		document.getElementById("wadf").click();
		}

	}


//save game
function saveGame(){

	if(reco.length<=1){return false;}
	//check array is full
	var logFull=true;
	for(f=0;f<moL.length;f++){
		if(!moL[f]||moL[f]==""||!moC[f]||moC[f]==""){logFull=false;}
		}
	if(gIn&&!logFull){return false;}

	//compile output
	var colStr="&view=w";
	if(inputV=="b"){colStr="&view=b";}
	var sgl=savG.length;
	savG[sgl]="game="+moL+"&last="+moL[(moL.length-1)]+"&panels="+dc['panels'].value+"&size="+sqS+colStr+"&pieces="+pf.replace('/','')+"&showLegal="+showLEGAL+"&blockIllegal="+blockILLEGAL;
	for(j=0;j<taNa.length;j++){
		savG[sgl]+="&"+taNa[j]+"="+taVa[j];
		}
	savG[sgl]+="&lightCOLOR="+lC+"&darkCOLOR="+dC+"&borderCOLOR="+bC+"&whiteSQUARES="+wQ+"&blackSQUARES="+bQ+"&boardBACKING="+boardBACKING+"&shadowCOLOR="+shadowCOLOR;
	//remove #
	savG[sgl]=savG[sgl].replace(/[\#]/g,'');

	//prompt for filename
	savN[sgl]=prompt("Please enter a name.\n(letters, numbers and spaces only)","");
	if(savN[sgl]){

		//name cannot contain special characters
		savN[sgl]=savN[sgl].replace(/[\ ]/g,'_');
		savN[sgl]=savN[sgl].replace(/[\s\W]/g,'');
		//name cannot contain the word "game" - changes it to encoded format
		while(savN[sgl].indexOf("game")!=-1){savN[sgl]=savN[sgl].replace("game","emag");}

		//maximum length of cookie
		var temGN = escape("*cpg*"+savN[sgl]);
		var temGG = escape(savG[sgl]);
		var cookieLen = (document.cookie.length+temGN.length+temGG.length);
		if(cookieLen>4096||(dc["reco"].options.length>=32)) {
			alert("Recorder memory is full");
			return false;
			}

		//write the cookie
		getExpiry(36525);
		SetCookie("*cpg*"+savN[sgl],savG[sgl],expDate);

        //update form
        var rsn=dc["reco"].options.length;

		var writeSG=savN[sgl].replace(/[\_]/g,' ');
		writeSG=writeSG.replace("emag","game");

        //if no current saved games
		if(dc["reco"].options[(rsn-1)].value=="save"){
			dc["reco"].length=rsn+2;
			dc["reco"].options[rsn].text="Load saved game:";
			dc["reco"].options[rsn].value="";
			dc["reco"].options[(rsn+1)].text="    "+(sgl+1)+". "+writeSG;
			dc["reco"].options[(rsn+1)].value="*cpg*"+savN[sgl];
			}
			//else
        else{
			var opn=rsn;
			if(dc["reco"].options[(rsn-1)].value=="delete"){
				opn=rsn-1;
				}
			else{
				dc["reco"].length=rsn+1;
 				}
 			dc["reco"].options[opn].text="    "+(sgl+1)+". "+writeSG;
			dc["reco"].options[opn].value="*cpg*"+savN[sgl];
      		}

		}

	}


function loadGame(lgInfo){

	var loadInfo=GetCookie(lgInfo);
	if(loadInfo){self.document.location=pageName+"?cookie="+lgInfo+"&"+loadInfo;}

	}


function deleteGame(){
	if(gaC!=""){
		getExpiry(-1);
		SetCookie("*cpg*"+gaC,gaC,expDate);
		}
	self.document.location=pageName;

	}



//find if piece should be taken and transfer to bin
function discardPiece(dp,dpName){

	if (pn[dp]!="X"&&pn[dp]!=dpName){

		//reset halfmove clock
		xDe[4]=-1;

		// put it in the bin
		var ibb=dc["vbb"].value;
		var ibw=dc["vbw"].value;

		if (pn[dp].indexOf("w")!=-1){
			// white bin
			var biS=false;
			if (ibw>=16){
				whF=true;
				for (d=0;d<16;d++){
					if (!biS){if (bnw[d]=="X"){ibw=d;biS=true;}}
					}
				if(d==16&&biS==false){
					return false;
					}
				}
			wI[ibw].src=imgs[pn[dp]].src;
			bnw[ibw]=pn[dp];
			if (!whF){ibw++;}else{ibw=16;}

			}else{
			// black bin
			var biS=false;
			if (ibb>=16){
				blF=true;
				for (d=0;d<16;d++){
					if (!biS){if (bnb[d]=="X"){ibb=d;biS=true;}}
					}
				if(d==16&&biS==false){
					return false;
					}
				}
			bI[ibb].src=imgs[pn[dp]].src;
			bnb[ibb]=pn[dp];
			if (!blF){ibb++;}else{ibb=16;}

			}


		// change object name
		pI[dp].src=imgs["X"].src;
		pn[dp]="X";


		dc["vbb"].value=ibb;
		dc["vbw"].value=ibw;



		}
	}


//find en-passent target square
var enpn=-1;
var enpx=-1;
function findEnPassent(epiece,ecd){

	//forced en-passent for previously occupied squares
	if(pn[epiece].indexOf("p")!=-1){
		if(dc["enp"].value!=""&&dc["enp"].value==sqn[epiece]&&enpn!=ecd) {
			if(pn[epiece].indexOf("wp")!=-1){
				discardPiece((sqp[sqn[epiece]][1]-8),"wp");
				pI[(sqp[sqn[epiece]][1]-8)].src=imgs["X"].src;
				pn[(sqp[sqn[epiece]][1]-8)]="X";
				}
			else{
				discardPiece((sqp[sqn[epiece]][1]+8),"p");
				pI[(sqp[sqn[epiece]][1]+8)].src=imgs["X"].src;
				pn[(sqp[sqn[epiece]][1]+8)]="X";
				}
			}
		}

	//forced en-passent where previous move was from recorder
	//if(pn[epiece].indexOf("p")!=-1){
	//	alert("dc['enp'].value="+dc["enp"].value+" : sqn[epiece]="+sqn[epiece]+"\n\nenpn="+enpn+" : ecd="+ecd);
	//	}

	//en passent quick-swap
	if((pn[epiece].indexOf("p")!=-1)&&(enpn==ecd)){
		if(pn[epiece].indexOf("wp")!=-1){
			//alert(pn[epiece]+"-"+pn[ecd]+"-"+pn[(ecd-8)]+"-top");
			if(pn[(ecd-8)].indexOf("X")==-1){
				pI[ecd].src=imgs["p"].src;
				pI[(ecd-8)].src=imgs["X"].src;
				//if(pI[(ecd-8)].src.indexOf("p.gif")!=-1){pI[(ecd-8)].src=imgs["X"].src;}
				//if(pI[(ecd+8)].src.indexOf("p.gif")!=-1){pI[(ecd+8)].src=imgs["X"].src;}
				pn[ecd]="p";
				pn[(ecd-8)]="X";
				}
			}
		else{
			//alert(pn[epiece]+"-"+pn[ecd]+"-"+pn[(ecd+8)]+"-bot");
			if(pn[(ecd+8)].indexOf("X")==-1){
				pI[ecd].src=imgs["wp"].src;
				pI[(ecd+8)].src=imgs["X"].src;
				//if(pI[(ecd-8)].src.indexOf("wp.gif")!=-1){pI[(ecd-8)].src=imgs["X"].src;}
				//if(pI[(ecd+8)].src.indexOf("wp.gif")!=-1){pI[(ecd+8)].src=imgs["X"].src;}
				pn[ecd]="wp";
				pn[(ecd+8)]="X";
				}
			}
		}

	var enp="";
	if(pn[epiece].indexOf("p")!=-1){
		//if it was moved two
		if((pp[epiece][1]==on[48][1])&&(pp[ecd][1]==on[32][1])){
			if(VW){
				enp="3";
				enpx=40;
				}else{
				enp="6";
				enpx=16;
				}
			}
		if((pp[epiece][1]==on[8][1])&&(pp[ecd][1]==on[24][1])){
			if(VW){
				enp="6";
				enpx=16;
				}else{
				enp="3";
				enpx=40;
				}
			}
		}
	if(enp!=""){
		//find letter
		var enL='';
		for(ep=0;ep<8;ep++){
			if(pp[epiece][0]==on[ep][0]){
				if(VW){
					enL=lCo[ep];
					enpn=ep;
					}else{
					enL=lCo[(7-ep)];
					enpn=(7-ep);
					}
				}
			}
		xDe[3]=enL+enp;
		//en passent target square number
		enpn+=enpx;
		}else{
		xDe[3]='-';
		}
	dc["enp"].value=xDe[3];

	}





//halfmove clock
function halfMove(hpiece,hcd,hname){
	xDe[4]++;
	if((pn[hpiece].indexOf("p")!=-1)||(hname!="X")){xDe[4]=0;}
	dc["hmc"].value=xDe[4];
	}



//fullmove clock
function fullMove(fpiece,fcd,rev){
	if(pn[fpiece].indexOf("w")==-1){
		if(rev){xDe[5]--;}
		else{xDe[5]++;}
		dc["fmc"].value=xDe[5];
		}
	}



//piece to move
function pieceMove(pmpiece,pmcd,frec,rev){
	if(ato||frec){
		if(pn[pmpiece].indexOf("w")!=-1){xDe[1]="b";}else{xDe[1]="w";}
		if(rev){if(xDe[1]=="b"){xDe[1]="w";}else{xDe[1]="b";}}
		dc["ctm"].value=xDe[1];
		}
	}


// promote pawn to queen
var whQ=false;
var bhQ=false;
function promotePawn(qpiece,pcd){

	if (pn[qpiece].indexOf("p")!=-1){

		// white pawn
		if (pn[qpiece].indexOf("wp")!=-1&&!whQ){

			if (pp[qpiece][1]==on[0][1]){
				pn[qpiece]="wq";
				pI[qpiece].src=imgs["wq"].src;
				paC="w";
				whQ=true;
				xDe[4]=-1;
				}

			}

		// black pawn
		else if (pn[qpiece].indexOf("p")!=-1&&!bhQ){

			if (pp[qpiece][1]==on[63][1]){
				pn[qpiece]="q";
				pI[qpiece].src=imgs["q"].src;
				paC="b";
				bhQ=true;
				xDe[4]=-1;
				}

			}

		}
	}




//auto-castle
function autoCastle(kpiece,kcd){

				if (pn[kpiece].indexOf("k")!=-1){

					var castleokay=0;
					//white king

					fakeView=false;
					if(dc["vw"].value=="false"){
						fakeView=true;
						on=on.reverse();
						}

					if (pn[kpiece].indexOf("wk")!=-1){

						//if king lands on correct square
						if((((pp[kpiece][0]==on[62][0])||(pp[kpiece][0]==on[58][0]))&&(pp[kpiece][1]==on[63][1]))){
							if(pp[kpiece][0]==on[58][0]){
								//if left castle is there
								if(pp[56][0]==on[56][0]&&pp[56][1]==on[56][1]){
									//if intervening spaces are clear
									var thisR=-1;
									for(wcc=0;wcc<pp.length;wcc++){
										if(on[57][0]==pp[wcc][0]&&on[57][1]==pp[wcc][1]){
											if(pI[wcc].src.indexOf("X.gif")!=-1){castleokay++;}
											}
										if(on[59][0]==pp[wcc][0]&&on[59][1]==pp[wcc][1]){
											if(pI[wcc].src.indexOf("X.gif")!=-1){thisR=wcc;castleokay++;}
											}
										}
									if(castleokay==2&&wCCl){
										// move rook
										pI[thisR].src=imgs["wr"].src;
										pI[56].src=imgs["X"].src;
										pn[thisR]="wr";
										pn[56]="X";
										wCCl=false;
										wCCr=false;
										}
									}
								}
							//if king lands on correct square
							if(pp[kpiece][0]==on[62][0]){
								//if right castle is there
								if(pp[63][0]==on[63][0]&&pp[63][1]==on[63][1]){
									//if intervening spaces are clear
									var thisR=-1;
									for(wcc=0;wcc<pp.length;wcc++){
										if(on[61][0]==pp[wcc][0]&&on[61][1]==pp[wcc][1]){
											if(pI[wcc].src.indexOf("X.gif")!=-1){thisR=wcc;castleokay++;}
											}
										}
									if(castleokay==1&&wCCr){
										// move rook
										pI[thisR].src=imgs["wr"].src;
										pI[63].src=imgs["X"].src;
										pn[thisR]="wr";
										pn[63]="X";
										wCCl=false;
										wCCr=false;
										}
									}
								}
							}

						//black king
						}else{

						//if king lands on correct square
						if((((pp[kpiece][0]==on[2][0])||(pp[kpiece][0]==on[6][0]))&&(pp[kpiece][1]==on[0][1]))){
							if(pp[kpiece][0]==on[2][0]){
								//if left castle is there
								if(pp[0][0]==on[0][0]&&pp[0][1]==on[0][1]){
									//if intervening spaces are clear
									var thisR=-1;
									for(bcc=0;bcc<pp.length;bcc++){
										if(on[1][0]==pp[bcc][0]&&on[1][1]==pp[bcc][1]){
											if(pI[bcc].src.indexOf("X.gif")!=-1){castleokay++;}
											}
										if(on[3][0]==pp[bcc][0]&&on[3][1]==pp[bcc][1]){
											if(pI[bcc].src.indexOf("X.gif")!=-1){thisR=bcc;castleokay++;}
											}
										}
									if(castleokay==2&&bCCl){
										// move rook
										pI[thisR].src=imgs["r"].src;
										pI[0].src=imgs["X"].src;
										pn[thisR]="r";
										pn[0]="X";
										bCCl=false;
										bCCr=false;
										}
									}
								}
							//if king lands on correct square
							if(pp[kpiece][0]==on[6][0]){
								//if right castle is there
								if(pp[7][0]==on[7][0]&&pp[7][1]==on[7][1]){
									//if intervening spaces are clear
									var thisR=-1;
									for(bcc=0;bcc<pp.length;bcc++){
										if(on[5][0]==pp[bcc][0]&&on[5][1]==pp[bcc][1]){
											if(pI[bcc].src.indexOf("X.gif")!=-1){thisR=bcc;castleokay++;}
											}
										}
									if(castleokay==1&&bCCr){
										// move rook
										pI[thisR].src=imgs["r"].src;
										pI[7].src=imgs["X"].src;
										pn[thisR]="r";
										pn[7]="X";
										bCCl=false;
										bCCr=false;
										}
									}
								}
							}
						}

					if(fakeView){
						on=on.reverse();
						}

					}
				//if king is otherwise moved
				if (pn[kpiece].indexOf("k")!=-1){
					if (pn[kpiece].indexOf("wk")!=-1){
						wCCl=false;wCCr=false;
						}else{
						bCCl=false;bCCr=false;
						}
					}
				//if rook is moved, castling no longer okay
				var tok=new Array(kpiece,kcd);
				for(j=0;j<2;j++){
					fakeView=false;
					if (pn[tok[j]].indexOf("wr")!=-1){
						if(tok[j]==56){wCCl=false;}
						if(tok[j]==63){wCCr=false;}
						}else{
						if(tok[j]==0){bCCl=false;}
						if(tok[j]==7){bCCr=false;}
						}
					}


				//final castle status
				dc["wccr"].value=wCCr;
				dc["bccr"].value=bCCr;
				dc["wccl"].value=wCCl;
				dc["bccl"].value=bCCl;

	}






function mouseUp(e){

	//hide valid moves
	if(showLEGAL||blockILLEGAL){hideValidMoves();}

	//clear recorder playback
	var stopit=false;
	if(event.button>1){return false;}
	if(event.srcElement.name!="rp"){firstPlay=false;}
	if(event.srcElement.name=="rp"||event.srcElement.name=="andan"||event.srcElement.name=="newg"||event.srcElement.name=="clrb"||event.srcElement.name=="reco"){
		stopit=true;
		}

	if(stopit){
		//clear reco playback
		clearTimeout(chessTimer);
		if(event.srcElement.name!="rp"){firstPlay=false;} 
		dc["rp"].value="Play";
		dc["rp"].title="Play through";
		dc["gpv"].style.backgroundColor=dC;
		dc["gpv"].style.color=lC;
		}

	// reset for bin piece transfer
	if (forced){forced=false;}

	// find piece id from hidden form
	var piece=dc["pieceid"].value;
	// drop piece and reset z order
	if (dragokay&&(pp[piece]||bb[piece]||bw[piece])){

		// find if piece came from board or bin
		var group="board";
		// retrieve initial mouse position
		var kx=dc["kxinfo"].value;
		var ky=dc["kyinfo"].value;
		if (kx<on[0][0]){group="black";}
		if (kx>(on[7][0]+sqS)){group="white";}

		// find group and object name and position
		var tmS=pS[piece];
		if(ie5p&&shadowCOLOR!=""){
			if(tmS.firstChild.filters[0]){
				tmS.firstChild.filters[0].enabled=false;
				}
			}

		var tmN=pn[piece];
		var ibb=dc["vbb"].value;
		var ibw=dc["vbw"].value;
		if (group=="board"){
			var tmP=new Array(pp[piece][0],pp[piece][1]);
			}
		if (group=="black"){
			var biS=false;
			if (ibb>=16){
				blF=true;
				for (d=0;d<16;d++){
					if (!biS){if (bnb[d]=="X"){ibb=d;biS=true;}}
					}
				}
			var tmP=new Array(bb[ibb][0],bb[ibb][1]);
			if (blF){ibb=16;}
			}
		if (group=="white"){
			var biS=false;
			if (ibw>=16){
				whF=true;
				for (d=0;d<16;d++){
					if (!biS){if (bnw[d]=="X"){ibw=d;biS=true;}}
					}
				}
			var tmP=new Array(bw[ibw][0],bw[ibw][1]);
			if (whF){ibw=16;}
			}

		tmS.style.zIndex=4;
		// dropped location
		var mx=tmS.style.pixelLeft;
		var my=tmS.style.pixelTop;

		for (cd=0;cd<64;cd++){

			// validate move
			if (!movedone){validateMove(mx,my,cd,piece);}

			// if move is validated
			if (moveokay&&!movedone){

				//remember piece movement for benefit of reverse-playback
				//ckC=1;

				//store separate en-passent info for validation
				if((piece>=48&&piece<=55)&&(cd>=32&&cd<=39)){valEnp=(cd+8);}
				else if((piece>=8&&piece<=15)&&(cd>=24&&cd<=31)){valEnp=(cd-8);}
				else{valEnp=-1;}

		
				// store current piece info
				var cdS=pS[cd];
				var cdN=pn[cd];
				var tmPi=piece;

				// swap pieces
				tmS.style.left=pp[cd][0];
				tmS.style.top=pp[cd][1];
				cdS.style.left=tmP[0];
				cdS.style.top=tmP[1];

				//en passent target square
				findEnPassent(piece,cd);

				//fullmove clock
				fullMove(piece,cd);

				//swap values
				pp[piece][0]=pp[cd][0];
				pp[piece][1]=pp[cd][1];
				pp[cd][0]=tmP[0];
				pp[cd][1]=tmP[1];

				promotePawn(piece,cd);
				autoCastle(piece,cd);
				discardPiece(cd,tmN);
				pieceMove(piece,cd);
				halfMove(piece,cd,cdN);

				// move has finished
				movedone=true;


				// if move logging is enabled
				if (ato){
					n=0;
					outString=new Array;

					var mainRef=parseInt(dc["ls"].value);
					if (mainRef==-1){
						dc["lss"].value=-1;
						dc["lsss"].value=-1;
						}


					// get notated move and position string
					var oldRef;var newRef;
					for (i=0;i<64;i++){

						// find square names
						if (tmS.style.pixelLeft==on[i][0]&&tmS.style.pixelTop==on[i][1]){
							newRef=i;
							}
						if (cdS.style.pixelLeft==on[i][0]&&cdS.style.pixelTop==on[i][1]){
							oldRef=i;
							}
						for (j=0;j<64;j++){

							// find all board objects
							if (pS[j].style.pixelLeft==on[i][0]&&pS[j].style.pixelTop==on[i][1]){
								addToOutputString(pI[j]);
								}
							}

						n++;
						}

					// get position string
					convertOutputString(outString,false,true,false);

					//set current log number
					loN=mainRef+1;

					//record smith position
					moL[loN]=cc[oldRef]+cc[newRef];

					//write game to smith log
					var rl="";
					var rln=0;
					rl+='<table border=0 cellspacing=4 cellpadding=0 width="100%" style="cursor:default">';
					for(i=0;i<moL.length;i+=2){
						rln++;
						if(moL[i]){
							rl+='<tr id="findmove">';
							rl+='<td class=daco width="2%" align=center>'+rln+'.</td>';
							rl+='<td onclick="goToPosition('+(i+1)+')" class=daco width="49%" id="logcell'+(i+1)+'" style="cursor:hand\;background-color:'+dC+'" onmouseover="cellOver(this)" onmouseout="cellOut(this)">&nbsp;'+moL[i]+'</td>';
							if(moL[(i+1)]){rl+='<td onclick="goToPosition('+(i+2)+')" class=daco width="49%" id="logcell'+(i+2)+'" style="cursor:hand\;background-color:'+dC+'" onmouseover="cellOver(this)" onmouseout="cellOut(this)">&nbsp;'+moL[(i+1)]+'</td>';}
							rl+='</tr>';
							}
						}
					rl+=stb;
					dog("movetable").innerHTML=rl;
					dog("movetable").scrollTop=dog("logcell"+(i-1)).offsetTop;

					// set next log id
					dc["ls"].value=loN;
					loN++;


					}

				}
			}


		// if invalid move, return to original place
		if (!moveokay){
			tmS.style.left=pp[piece][0]
			tmS.style.top=pp[piece][1];
			}

		dragokay=false;
		}
	return true
	}




// set id of selected piece and write to form

function setpieceid(pObj){
	if (!dragokay&&document.forms){
		if (pObj!=null&&dc){
			var obId=pObj.id;
			//alert(obId);
			if (obId.indexOf("binw")!=-1&&dc["info"]){
				var pNum=Number(obId.replace("binw",""));
				dc["info"].value=pObj.id+" - "+bnw[pNum];
				dc["pieceid"].value=pNum;
				}
			if (obId.indexOf("binb")!=-1&&dc["info"]){
				var pNum=Number(obId.replace("binb",""));
				dc["info"].value=pObj.id+" - "+bnb[pNum];
				dc["pieceid"].value=pNum;
				}
			if (obId.indexOf("play")!=-1&&dc["info"]){
				var pNum=Number(obId.replace("play",""));
				dc["info"].value=pObj.id+" - "+pn[pNum];
				dc["pieceid"].value=pNum;
				}
			}else{
			if (dc&&dc["info"]){
				dc["info"].value="";
				dc["pieceid"].value="";
				}
			}
		}
	}





// flip the board
var WV=true;
var VW=true;

function flipBoard(){
	if(!secu){return false;}

	//if(ato){dc["ato"].click();}

	if (moves>-1){

		// find all objects
		var fOb=new Array;
		var fN=new Array;
		var flipCode=new Array;
		var n=0;
		var q=63;
		for (i=0;i<64;i++){

			// store square codes
			flipCode[i]=cc[q];

			for (j=0;j<64;j++){
				// find main board objects
				if (pS[j].style.pixelLeft==on[i][0]&&pS[j].style.pixelTop==on[i][1]){
					fOb[n]=pS[j];
					fN[n]=j;
					}
				}
			n++;
			q-=1;
			}

		// flip all objects
		var q=63;
		for (i=0;i<64;i++){


			if (WV){
				fOb[i].style.left=on[q][0];
				fOb[i].style.top=on[q][1];
				pp[fN[i]][0]=on[q][0];
				pp[fN[i]][1]=on[q][1];
				// swap square codes
				cc[i]=flipCode[i];

				}else{
				pp[fN[i]][0]=on[i][0];
				pp[fN[i]][1]=on[i][1];
				// swap square codes
				cc[i]=flipCode[q];
				}
			q-=1;
			}
			if (WV){
				WV=false;
				}else{
				WV=true;
				flipBoard();
				}
		}
	}



// move notation covers
function flipCovers(){
	if(!secu){return false;}

	if (moves>-1){
		if (down){
			lCov.style.top=arT+(sqS*8)+2;
			nCov.style.left=arL+(sqS*3)-16;
			down=false;
			}else{
			lCov.style.top=arT-16;
			nCov.style.left=arL+(sqS*3)+(sqS*8)+2;
			down=true;
			}
		if(VW){VW=false;}
		else{VW=true;}
		dc["vw"].value=VW;

		}
	}





//start recording
function startRecording(){
	if(!secu){return false;}

	//if(gIn&&!allC){return false;}

	// hide last move indicators
	hideLastMove();

	//clear reco playback
	clearTimeout(chessTimer);
	firstPlay=false;

	dc["rp"].value="Play";
	dc["rp"].title="Play through";

	if(!ato){

		ato=true;
		dc["ato"].value="Stop";
		dc["ato"].title="Stop";
		dc["gpv"].style.backgroundColor = "#dc5656";
		dc["gpv"].style.color = "#333399";
		}
	else{
		ato=false;
		dc["ato"].value="Record";
		dc["ato"].title="Record";
		dc["gpv"].style.backgroundColor = dC;
		dc["gpv"].style.color = lC;
		}

	}





//reco 'shuttle' controls
var thB='';var thatOutput='';
var bra=false;var uic=0;
var lgc;
function recoMove(thGP){
	if(!secu){return false;}

	thB='';ui=false;

	// hide last move indicators
	hideLastMove();

	//if(ato){dc["ato"].click();}

	if(thGP=="e"){
		thGP=reco.length-1;
		thB="e"
		}
	if(thGP=="rw"){
		thGP=parseInt(dc["gp"].value)-1;
		if(thGP<0){thGP=0;}
		thB="rw";
		}
	if(thGP=="ff"){
		thGP=parseInt(dc["gp"].value)+1;
		if(thGP>=reco.length){thGP=reco.length-1;}
		thB="ff";
		}


	dc["gp"].value=thGP;

	star="";
	dc["ant"].value="";
	if(annt[thGP]&&annt[thGP]!=""){star="*";dc["ant"].value=annt[thGP];}

	//move log
	if(prvC>-1){
		lgc=dog("logcell"+prvC);
		if(lgc){
			lgc.style.backgroundColor=dC;
			lgc.style.color=lC;
			}
		}
	lgc=dog("logcell"+thGP);
	if(lgc&&thGP>0){
		if(showP[3]){
			dog("movetable").scrollTop=lgc.offsetTop-2;
			}
		lgc.style.backgroundColor=lC;
		lgc.style.color=dC;
		prvC=thGP;
		}else{
		prvC=-1;
		if(showP[3]){
			dog("movetable").scrollTop=0;
			}
		}

	var gpVal=thGP/2;
	if(parseFloat(gpVal)!=parseInt(gpVal)){gpVal=Math.round(gpVal);gpVal+=".";}
	else{if(gpVal>0){gpVal+="..";}else{gpVal="..";}}
	var lsNum=Math.round((reco.length-1)/2);if(lsNum==0){lsNum="..";}if(lsNum==0){lsNum="..";}

	dc["gpv"].value=gpVal+star+" /"+lsNum;
	dc["ls"].value=thGP-1;

	var thO=reco[thGP];


	//update board with position
	dc["start"].value=thO;
	if(pla){allReset(false);}setP('custom');
	dc["current"].value=thO;

	if(inputV=="b"){
		VW=true;
		dc["vw"].value=VW;
		dc["sv"].click();
		}



	//update castling availability in reverse game
	if(thB=="rw"&&ui){
		alert("3798");
		wCCr=false;bCCr=false;
		wCCl=false;bCCl=false;
		var ca=pcfXd[arrNum][1];
		if(ca.indexOf("K")!=-1){wCCr=true;}
		if(ca.indexOf("Q")!=-1){wCCl=true;}
		if(ca.indexOf("k")!=-1){bCCr=true;}
		if(ca.indexOf("q")!=-1){bCCl=true;}

		dc["wccr"].value=wCCr;
		dc["bccr"].value=bCCr;
		dc["wccl"].value=wCCl;
		dc["bccl"].value=bCCl;
		}



	}



function stopRecorder() {

	dc["rp"].value="Play";
	dc["rp"].title="Play through";
	dc["gpv"].style.backgroundColor = dC;
	dc["gpv"].style.color = lC;
	clearTimeout(chessTimer);
	firstPlay=false;
	playing=false;

	}


//play control
var firstPlay=false;
var playing=false;
function playRecorder(butt){


	if(!secu){return false;}
	// hide last move indicators
	hideLastMove();

	if(reco.length<=1){return false;}

	//stop reco if recording
	if(ato){dc["ato"].click();}

	//begin playback
	if(!firstPlay){
		dc["rp"].value="Stop";
		dc["rp"].title="Stop";
		dc["gpv"].style.backgroundColor = "#76bc76";
		dc["gpv"].style.color = "#333399";
		//go back to beginning if at end
		if(parseInt(dc["gp"].value)==(reco.length-1)){
			dc["b"].click();
			}
		firstPlay=true;
		}
	//go to next move
	else if(!butt) { dc["ff"].click(); }

	if(parseInt(dc["gp"].value)<(reco.length-1)&&dc["rp"].value=="Stop"){
		if(!playing){dc["ff"].click(); playing=true; }
		if(playing){
			chessTimer=setTimeout("playRecorder()",playbackSpeed);
			}
		}
	else{ stopRecorder(); }


	}




//precompile extra FEN information
var scrLog="";
var rl;
var promWQ=false;
var promBQ=false;
var feny=new Array;
feny[0]=new Array("r","n","b","q","k","b","n","r","p","p","p","p","p","p","p","p","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","P","P","P","P","P","P","P","P","R","N","B","Q","K","B","N","R");
fenXd[0]="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";
function precompileFEN(){

	for(i=0;i<gMoves.length;i++){

		//split move
		pcfM[i]=new Array(gMoves[i].charAt(0)+gMoves[i].charAt(1),gMoves[i].charAt(2)+gMoves[i].charAt(3));

		//alert(sqp[pcfM[i][0]][0]+"-"+sqp[pcfM[i][1]][0]+"\n"+sqp[pcfM[i][0]][1]+"-"+sqp[pcfM[i][1]][1]);

		//extra FEN data
		var Xctm="b";
		if(i>0){if(i/2!=parseInt(i/2)){Xctm="w"}}
		var Xkcc="KQkq";
		if(i>0){Xkcc=pcfXd[(i-1)][1];}
		var Xenp="-";
		if(i>0){Xenp=pcfXd[(i-1)][2];}
		var Xhmc=0;
		if(i>0){Xhmc=pcfXd[(i-1)][3];}
		var Xfmc=1;
		if(i>0){Xfmc=pcfXd[(i-1)][4];}
		var Xptq="";
		if(i>0){Xptq=pcfXd[(i-1)][7];}

		pcfXd[i]=new Array(Xctm,Xkcc,Xenp,Xhmc,Xfmc,"X",-1,Xptq);

		//store current values
		var tmPCF=new Array
		tmPCF[0]=new Array(sqp[pcfM[i][0]][0],sqp[pcfM[i][1]][0]);
		tmPCF[1]=new Array(sqp[pcfM[i][0]][1],sqp[pcfM[i][1]][1]);

		//alert(sqp[pcfM[i][0]]);

		//copy fen array from previous
		feny[(i+1)]=new Array;
		for (j=0;j<64;j++){
			feny[(i+1)][j]=feny[i][j];
			}


		//check for pawn-queen conversion
		if(sqp[pcfM[i][0]][0].indexOf("p")!=-1){
			//white
			if(sqp[pcfM[i][0]][0].indexOf("wp")!=-1){
				if(!promWQ&&(sqp[pcfM[i][0]][1]>=8&&sqp[pcfM[i][0]][1]<=15)&&(sqp[pcfM[i][1]][1]>=0&&sqp[pcfM[i][1]][1]<=7)){
					//alert(sqp[pcfM[i][0]][0]+"\n"+sqp[pcfM[i][1]][0]+"\n\n"+sqp[pcfM[i][0]][1]+"\n"+sqp[pcfM[i][1]][1]);
					pcfXd[i][7]="wp";
					promWQ=true;
					feny[(i+1)][tmPCF[1][0]]="Q";
					}else{
					pcfXd[i][7]="";
					}
				}else{
				//black
				if(!promBQ&&(sqp[pcfM[i][0]][1]>=48&&sqp[pcfM[i][0]][1]<=55)&&(sqp[pcfM[i][1]][1]>=56&&sqp[pcfM[i][1]][1]<=63)){
					//alert(sqp[pcfM[i][0]][0]+"\n"+sqp[pcfM[i][1]][0]+"\n\n"+sqp[pcfM[i][0]][1]+"\n"+sqp[pcfM[i][1]][1]);
					pcfXd[i][7]="p";
					promBQ=true;
					feny[(i+1)][tmPCF[1][0]]="q";
					}else{
					pcfXd[i][7]="";
					}
				}
			}



		//king can castle (assumes that the castle move is legal)
		//check for rook movement
		if(sqp[pcfM[i][0]][0].indexOf("r")!=-1){
			//white
			if(sqp[pcfM[i][0]][0].indexOf("wr")!=-1){
				if(sqp[pcfM[i][0]][1]==63){pcfXd[i][1]=pcfXd[i][1].replace("K","");}
				if(sqp[pcfM[i][0]][1]==56){pcfXd[i][1]=pcfXd[i][1].replace("Q","");}
				}else{
				//black
				if(sqp[pcfM[i][0]][1]==7){pcfXd[i][1]=pcfXd[i][1].replace("k","");}
				if(sqp[pcfM[i][0]][1]==0){pcfXd[i][1]=pcfXd[i][1].replace("q","");}
				}
			}
		//check for king movement
		if(sqp[pcfM[i][0]][0].indexOf("k")!=-1){
			//white
			//alert(pcfXd[i][1]);
			if(pcfXd[i][1]!=""&&pcfXd[i][1]!="-"){
				if(sqp[pcfM[i][0]][0].indexOf("wk")!=-1){
					//kingside
					if(sqp[pcfM[i][1]][1]==62){
						feny[(i+1)][(tmPCF[1][1]+1)]="X";
						feny[(i+1)][(tmPCF[1][1]-1)]="R";
						sqp['e1'][0]="X"
						sqp['f1'][0]="wr";
						sqp['g1'][0]="wk";
						sqp['h1'][0]="X";
						}
					//queenside
					if(sqp[pcfM[i][1]][1]==58){
						feny[(i+1)][(tmPCF[1][1]-2)]="X";
						feny[(i+1)][(tmPCF[1][1]+1)]="R";
						sqp['e1'][0]="X"
						sqp['d1'][0]="wr";
						sqp['c1'][0]="wk";
						sqp['a1'][0]="X";
						}
					pcfXd[i][1]=pcfXd[i][1].replace("K","");
					pcfXd[i][1]=pcfXd[i][1].replace("Q","");
					}else{
					//black
					//kingside
					if(sqp[pcfM[i][1]][1]==6){
						feny[(i+1)][(tmPCF[1][1]+1)]="X";
						feny[(i+1)][(tmPCF[1][1]-1)]="r";
						sqp['e8'][0]="X"
						sqp['f8'][0]="wr";
						sqp['g8'][0]="wk";
						sqp['h8'][0]="X";
						}
					//queenside
					if(sqp[pcfM[i][1]][1]==2){
						feny[(i+1)][(tmPCF[1][1]-2)]="X";
						feny[(i+1)][(tmPCF[1][1]+1)]="r";
						sqp['e8'][0]="X"
						sqp['d8'][0]="wr";
						sqp['c8'][0]="wk";
						sqp['a8'][0]="X";
						}
					pcfXd[i][1]=pcfXd[i][1].replace("k","");
					pcfXd[i][1]=pcfXd[i][1].replace("q","");
					}
				}
			if(pcfXd[i][1]==""){pcfXd[i][1]="-";}
			}





		//en-passent
		pcfXd[i][2]="-";
		if(sqp[pcfM[i][0]][0].indexOf("p")!=-1){
			//white
			if(sqp[pcfM[i][0]][0].indexOf("wp")!=-1){
				if(sqp[pcfM[i][0]][1]>=48&&sqp[pcfM[i][0]][1]<=55){
					if(sqp[pcfM[i][1]][1]>=32&&sqp[pcfM[i][1]][1]<=39){
						//alert(cc[(sqp[pcfM[i][0]][1]-8)]);
						pcfXd[i][2]=cc[(sqp[pcfM[i][0]][1]-8)];
						}
					}else{
					}
				}else{
				//black
				if(sqp[pcfM[i][0]][1]>=8&&sqp[pcfM[i][0]][1]<=15){
					if(sqp[pcfM[i][1]][1]>=24&&sqp[pcfM[i][1]][1]<=31){
						pcfXd[i][2]=cc[(sqp[pcfM[i][0]][1]+8)];
						}
					}else{
					}
				}
			}
		if(i>0){
			if(pcfXd[(i-1)][2]!="-"){
				if(sqp[pcfXd[(i-1)][2]][1]==tmPCF[1][1]){
					//alert(sqp[pcfXd[(i-1)][2]]+"\n"+tmPCF[1][1]);
					var tep=tmPCF[1][1];
					if(tep>=16&&tep<=23){
						feny[(i+1)][tmPCF[1][1]]="p";
						feny[(i+1)][(tmPCF[1][1]+8)]="X";
						}
					if(tep>=40&&tep<=47){
						feny[(i+1)][tmPCF[1][1]]="P";
						feny[(i+1)][(tmPCF[1][1]-8)]="X";
						}
					}
				}
			}




		//half-move clock
		pcfXd[i][3]++;
		//alert(sqp[pcfM[i][0]][0]+"\n"+sqp[pcfM[i][1]][0]);
		if((sqp[pcfM[i][0]][0].indexOf("p")!=-1)||(sqp[pcfM[i][1]][0]!="X")){if(sqp[pcfM[i][1]][0].indexOf("k")==-1){pcfXd[i][3]=0;}}

		//full-move clock
		if(parseInt(i/2)!=(i/2)){pcfXd[i][4]++;}

		//alert(sqp[pcfM[i][0]][1]+" - "+sqp[pcfM[i][0]][0]);

		//store taken pieces info
		if(sqp[pcfM[i][1]][0]!="X"){
			//alert(sqp[pcfM[i][1]][0]+" - "+sqp[pcfM[i][1]][1]);
			pcfXd[i][5]=sqp[pcfM[i][1]][0];
			pcfXd[i][6]=sqp[pcfM[i][1]][1];
			}


		//swap values
		sqp[pcfM[i][0]][0]="X";
		sqp[pcfM[i][1]][0]=tmPCF[0][0];

		sqp[pcfM[i][0]][1]=tmPCF[1][0];
		sqp[pcfM[i][1]][1]=tmPCF[1][1];




		//build main FEN position

		//change values
		var temFen=feny[(i+1)][tmPCF[1][1]];
		feny[(i+1)][tmPCF[1][1]]=feny[(i+1)][tmPCF[1][0]];
		if(temFen){
			feny[(i+1)][tmPCF[1][0]]="X";
			}

		// build string from array
		fenXd[(i+1)]="";
		for (j=0;j<64;j++){
			fenXd[(i+1)]+=feny[(i+1)][j];
			if (j==7||j==15||j==23||j==31||j==39||j==47||j==55){fenXd[(i+1)]+="/";}
			}

		// convert "X"s to number
		convertX(fenXd[(i+1)]);
		fenXd[(i+1)]=fs;


		//alert(fenXd[(i+1)]);

		//add extra fen info
		fenXd[(i+1)]+=" "+pcfXd[(i)][0]+" "+pcfXd[(i)][1]+" "+pcfXd[(i)][2]+" "+pcfXd[(i)][3]+" "+pcfXd[(i)][4];


		//add to arrays
		moL[i]=pcfM[i][0]+pcfM[i][1];
		if(firstLast!=""){
			if(moL[i]==firstLast){flNum=i;}
			}
		reco[(i+1)]=fenXd[(i+1)];
		moC[i]=fenXd[(i+1)];

		}
	reco[0]="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";


	//enable output and recording
	allC=true;



	//write game to smith log
	var rl="";
	var rln=0;
	rl+='<table border=0 cellspacing=4 cellpadding=0 width="100%" style="cursor:default">';
	for(i=0;i<fenXd.length;i+=2){
		rln++;
		if(pcfM[i]){
			rl+='<tr>';
			rl+='<td class=daco width="2%" align=center>'+rln+'.</td>';
			rl+='<td onclick="goToPosition('+(i+1)+')" class=daco width="49%" id="logcell'+(i+1)+'" style="cursor:hand\;background-color:'+dC+'" onmouseover="cellOver(this)" onmouseout="cellOut(this)">&nbsp;'+moL[i]+'</td>';
			if(pcfM[(i+1)]){rl+='<td onclick="goToPosition('+(i+2)+')" class=daco width="49%" id="logcell'+(i+2)+'" style="cursor:hand\;background-color:'+dC+'" onmouseover="cellOver(this)" onmouseout="cellOut(this)">&nbsp;'+moL[(i+1)]+'</td>';}
			rl+='</tr>';
			}
		}
	rl+=stb;
	dog("movetable").innerHTML=rl;

	//test function
	rl="";
	rl+='<table border=0 cellspacing=4 cellpadding=0 width="100%">';
	for(i=0;i<fenXd.length;i+=1){
		rl+='<tr>';
		rl+='<td>'+i+": "+fenXd[i]+'</td>';
		rl+='</tr>';
		}
	rl+=stb;


	//alert("finished compiling");


	}


//log functions
function cellOver(cell){
	cell.style.backgroundColor=lC;
	cell.style.color=dC;
	}
function cellOut(cell){
	var cellid=cell.id.replace("logcell","");
	cellid=parseInt(cellid);
	if(cellid!=prvC){
		cell.style.backgroundColor=dC;
		cell.style.color=lC;
		}
	}
function goToPosition(bpNum){

	if(ato){dc["ato"].click();}

	dc["start"].value=reco[bpNum];
	dc["sp"].click();
	dc["current"].value=reco[bpNum];
	dc["gp"].value=bpNum;

	star="";
	if(annt[bpNum]&&annt[bpNum]!=""){star="*";dc["ant"].value=annt[bpNum];}else{dc["ant"].value="";}
	var lsNum=Math.round((reco.length-1)/2);if(lsNum==0){lsNum="..";}


	var gpVal=bpNum/2;
	if(parseFloat(gpVal)!=parseInt(gpVal)){gpVal=Math.round(gpVal);gpVal+=".";}
	else{gpVal=Math.round(gpVal);gpVal+="..";}
	dc["gpv"].value=gpVal+star+" /"+lsNum;

	if(prvC>-1){
		lgc=dog("logcell"+prvC);
		lgc.style.backgroundColor=dC;
		lgc.style.color=lC;
		}
	lgc=dog("logcell"+bpNum);
	lgc.focus();
	lgc.blur();
	lgc.style.backgroundColor=lC;
	lgc.style.color=dC;
	prvC=bpNum;

	dc["ls"].value=bpNum-1;


	if(inputV=="b"){
		VW=true;
		dc["vw"].value=VW;
		dc["sv"].click();
		}
	}








//process input game
var gIn=false;
function processGame(gDetails){
	gIn=true;
	gMoves=gDetails.split(",");

	precompileFEN();

	}




//clear recorder memory
var doClear;
function clearRecorder(toWhere){

	doClear=false;
	if(reco.length<=1){
		doClear=true;
		}
	else if(confirm("Are you sure you wish to clear this game?")){
		doClear=true;
		}
	else {
		doClear=false;
		}

	if(doClear){
	
		if(toWhere){
			if(toWhere=="new"){
				if(pla){allReset(false);}
				setP('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1')
				dc["current"].value='rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
				}
			if(toWhere=="clear"){
				if(pla){allReset(false);}
				setP('8/8/8/8/8/8/8/8 w KQkq - 0 1');
				dc["current"].value='8/8/8/8/8/8/8/8 w KQkq - 0 1';
				}
			}
	
		dc["gp"].value=0;
		dc["gpv"].value=".. /..";

		//change form text to indicate processed game
		dc["ato"].disabled=false;
		ato=false;
		//if(dc["ato"].value==""){
			dc["ato"].value="Record";
			dc["ato"].title="Record";
			dc["reco"].options[1].style.color=lC;
			dc["reco"].options[2].style.color=lC;
			dc["reco"].options[3].style.color=lC;
			if(ie5p&&enablePgnImport) { dc["reco"].options[8].style.color=lC; }
			else { dc["reco"].options[7].style.color=lC; }
		//	}

		dog("movetable").innerHTML="";
			
		//reset arrays
		rNum=1;
		reco.length=rNum;
		fenXd.length=rNum;
		prvC=-1;
		annt.length=rNum;
		annt[0]="";
		moL.length=rNum-1;
		moC.length=rNum-1;
		gIn=false;
		dc["ls"].value=(rNum-2);

		//turn off input conversion
		gIn=false;

		//clear game annotation
		taVa=new Array("?","?","?","?","?","?","*","-","-","?","?");
		dc["aE"].value=taVa[0];
		dc["aS"].value=taVa[1];
		dc["aD"].value=taVa[2];
		dc["aR"].value=taVa[3];
		dc["aW"].value=taVa[4];
		dog("wPlayer").innerText="";
		dog("bPlayer").innerText="";
		dog("wRating").innerText="";
		dog("bRating").innerText="";
		dog("wFlag").src=imgs["X"].src;
		dog("bFlag").src=imgs["X"].src;
		dog("indW").src=imgs["X"].src;
		dog("indB").src=imgs["X"].src;
		dc["ant"].value="";
		dc["aB"].value=taVa[5];
		dc["aRe"].value=taVa[6];
		dc["aWE"].value=taVa[7];
		dc["aBE"].value=taVa[8];
		dc["aWN"].value=taVa[9];
		dc["aBN"].value=taVa[10];
		updateTagInformation();

		document.title="ChessPlayer v2.2 by Brothercake";

		}

	}





//advanced reco controls
function advancedControls(avc){
	// hide last move indicators
	hideLastMove();

	if(!secu){dc["reco"].options[0].selected=true;return false;}
	//export FEN log
	if(avc=="fen"){generateExport('fen');}
	//export Smith Notation log
	if(avc=="smith"){generateExport('smith');}
	//export PGN Notation log
	if(avc=="pgn"){generateExport('pgn');}
	//export query string
	if(avc=="query"){generateExport('query');}
	//import query string
	if(avc=="queryin"){
		var thQu=prompt('Please enter a Player format game string','');
		if(thQu!=null&&thQu!=""){
			thQu=thQu.replace("*cpg*","");
			thQu=thQu.replace("*cpg*","");
			self.document.location=pageName+"?"+thQu;
			}
		}
	//import pgn file
	if(avc=="pgnin"){
		var ddl=document.location.href;
		var cbLoc;
		if(location.search) {
			ddl=ddl.split("?");
			cbLoc=ddl[0];
			}
		else { cbLoc=ddl; }
		var exp='';
		exp+="loc="+cbLoc+"&panels="+dc['panels'].value+"&size="+sqS+"&view=w&pieces="+pf.replace('/','')+"&showLegal="+showLEGAL+"&blockIllegal="+blockILLEGAL;
		var qCols="&lightCOLOR="+lC+"&darkCOLOR="+dC+"&borderCOLOR="+bC+"&whiteSQUARES="+wQ+"&blackSQUARES="+bQ+"&boardBACKING="+boardBACKING+"&shadowCOLOR="+shadowCOLOR;
		qCols=qCols.replace(/[\#]/g,'');
		exp+=qCols;
		if(!live) { pgnProcess="pgnImport.html"; }
		var pgnLogWin = open("_program/_import/"+pgnProcess+"?"+exp,"pgnLogWin","left=0,top=0,width=397,height=450,status=yes,menubar=no,toolbar=no,scrollbars=yes,resizable=yes")
		}
	//save game
	if(avc=="save"){saveGame();}
	//load game
	if(avc.indexOf("*cpg*")!=-1){loadGame(avc);}
	//delete game
	if(avc=="delete"){deleteGame();}
	//reset selector
	dc["reco"].options[0].selected=true;
	}







//add annt
var added=false;
function addAnnotation(){
	if(!secu){return false;}
	if(added){
		added=false;
		return false;
		}
	var aNum=parseInt(dc["gp"].value);

	aText=dc["ant"].value;

	//annotation cannot contain &=sign
	//aText=aText.replace(/[\&\=]/g,'');
	//yes it can, unless its going to be in query string

	if(aText==""){
		annt[aNum]="";
		var aGPV=dc["gpv"].value;
		if(aGPV.indexOf("*")!=-1){
			aGPV=aGPV.replace("*","");
			}
		dc["gpv"].value=aGPV;
		}
	if(aText!=""){
		annt[aNum]=aText;
		dc["ant"].value="";
		var aGPV=dc["gpv"].value;
		if(aGPV.indexOf("*")==-1){
			aGPV=aGPV.replace("/","*/");
			}
		dc["gpv"].value=aGPV;
		}
	added=true;
	return false;
	}




// program help
var programWin;
function programHelp(){
	programWin=window.open("_program/help.html?lico="+(lC.replace('#',''))+"&daco="+(dC.replace('#',''))+"&borco="+(bC.replace('#',''))+"&size=small","programWin","left=32,top=32,width=455,height=440,status=yes,menubar=no,toolbar=yes,scrollbars=yes,resizable=yes");
	}

// help functions trigger
var basicWin,advancedWin,fenhelpWin,pgnWin,openingsWin;
function launchHelp(helpType){
	if(!secu){dc["help"].options[0].selected=true;return false;}
	if (helpType=="program"){programHelp();}
	else{
		if (helpType=="basic"){
			if (!basicWin||basicWin.closed){basicWin=window.open(basicHELP,'basicWin');}
			}
		if (helpType=="advanced"){
			if (!advancedWin||advancedWin.closed){advancedWin=window.open(advancedHELP,'advancedWin');}
			}
		if (helpType=="fen"){
			if (!fenhelpWin||fenhelpWin.closed){fenhelpWin=window.open(fenHELP,'fenhelpWin');}
			}
		if (helpType=="pgn"){
			if (!pgnWin||pgnWin.closed){pgnWin=window.open(pgnHELP,'pgnWin');}
			}
		if (helpType=="openings"){
			if (!openingsWin||openingsWin.closed){openingsWin=window.open(openingsHELP,'openingsWin');}
			}
		}
	//reset selector
	dc["help"].options[0].selected=true;
	}



//presets
function presetP(prPos){
	if(!secu){return false;}
	if(prPos=="new"){
		clearRecorder("new");
		}

	if (prPos=="clear"){
		clearRecorder("clear");
		}
	}



//add main game annotation
function gameAnnotation(){
	if(!secu){return false;}
	var aWin=open("_program/annotate.html?pf="+pf+"&lico="+(lC.replace('#',''))+"&daco="+(dC.replace('#',''))+"&borco="+(bC.replace('#','')),"aWin","left=64,top=64,width=301,height=364,status=yes,menubar=no,toolbar=no,scrollbars=no,resizable=no");
	}

//update tag values with annotation information
function updateTagInformation(){
	taVa[0]=dc["aE"].value;
	taVa[1]=dc["aS"].value;
	taVa[2]=dc["aD"].value;
	taVa[3]=dc["aR"].value;
	taVa[4]=dc["aW"].value;
	taVa[5]=dc["aB"].value
	taVa[6]=dc["aRe"].value;
	taVa[7]=dc["aWE"].value;
	taVa[8]=dc["aBE"].value;
	taVa[9]=dc["aWN"].value;
	taVa[10]=dc["aBN"].value;
	}



var openP=new Array;
openP['cog']=new Array(152,152,0);
openP['vog']=new Array(111,111,1);
openP['rog']=new Array(85,85,2);
openP['mog']=new Array(112,112,3);
openP['pog']=new Array(0,0,4);
var showP=new Array(true,true,true,true,true);
var totalH=451;


//contract/retract boxes
function retract(tab){

	if(!secu){return false;}

	totalH=119+imgH
	hTab=tab.id;
	dog(hTab).style.cursor="hand";

	var pTab=hTab.replace("-tab","");
	pTab=hTab.replace("tab-hide","");

	if(hTab.indexOf("-tab")!=-1){
		hTab=hTab.replace("-tab","");
		dog(hTab).style.display="none";
		dog(hTab+"-hide").style.display="inline";

		showP[openP[hTab][2]]=false;

		if(hTab=="pog"){
			if(window.name&&window.name=="chessWin"){

				if(!exclude&&window.name&&window.name=="chessWin"){
					boW=(14*sqS)+2;
					if(boW<492){boW=492;}
					boH=(8*sqS)+61;
					if(boH<341){boH=341;}
					window.resizeTo(184+boW+chrW,68+boH+chrH);
					}

				}
			dog("pog-spacer").style.height=23;
			dog("msgdiv").style.top=imgH+arT-20-bsPos;
			}

		if(hTab!="mog"){

			openP[hTab][0]=20;
			if(hTab=="pog"){openP[hTab][0]=65;}
			openP['mog'][0]=totalH-(openP['cog'][0]+openP['vog'][0]+openP['rog'][0]+openP['pog'][0]);

			}

		}
	if(hTab.indexOf("tab-hide")!=-1){
		hTab=hTab.replace("tab-hide","");

		showP[openP[hTab][2]]=true;

		if(hTab=="pog"){

			if(!exclude&&window.name&&window.name=="chessWin"){
				boW=(14*sqS)+2;
				if(boW<492){boW=492;}
				boH=(8*sqS)+61;
				if(boH<341){boH=341;}
				window.resizeTo(184+boW+chrW,133+boH+chrH);
				}

			dog("pog-spacer").style.height=88;
			dog("msgdiv").style.top=imgH+arT+47-bsPos;
			}

		if(hTab!="mog"){

			openP[hTab][0]=openP[hTab][1];
			openP['mog'][0]=totalH-(openP['cog'][0]+openP['vog'][0]+openP['rog'][0]+openP['pog'][0]);

			}

		dog(hTab+"-hide").style.display="none";
		dog(hTab).style.display="inline";
		}



	if(pTab!="mog"){

		//alert(moL.length);

		var mtxt='';
		mtxt+='<img src="_program/_icons/expanded.gif" vspace=3 onclick="retract(this)" id="mog-tab" title="Contract" style="filter:alpha(opacity=64)\;cursor:hand\;position:relative\;top:1px\;border:1px outset '+lC+'" hspace=1 width=141 height=8 alt="" border=0>';
		mtxt+='<div id="movetable" style="margin-top:6px\;height:'+(openP['mog'][0]-24)+'px\;overflow-y:scroll\;scrollbar-base-color:'+dC+'\;scrollbar-arrow-color:'+lC+'">';
		mtxt+='</div></div>';
		dog("mog").innerHTML=mtxt;

		if(moL.length>1){
			var rl="";
			var rln=0;
			rl+='<table border=0 cellspacing=4 cellpadding=0 width="100%" style="cursor:default">';
			for(i=0;i<moL.length;i+=2){
				rln++;
				if(moL[i]){
					rl+='<tr>';
					rl+='<td class=daco width="2%" align=center>'+rln+'.</td>';
					rl+='<td onclick="goToPosition('+(i+1)+')" class=daco width="49%" id="logcell'+(i+1)+'" style="cursor:hand\;background-color:'+dC+'" onmouseover="cellOver(this)" onmouseout="cellOut(this)">&nbsp;'+moL[i]+'</td>';
					if(moL[(i+1)]){rl+='<td onclick="goToPosition('+(i+2)+')" class=daco width="49%" id="logcell'+(i+2)+'" style="cursor:hand\;background-color:'+dC+'" onmouseover="cellOver(this)" onmouseout="cellOut(this)">&nbsp;'+moL[(i+1)]+'</td>';}
					rl+='</tr>';
					}
				}
			rl+=stb;
			dog("movetable").innerHTML=rl;
			}

		}

	dc["panels"].value=showP;
	}


