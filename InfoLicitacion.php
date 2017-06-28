<?php
if(isset($_GET['submit'])) {
    $pokemon = $_GET["namePokemon"];
    $large = strlen($pokemon);
    $rand = rand(0, 70);
    if ($large >= $rand) {
        echo "<h2><span style='color: blue'>ASH QLIAO GANASTE, ESTA VEZ</span></h2>";

    } else {
        echo "<h1><span style='color: red'>ASH QLIAO MALO POR LA CSM</span></h1>";
        echo "<img src='ash_llora.jpg' >";

    }
}
?>

<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Liga Rancia</title>
</head>
<body>
<h1>Inserta el nombre de cualquier pokemon</h1>
<form method="get" action="<?php echo $_SERVER['PHP_SELF']; ?>">
<label for="namePokemon">Nombre de pokemon: </label>
<input name="namePokemon" id="namePokemon" type="text" required />
    <input type="submit" name="submit" value="Ver Resultado" />
</form>
</body>
</html>
