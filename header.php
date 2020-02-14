<?php
	include( 'functions.php' );
	$current_page = $theme->pageName();
?>

<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<title>56k</title>
		<link rel="canonical" href="">
		<meta name="description" content="">
		<meta http-equiv="Content-Type" content="text/html" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="format-detection" content="telephone=no">
		<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=5">
		<meta name="description" content="">
		<link rel="apple-touch-icon" sizes="120x120" href="/apple-touch-icon.png">
		<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
		<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
		<link rel="manifest" href="/site.webmanifest">
		<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5">
		<meta name="msapplication-TileColor" content="#da532c">
		<meta name="theme-color" content="#ffffff">
		<link rel="stylesheet" type="text/css" href="<?php echo $theme->get_asset_path('app.css'); ?>">
	</head>

	<body>
		
		<?php include('templates/partials/site-header.php'); ?>
		<main class="o-main | js-smooth" data-router-wrapper>