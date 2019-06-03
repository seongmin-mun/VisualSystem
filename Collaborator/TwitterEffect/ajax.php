<?php
header("Access-Control-Allow-Origin", "*");  
header("Access-Control-Allow-Origin: *");
$host="localhost"; //replace with your hostname 
$username="root"; //replace with your username 
$password="idlab123"; //replace with your password 
$db_name="twitter_effect"; //replace with your database 
$q = $_GET['type'];
$con=mysql_connect("$host", "$username", "$password")or die("cannot connect"); 
mysql_select_db("$db_name")or die("cannot select DB");
$sql = "select * from tblUserDesc where fdAdvertiser ='".$q."'"; //replace emp_info with your table name 
$result = mysql_query($sql);
$json = array();
if(mysql_num_rows($result)){
	$a= array();
while($row=mysql_fetch_row($result)){	
	 
	 $array = array();
	 
	 for($count = 0 ; $count < mysql_num_fields($result) ; $count++){         
        
		$array[mysql_field_name($result, $count)] = $row[$count];
                         
	 }	 
	 array_push($a,$array);
}
}
mysql_close($db_name);
echo json_encode($a);
// please refer to our PHP JSON encode function tutorial for learning json_encode function in detail 
?>