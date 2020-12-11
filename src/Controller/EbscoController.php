<?php

/**
 * @file
 * Contains \Drupal\ebsco\Controller\EbscoController.
 */

namespace Drupal\ebsco\Controller;

use Drupal\Core\Url;
use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Cache\CacheableMetadata;
use Drupal\Core\Routing\TrustedRedirectResponse;
use Symfony\Component\HttpFoundation\RedirectResponse;

// header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
// header('Access-Control-Max-Age: 1000');
// header('Content-Type: application/json');

require_once __DIR__ . "/../../lib/EBSCODocument.php";
require_once __DIR__ . "/../../lib/EBSCOAPI.php";
require_once __DIR__ . "/../../lib/EBSCOConnector.php";

header('Access-Control-Allow-Origin "*"');
/**
 * Default controller for the ebsco module.
 */
class EbscoController extends ControllerBase  {

	public function content() {
		
		// $callAucompleteController = $this->autocomplete_detail();
		// echo $callAucompleteController['content'];
		// var_dump($callAucompleteController['content']);
		// die();
		return [];
		// return [
		// '#theme' => 'ebsco_basic_search',
		// ];
	}
	
	public function advanced() {
		return [
		'#theme' => 'ebsco_advanced_search'
		];
	}
	
	public function results() {
		return [
		'#theme' => 'ebsco_results'
		];
	}

	public function detailed_record() {
		$is_xhr = !empty($_SERVER['HTTP_X_REQUESTED_WITH']) && $_SERVER['HTTP_X_REQUESTED_WITH'] == 'XMLHttpRequest';

		if ($is_xhr) {
			return [
			'#theme' => 'ebsco_result'
			];
			return true;
		}
		else {
		// @FIXME
			return [
			'#theme' => 'ebsco_result'
			];

		}
		

	}


	public function pdf_page() {
		global $_ebsco_document;
		$params = $_REQUEST;

		if (\Drupal::currentUser()->isAuthenticated()) {
			if (empty($_ebsco_document)) {
				$_ebsco_document = new \EBSCODocument();
			}
			$_ebsco_document->retrieve();
			$record = $_ebsco_document->record();
			
			$url=str_replace('&amp;','&',$record->pdf_link);

			header('Location: '.$url);
			die();
		}
		else 
		{
			$_SESSION['EBSCO']['redirect'] = drupal_get_destination();
			return new RedirectResponse(\Drupal::url('user.page'));
		}
		
	}



	public function fulltext_page() {
		$is_xhr = !empty($_SERVER['HTTP_X_REQUESTED_WITH']) && $_SERVER['HTTP_X_REQUESTED_WITH'] == 'XMLHttpRequest';
		if (\Drupal::currentUser()->isAuthenticated()) {
		if ($is_xhr) {
			return [
			'#theme' => 'ebsco_result'
			];
			return true;
		}
		else {
			return [
			'#theme' => 'ebsco_result'
			];

		}
		}
		
		else {
		$_SESSION['EBSCO']['redirect'] = drupal_get_destination();
		if ($is_xhr) {
			echo "<script type=\"text/javascript\">window.location.href = '" . \Drupal\Core\Url::fromRoute('user.page')->toString() . "';</script>";
			return;
		}
		else {
			$_SESSION['EBSCO']['redirect'] = drupal_get_destination();
			return new RedirectResponse(\Drupal::url('user.page'));		
		}
		}
	}



	public function image_quick_view() {
		$is_xhr = !empty($_SERVER['HTTP_X_REQUESTED_WITH']) && $_SERVER['HTTP_X_REQUESTED_WITH'] == 'XMLHttpRequest';

		if (\Drupal::currentUser()->isAuthenticated()) {
		if ($is_xhr) {
			return [
			'#theme' => 'ebsco_image_quick_view'
			];
			return true;
		}
		else {
			return [
			'#theme' => 'ebsco_image_quick_view'
			];

		}
		}
		else {
		$_SESSION['EBSCO']['redirect'] = drupal_get_destination();
		if ($is_xhr) {
			echo "<script type=\"text/javascript\">window.location.href = '" . \Drupal\Core\Url::fromRoute('user.page')->toString() . "';</script>";
			return;
		}
		else {
			$_SESSION['EBSCO']['redirect'] = drupal_get_destination();
			return new RedirectResponse(\Drupal::url('user.page'));		
		}
		}

	}


