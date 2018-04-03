<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Domain extends CI_Controller {


    public function __construct() {
	
		parent::__construct();
		
		$this->load->model('Domain_model');
		
	}
	
	public function getAll() {
		
		$data="";
		
		$data=$this->Domain_model->getlist_domain();
		
		echo json_encode($data);
				
	}
	
	
	public function add() {
		
		$post_domain = json_decode(trim(file_get_contents('php://input')), true);		

		if ($post_domain) {
			if($post_domain['DomainId'] > 0){
				$result = $this->Domain_model->edit_domain($post_domain);
				if($result) {
					echo json_encode($post_domain);	
				}	
			} else {
				$result = $this->Domain_model->add_domain($post_domain);
				if($result) {
					echo json_encode($post_domain);	
				}	
			}							
		}
		
	}
	
	public function getById($domain_id = NULL) {
		
		if (!empty($domain_id)) {
			$data = "";		
			$data = $this->Domain_model->get_domaindata($domain_id);
			echo json_encode($data);			
		}
	}	
	
	public function delete($domain_id = NULL) {
		
		if(!empty($domain_id)) {

			$result = $this->Domain_model->delete_domain($domain_id);			
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
