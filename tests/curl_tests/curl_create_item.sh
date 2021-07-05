set -xv 
LISTNAME=$1

source env.sh
INPUT_FILE="req-create-item.json"
SERVICE="/items/create"
HTTP_VERB="-X POST"

## sed "s/changeme/${LISTNAME}/" ${INPUT_FILE} >> ${OUTPUT_REQ_TEMP_FILE}

idItem=$(curl ${HTTP_VERB} -H "${CURL_OPTIONS}" --data "@${INPUT_FILE}" ${URL}${SERVICE} | jq .data._id)

## rm ${OUTPUT_REQ_TEMP_FILE}
printf %s ${idItem} | sed 's/\"//g'
set +xv 