$scriptPath = Split-Path -Parent -Path $MyInvocation.MyCommand.Definition
Set-Location "$scriptPath\..\..\"

if (Test-Path -Path ".env") {
    # Load Environment Variables
    Get-Content .env | Where-Object { $_ -notmatch '^#' -and $_ -match '=' } | ForEach-Object {
        $envVar = $_ -split '='
        $envVarName = $envVar[0].Trim()
        $envVarValue = $envVar[1].Trim()
        Set-Item -Path "env:$envVarName" -Value $envVarValue
    }
    # For instance, will be example_kaggle_key
}

$containerBackupFolder = "/backup/"
$restoreFolder = "data/api-db/backup"

if ($args) {
    $backupFile = $args[0]
}
else {
    $backupList = Get-ChildItem -Path $restoreFolder
    if ($backupList.Count -ne 0) {
        Write-Host "Choose the backup file:"
        $backupList | ForEach-Object {
            $index = $backupList.IndexOf($_) + 1
            Write-Host "$index. $_"
        }
        $backupFileNumber = Read-Host "Type the number of file:"
        $backupFile = $backupList[$backupFileNumber - 1]
    }
}

if (-not (Test-Path -Path $backupFile)) {
    Write-Host "File does not exist"
    exit
}

Write-Host "The $($backupFile.Name) is chosen"

$backupArray = $backupFile.FullName -split '/'
$backupName = $backupArray[-1]
if ($backupName -match "structure_") {
    $backupName = $backupName -replace "structure_", ""
    $backupFile = Join-Path $restoreFolder $backupName
}

$containerBackupFilePath = "$containerBackupFolder$backupName"
Write-Host $containerBackupFilePath

Write-Host "Start database recovery"
docker exec -it fs-freelance-app-db sh -c "mongorestore -u $env:API_DB_USER -p $env:API_DB_PASSWORD --authenticationDatabase=admin --gzip --archive=$containerBackupFilePath"

if ($env:REMOVE_BACKUP -eq "Y") {
    Remove-Item -Path $backupFile -Force
}

Write-Host "Database recovery is done"
