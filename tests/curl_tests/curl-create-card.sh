FK_IDLIST=$1
CARD_TITLE=$2
CARD_DESCRIPTION=$3

source env.sh
INPUT_FILE="req-create-card"
SERVICE="/cards/create"
HTTP_VERB="-X POST"

cat <<EOF > ${OUTPUT_REQ_TEMP_FILE}
{
    "title": "${CARD_TITLE}",
    "description": "${CARD_DESCRIPTION}",
    "fk_iduser":"1",
    "fk_idlist":"${FK_IDLIST}"
}
EOF

curl ${HTTP_VERB} -H "${CURL_OPTIONS}" --data "@${OUTPUT_REQ_TEMP_FILE}" ${URL}${SERVICE}

rm ${OUTPUT_REQ_TEMP_FILE}

