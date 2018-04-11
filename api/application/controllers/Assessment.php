<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Assessment extends CI_Controller {


    public function __construct() {
	
		parent::__construct();
		
		$this->load->model('Assessment_model');
		
	}
	
	public function getAllKSA() {
		
		$data="";
		$data=$this->Assessment_model->getlist_ksa();		
		echo json_encode($data);
				
	}

}
