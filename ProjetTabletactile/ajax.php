<?php

  header('Content-type: text/html; charset=utf-8');
  require_once('inc.php');
  require_once('./rss/rss_php.php');

  if(isset($_REQUEST['block'])){$block = $_REQUEST['block'];}else{$block = 'none';}

 

  /////////////////////////////////////////////////
  //  RSS
  /////////////////////////////////////////////////

  if($block == 'rss'){
    echo rss();
  }
  /////////////////////////////////////////////////
  //  METEO
  /////////////////////////////////////////////////

  if($block == 'meteo'){
    echo meteo();
  }

?>
