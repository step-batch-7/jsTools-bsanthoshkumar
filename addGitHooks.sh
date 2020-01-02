#!/bin/bash

cat <<EOF > .git/hooks/pre-commit  
npm run allTests && npm run linter
if [ \$? != 0 ]; then 
    exit 1
fi
EOF

chmod +x .git/hooks/pre-commit