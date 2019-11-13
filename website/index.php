<?php
//https://www.w3schools.com/php/php_ajax_php.asp
session_start();
?>

<html>
<head>

    <title>Sozial Startseite</title>
    <link rel="stylesheet" href="inc/css/style.css">
</head>
<body>
<div class="haupt" style="padding-bottom: 10px">
    <div>
        <h1 style="color: red; font-family: Verdana" >Sozial</h1>
    </div>
<?php
if (!isset($_GET["id"]) || $_GET["id"] == "1"){
    require_once 'script/feed.php';
}
?>


    <div style="height: 100%; margin-bottom: 10px">
        <a href="script/feed.php">Zum Feed</a> <br>
        <a href="script/login.php">Anmelden</a> <br>
        <a href="script/register.php">Registrieren</a>
    </div>
</div>
</body>
</html>