	public function exportformat_detail() {
		$is_xhr = !empty($_SERVER['HTTP_X_REQUESTED_WITH']) && $_SERVER['HTTP_X_REQUESTED_WITH'] == 'XMLHttpRequest';
		
		if ($is_xhr) {
			return [
			'#theme' => 'ebsco_exportformat_detail'
			];
			return true;
		}
		else {
			return [
			'#theme' => 'ebsco_exportformat_detail'
			];

		}

	}		

	
	public function exportformat() {
		global $_ebsco_document;
		$params = $_REQUEST;

		if (\Drupal::currentUser()->isAuthenticated()) {
			if (empty($_ebsco_document)) {
				$_ebsco_document = new \EBSCODocument();
			}
			$_ebsco_document->export();
			$record = $_ebsco_document->record();

			$url = $_ebsco_document->export();
			
		
			header('Location: '.$url);
			die();
		}
		else 
		{
			$_SESSION['EBSCO']['redirect'] = drupal_get_destination();
			return new RedirectResponse(\Drupal::url('user.page'));
		}
		
	}


	public function citation_styles_detail() {
		$is_xhr = !empty($_SERVER['HTTP_X_REQUESTED_WITH']) && $_SERVER['HTTP_X_REQUESTED_WITH'] == 'XMLHttpRequest';
		if (\Drupal::currentUser()->isAuthenticated()) {
		if ($is_xhr) {
			return [
			'#theme' => 'ebsco_citation_styles_detail'
			];
			return true;
		}
		else {
			return [
			'#theme' => 'ebsco_citation_styles_detail'
			];

		}
		}
		else {
		$_SESSION['EBSCO']['redirect'] = drupal_get_destination();
		if ($is_xhr) {
			echo "<script type=\"text/javascript\">window.location.href = '" . \Drupal\Core\Url::fromRoute('user.page')->toString() . "';</script>";
			return;
		}
		else {
			$_SESSION['EBSCO']['redirect'] = drupal_get_destination();
			return new RedirectResponse(\Drupal::url('user.page'));		
		}
		}

	}


	public function citation_styles() {
		global $_ebsco_document;
		$params = $_REQUEST;

		if (\Drupal::currentUser()->isAuthenticated()) {
			if (empty($_ebsco_document)) {
				$_ebsco_document = new \EBSCODocument();
			}
			$_ebsco_document->citation();
			$record = $_ebsco_document->record();

			$url = $_ebsco_document->citation();
		
			header('Location: '.$url);
			die();
		}
		else 
		{
			$_SESSION['EBSCO']['redirect'] = drupal_get_destination();
			return new RedirectResponse(\Drupal::url('user.page'));
		}
		
	}

	public function image_quick_url() {
    global $_ebsco_document;
    $params = $_REQUEST;

		if (\Drupal::currentUser()->isAuthenticated()) {
			if (empty($_ebsco_document)) {
				$_ebsco_document = new \EBSCODocument();
			}
			$_ebsco_document->retrieve();
			$record = $_ebsco_document->record();
			$url=str_replace('&amp;','&',$record->image_quick_url);
		
			// redirect on the new window
			header('Location: '.$url);
			die();
		}
		else 
		{
			$_SESSION['EBSCO']['redirect'] = drupal_get_destination();
			return new RedirectResponse(\Drupal::url('user.page'));
		}

	}

	// public function autocomplete() {
	// 	header('Access-Control-Allow-Origin "*"');
	// 	header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
	// 	header('Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, 
	// 	Accept, x-client-key, x-client-token, x-client-secret, Authorization');
	// 	header('Content-Type: application/json');
	// 	header('Accept: application/json');
	// 	global $_ebsco_document;


	// 	$params = $_REQUEST;
		
	

	// 	// var_dump($params);
	// 	// die();

	// 	// $term = (isset($_GET['term'])) ? $_GET['term'] : '';
	// 	// $token = (isset($_GET['token'])) ? $_GET['token'] : '';
	// 	// $url = (isset($_GET['url'])) ? $_GET['url'] : '';
		
	// 	//$authenticationToken = (isset($_GET['autoCompleteRequest'])) ? $_GET['autoCompleteRequest'] : '';

	// 	// var_dump($params);
	// 	// die();
	// 	if (\Drupal::currentUser()->isAuthenticated()) {
	// 		if (empty($_ebsco_document)) {
	// 			$_ebsco_document = new \EBSCODocument();
	// 		}

	// 		// var_dump($_ebsco_document);
	// 		// die();
	// 		$_ebsco_document->autocomplete();
	// 		//$_ebsco_document->search();	

