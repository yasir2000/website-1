<?php include('header.php'); ?>

	<section class="o-page" data-router-view="blog">
		<div class="c-single | js-smooth-section">

			<div class="o-gutter">
				<div class="o-row o-row--smaller">
					<div class="c-single__inner">
						<div class="c-single__headline">
							<h1 class="o-h2">Deploying static sites with GitHub Actions and Netlify</h1>

							<div class="c-single__headline-author">
								<figure class="c-single__headline-img">
									<img src="/static/about/dan.jpg">
								</figure>
								<p class="c-single__headline-name">Dan Achim</p>
								<p class="c-single__headline-date">February 2020</p>
							</div>
						</div>

						<?php /*
						<figure class="c-single__image">
							<img src="/static/blog/single-post.png">
							<figcaption>Photo by: Erwan Hesry @erwanhesry / unsplash</figcaption>
						</figure>
						*/ ?>

						<div class="c-single__content u-color-text">

							<p>...and a hack to turn that PHP site into a static on</p>

							<h2>Background</h2>

							<p>For the last few months, we have been in a rebranding process here at 56k.cloud, that included a brand-new website developed by the awesome team at <a href="http://twotwentytwo.se/" target="_blank">Twotwentytwo</a>. The finished product that we have received from them was a site developed in Php with some Node.js built assets. But internally we decided that we really want a static site and to keep using <a href="https://www.netlify.com/" target="_blank">Netlify</a> as everyone has been very happy with it</p>

							<p>The solution</p>

							<p>Because the website’s code was already hosted on GitHub, GitHub’s new <a href="https://github.com/features/actions" target="_blank">Actions feature</a> seemed like the best fit for our CI / CD needs: it supports all types of steps that are required and it is already baked into GitHub, we just needed to enable the feature.</p>

							<h2>The steps</h2>

							<p>After enabling actions on the website’s GitHub repo, we could get to work at defining our workflow, in GitHub’s lingo. What other solutions would call a pipeline. The first step was to create a <code>.github/workflows/main.yml</code> that would hold this deploy-to-Netlify workflow.</p>

							<ul>
								<li>The workflow .yml needs to have a starting header that will define things like its name, what environment to run on (`ubuntu-latest`) or on which actions it should trigger. A decision has been made to trigger this only on pushes to the <code>master</code> branch:

								<pre>
on:
  push:
    branches:
	- master

jobs:
  build-deploy:
    name: Build and deploy the 56k.cloud website
	runs-on: ubuntu-latest

	steps:
								</pre>
								</li>

								<li>Now we can start the workflow by checking out the Git repository and installing the tools that we need, in this case Php and Node.js:
								<div></div>
								<pre>
steps:
  - name: Checkout
    uses: actions/checkout@v1
  - name: Setup Node
    uses: actions/setup-node@v1
    with:

    node-version: '11.x'

  - name: Setup PHP

    uses: shivammathur/setup-php@v1
    with:
      php-version: '7.4'
</pre>
								</li>
								<li>The next step is to install the NPM modules required to generate the static assets and actually generate them
<pre>
  - name: Install the site dependencies
	run: npm install
  - name: Build the site static assets
	run: npm run build
</pre>

								</li>

								<li>Here comes the <code>hackish</code> part where we turn this site into a static one. This is achieved by running a Php development web server *in* the pipeline, in the background that serves the Php code plus the static assets generated the previous step. Then we use the classic and always useful <code>wget</code> to crawl this website and save locally the HTML content
<pre>
  - name: Start the PHP dev server in the background
	run: nohup php -S 0.0.0.0:8080 > /dev/null 2>&1 &
  - name: Crawl the website to get our nice HTML files
	run: mkdir output && cd output && wget -k -K -E -r -p -N -F -nH -q
	http://localhost:8080/
</pre>

								</li>

								<li>Now we need to copy the previously built static assets in the <code>output</code> directory and do a bit of cleanup because <code>wget</code> will save some of those HTML files with links containing <code>http://localhost:8080/</code>. We want to remove that reference to localhost and leave all the links relative, so the HTML files can be hosted anywhere:
<pre>
  - name: Copy the right static files
    run: |
	  cp -r ./dist/* ./output/dist/
	  cp -r ./static/* ./output/static/
  - name: Find all artifacts from Wget and clean them up
	  run: cd output && find ./ -type f -exec sed -i 's/http\:\/\/localhost\:8080//g' {} \;
</pre>
								</li>

								<li>At this point in the workflow we have an <code>output</code> directory that contains a static, cleaned up, website. We just need to deploy it to Netlify! This step can be easily achieved using by using <a href="https://docs.netlify.com/cli/get-started/#manual-deploys" target="_blank">Netlify’s CLI</a>. Before defining this step, you need to make sure you have defined a new site in Netlify’s Web UI from where you can get your site ID that you need here and you have generated an Auth token for your user (the steps can be found in Netlify’s CLI documentation).
<pre>
  - name: Install the Netlify CLI
    run: npm install netlify-cli -g
  - name: Deploy the website
    run: netlify deploy --prod --dir ./output/ --site=<site_id> --auth=<auth_token> --timeout=600 --message "Deployed on $(date)"
</pre>

								</li>
							</ul>
<p>That’s it! Save the workflow file .yml file, push and commit it to GitHub and it should trigger a GitHub action that will do all the work for you from now on and regenerate and redeploy the website at every commit to the <code>master</code> branch. You are reading this blog post as a result of this process :)</p>


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
