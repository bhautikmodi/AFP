<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class RatingScale extends CI_Controller {


    public function __construct() {
	
		parent::__construct();
		
		$this->load->model('Rating_Scale_model');
		
	}
	
	public function getAll() {
		
		$data="";
		
		$data=$this->Rating_Scale_model->getlist_ratingscale();
		
		echo json_encode($data);
				
	}
	
	
	public function add() {
		
		$post_ratingscale = json_decode(trim(file_get_contents('php://input')), true);		

		if ($post_ratingscale) {
			if($post_ratingscale['RatingScaleId'] > 0){
				$result = $this->Rating_Scale_model->edit_ratingscale($post_ratingscale);
				if($result) {
					echo json_encode($post_ratingscale);	
				}	
			} else {
				$result = $this->Rating_Scale_model->add_ratingscale($post_ratingscale);
				if($result) {
					echo json_encode($post_ratingscale);	
				}	
			}							
		}
		
	}
	
	public function getById($ratingscale_id = NULL) {
		
		if (!empty($ratingscale_id)) {
			$data = [];		
			$data = $this->Rating_Scale_model->get_ratingscaledata($ratingscale_id);
			echo json_encode($data);			
		}
	}	
	
	public function delete($ratingscale_id = NULL) {
		
		if(!empty($ratingscale_id)) {

			$result = $this->Rating_Scale_model->delete_ratingscale($ratingscale_id);			
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
