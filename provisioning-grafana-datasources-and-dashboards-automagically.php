<?php include('header.php'); ?>

	<section class="o-page" data-router-view="blog">
		<div class="c-single | js-smooth-section">

			<div class="o-gutter">
				<div class="o-row o-row--smaller">
					<div class="c-single__inner">
						<div class="c-single__headline">
							<h1 class="o-h2">Provisioning Grafana Datasources and Dashboards Automagically</h1>

							<div class="c-single__headline-author">
								<figure class="c-single__headline-img">
									<img src="/static/about/brian.jpg">
								</figure>
								<p class="c-single__headline-name">Brian Christner</p>
								<p class="c-single__headline-date">March 2018</p>
							</div>
						</div>

						<?php /*
						<figure class="c-single__image">
							<img src="/static/blog/single-post.png">
							<figcaption>Photo by: Erwan Hesry @erwanhesry / unsplash</figcaption>
						</figure>
						*/ ?>

						<div class="c-single__content u-color-text">

<img src="https://d33wubrfki0l68.cloudfront.net/f6fe7f6d2815e29dbf67106c1597ebb2b33a9f77/4a8f3/img/grafana_dashboard_v50.png" />

<hr />

<p>Grafana released v5.0 at GrafanaCon last week. It is a significant update packed with mouth-watering features. I’ve been testing the beta for quite some time and was very impressed with the maturity already in Beta.</p>

<p>Most people will notice the New Dashboard Engine, UX, and themes as prominent visual updates. However, down the list of features which to be honest, I missed the first few times reading the release notes is an essential feature: <strong>Provisioning from Configuration</strong>. This small bullet point has a significant impact on DevOps teams which deploy Grafana with GitOps.</p>

<p>Previous to v5.0, we had to use the Grafana API to provision data-sources and dashboards. It was always a bit tricky as we had to ensure Grafana is first running, pass credentials to the service, then load the data-source and dashboards. </p>

<hr />

<h2 id="configure-grafana-provisioning">Configure Grafana Provisioning</h2>

<p>Now, the new Grafana v5.0 provisioning system utilizes YAML config files. New in v5.0 is the <code>/etc/grafana/provisioning</code> directory. Here is where we can place datasource config files <code>/etc/grafana/provisioning/datasource</code> and dashboards <code>/etc/grafana/provisioning/dashboards</code> in their respective sub-folders.</p>

<p>I’ve updated the <a href="https://github.com/vegasbrianc/prometheus">Docker Prometheus monitoring</a> stack to take advantage of the new provisioning tool so you can see it in practice. Let’s start with looking at the new volume in the `docker-compose.yml file:</p>

<script src="https://gist.github.com/vegasbrianc/34e3685c11aaaf8ca41901cef66859c7.js"></script>

<p>Line 9 of the docker-compose file is mounting the local <code>/grafana/provisioning</code> directory containing both the datasource and dashboard directories into the Grafana container’s <code>/etc/grafana/provisioning</code> directory.</p>

<p>Next, we can configure a datasource. I have selected to create a Prometheus datasource as it is what is in use with the Docker monitoring project. Here we can define the name of the datasource, proxy settings, datasource URL, and basic auth settings. Line 50 is essential as if it is false, we can only edit the datasource via the config files and no longer via the GUI.</p>

<p>Here is the Prometheus <code>datasource.yml</code> file:</p>

<script src="https://gist.github.com/vegasbrianc/f35ba8a4bf1be510449c88c5d14d5d99.js"></script>

<p>Once the datasource is available, we can then provision dashboards. Create a <code>dashboard.yml</code> file and drop it in the <code>/etc/grafana/provisioning/dashboards</code> directory. In this config file we point to the path to the dashboards which is used to import. The dashboards should be in JSON format.</p>

<script src="https://gist.github.com/vegasbrianc/dd7d993508dc8748db6dae9a46b08e8c.js"></script>

<p>Once we start the Grafana container, it will read the /etc/grafana/provisioning directory and make updates to either the datasource of dashboards based on the changes. Drop in additional datasource or dashboard config, or dashboard JSON files and restart. Yes. that is all that is needed to update or add new datasources or dashboards.</p>

<hr />

<h2 id="summary">Summary</h2>

<p>Now that we understand the mechanics on how to provision datasources and dashboards it requires just a bit more effort to integrate this into your GitOps workflows. For the Monitoring projects, I maintain for getting started with container monitoring it significantly reduces the amount of energy required to start a monitoring stack. I also have some production installations where this will be much easier to maintain new versions and updates.</p>

<h2 id="find-out-more-about-56k-cloud">Find out more about 56K.Cloud</h2>

<p>We love Cloud, Containers, DevOps, and Infrastructure as Code. If you are interested in chatting connect with us on <a href="www.twitter.com/56kcloud">Twitter</a> or drop us an email: <a href="mailto:info@56k.cloud">info@56K.Cloud</a> We hope you found this article helpful. If there is anything you would like to contribute or you have questions, please let us know!</p>

						</div>

						<a href="/blog" class="o-button">← Back to blog</a>
					</div>
				</div>
			</div>
		</div>

		<div class="js-smooth-section">
			<?php include('templates/partials/site-footer.php'); ?>
		</div>

	</section>

<?php include('footer.php'); ?>
