# PowerShell script to create or update GitHub issues for ALL DaisyUI components
# Simplified version with better error handling

# Define the COMPLETE list of all DaisyUI components
$components = @(
    "accordion", "alert", "avatar", "badge", "breadcrumbs", "button", "calendar", "card", "carousel", "chat-bubble", "checkbox", "collapse", "countdown", "diff", "divider", "dock", "drawer", "dropdown", "fieldset", "file-input", "filter", "footer", "hero", "indicator", "input", "join", "kbd", "label", "link", "list", "loading", "mask", "menu", "mockup-browser", "mockup-code", "mockup-phone", "mockup-window", "modal", "navbar", "pagination", "progress", "radial-progress", "radio", "range", "rating", "select", "skeleton", "stack", "stat", "status", "steps", "swap", "table", "tabs", "textarea", "theme-controller", "timeline", "toast", "toggle", "tooltip", "validator"
)

# GitHub repository details
$repoOwner = "fgrzl"
$repoName = "solid-daisyui"
$baseUrl = "https://api.github.com/repos/$repoOwner/$repoName/issues"

# Issue template
$issueTemplate = @"
### Description:
The `{0}` component implementation following TDD methodology to align with DaisyUI standards using SolidJS. This component should serve as a reusable, accessible, and customizable UI element for the library.

**Status**: This issue serves as a comprehensive record for the `{0}` component implementation. If the component is already implemented, this tracks completion status and ensures all standards are met.

### Implementation Standards:
Follow the **Gold Standard** established by the `Alert` component (`src/components/alert.tsx`) and enhanced patterns from `Accordion` and `Avatar` components.

### Requirements:

#### 1. **Test-Driven Development (TDD)**:
   - **RED**: Write comprehensive failing tests first covering all component features
   - **GREEN**: Implement component to make all tests pass
   - **REFACTOR**: Optimize code while maintaining test coverage
   - Use `@solidjs/testing-library` and Vitest for testing framework
   - Achieve 100% test coverage for all features, variants, and edge cases

#### 2. **Component Implementation**:
   - Implement TypeScript interface with comprehensive JSDoc documentation
   - Follow SolidJS reactive patterns (createSignal, createEffect, etc.)
   - Support all relevant DaisyUI styles, variants, and modifiers
   - Use dynamic class construction with classList for conditional styling
   - Include proper props design: children, class, classList, variant unions

#### 3. **Accessibility (WCAG 2.1 AA Compliance)**:
   - Implement proper ARIA attributes (role, aria-expanded, aria-controls, etc.)
   - Support keyboard navigation (Enter, Space, Tab, arrows where appropriate)
   - Include semantic HTML structure and proper focus management
   - Add screen reader compatibility with proper labeling
   - Test accessibility attributes and keyboard interactions

#### 4. **JSDoc Documentation**:
   - Add comprehensive interface documentation with @property tags
   - Include component-level JSDoc with usage description
   - Document all props with types, defaults, and descriptions
   - Follow established documentation patterns from gold standard components

