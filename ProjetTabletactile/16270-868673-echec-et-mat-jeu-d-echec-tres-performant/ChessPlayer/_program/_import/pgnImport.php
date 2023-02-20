<html><body>

<!--
////////////////////////////////////////////////////////////////////////////////
//                                                                            //
//   javascript pgn conversion by Brothercake - http://www.brothercake.com/   //
//   this is a component script to ChessPlayer v2.2                           //
//                                                                            //
////////////////////////////////////////////////////////////////////////////////
-->

<?php


$the_path = "//home/brotherc/public_html/chess/ChessPlayer/_pgn";


function body_normal() {
	print "\n<body class=daco onload=\"if(window.opener){checkIdle()}\" id=\"thebody\" style=\"cursor:default\">";
	}

function body_process() {
	print "\n<body class=daco onload=\"importServerPGN();if(window.opener){checkIdle()}\" id=\"thebody\" style=\"cursor:default\">";
	}


function empty_area() {

	global $the_path;

	print "\n<textarea name=\"pgnData\" style=\"display:none\" rows=10 cols=40></textarea>";
	print "\n<table cellpadding=0 cellspacing=4 border=0 style=\"width:340px\"><tr><td>";
	print "\n<select name=\"sfi\" style=\"width:260px\" class=daco>";

	$handle = dir($the_path);

	while ($file = $handle->read()) {
		if (ereg (".pgn",$file)) { # only show pgn files in selector
			print "\n<option value=" . $file . ">" . $file . "</option>";
			}
		}

	}


function data_area() {

	global $pgn_file,$the_path;
	$pgn_abspath = "$the_path" . "/" . "$pgn_file";
	$pgn_fd = fopen ($pgn_abspath, "r");
	$pgn_contents = fread ($pgn_fd, filesize ($pgn_abspath));

	print "\n<textarea name=\"shell\" style=\"display:none\" rows=10 cols=40>" . $pgn_contents . "</textarea>";
	print "\n<table cellpadding=0 cellspacing=4 border=0 style=\"width:340px\"><tr><td>";
	print "\n<select name=\"sfi\" style=\"width:260px\" class=daco>";

	$handle = dir($the_path);

	while ($file = $handle->read()) {
		if (ereg (".pgn",$file)) { # only show pgn files in selector
			if (ereg ($pgn_file,$file)) {
				print "\n<option value=" . $file . " selected>" . $file . "</option>";
				}
			else {
				print "\n<option value=" . $file . ">" . $file . "</option>";
				}
			}
		}

	}



$task="";
if(isset($_POST["task"])){
	$task = $_POST["task"];
	}
$pgn_file="";
if(isset($_POST["sfi"])){
	$pgn_file = $_POST["sfi"];
	}

print "\n<html><head><title>Import PGN</title>";
print "\n<script language=\"javascript1.3\" src=\"qStr.js\"></script>";
print "\n</head>";

switch($task) {
    case 'import':
        body_process($pgn_file);
    break;
    default:
       body_normal();
	}

print "\n<script language=\"javascript1.3\" src=\"pgnImport.js\"></script>";

print "\n<form name=\"pgnChessForm\" action=\"\" method=\"post\">";
print "<input type=\"hidden\" name=\"task\" value=\"import\">";

switch($task) {
    case 'import':
        data_area($pgn_file);
    break;
    default:
       empty_area();
	}

print "</select>";
print "\n<td>&nbsp;<input name=\"pin\" type=\"submit\" class=daco style=\"width:83px\;cursor:default\" value=\"Import\" onmouseup=\"this.blur()\"></td>";
print "</tr></table>";
print "\n</form>";

print "\n<div id=\"pgnselect\" style=\"width:320px\">";
print "\n<table cellpadding=0 cellspacing=10 border=0 style=\"width:340px\">";
print "\n<tr><td align=left class=daco style=\"font-size:13px\">";
print "\nPlease select a file from the dropdown list,<br>then click \"Import\".</td></tr>";
print "\n</tr></table></div>";

print "\n</form>";

print "\n</body>\n</html>";









?>







</form>

</body></html>