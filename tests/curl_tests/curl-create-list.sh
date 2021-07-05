set -xv 
LISTNAME=$1

source env.sh
INPUT_FILE="req-create-list.json"
SERVICE="/lists/create"
HTTP_VERB="-X POST"

sed "s/changeme/${LISTNAME}/" ${INPUT_FILE} >> ${OUTPUT_REQ_TEMP_FILE}

fk_idlist=$(curl -Is ${HTTP_VERB} -H "${CURL_OPTIONS}" --data "@${OUTPUT_REQ_TEMP_FILE}" ${URL}${SERVICE} | jq .data._id)

rm ${OUTPUT_REQ_TEMP_FILE}
printf %s ${fk_idlist} | sed 's/\"//g'
set +xv 