<?php

class Reset_model extends CI_Model
{
	
	public function reset_pass($post_pass) 
	{
		if($post_pass)
		{
			
			$pass_data = array(
				'Password' => md5($post_pass['Password']),
				
				'Status' =>1,
						
				'CreatedOn' => date('y-m-d H:i:s'),
				'UpdatedOn' => date('y-m-d H:i:s')
				
			);
			
			$this->db->where('UserId',$post_pass['UserId']);
			$this->db->where('Status',0);
			$res = $this->db->update('tbluser',$pass_data);
			
			if($res) 
			{
				return true;
			} 
			else
			{
			 return false;
			}
				
		} 
		else
		{
				return false;
		}
				
				
				
	
		
	}

	
	
	
	
	
	
	
	
	
}