# PowerShell script to create GitHub issues for composite/complex DaisyUI components
# These components require multiple sub-components, complex state management, and advanced interactions

# Define the list of composite/complex components that need specialized implementation
# These components typically involve multiple parts, complex state, or custom logic beyond basic DaisyUI
$compositeComponents = @(
    "wizard", "upload", "video", "widget", "treeview", "calendar", "carousel", "drawer", "dropdown", "modal", "navbar", "pagination", "steps", "tabs", "timeline", "filter"
)

# GitHub repository details
$repoOwner = "fgrzl"
$repoName = "solid-daisyui"
$baseUrl = "https://api.github.com/repos/$repoOwner/$repoName/issues"

# Define the composite component issue body template
$compositeIssueTemplate = @"
### Description:
Advanced implementation of the `{0}` composite component following TDD methodology with complex state management, multiple sub-components, and sophisticated user interactions.

**Complexity Level**: **Complex Composite Component**

### Composite Component Architecture:

#### 1. **Multi-Component Structure**:
   - Design component composition with multiple sub-components
   - Implement parent-child communication patterns
   - Support compound component patterns (e.g., `{0}.Header`, `{0}.Content`, `{0}.Footer`)

#### 2. **Advanced State Management**:
   - Use SolidJS stores for complex state coordination
   - Handle asynchronous operations and loading states
   - Coordinate state between multiple component parts

#### 3. **Complex Interactions**:
   - Multi-step user flows and navigation
   - Advanced keyboard navigation patterns
   - Form validation and submission handling
   - Animation and transition management

### Implementation Standards:

#### 1. **Test-Driven Development (TDD) - Extended**:
   - **RED**: Write comprehensive integration tests for complete user flows
   - **GREEN**: Implement component system to satisfy all test scenarios
   - **REFACTOR**: Optimize performance and maintainability
   - Achieve 100% coverage including edge cases and error scenarios

#### 2. **Advanced Accessibility (WCAG 2.1 AA+)**:
   - Complex ARIA relationships (aria-owns, aria-controls, aria-describedby)
   - Advanced keyboard navigation with arrow keys, tab trapping
   - Screen reader announcements for dynamic content changes
   - Focus management across multiple component parts