	// 		// var_dump($_ebsco_document->autocomplete());
	// 		// die();
	// 		$autoCompleteRequest = $_ebsco_document->autocomplete();
	// 		//$authenticationToken
	// 		// var_dump($autoCompleteRequest);
	// 		// die();
	// 		// $requestSearch = $_ebsco_document->search($this->params['lookfor']);
	// 		// var_dump($requestSearch);
	// 		// die();

		
	// 		$result = str_replace('&amp;','&',$autoCompleteRequest);
	// 		//$result = json_encode('&amp;','&',$autoCompleteRequest);
	// 		// $url = json_encode($autoCompleteRequest);

	// 		//$autocomplete_method = $_POST['autocompleteMethod'];
			
	// 		//$url = $autoCompleteRequest;
	// 		$authenticationToken = (isset($_GET[$result['authenticationToken']])) ? $_GET[$result['authenticationToken']] : '';
	// 		$authenticationTimeout = (isset($_GET[$result['authenticationTimeout']])) ? $_GET[$result['authenticationTimeout']] : '';
	// 		$autocompleteUrl = (isset($_GET[$result['autocompleteUrl']])) ? $_GET[$result['autocompleteUrl']] : '';
	// 		$autocompleteToken = (isset($_GET[$result['autocompleteToken']])) ? $_GET[$result['autocompleteToken']] : '';
	// 		$autocompleteTokenTimeOut = (isset($_GET[$result['autocompleteTokenTimeOut']])) ? $_GET[$result['autocompleteTokenTimeOut']] : '';
	// 		$autocompleteCustId = (isset($_GET[$result['autocompleteCustId']])) ? $_GET[$result['autocompleteCustId']] : '';

	// 		// if ($autocomplete_method == 'authorize') {
	// 		// 		authorize();
	// 		// 	}else {
    // 		// 		//get_terms();
	// 		// 	}

			

			
	// 		// var_dump($result);
	// 		// die();
	// 		//$url = json_encode($result);
	// 		//$url = $result;
	// 		//https://global.ac.ebsco-content.com/autocomplete/rest/autoCompletekelanthonyARAApSLVm05T1QT2RkCYNJfm1lGLF/HblRlkSzuEAtPaPpEV1x+2ZU4Cu9ViKMXMchU=

	// 		// link:	"https://global.ac.ebsco-content.com/autocomplete/rest/autoComplete?term=te&idx=rawqueries&filters=\n\t\t\t%5B%7B%22name%22%3A%22custid%22%2C%22values%22%3A%22kelanthony%22%7D%5D&token=ARCWsZr7B9jrwJR2oxygIHW729yH2QYiQQw7QfoVH5joIEHhyQYrR6QPQ+xK1LyyGhY="
			
	// 		// $newurl = $result['autocompleteUrl'] . $result['autocompleteCustId'] . $result['autocompleteToken'];
	// 		// $newurl = $result['autocompleteUrl'] .'?term=te&idx=rawqueries&filters=\n\t\t\t%5B%7B%22name%22%3A%22custid%22%2C%22values%22%3A%22'. $result['autocompleteCustId'] .'%22%7D%5D&token=' . $result['autocompleteToken'] . '';
	// 		//$newurl = $result['autocompleteUrl'] . $term . $result['autocompleteCustId'];
	// 		//$newurl = ' . $result['autocompleteUrl'] .' .?term=te&idx=rawqueries&filters=
	// 		// [{"name":"custid","values":" '. $result['autocompleteCustId'] . ' "}]&token=';
	// 		// $newurl = '' . $result['autocompleteUrl'] . '?term=te&idx=rawqueries&filters=
	// 		// [{"name":"custid","values":"' . $result['autocompleteCustId'] . '"}]&token=' . $result['autocompleteToken'] . '';

	// 		//$term = '?term=te&idx=rawqueries&filters=%5B%7B%22name%22%3A%22custid%22%2C%22values%22%3A%22';

	// 		$newurl = '' . $result['autocompleteUrl'] . '?term=te&idx=rawqueries&filters=
	// 		%5B%7B%22name%22%3A%22custid%22%2C%22values%22%3A%22' . $result['autocompleteCustId'] . '%22%7D%5D&token=' . $result['autocompleteToken'] . '';
			

			
	// 		$curl = curl_init();
	// 		curl_setopt($curl, CURLOPT_URL, $result['autocompleteUrl']);
	// 		curl_setopt($curl, CURLOPT_POST, count($result));
	// 		//curl_setopt($curl, CURLOPT_POSTFIELDS, $url);
	// 		curl_setopt($curl, CURLOPT_POSTFIELDS, $newurl);
	// 		curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
	// 		curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type: application/json', 'Accept: application/json'));
	// 		curl_setopt($curl, CURLOPT_VERBOSE, 1);
	// 		$result = curl_exec($curl);

