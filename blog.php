<?php include('header.php'); ?>

<section class="o-page" data-router-view="blog">
	<?php include('templates/partials/blog-hero.php'); ?>
	<?php /* include('templates/partials/blog-categories.php'); */ ?>

	<div class="c-items">
		<article class="c-item c-blog c-items--light o-gutter | js-smooth-section js-t-load">
			<div class="o-row">
				<div class="c-item__inner c-item__inner--no-padding c-blog__inner o-gutter | js-skew">
					<figure class="c-blog__thumbnail">
						<a href="/year-2020-at-56-cloud">
							<img src="/static/blog/feature.png">
						</a>
					</figure>
					<div class="c-blog__info">
						<a href="#0" class="c-blog__info-cat u-bg-orange">Company News</a>
						<div class="c-blog-author">
							<figure class="c-blog-author__img">
								<img src="/static/about/people.jpg">
							</figure>
							<p class="c-blog-author__name">Darragh Grealish</p>
						</div>
						<a href="/year-2020-at-56-cloud" class="c-blog__info-title o-h5">Year 2020 at 56K.Cloud</a>
						<p class="c-blog__info-date">January 2020</p>
						<p class="c-blog__info-text u-color-text">We are happy to close off 2019 with an exciting year for 56K, partners and our customers, after reaching great milestones we are happy to kick off the next decade with a few exciting goals...</p>
					</div>
				</div>
			</div>
		</article>
		<article class="c-item c-blog c-items--light o-gutter | js-smooth-section">
			<div class="o-row">
				<div class="c-item__inner c-item__inner--no-padding c-blog__inner o-gutter | js-skew">
					<figure class="c-blog__thumbnail">
						<a href="/deploying-static-sites-with-github-actions-and-netlify">
							<img src="/static/blog/github-actions-netlify.png">
						</a>
					</figure>
					<div class="c-blog__info">
						<a href="#0" class="c-blog__info-cat u-bg-orange">Company News</a>
						<div class="c-blog-author">
							<figure class="c-blog-author__img">
								<img src="/static/about/dan.jpg">
							</figure>
							<p class="c-blog-author__name">Dan Achim</p>
						</div>
						<a href="/deploying-static-sites-with-github-actions-and-netlify" class="c-blog__info-title o-h5">Deploying static sites with GitHub Actions and Netlif</a>
						<p class="c-blog__info-date">February 2020</p>
						<p class="c-blog__info-text u-color-text">...and a hack to turn that PHP site into a static one</p>
					</div>
				</div>
			</div>
		</article>
	</div>

	<div class="js-smooth-section">
		<?php include('templates/partials/site-footer.php'); ?>
	</div>
</section>

<?php include('footer.php'); ?>
