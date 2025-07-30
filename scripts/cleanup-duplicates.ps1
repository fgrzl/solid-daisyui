# PowerShell script to identify and flag duplicate GitHub issues
# This script will find duplicate component issues and report them for manual review

# Define the GitHub repository details
$repoOwner = "fgrzl"
$repoName = "solid-daisyui"
$apiUrl = "https://api.github.com/repos/$repoOwner/$repoName/issues"

# Component list to check for duplicates
$components = @(
    "accordion", "alert", "avatar", "badge", "breadcrumbs", "button", "calendar", "card", "carousel", "chat-bubble", "checkbox", "collapse", "countdown", "diff", "divider", "dock", "drawer", "dropdown", "fieldset", "file-input", "filter", "footer", "hero", "indicator", "input", "join", "kbd", "label", "link", "list", "loading", "mask", "menu", "mockup-browser", "mockup-code", "mockup-phone", "mockup-window", "modal", "navbar", "pagination", "progress", "radial-progress", "radio", "range", "rating", "select", "skeleton", "stack", "stat", "status", "steps", "swap", "table", "tabs", "textarea", "theme-controller", "timeline", "toast", "toggle", "tooltip", "validator"
)

# Function to get all issues
function Get-AllIssues {
    Write-Host "Fetching all issues..." -ForegroundColor Cyan
    
    $allIssues = @()
    $page = 1
    $perPage = 100
    
    try {
        do {
            $headers = @{
                "Authorization" = "Bearer $env:GITHUB_TOKEN"
                "Accept" = "application/vnd.github+json"
                "X-GitHub-Api-Version" = "2022-11-28"
                "User-Agent" = "PowerShell-DuplicateChecker"
            }
            
            $url = "$apiUrl" + "?state=all&per_page=$perPage&page=$page"
            Write-Host "  Fetching page $page..." -ForegroundColor Gray
            
            $pageIssues = Invoke-RestMethod -Uri $url -Method Get -Headers $headers
            
            if ($pageIssues) {
                $allIssues += $pageIssues
                Write-Host "  Found $($pageIssues.Count) issues on page $page" -ForegroundColor Cyan
            }
            
            $page++
            Start-Sleep -Milliseconds 300
            
        } while ($pageIssues.Count -eq $perPage)
        
        Write-Host "Successfully retrieved $($allIssues.Count) total issues" -ForegroundColor Green
        return $allIssues
        
    } catch {
        Write-Host "Error fetching issues: $($_.Exception.Message)" -ForegroundColor Red
        return @()
    }
}

