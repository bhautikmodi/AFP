<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Salesuser extends CI_Controller {


	public function __construct() {
	
		parent::__construct();
		
		$this->load->model('Salesuser_model');
		
	}

	// public function getAllAssement($UserId = NULL) {
		
	// 	if (!empty($UserId)) {
	// 		$data="";
	// 		$data['complete']=$this->Salesuser_model->getAllAssement($UserId);	
	// 		$data['pending']=$this->Salesuser_model->getPendingAssement($UserId);		
	// 		echo json_encode($data);			
	// 	}				
	// }

	public function getUserAssessDetail($CAssessmentId = NULL) {
		
		if (!empty($CAssessmentId)) {
			$data="";
			$data['domain']=$this->Salesuser_model->getUserAssessDetail($CAssessmentId);
			$data['perdomain']=$this->Salesuser_model->getUserAssessDomain($CAssessmentId);
			$data['ratingscale']=$this->Salesuser_model->getUserAssessRating($CAssessmentId);
			$data['areaksa']=$this->Salesuser_model->getUserAssessareaksa($CAssessmentId);
			$data['rcourse']=$this->Salesuser_model->getReCommendcourse($CAssessmentId);
			$data['ksa']=$this->Salesuser_model->getUserksa($CAssessmentId);
			$data['assessment']=$this->Salesuser_model->getUserassessment($CAssessmentId);
			echo json_encode($data);			
		}				
	}
	
}
