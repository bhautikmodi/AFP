<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Contact extends CI_Controller {


	public function __construct() {
	
		parent::__construct();
		
		$this->load->model('Contact_model');
		
	}
	

	
	public function add() {
		
		$post_Contact = json_decode(trim(file_get_contents('php://input')), true);		

		// if ($post_Contact) {
		// 	if($post_Contact['ContactId'] > 0){
		// 		$result = $this->Contact_model->edit_Contact($post_Contact);
		// 		if($result) {
		// 			echo json_encode($post_Contact);	
		// 		}	
		// 	} else {
				$result = $this->Contact_model->add_Contact($post_Contact);
				if($result) {
					echo json_encode('success');	
				}	
		// 	}							
		// }
		
	}
	
	// public function getById($Configuration_id = NULL) {
		
	// 	if (!empty($Configuration_id)) {
	// 		$data = [];		
	// 		$data = $this->CourseLevel_model->get_CourseLeveldata($Configuration_id);
	// 		echo json_encode($data);			
	// 	}
	// }	
	public function getById($CId=null)
	{	
		
		if(!empty($CId))
		{
			$data=[];
			$data=$this->Contact_model->get_userdata($CId);
			echo json_encode($data);
		}
	}

	
	
}
