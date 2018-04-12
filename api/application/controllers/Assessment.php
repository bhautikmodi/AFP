<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Assessment extends CI_Controller {


    public function __construct() {
	
		parent::__construct();
		
		$this->load->model('Assessment_model');
		
	}
	
	public function getAllKSA($CAssessmentId = NULL) {
		
		if (!empty($CAssessmentId)) {
			$data="";
			$data=$this->Assessment_model->getlist_ksa($CAssessmentId);		
			echo json_encode($data);			
		}				
	}

	public function saveKsa()
	{		
		$post_ksa = json_decode(trim(file_get_contents('php://input')), true);
		if ($post_ksa) 
		{
			$result = $this->Assessment_model->edit_ksa($post_ksa);
			if($result) {
				echo json_encode($post_ksa);	
			}	
		}
	}

	public function finalSubmit($CAssessmentId = NULL) {
		
		if (!empty($CAssessmentId)) {
			$result=$this->Assessment_model->finalSubmit($CAssessmentId);		
			if($result) {
				echo json_encode('success');	
			}			
		}				
	}

	public function getResult($CAssessmentId = NULL) {
		
		if (!empty($CAssessmentId)) {
			$data="";
			$data=$this->Assessment_model->getResult($CAssessmentId);					
			echo json_encode($data);			
		}				
	}

}
