<?php
defined('BASEPATH') OR exit('No direct script access allowed');
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: *');
header('Content-Type: application/json');

class Userrole extends CI_Controller 
{	
	public function __construct()
	{
		parent::__construct();
		$this->load->model('Userrole_model');
	}
	
	
	public function addUserrole()
	{
		$post_userrole = json_decode(trim(file_get_contents('php://input')), true);
		if ($post_userrole) 
			{
				if($post_userrole['RoleId']>0)
				{
					$result = $this->Userrole_model->edit_userrole($post_userrole);
					if($result)
					{
						echo json_encode($post_userrole);	
					}	
				}
				else
				{
					
					$result = $this->Userrole_model->add_userrole($post_userrole); 
					if($result)
					{
						echo json_encode($post_userrole);	
					}	

				}
					
			}
	}
	
	
	//Delete UserList
	public function delete($role_id = NULL) 
	{
		//$this->load->model('Country_model');
		if(!empty($role_id)) {

			$result = $this->Userrole_model->delete_userrole($role_id);			
			if($result) {
				echo json_encode("Delete successfully");	
			}	
			
		} 
			
	}
	
	//get userId edit
	public function getById($role_id=null)
	{	
		//$this->load->model('Country_model');
		if(!empty($role_id))
		{
			$data=[];
			$data=$this->Userrole_model->get_userroledata($role_id);
			echo json_encode($data);
		}
	}
	
	
	
	// public function getAllCountry()
	// {
		// $data="";
		// $this->load->model('Country_model');
		// $data=$this->Country_model->getlist_country();
		// //print_r($data);
		// //.exit;
		// echo json_encode($data);
	// }
	
	
	

	public function getAll()
	{
		$data="";
		
		$data=$this->Userrole_model->getlist_userrole();
		
		echo json_encode($data);
	}
	
	// // List all state
	// public function getAllState()
	// {
		// $data="";
		// $this->load->model('State_model');
		// $data=$this->State_model->getlist_state();
		
		// echo json_encode($data);
	// }
	
	// // List all company
	// public function getAllCompany()
	// {
		// $data="";
		// $this->load->model('Company_model');
		// $data=$this->Company_model->getlist_company();
		// //print_r($data);
		// //.exit;
		// echo json_encode($data);
	// }
}
