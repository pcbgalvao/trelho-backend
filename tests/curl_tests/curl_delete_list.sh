set -xv
IDLIST=$1

source env.sh
SERVICE="/lists/delete"
HTTP_VERB="-X DELETE"

curl -i ${HTTP_VERB} -H "${CURL_OPTIONS}" --data "@${OUTPUT_REQ_TEMP_FILE}" ${URL}${SERVICE}/${IDLIST} 
set xv



