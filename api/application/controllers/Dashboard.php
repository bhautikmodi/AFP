<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Dashboard extends CI_Controller {


	public function __construct() {
	
		parent::__construct();
		
		$this->load->model('Dashboard_model');
		
	}
	
	public function getAll() {
		
		$data="";
		
		$result=$this->Dashboard_model->getlist_User();
       $data['user']=$result;
	   
	   $result1=$this->Dashboard_model->getlist_Domain();
	   $data['domain']=$result1;
	   
	   $result2=$this->Dashboard_model->getlist_Carea();
	   $data['Carea']=$result2;
	   
	    $result3=$this->Dashboard_model->getlist_Tksa();
	   $data['Tksa']=$result3;
	   
	  
	    $result4=$this->Dashboard_model->getlist_Course();
	   $data['Course']=$result4;
	   
		echo json_encode($data);
				
	}
		

	
	
}