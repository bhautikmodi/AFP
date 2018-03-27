<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Competency_Area extends CI_Controller {

	public function __construct() {
	
		parent::__construct();
		
		$this->load->model('Competency_Area_model');
		
	}
	
	public function getAll() {
		
		$data="";
		
		$data=$this->Competency_Area_model->getlist_area();
		
		echo json_encode($data);
				
	}
	
	
	public function add() {
		
		$post_area = json_decode(trim(file_get_contents('php://input')), true);		

		if ($post_area) {
			if($post_area['CAreaId'] > 0){
				$result = $this->Competency_Area_model->edit_area($post_area);
				if($result) {
					echo json_encode($post_area);	
				}	
			} else {
				$result = $this->Competency_Area_model->add_area($post_area);
				if($result) {
					echo json_encode($post_area);	
				}	
			}							
		}
		
	}
	
	public function getById($area_id = NULL) {
		
		if (!empty($area_id)) {
			$data = [];		
			$data = $this->Competency_Area_model->get_areadata($area_id);
			echo json_encode($data);			
		}
	}	
	
	public function delete($area_id = NULL) {
		
		if(!empty($area_id)) {

			$result = $this->Competency_Area_model->delete_area($area_id);
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
	
	public function getDomainList() {
		
		$data="";
		
		$data=$this->Competency_Area_model->getDomainList();
		
		echo json_encode($data);
				
	}
	
}
