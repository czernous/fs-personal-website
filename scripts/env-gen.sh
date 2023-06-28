#!/bin/bash
cd "$(dirname "${BASH_SOURCE[0]}")/../" || exit

if [ $# -ne 2 ]; then
  echo "Usage: $0 <source> <output>"
  exit 1
fi

arg1="$1"
arg2="$2"

./env-gen/target/x86_64-unknown-linux-gnu/release/env-gen $arg1 $arg2