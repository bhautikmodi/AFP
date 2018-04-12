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
			
				$this->db->select('*');				
				$this->db->where('UserId',$post_passlink['UserId']);
				$this->db->where('EmailAddress',$post_passlink['EmailAddress']);
				$this->db->where('VCode',$post_passlink['VCode']);
				
				$this->db->limit(1);
				$this->db->from('tbluser');
			    $query= $this->db->get();
			
				
				if ($query->num_rows() == 1) 
				{
					$pass_data = array(
						//'Status' =>0,
						'VCode' =>'',
						
						//'CreatedOn' => date('y-m-d H:i:s'),
						'UpdatedOn' => date('y-m-d H:i:s')
						);
				
				
			
					$this->db->where('UserId',$post_pass['UserId']);
					$this->db->where('VCode',$post_pass['VCode']);
					$res = $this->db->update('tbluser',$pass_data);
					if($res)
					{
					    $pass = array();
						foreach($query->result() as $row) 
						{
							$pass = $row;
						}
						return $pass;
					}else
					{
						return false;
					}
				
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
	
	
	public function reset_passlink2($post_passlink) 
	{
		if($post_passlink)
		{
			
				$this->db->select('*');				
				$this->db->where('UserId',$post_passlink['UserId']);
				//$this->db->where('EmailAddress',$post_pass['EmailAddress']);
				$this->db->where('VCode',$post_passlink['VCode']);
				
				$this->db->limit(1);
				$this->db->from('tbluser');
			    $query= $this->db->get();
			
				
				if ($query->num_rows() == 1) 
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