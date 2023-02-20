if (location.search){
	
	//*** query string function by Dave Clark - http://www.daveclarkconsulting.com/ **************
	var ary=window.location.search.substr(1).split("&");
	for (i=0;i<ary.length;i++) {
		ary[i]=ary[i].split("=");
		}
	var qStr=new Array();
	for (i=0;i<ary.length;i++) {
		ary[i][0]=ary[i][0].replace(/\+/g," ");
		ary[i][0]=unescape(ary[i][0]);
		ary[i][1]=ary[i][1].replace(/\+/g," ");
		ary[i][1]=unescape(ary[i][1]);
		qStr[ary[i][0]]=ary[i][1];
		}
	
	
	var pf = qStr['pf'];
	var loc = qStr['loc'];
	var sty='';
	sty+='<style>';
	sty+='.lico \{color:#'+qStr["borderCOLOR"] + '\; background-color:#'+qStr["lightCOLOR"] + '\; border-color:#'+qStr["lightCOLOR"] + '\; \}';
	sty+='.daco \{cursor:default; color:#'+qStr["lightCOLOR"] + '\; background-color:#'+qStr["darkCOLOR"] + '\; border-color:#'+qStr["lightCOLOR"] + '\; font-size:13px\; font-weight:bold\; font-family:comic sans ms,arial\; \}';
	sty+='.panel \{background-color:#'+qStr["darkCOLOR"] + '\;}';
	sty+='</style>';
	document.write(sty);
	document.bgColor=qStr['darkCOLOR'];
	}