# Function to flag duplicate issues with labels
function Flag-DuplicateIssue {
    param (
        [int]$issueNumber,
        [string]$reason = "Duplicate issue identified"
    )
    
    try {
        $headers = @{
            "Authorization" = "Bearer $env:GITHUB_TOKEN"
            "Accept" = "application/vnd.github+json"
            "X-GitHub-Api-Version" = "2022-11-28"
        }
        
        # Add a label to mark as duplicate
        $labelBody = @{
            "labels" = @("duplicate", "needs-review")
        } | ConvertTo-Json
        
        Invoke-RestMethod -Uri "$apiUrl/$issueNumber/labels" -Method Post -Headers $headers -Body $labelBody -ContentType "application/json"
        
        # Add a comment explaining the duplication
        $commentBody = @{
            "body" = "**Duplicate Issue Detected**`n`n$reason`n`nThis issue has been flagged for manual review. Please check if this is a duplicate and close if necessary."
        } | ConvertTo-Json
        
        Invoke-RestMethod -Uri "$apiUrl/$issueNumber/comments" -Method Post -Headers $headers -Body $commentBody -ContentType "application/json"
        
        Write-Host "  Flagged duplicate issue #$issueNumber" -ForegroundColor Yellow
        return $true
        
    } catch {
        Write-Host "  Failed to flag issue #$issueNumber`: $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

# Check if GitHub token is available
if (-not $env:GITHUB_TOKEN) {
    Write-Host "Error: GITHUB_TOKEN environment variable is not set!" -ForegroundColor Red
    Write-Host "Please set your GitHub Personal Access Token:" -ForegroundColor Yellow
    Write-Host '$env:GITHUB_TOKEN = "your_token_here"' -ForegroundColor Cyan
    exit 1
}

Write-Host "Starting duplicate issue identification..." -ForegroundColor Green
Write-Host "Repository: $repoOwner/$repoName" -ForegroundColor Cyan
Write-Host ""

# Get all issues
Write-Host "Fetching all issues..." -ForegroundColor Cyan
$allIssues = Get-AllIssues

# Filter out pull requests
$actualIssues = $allIssues | Where-Object { -not $_.pull_request }
Write-Host "Found $($actualIssues.Count) total issues (excluding pull requests)" -ForegroundColor Cyan

# Group issues by component and find duplicates
$duplicatesFound = 0
$duplicatesFlagged = 0
$duplicatesList = @()

foreach ($component in $components) {
    Write-Host "Checking for duplicates: $component" -ForegroundColor Yellow
    
    # Find all issues for this component
    $componentIssues = $actualIssues | Where-Object { 
        $_.title -like "*$component*Component*" -or
        $_.title -like "*Implement*$component*" -or
        $_.title -eq "Implement $component Component with DaisyUI Standards in SolidJS"
    } | Sort-Object created_at -Descending
    
    if ($componentIssues.Count -gt 1) {
        Write-Host "  Found $($componentIssues.Count) issues for $component" -ForegroundColor Magenta
        $duplicatesFound += ($componentIssues.Count - 1)
        
        # Keep the most recent (first in sorted list), flag the rest
        $keepIssue = $componentIssues[0]
        $duplicateIssues = $componentIssues[1..($componentIssues.Count - 1)]
        
        Write-Host "  Recommended to keep: #$($keepIssue.number) (created: $($keepIssue.created_at))" -ForegroundColor Green
        
        # Add to duplicates list for summary
        $duplicateInfo = [PSCustomObject]@{
            Component = $component
            KeepIssue = $keepIssue.number
            KeepTitle = $keepIssue.title
            KeepCreated = $keepIssue.created_at
            KeepState = $keepIssue.state
            Duplicates = @()
        }
        
        foreach ($duplicate in $duplicateIssues) {
            Write-Host "  Flagging duplicate: #$($duplicate.number) (created: $($duplicate.created_at)) - State: $($duplicate.state)" -ForegroundColor Yellow
            
            # Add to duplicates info
            $duplicateInfo.Duplicates += [PSCustomObject]@{
                Number = $duplicate.number
                Title = $duplicate.title
                Created = $duplicate.created_at
                State = $duplicate.state
            }
            
            # Flag the duplicate issue
            $result = Flag-DuplicateIssue -issueNumber $duplicate.number -reason "Component: $component has multiple issues. Recommend keeping #$($keepIssue.number) (most recent)."
            if ($result) { $duplicatesFlagged++ }
        }
        
        $duplicatesList += $duplicateInfo
        
    } else {
        Write-Host "  No duplicates found for $component" -ForegroundColor Green
    }
    
    # Small delay to avoid rate limiting
    Start-Sleep -Milliseconds 200
}

Write-Host ""
Write-Host "=== DUPLICATE IDENTIFICATION COMPLETED ===" -ForegroundColor Green
Write-Host "Total duplicates found: $duplicatesFound" -ForegroundColor Cyan
Write-Host "Duplicates flagged: $duplicatesFlagged" -ForegroundColor Yellow

if ($duplicatesFound -eq 0) {
    Write-Host "No duplicates were found. Your repository is clean!" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "=== DETAILED DUPLICATE REPORT ===" -ForegroundColor Cyan
    
    foreach ($item in $duplicatesList) {
        Write-Host ""
        Write-Host "Component: $($item.Component)" -ForegroundColor Yellow
        Write-Host "  KEEP: Issue #$($item.KeepIssue) - $($item.KeepState)" -ForegroundColor Green
        Write-Host "    Title: $($item.KeepTitle)" -ForegroundColor Gray
        Write-Host "    Created: $($item.KeepCreated)" -ForegroundColor Gray
        
        foreach ($dup in $item.Duplicates) {
            Write-Host "  DUPLICATE: Issue #$($dup.Number) - $($dup.State)" -ForegroundColor Red
            Write-Host "    Title: $($dup.Title)" -ForegroundColor Gray
            Write-Host "    Created: $($dup.Created)" -ForegroundColor Gray
        }
    }
    
    Write-Host ""
    Write-Host "=== NEXT STEPS ===" -ForegroundColor Cyan
    Write-Host "1. Review flagged issues in GitHub (they now have 'duplicate' and 'needs-review' labels)" -ForegroundColor Yellow
    Write-Host "2. Manually close duplicate issues if you agree with the recommendations" -ForegroundColor Yellow
    Write-Host "3. Remove the 'duplicate' label from issues you want to keep open" -ForegroundColor Yellow
}
