		</main>

		<aside class="c-cmodal | js-cmodal">
			<div class="c-cmodal__inner | js-cmodal__inner">
				<figure class="c-cmodal__img">
					<button type="button" class="c-cmodal__close | js-close-cmodal">
						<img src="/static/icons/plus-white.svg" alt="close">
					</button>
					<img src="/static/modal-img.png" alt="">
				</figure>
				<div class="c-cmodal__content">
					<h1 class="c-cmodal__title o-title u-txt-center">Let's talk</h1>
					<p class="c-cmodal__sub-title u-txt-center"">Find out how 56K.Cloud can benefit you!</p>

					<form id="contact-form" class="c-cform" method="post" action="https://formspree.io/info@56k.cloud">
						<input type="text" class="c-cform__input" name="name" placeholder="Your name">
						<input type="email" class="c-cform__input" name="email" placeholder="Your email">
						<textarea class="c-cform__textarea" name="message" placeholder="Your Message..."></textarea>

				        <button type="submit" class="c-cform__submit">
				          <span class="c-btn | js-outer-btn">
				            <div class="c-btn__inner">

				              <span class="c-btn__title c-cform__submit-inner">
				                <span class="c-btn__item c-btn__item--first">Let's Talk</span>
				                <span class="c-btn__item c-btn__item--last">Let's Talk</span>
				              </span>

				              <span class="c-btn__svg">
				                <svg width="10" height="10" viewBox="0 0 10 10" preserveAspectRatio="none">
				                  <path class="js-path" d="M 10,10 L 10,10 C 10,10 10,10 5,10 C 0,10 0,10 0,10 L 0,10 Z"></path>
				                </svg>
				              </span>
				              
				            </div>
				          </span>
				        </button>
					</form>

				</div>
			</div>
		</aside>

		<div class="c-pe | js-pe"></div>

		<?php echo file_get_contents('dist/app.bundle.svg' ); ?>
		<script src="<?php echo $theme->get_asset_path('vendor.js'); ?>"></script>
		<script src="<?php echo $theme->get_asset_path('app.js'); ?>"></script>
	</body>
</html>