<?php include('header.php'); ?>

<section class="o-page" data-router-view="home">
	<?php include('templates/partials/hero.php'); ?>
	<?php include('templates/partials/intro.php'); ?>
	<div class="c-items c-items--dark">
		<?php include('templates/partials/services/automation.php'); ?>
		<?php include('templates/partials/services/cloud.php'); ?>
		<?php include('templates/partials/services/docker-kubernetes.php'); ?>
	</div>
	<?php include('templates/partials/illustration2.php'); ?>
	<div class="c-items c-items--light">
		<?php include('templates/partials/services/devops.php'); ?>
		<?php include('templates/partials/services/monitoring.php'); ?>
		<?php include('templates/partials/services/training.php'); ?>
	</div>
	<?php include('templates/partials/companies.php'); ?>
	<?php include('templates/partials/see-more.php'); ?>
	<div class="u-bg-dark-blue c-index | js-smooth-section">
		<?php include('templates/partials/site-footer.php'); ?>
	</div>
</section>

<?php include('footer.php'); ?>