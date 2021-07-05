set -xv 
fk_idlist=$(./curl-create-list.sh list1)
./curl-create-card.sh $fk_idlist card1 desc
set +xv 