#### 5. **DaisyUI Integration**:
   - Use official DaisyUI CSS classes and naming conventions
   - Support all component variants and modifiers per DaisyUI specs
   - Ensure responsive design and proper class combinations
   - Reference [DaisyUI {0} documentation](https://daisyui.com/components/{0}/)

#### 6. **Error Handling & Edge Cases**:
   - Implement graceful degradation for missing props
   - Handle loading states and fallback content where applicable
   - Support default values and proper prop validation
   - Test boundary conditions and error scenarios

### Test Coverage Requirements:
- [ ] Component renders with required props
- [ ] All DaisyUI variants and sizes work correctly
- [ ] User interactions (clicks, keyboard, etc.) function properly
- [ ] Accessibility attributes are present and correct
- [ ] Custom classes and classList props are applied
- [ ] Edge cases and error conditions are handled
- [ ] State management works correctly (if applicable)

### Reference Components:
- **Alert** (src/components/alert.tsx) - Original gold standard
- **Accordion** (src/components/accordion.tsx) - Accessibility and JSDoc patterns
- **Avatar** (src/components/avatar.tsx) - Complete TDD implementation example

### Implementation Checklist:
- [ ] **RED Phase**: Write failing tests in test/components/{0}.test.tsx
- [ ] **GREEN Phase**: Implement component in src/components/{0}.tsx
- [ ] **REFACTOR Phase**: Optimize implementation while maintaining tests
- [ ] Add comprehensive JSDoc documentation to interface and component
- [ ] Ensure full accessibility compliance with ARIA attributes
- [ ] Update component documentation in docs/components/{0}.md
- [ ] Verify export in src/index.ts
- [ ] Validate all DaisyUI variants and modifiers work correctly
- [ ] Test cross-browser compatibility and responsive behavior

### Additional Notes:
- Follow TDD red-green-refactor cycle strictly
- Use established coding patterns and component structure
- Ensure compatibility with latest DaisyUI version
- Test with multiple screen readers when possible
- Consider reduced motion preferences for animations
- If component is already implemented, verify it meets all standards above

### Implementation Status:
**Components with Complete Implementation**: accordion, alert, avatar
**Components with Partial Implementation**: button (needs TDD verification)
**Components Needing Full Implementation**: All others in the DaisyUI catalog
"@

# Function to create headers
function Get-Headers {
    return @{
        "Authorization" = "Bearer $env:GITHUB_TOKEN"
        "Accept" = "application/vnd.github+json"
        "X-GitHub-Api-Version" = "2022-11-28"
        "User-Agent" = "PowerShell-DaisyUI-Script"
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

# Function to find existing issue
function Find-ComponentIssue {
    param([string]$component, [array]$issues)
    
    return $issues | Where-Object { 
        $_.title -like "*$component*Component*" -or
        $_.title -eq "Implement $component Component with DaisyUI Standards in SolidJS"
    } | Select-Object -First 1
}

# Function to create or update issue
function Set-ComponentIssue {
    param([string]$component, [object]$existingIssue = $null)
    
    $headers = Get-Headers
    $title = "Implement $component Component with DaisyUI Standards in SolidJS"
    $body = $issueTemplate -f $component
    
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
            Write-Host "  Updated issue #$($existingIssue.number)" -ForegroundColor Green
            return $true
        } catch {
            Write-Host "  Failed to update issue: $($_.Exception.Message)" -ForegroundColor Red
            return $false
        }
    } else {
        # Create new issue
        $createData = @{
            title = $title
            body = $body
            labels = @("enhancement", "component", "DaisyUI")
        } | ConvertTo-Json -Depth 5
        
        try {
            Invoke-RestMethod -Uri $baseUrl -Method Post -Headers $headers -Body $createData -ContentType "application/json"
            Write-Host "  Created new issue" -ForegroundColor Blue
            return $true
        } catch {
            Write-Host "  Failed to create issue: $($_.Exception.Message)" -ForegroundColor Red
            return $false
        }
    }
}

# Main execution
Write-Host "=== DaisyUI Component Issues Manager ===" -ForegroundColor Green
Write-Host "Repository: $repoOwner/$repoName" -ForegroundColor Cyan
Write-Host "Components to process: $($components.Count)" -ForegroundColor Cyan
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
    Write-Host "ABORTING: Could not fetch existing issues" -ForegroundColor Red
    exit 1
}

# Filter out pull requests
$actualIssues = $existingIssues | Where-Object { -not $_.pull_request }
Write-Host "Found $($actualIssues.Count) existing issues (excluding PRs)" -ForegroundColor Cyan
Write-Host ""

# Process each component
$created = 0
$updated = 0
$failed = 0

foreach ($component in $components) {
    Write-Host "Processing: $component" -ForegroundColor Yellow
    
    $existingIssue = Find-ComponentIssue -component $component -issues $actualIssues
    $success = Set-ComponentIssue -component $component -existingIssue $existingIssue
    
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
Write-Host "Total: $($components.Count)" -ForegroundColor Cyan