	// 		$newArray = array('link' => $newurl);
	// 		$final = json_encode($newArray);
	// 		//$final = json_encode($newurl);
			
	// 		//$newArray = array(array('link' => $final));
			
	// 		//echo $newArray;
	// 		// var_dump($final);
	// 		// die();
	// 		echo $final;
	// 		curl_close($curl);
			
	// 		// var_dump($newurl);
	// 		// die();
	// 		// redirect on the new window
	// 		//header('Location: '.$url);
	// 		header('Location: '.$newurl);
	// 		die();
	// 	}
	// 	else 
	// 	{
	// 		$_SESSION['EBSCO']['redirect'] = drupal_get_destination();
	// 		return new RedirectResponse(\Drupal::url('user.page'));
	// 	}

	// 	//return $build;
	
	// }

	public function autocomplete_detail() {
		header('Access-Control-Allow-Origin "*"');
		header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
		header('Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, 
		Accept, x-client-key, x-client-token, x-client-secret, Authorization');
		header('Content-Type: application/json');
		header('Accept: application/json');
		global $_ebsco_document;


		$params = $_REQUEST;
		
	

		// var_dump($params);
		// die();

		// $term = (isset($_GET['term'])) ? $_GET['term'] : '';
		// $token = (isset($_GET['token'])) ? $_GET['token'] : '';
		// $url = (isset($_GET['url'])) ? $_GET['url'] : '';
		
		//$authenticationToken = (isset($_GET['autoCompleteRequest'])) ? $_GET['autoCompleteRequest'] : '';

		// var_dump($params);
		// die();
		if (\Drupal::currentUser()->isAuthenticated()) {
			if (empty($_ebsco_document)) {
				$_ebsco_document = new \EBSCODocument();
			}

			// var_dump($_ebsco_document);
			// die();
			$_ebsco_document->autocomplete();
			//$_ebsco_document->search();	

			// var_dump($_ebsco_document->autocomplete());
			// die();
			$autoCompleteRequest = $_ebsco_document->autocomplete();
			//$authenticationToken
			// var_dump($autoCompleteRequest);
			// die();
			// $requestSearch = $_ebsco_document->search($this->params['lookfor']);
			// var_dump($requestSearch);
			// die();

		
			$result = str_replace('&amp;','&',$autoCompleteRequest);
			//$result = json_encode('&amp;','&',$autoCompleteRequest);
			// $url = json_encode($autoCompleteRequest);

			//$autocomplete_method = $_POST['autocompleteMethod'];
			
			$url = $autoCompleteRequest;
			// $authenticationToken = (isset($_GET[$result['authenticationToken']])) ? $_GET[$result['authenticationToken']] : '';
			// $authenticationTimeout = (isset($_GET[$result['authenticationTimeout']])) ? $_GET[$result['authenticationTimeout']] : '';
			// $autocompleteUrl = (isset($_GET[$result['autocompleteUrl']])) ? $_GET[$result['autocompleteUrl']] : '';
			// $autocompleteToken = (isset($_GET[$result['autocompleteToken']])) ? $_GET[$result['autocompleteToken']] : '';
			// $autocompleteTokenTimeOut = (isset($_GET[$result['autocompleteTokenTimeOut']])) ? $_GET[$result['autocompleteTokenTimeOut']] : '';
			// $autocompleteCustId = (isset($_GET[$result['autocompleteCustId']])) ? $_GET[$result['autocompleteCustId']] : '';

			// if ($autocomplete_method == 'authorize') {
			// 		authorize();
			// 	}else {
    		// 		//get_terms();
			// 	}

			$buildAutocomplete = [];

			// $buildAutocomplete['content'] = [
			// 	'#markup' => '<div id="lookfortest2">' . $this->t('My Test inside of controller autocomplete') . '</div>',
			// ];

			$buildAutocomplete['#attached']['library'][] = 'ebsco/autocomplete';
			// $buildAutocomplete['#attached']['drupalSettings']['autocomplete']['title'] = $this->config('system.site')->get('name');
			$buildAutocomplete['#attached']['drupalSettings']['autocomplete']['authenticationToken'] = $url['authenticationToken'];
			$buildAutocomplete['#attached']['drupalSettings']['autocomplete']['authenticationTimeout'] = $url['authenticationTimeout'];
			$buildAutocomplete['#attached']['drupalSettings']['autocomplete']['autocompleteUrl'] = $url['autocompleteUrl'];
			$buildAutocomplete['#attached']['drupalSettings']['autocomplete']['autocompleteToken'] = $url['autocompleteToken'];
			$buildAutocomplete['#attached']['drupalSettings']['autocomplete']['autocompleteTokenTimeOut'] = $url['autocompleteTokenTimeOut'];
			$buildAutocomplete['#attached']['drupalSettings']['autocomplete']['autocompleteCustId'] = $url['autocompleteCustId'];

			$authenticationToken = $url['authenticationToken'];
			$authenticationTimeout = $url['authenticationTimeout'];
			$autocompleteUrl = $url['autocompleteUrl'];
			$autocompleteToken = $url['autocompleteToken'];
			$autocompleteTokenTimeOut = $url['autocompleteTokenTimeOut'];
			$autocompleteCustId = $url['autocompleteCustId'];

			// var_dump($url);
			// die();
			
			return $buildAutocomplete;
			
			// var_dump($result);
			// die();
			//$url = json_encode($result);
			//$url = $result;
			//https://global.ac.ebsco-content.com/autocomplete/rest/autoCompletekelanthonyARAApSLVm05T1QT2RkCYNJfm1lGLF/HblRlkSzuEAtPaPpEV1x+2ZU4Cu9ViKMXMchU=

			// link:	"https://global.ac.ebsco-content.com/autocomplete/rest/autoComplete?term=te&idx=rawqueries&filters=\n\t\t\t%5B%7B%22name%22%3A%22custid%22%2C%22values%22%3A%22kelanthony%22%7D%5D&token=ARCWsZr7B9jrwJR2oxygIHW729yH2QYiQQw7QfoVH5joIEHhyQYrR6QPQ+xK1LyyGhY="
			
			// $newurl = $result['autocompleteUrl'] . $result['autocompleteCustId'] . $result['autocompleteToken'];
			// $newurl = $result['autocompleteUrl'] .'?term=te&idx=rawqueries&filters=\n\t\t\t%5B%7B%22name%22%3A%22custid%22%2C%22values%22%3A%22'. $result['autocompleteCustId'] .'%22%7D%5D&token=' . $result['autocompleteToken'] . '';
			//$newurl = $result['autocompleteUrl'] . $term . $result['autocompleteCustId'];
			//$newurl = ' . $result['autocompleteUrl'] .' .?term=te&idx=rawqueries&filters=
			// [{"name":"custid","values":" '. $result['autocompleteCustId'] . ' "}]&token=';
			// $newurl = '' . $result['autocompleteUrl'] . '?term=te&idx=rawqueries&filters=
			// [{"name":"custid","values":"' . $result['autocompleteCustId'] . '"}]&token=' . $result['autocompleteToken'] . '';

			//$term = '?term=te&idx=rawqueries&filters=%5B%7B%22name%22%3A%22custid%22%2C%22values%22%3A%22';

			// $newurl = '' . $result['autocompleteUrl'] . '?term=te&idx=rawqueries&filters=
			// %5B%7B%22name%22%3A%22custid%22%2C%22values%22%3A%22' . $result['autocompleteCustId'] . '%22%7D%5D&token=' . $result['autocompleteToken'] . '';
			

			
			// $curl = curl_init();
			// curl_setopt($curl, CURLOPT_URL, $result['autocompleteUrl']);
			// curl_setopt($curl, CURLOPT_POST, count($result));
			// //curl_setopt($curl, CURLOPT_POSTFIELDS, $url);
			// curl_setopt($curl, CURLOPT_POSTFIELDS, $newurl);
			// curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
			// curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type: application/json', 'Accept: application/json'));
			// curl_setopt($curl, CURLOPT_VERBOSE, 1);
			// $result = curl_exec($curl);

			// $newArray = array('link' => $newurl);
			// $final = json_encode($newArray);
			// //$final = json_encode($newurl);
			
			// //$newArray = array(array('link' => $final));
			
			// //echo $newArray;
			// // var_dump($final);
			// // die();
			// echo $final;
			// curl_close($curl);
			
			// var_dump($newurl);
			// die();
			// redirect on the new window
			header('Location: '.$url);
			//header('Location: '.$newurl);
			die();
		}
		else 
		{
			$_SESSION['EBSCO']['redirect'] = drupal_get_destination();
			return new RedirectResponse(\Drupal::url('user.page'));
		}

		//return $build;
	
	}
	
	// private function authorize(){
	// 		$url = json_encode($result);

	// 		$curl = curl_init();
	// 		curl_setopt($curl, CURLOPT_URL, $result['autocompleteUrl']);
	// 		curl_setopt($curl, CURLOPT_POST, count($result));
	// 		curl_setopt($curl, CURLOPT_POSTFIELDS, $url);
	// 		curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
	// 		curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type: application/json', 'Accept: application/json'));
	// 		curl_setopt($curl, CURLOPT_VERBOSE, 1);
	// 		$result = curl_exec($curl);
	// 		//echo json_encode($url);
	// 		echo $url;
	// 		curl_close($curl);

	// 		var_dump($url);
	// 		die();
	// 		// redirect on the new window
	// 		header('Location: '.$url);
	// 		die();
	// }
	// public function autocomplete() {
	// 	global $_ebsco_document;
	// 	$params = $_REQUEST;

	// 	// var_dump($params);
	// 	// die();
	// 	if (\Drupal::currentUser()->isAuthenticated()) {
	// 		if (empty($_ebsco_document)) {
	// 			$_ebsco_document = new \EBSCODocument();
	// 		}

	// 		// var_dump($_ebsco_document);
	// 		// die();
	// 		$_ebsco_document->autocomplete();
	// 		// var_dump($_ebsco_document->autocomplete());
	// 		// die();
	// 		$autoCompleteRequest = $_ebsco_document->autocomplete();
	// 		// var_dump($record);
	// 		// die();
	// 		//$url=str_replace('&amp;','&',$autoCompleteRequest);
	// 		//$url = json_encode($autoCompleteRequest);
	// 		$url = json_encode($autoCompleteRequest);
	// 		// var_dump($url);
	// 		// die();
		
	// 		// redirect on the new window
	// 		header('Location: '.$url);
	// 		die();
	// 	}
	// 	else 
	// 	{
	// 		$_SESSION['EBSCO']['redirect'] = drupal_get_destination();
	// 		return new RedirectResponse(\Drupal::url('user.page'));
	// 	}
	
	// }

	public function autocomplete() {
		$is_xhr = !empty($_SERVER['HTTP_X_REQUESTED_WITH']) && $_SERVER['HTTP_X_REQUESTED_WITH'] == 'XMLHttpRequest';
		
		// var_dump($is_xhr);
		// die();
		$build = [];

		$build['content'] = [
			'#markup' => '<div id="lookfortest">' . $this->t('My Test inside of controller autocomplete_detail') . '</div>',
		];

		$build['#attached']['library'][] = 'ebsco/autocomplete';
		// $build['#attached']['drupalSettings']['autocomplete']['title'] = $this->config('system.site')->get('name');
		$build['#attached']['drupalSettings']['autocomplete']['user'] = \Drupal::config('ebsco.settings')->get('ebsco_user');

		$build['#attached']['drupalSettings']['autocomplete']['password'] = \Drupal::config('ebsco.settings')->get('ebsco_password');


		//$test = $this->buildAuthenticationToken();
		//var_dump($this->config('ebsco.info'));
		//$test = $_ebsco_document->apiSessionToken();
		$userController = \Drupal::config('ebsco.settings')->get('ebsco_user');
		$passwordController = \Drupal::config('ebsco.settings')->get('ebsco_password');
		// var_dump(\Drupal::config('ebsco.settings'));
		// die();
    
		return $build;

		if (\Drupal::currentUser()->isAuthenticated()) {
			if ($is_xhr) {
				
				return [
				'#theme' => 'ebsco_autocomplete_detail'
				];
				return true;
			}
			else {
				return [
				'#theme' => 'ebsco_autocomplete_detail'
				];

			}
		}
		else {
			$_SESSION['EBSCO']['redirect'] = drupal_get_destination();
			if ($is_xhr) {
				echo "<script type=\"text/javascript\">window.location.href = '" . \Drupal\Core\Url::fromRoute('user.page')->toString() . "';</script>";
				return;
			}
			else {
				$_SESSION['EBSCO']['redirect'] = drupal_get_destination();
				return new RedirectResponse(\Drupal::url('user.page'));		
		}
		}

	
		//return $build;
	}
	
}
