<?php
if ($_POST['text']) {
  $js = file_get_contents( 'data.json' ); 
  $data = json_decode($js); 
  $newObj->text = $_POST['text'];
  $newObj->author =  $_POST['author'];
  $data[] = $newObj;
  $newdata = json_encode($data, JSON_UNESCAPED_UNICODE);
  file_put_contents('data.json', $newdata);
  fclose($file);
  echo json_encode($data, JSON_UNESCAPED_UNICODE);
} else {
  $js = file_get_contents( 'data.json' );
  file_put_contents('data.json', $js);
  echo $js;
}
?>

