param (
    [string]$dataset = "production"
)

Write-Host ""
Write-Host "============================================" -ForegroundColor Blue
Write-Host " Sanity Portfolio Data Import Script"
Write-Host "============================================" -ForegroundColor Blue
Write-Host ""

# Check Sanity CLI
if (-not (Get-Command sanity -ErrorAction SilentlyContinue)) {
    Write-Host "Error: Sanity CLI is not installed." -ForegroundColor Red
    Write-Host "Install with: npm install -g @sanity/cli" -ForegroundColor Yellow
    exit 1
}

# Check if we're in the Data directory
if (-not (Test-Path "skills.ndjson")) {
    Write-Host "Not in the Data directory. Attempting to navigate..." -ForegroundColor Yellow
    if (Test-Path "Data") {
        Set-Location Data
        Write-Host "Found Data directory" -ForegroundColor Green
    } else {
        Write-Host "Error: Cannot find Data directory with .ndjson files" -ForegroundColor Red
        exit 1
    }
}

Write-Host "Dataset: $dataset" -ForegroundColor Cyan
Write-Host "Import Mode: Replace existing documents" -ForegroundColor Cyan
Write-Host ""

# Confirm before import
$confirmation = Read-Host "Continue with import? This will replace existing documents. [y/N]"
if ($confirmation -ne 'y' -and $confirmation -ne 'Y') {
    Write-Host "Import cancelled." -ForegroundColor Red
    exit 0
}

Write-Host ""
Write-Host "Starting import..." -ForegroundColor Green
Write-Host ""

# List of files
$files = @(
    "skills.ndjson",
    "profile.ndjson",
    "education.ndjson",
    "experience.ndjson",
    "projects.ndjson",
    "blog.ndjson",
    "services.ndjson",
    "achievements.ndjson",
    "certifications.ndjson",
    "testimonials.ndjson",
    "navigation.ndjson",
    "siteSettings.ndjson",
    "contact.ndjson"
)

$total = $files.Count
$current = 0

foreach ($file in $files) {
    $current++
    if (Test-Path $file) {
        Write-Host "[$current/$total] Importing $file..." -ForegroundColor Blue
        try {
            sanity dataset import $file $dataset --replace | Out-Null
            Write-Host "Successfully imported $file" -ForegroundColor Green
        } catch {
            Write-Host "Failed to import $file" -ForegroundColor Red
            exit 1
        }
        Write-Host ""
    } else {
        Write-Host "Warning: $file not found, skipping..." -ForegroundColor Yellow
        Write-Host ""
    }
}

Write-Host "============================================" -ForegroundColor Green
Write-Host " Import Complete!"
Write-Host "============================================" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "  1. Visit your Sanity Studio to verify the data"
Write-Host "  2. Upload images to documents with image fields"
Write-Host "  3. Customize with your actual information"
Write-Host "  4. Test your frontend application"
Write-Host ""
Write-Host "Happy building!" -ForegroundColor Green
