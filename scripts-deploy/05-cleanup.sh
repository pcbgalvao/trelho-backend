#!/bin/bash

aws --profile admin-acc2 iam detach-role-policy --role-name lambda-ex
aws --profile admin-acc2 iam delete-role --role-name=lambda-ex
aws --profile admin-acc2 lambda delete-function --function-name my-function