#### 3. **DaisyUI Integration - Advanced**:
   - Support all DaisyUI modifier combinations
   - Implement responsive behavior patterns
   - Theme integration across all sub-components
   - Reference [DaisyUI {0} documentation](https://daisyui.com/components/{0}/)

#### 4. **Performance Optimization**:
   - Lazy loading of sub-components where appropriate
   - Memoization of expensive calculations
   - Efficient re-rendering strategies

### Implementation Phases:

#### Phase 1: Foundation
- [ ] **RED**: Write failing tests for basic component structure
- [ ] **GREEN**: Implement core component shell and basic functionality
- [ ] **REFACTOR**: Optimize basic structure and patterns

#### Phase 2: Sub-Components
- [ ] **RED**: Write failing tests for all sub-components
- [ ] **GREEN**: Implement individual sub-components
- [ ] **REFACTOR**: Optimize sub-component patterns and reusability

#### Phase 3: Integration
- [ ] **RED**: Write failing tests for component composition
- [ ] **GREEN**: Implement parent-child communication and state coordination
- [ ] **REFACTOR**: Optimize performance and state management

#### Phase 4: Advanced Features
- [ ] **RED**: Write failing tests for advanced interactions
- [ ] **GREEN**: Implement complex user flows and edge cases
- [ ] **REFACTOR**: Polish UX and optimize performance

### Documentation Requirements:
- [ ] Comprehensive API documentation for all sub-components
- [ ] Usage examples for common patterns
- [ ] Performance optimization guide
- [ ] Accessibility implementation guide
- [ ] Update docs/components/{0}.md with complete documentation

### Integration Checklist:
- [ ] Verify export in src/index.ts
- [ ] Update demo application with comprehensive examples
- [ ] Test with multiple themes and responsive breakpoints
- [ ] Validate cross-browser compatibility
- [ ] Performance audit and optimization
- [ ] Accessibility audit with screen readers

### Success Criteria:
- All test suites pass with 100% coverage
- Component works flawlessly across all supported browsers
- Meets WCAG 2.1 AA accessibility standards
- Performance benchmarks meet or exceed targets
- Documentation is comprehensive and clear
- Component is production-ready and maintainable
"@

# Function to create headers
function Get-Headers {
    return @{
        "Authorization" = "Bearer $env:GITHUB_TOKEN"
        "Accept" = "application/vnd.github+json"
        "X-GitHub-Api-Version" = "2022-11-28"
        "User-Agent" = "PowerShell-DaisyUI-Composite-Script"
    }
}

# Function to get existing issues
function Get-AllIssues {
    Write-Host "Fetching existing issues..." -ForegroundColor Cyan
    
    $allIssues = @()
    $page = 1
    $headers = Get-Headers
    
    try {
        do {
            $url = "$baseUrl" + "?state=all&per_page=100&page=$page"
            Write-Host "  Fetching page $page..." -ForegroundColor Gray
            
            $pageIssues = Invoke-RestMethod -Uri $url -Method Get -Headers $headers
            
            if ($pageIssues) {
                $allIssues += $pageIssues
                Write-Host "  Found $($pageIssues.Count) issues on page $page" -ForegroundColor Cyan
            }
            
            $page++
            Start-Sleep -Milliseconds 300
            
        } while ($pageIssues.Count -eq 100)
        
        Write-Host "Successfully retrieved $($allIssues.Count) total issues" -ForegroundColor Green
        return $allIssues
        
    } catch {
        Write-Host "Error fetching issues: $($_.Exception.Message)" -ForegroundColor Red
        return $null
    }
}

# Function to find existing composite issue
function Find-CompositeIssue {
    param([string]$component, [array]$issues)
    
    return $issues | Where-Object { 
        $_.title -like "*Advanced*$component*Architecture*" -or
        $_.title -like "*$component*Composite*" -or
        $_.title -eq "🚀 Advanced $component Architecture - Composite Component Implementation" -or
        $_.title -eq " Advanced $component Architecture - Composite Component Implementation"
    } | Select-Object -First 1
}

# Function to create or update composite issue
function Set-CompositeIssue {
    param([string]$component, [object]$existingIssue = $null)
    
    $headers = Get-Headers
    $title = "Advanced $component Architecture - Composite Component Implementation"
    $body = $compositeIssueTemplate -f $component
    
    if ($existingIssue) {
        # Update existing issue
        $updateData = @{
            title = $title
            body = $body
            state = "open"
        } | ConvertTo-Json -Depth 5
        
        try {
            $url = "$baseUrl/$($existingIssue.number)"
            Invoke-RestMethod -Uri $url -Method Patch -Headers $headers -Body $updateData -ContentType "application/json"
            Write-Host "  Updated composite issue #$($existingIssue.number)" -ForegroundColor Green
            return $true
        } catch {
            Write-Host "  Failed to update composite issue: $($_.Exception.Message)" -ForegroundColor Red
            return $false
        }
    } else {
        # Create new issue
        $createData = @{
            title = $title
            body = $body
            labels = @("enhancement", "composite-component", "complex", "DaisyUI", "high-priority")
        } | ConvertTo-Json -Depth 5
        
        try {
            $result = Invoke-RestMethod -Uri $baseUrl -Method Post -Headers $headers -Body $createData -ContentType "application/json"
            Write-Host "  Created new composite issue #$($result.number)" -ForegroundColor Blue
            return $true
        } catch {
            Write-Host "  Failed to create composite issue: $($_.Exception.Message)" -ForegroundColor Red
            
            # Get detailed error response
            if ($_.Exception.Response) {
                try {
                    $responseStream = $_.Exception.Response.GetResponseStream()
                    $reader = New-Object System.IO.StreamReader($responseStream)
                    $responseBody = $reader.ReadToEnd()
                    Write-Host "  Error details: $responseBody" -ForegroundColor Red
                } catch {
                    Write-Host "  Could not read error response" -ForegroundColor Red
                }
            }
            
            return $false
        }
    }
}

# Main execution
Write-Host "=== DaisyUI Composite Component Issues Manager ===" -ForegroundColor Green
Write-Host "Repository: $repoOwner/$repoName" -ForegroundColor Cyan
Write-Host "Composite components to process: $($compositeComponents.Count)" -ForegroundColor Cyan
Write-Host ""

# Check GitHub token
if (-not $env:GITHUB_TOKEN) {
    Write-Host "ERROR: GITHUB_TOKEN environment variable not set!" -ForegroundColor Red
    Write-Host "Set it with: `$env:GITHUB_TOKEN = 'your_token_here'" -ForegroundColor Yellow
    exit 1
}

# Get existing issues
$existingIssues = Get-AllIssues
if (-not $existingIssues) {
    Write-Host "No existing issues found - will create new composite issues" -ForegroundColor Yellow
    $existingIssues = @()
}

# Filter out pull requests
$actualIssues = $existingIssues | Where-Object { -not $_.pull_request }
Write-Host "Found $($actualIssues.Count) existing issues (excluding PRs)" -ForegroundColor Cyan
Write-Host ""

# Process each composite component
$created = 0
$updated = 0
$failed = 0

foreach ($component in $compositeComponents) {
    Write-Host "Processing: $component" -ForegroundColor Yellow
    
    $existingIssue = Find-CompositeIssue -component $component -issues $actualIssues
    
    if ($existingIssue) {
        Write-Host "  Composite issue already exists #$($existingIssue.number) - skipping" -ForegroundColor Gray
        continue
    }
    
    $success = Set-CompositeIssue -component $component -existingIssue $existingIssue
    
    if ($success) {
        if ($existingIssue) { $updated++ } else { $created++ }
    } else {
        $failed++
    }
    
    Start-Sleep -Milliseconds 200
}

Write-Host ""
Write-Host "=== SUMMARY ===" -ForegroundColor Green
Write-Host "Created: $created" -ForegroundColor Blue
Write-Host "Updated: $updated" -ForegroundColor Green
Write-Host "Failed: $failed" -ForegroundColor Red
Write-Host "Total: $($compositeComponents.Count)" -ForegroundColor Cyan
