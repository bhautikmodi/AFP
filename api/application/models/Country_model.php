<?php

class Country_model extends CI_Model
 {

	public function add_Country($post_Country) {
			if($post_Country['IsActive']==1)
					{
						$IsActive = true;
					} else {
						$IsActive = false;
					}
		if($post_Country) {
			
			$Country_data = array(
				
				'CountryName' => $post_Country['CountryName'],
				'CountryAbbreviation' => $post_Country['CountryAbbreviation'],
				'PhonePrefix' => $post_Country['PhonePrefix'],
				'IsActive' => $IsActive
			
			);
			
			$res = $this->db->insert('tblmstcountry',$Country_data);
			
			if($res) {
				return true;
			} else {
				return false;
			}
	
		} else {
			return false;
		}
	}
	
	public function getlist_Country() {
	
		$this->db->select('CountryId,CountryName,CountryAbbreviation,PhonePrefix,IsActive');
			$this->db->where('IsActive="1"');
		$result = $this->db->get('tblmstcountry');
		$res = array();
		if($result->result()) {
			$res = $result->result();
		}
		return $res;
		
	}
	
	
	public function get_Countrydata($Country_Id = NULL)
	{
		
		if($Country_Id) {
			
			$this->db->select('CountryId,CountryName,CountryAbbreviation,PhonePrefix,IsActive');
			$this->db->where('CountryId',$Country_Id);
			$result = $this->db->get('tblmstcountry');
			
			$Country_data = array();
			foreach($result->result() as $row) {
				$Country_data = $row;
			}
			return $Country_data;
			
		} else {
			return false;
		}
	}
	
	
	public function edit_Country($post_Country) {
	
		if($post_Country) {
			 if($post_Country['IsActive']==1)
					{
						$IsActive = true;
					} else {
						$IsActive = false;
					}
			$Country_data = array(
				'CountryName' => $post_Country['CountryName'],
				'CountryAbbreviation' => $post_Country['CountryAbbreviation'],
				'PhonePrefix' => $post_Country['PhonePrefix'],
				'IsActive' => $IsActive
			
			);
			
			$this->db->where('CountryId',$post_Country['CountryId']);
			$res = $this->db->update('tblmstcountry',$Country_data);
			
			if($res) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}	
	
	}
	
	
	public function delete_Country($Country_Id) {
	
		if($Country_Id) {
			
			$this->db->where('CountryId',$Country_Id);
			$res = $this->db->delete('tblmstcountry');
			
			if($res) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
		
	}
	
}
