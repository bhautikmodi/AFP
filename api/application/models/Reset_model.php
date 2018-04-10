<?php

class Reset_model extends CI_Model
{
	
	public function reset_pass($post_pass) 
	{
		if($post_pass)
		{
			
			$pass_data = array(
				'Password' =>md5($post_pass['Password']),
				'VCode' =>'',
				'UpdatedOn' => date('y-m-d H:i:s')
				
			);
			
			$this->db->where('UserId',$post_pass['UserId']);
			//$this->db->where('Status',0);
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

	public function reset_passlink($post_passlink) 
	{
		if($post_passlink)
		{
			
			// $pass_datalink = array(
				// 'Password' =>md5($post_passlink['Password']),
				// 'VCode' =>'',
				// 'UpdatedOn' => date('y-m-d H:i:s')
				
			// );
			
			// $this->db->where('UserId',$post_passlink['UserId']);
			// //$this->db->where('Status',0);
			// $res = $this->db->update('tbluser',$pass_datalink);
			
			// if($res) 
			// {
				// return true;
			// } 
			// else
			// {
			 // return false;
			// }
				
		} 
		else
		{
				return false;
		}	
	}
	
	
	
	
	
	
	
	
}