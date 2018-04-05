<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Common extends CI_Controller {


    public function __construct() {
	
		parent::__construct();
		
		$this->load->model('Common_model');
		
	}
	
	public function get_permissiondata() {
		
		$post_permission = json_decode(trim(file_get_contents('php://input')), true);		

		if ($post_permission) {
			$data = "";		
			$data = $this->Common_model->get_permissiondata($post_permission);
			echo json_encode($data);						
		}
				
	}	
	
}
