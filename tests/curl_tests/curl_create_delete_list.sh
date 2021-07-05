
fk_idlist=$(./curl_create_list.sh list1)
read -p "any key to continue"
./curl_delete_list.sh $fk_idlist 
