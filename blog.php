<?php include('header.php'); ?>

<section class="o-page" data-router-view="blog">
	<?php include('templates/partials/blog-hero.php'); ?>
	<?php /* include('templates/partials/blog-categories.php'); */ ?>

	<div class="c-items">
		<article class="c-item c-blog c-items--light o-gutter | js-smooth-section js-t-load">
			<div class="o-row">
				<div class="c-item__inner c-item__inner--no-padding c-blog__inner o-gutter | js-skew">
					<figure class="c-blog__thumbnail">
						<a href="branding-a-tech-company-to-non-tech">
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
						<a href="branding-a-tech-company-to-non-tech" class="c-blog__info-title o-h5">Branding a Tech Company to non-Tech</a>
						<p class="c-blog__info-date">March 2020</p>
						<p class="c-blog__info-text u-color-text">Why we branded 56K.Cloud, initially we didn’t have a logo, I drew up something with a black background that was enough for daily business, Having been involved in branding in the past and understanding the value and purpose of it, here we share that story.</p>
					</div>
				</div>
			</div>
		</article>
		<article class="c-item c-blog c-items--light o-gutter | js-smooth-section">
			<div class="o-row">
				<div class="c-item__inner c-item__inner--no-padding c-blog__inner o-gutter | js-skew">
					<figure class="c-blog__thumbnail">
						<a href="deploying-static-sites-with-github-actions-and-netlify">
							<img src="/static/blog/github-actions-netlify.png">
						</a>
					</figure>
					<div class="c-blog__info">
						<a href="#0" class="c-blog__info-cat u-bg-orange">Tutorial</a>
						<div class="c-blog-author">
							<figure class="c-blog-author__img">
								<img src="/static/about/dan.jpg">
							</figure>
							<p class="c-blog-author__name">Dan Achim</p>
						</div>
						<a href="deploying-static-sites-with-github-actions-and-netlify" class="c-blog__info-title o-h5">Deploying static sites with GitHub Actions and Netlify</a>
						<p class="c-blog__info-date">February 2020</p>
						<p class="c-blog__info-text u-color-text">...and a hack to turn that PHP site into a static one</p>
					</div>
				</div>
			</div>
		</article>
		<article class="c-item c-blog c-items--light o-gutter | js-smooth-section js-t-load">
			<div class="o-row">
				<div class="c-item__inner c-item__inner--no-padding c-blog__inner o-gutter | js-skew">
					<figure class="c-blog__thumbnail">
						<a href="year-2020-at-56-cloud">
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
						<a href="year-2020-at-56-cloud" class="c-blog__info-title o-h5">Year 2020 at 56K.Cloud</a>
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
						<a href="provisioning-grafana-datasources-and-dashboards-automagically">
							<img src="https://d33wubrfki0l68.cloudfront.net/f6fe7f6d2815e29dbf67106c1597ebb2b33a9f77/4a8f3/img/grafana_dashboard_v50.png">
						</a>
					</figure>
					<div class="c-blog__info">
						<a href="#0" class="c-blog__info-cat u-bg-orange">Tutorial</a>
						<div class="c-blog-author">
							<figure class="c-blog-author__img">
								<img src="/static/about/brian.jpg">
							</figure>
							<p class="c-blog-author__name">Brian Christner</p>
						</div>
						<a href="provisioning-grafana-datasources-and-dashboards-automagically" class="c-blog__info-title o-h5">Provisioning Grafana Datasources and Dashboards Automagically</a>
						<p class="c-blog__info-date">March 2018</p>
						<p class="c-blog__info-text u-color-text">Grafana released v5.0 at GrafanaCon last week. It is a significant update packed with mouth-watering features. I’ve been testing the beta for quite some time and was very impressed with the maturity already in Beta. Most people will notice the New Dashboard Engine, UX, and themes as prominent visual updates. However, down the list of features which to be honest, I missed the first few times reading the release notes is an essential feature: Provisioning from Configuration.</p>
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
