$backupFolder = "/backup/"

$dumpName = "mongo_dump_"
$currentDate = Get-Date -Format "MM_dd_yyyy"

if (Test-Path -Path ".env") {
    # Load Environment Variables
    Get-Content .env | Where-Object { $_ -notmatch '^#' -and $_ -match '=' } | ForEach-Object {
        $envVar = $_ -split '='
        $envVarName = $envVar[0].Trim()
        $envVarValue = $envVar[1].Trim()
        Set-Item -Path "env:$envVarName" -Value $envVarValue
    }
    # For instance, will be example_kaggle_key
    Write-Host $env:API_DB_URL
    docker exec -it fs-freelance-app-db sh -c "mongodump -u $env:API_DB_USER --db=blog -p $env:API_DB_PASSWORD --authenticationDatabase=admin --archive=$backupFolder$dumpName$currentDate.gz --gzip -vvv"
}
