<?php
/**
 * Enqueue Scripts
 * ===========
 *
 * Enqueue Scripts
 *
 * @author  Jesper Westlund <westlund@twotwentytwo.se>
 * @package FSK
 */

class FSK_Enqueue_Scripts {

	/**
	 * @var string
	 */
	private static $style_version = '20190428';

	/**
	 * @var string
	 */
	private static $script_version = '20190428';

	/**
	 * Inits hooks and filters.
	 */
	public function __construct() {}


	public static function get_asset_path( $filename ) {
		$manifest_path = __DIR__ . '/dist/manifest.json';

		if ( ! empty( $manifest_path ) ) {
			$file_content  = file_get_contents( $manifest_path );
			$manifest = json_decode( $file_content );

			if ( array_key_exists( $filename, $manifest ) ) {
				return '/dist/' . $manifest->$filename;
			}
		}

		return $filename;
	}

	public static function slugify($string) {
		$string = utf8_encode($string);
		$string = iconv('UTF-8', 'ASCII//TRANSLIT', $string);   
		$string = preg_replace('/[^a-z0-9- ]/i', '', $string);
		$string = str_replace('-', ' ', $string);
		$string = trim($string, '-');
		$string = strtolower($string);

		if (empty($string)) {
			return 'n-a';
		}

		return $string;
	}

	public static function getTitle() {
		$url = $_SERVER["REQUEST_URI"];
		return $url;
	}

	public static function pageName() {
		return substr($_SERVER["SCRIPT_NAME"],strrpos($_SERVER["SCRIPT_NAME"],"/")+1);
	}

}

$theme = new FSK_Enqueue_Scripts;