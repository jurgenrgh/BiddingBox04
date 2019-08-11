#!/usr/bin/bash

echo "Run Documentationjs. Output to www/docs."
documentation build ./www/js/** -f html -o ./www/js/docs -c ./www/js/documentation.yml --project-name="Bidding Box 04" 