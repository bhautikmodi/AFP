<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Settings extends CI_Controller {


    public function __construct() {
	
		parent::__construct();
		
		$this->load->model('Settings_model');
		
	}
	
	public function getAll() {
		
		$data="";
		
		$data=$this->Settings_model->getlist_teamsize();
		
		echo json_encode($data);
				
	}
	
	
	public function addTeamSize() {
		
		$post_teamsize = json_decode(trim(file_get_contents('php://input')), true);		

		if ($post_teamsize) {
			if($post_teamsize['teamsizeId'] > 0){
				$result = $this->Settings_model->edit_teamsize($post_teamsize);
				if($result) {
					echo json_encode($post_teamsize);	
				}	
			} else {
				$result = $this->Settings_model->add_teamsize($post_teamsize);
				if($result) {
					echo json_encode($post_teamsize);	
				}	
			}							
		}
		
	}
	
	// public function getById($teamsize_id = NULL) {
		
	// 	if (!empty($teamsize_id)) {
	// 		$data = [];		
	// 		$data = $this->Settings_model->get_teamsizedata($teamsize_id);
	// 		echo json_encode($data);			
	// 	}
	// }	
	
	public function delete($teamsize_id = NULL) {
		
		if(!empty($teamsize_id)) {

			$result = $this->Settings_model->delete_teamsize($teamsize_id);			
			if($result) {
				echo json_encode("Delete successfully");	
			} else {
				return $this->output
				->set_status_header(404)
				->set_output(json_encode(array(
						'text' => "You can't delete this record because of their dependency in another table.",
						'type' => 'danger'
				)));
			}
			
		} 
			
	}
	
	
}
