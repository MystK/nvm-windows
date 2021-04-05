@ECHO OFF

SETLOCAL

SET "NODE_EXE=%~dp0\node\node.exe"

SET "NVM_CLI_JS=%~dp0\index.js"

"%NODE_EXE%" "%NVM_CLI_JS%" %*
