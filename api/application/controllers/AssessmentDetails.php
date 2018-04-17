<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class AssessmentDetails extends CI_Controller {


	public function __construct() {
	
		parent::__construct();
		
		$this->load->model('AssessmentDetails_model');
		
	}
	
	public function CheckAssessment($UserId = NULL) {
		
		if (!empty($UserId)) {
			$data="";
			$data=$this->AssessmentDetails_model->CheckAssessment($UserId);		
			echo json_encode($data);			
		}				
	}	
	
	public function add() {
		
		$post_AssessmentDetails = json_decode(trim(file_get_contents('php://input')), true);		

		if ($post_AssessmentDetails) 
		{
		
				$result = $this->AssessmentDetails_model->add_AssessmentDetails($post_AssessmentDetails);
				if($result) {
					echo json_encode($result); 				
				}							
		}
		
	}
	
	
	
	public function getAllTeamSize() {
		
		$data="";
		
		$data=$this->AssessmentDetails_model->getTeamSizeList();
		
		echo json_encode($data);
				
	}
	
	
}
