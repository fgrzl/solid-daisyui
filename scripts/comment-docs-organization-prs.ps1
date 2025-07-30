$repoOwner = "fgrzl"
$repoName = "solid-daisyui"
$apiUrl = "https://api.github.com/repos/$repoOwner/$repoName/pulls"
$commentBody = "Suggestion: Let's organize our documentation so that each component has its own markdown file in `docs/components/`, e.g. `docs/components/button.md`, `docs/components/radio.md`, etc. This keeps our docs clean and maintainable!"

$headers = @{
    "Authorization" = "token $env:GITHUB_TOKEN"
    "Accept" = "application/vnd.github.v3+json"
}

# Check if GITHUB_TOKEN is set
if (-not $env:GITHUB_TOKEN) {
    Write-Host "Error: GITHUB_TOKEN is not set."
    exit 1
}

$page = 1
$perPage = 100
$allPRs = @()

do {
    # Debugging output for variables
    Write-Host "repoOwner: '$repoOwner'"
    Write-Host "repoName: '$repoName'"
    Write-Host "apiUrl: '$apiUrl'"
    
    $pagedUrl = "${apiUrl}?state=open&page=${page}&per_page=${perPage}"
    
    # Debugging output for paged URL
    Write-Host "Requesting: $pagedUrl"
    
    $response = Invoke-RestMethod -Uri $pagedUrl -Method Get -Headers $headers
    if ($response) {
        $allPRs += $response
        $page++
    }
} while ($response.Count -gt 0)

foreach ($pr in $allPRs) {
    $commentsUrl = $pr.comments_url
    $body = @{ body = $commentBody } | ConvertTo-Json
    try {
        Invoke-RestMethod -Uri $commentsUrl -Method POST -Headers $headers -Body $body
        Write-Host "Commented on PR #$($pr.number)"
    } catch {
        Write-Host "Failed to comment on PR #$($pr.number)"
        Write-Host $_.Exception.Message
    }
}
