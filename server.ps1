# SafeCare IRMS - Local Web Server for Mobile QR Scanning
param([int]$Port = 8080)

$Root = Split-Path -Parent $MyInvocation.MyCommand.Path
$Listener = New-Object System.Net.HttpListener
$Listener.Prefixes.Add("http://localhost:$Port/")
$Listener.Prefixes.Add("http://127.0.0.1:$Port/")

# Attempt to add LAN IP as well if allowed
$LanIP = (Get-NetIPAddress -AddressFamily IPv4 | Where-Object { $_.InterfaceAlias -notlike "*Loopback*" -and $_.IPAddress -notlike "169.254*" } | Select-Object -First 1).IPAddress
if ($LanIP) {
    try {
        $Listener.Prefixes.Add("http://${LanIP}:$Port/")
    } catch {}
}

try {
    $Listener.Start()
    Write-Host "SafeCare Web Server Running at:"
    Write-Host "  -> Local: http://localhost:$Port/"
    if ($LanIP) {
        Write-Host "  -> Mobile Phone / LAN: http://${LanIP}:$Port/"
    }
} catch {
    Write-Host "Failed to bind to LAN IP, falling back to localhost only: $($_.Exception.Message)"
    $Listener = New-Object System.Net.HttpListener
    $Listener.Prefixes.Add("http://localhost:$Port/")
    $Listener.Start()
    Write-Host "SafeCare Web Server Running at http://localhost:$Port/"
}

$MimeTypes = @{
    ".html" = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".json" = "application/json; charset=utf-8"
    ".png"  = "image/png"
    ".svg"  = "image/svg+xml"
    ".ico"  = "image/x-icon"
}

while ($Listener.IsListening) {
    try {
        $Context = $Listener.GetContext()
        $Request = $Context.Request
        $Response = $Context.Response

        $UrlPath = $Request.Url.LocalPath.TrimStart('/')
        if ([string]::IsNullOrWhiteSpace($UrlPath) -or $UrlPath -eq "/") {
            $UrlPath = "index.html"
        }

        $FilePath = Join-Path $Root $UrlPath

        if (Test-Path $FilePath -PathType Leaf) {
            $Ext = [System.IO.Path]::GetExtension($FilePath).ToLower()
            $ContentType = $MimeTypes[$Ext]
            if (-not $ContentType) { $ContentType = "application/octet-stream" }

            $Bytes = [System.IO.File]::ReadAllBytes($FilePath)
            $Response.ContentType = $ContentType
            $Response.ContentLength64 = $Bytes.Length
            $Response.StatusCode = 200
            $Response.OutputStream.Write($Bytes, 0, $Bytes.Length)
        } else {
            $Response.StatusCode = 404
            $NotFound = [System.Text.Encoding]::UTF8.GetBytes("404 File Not Found")
            $Response.OutputStream.Write($NotFound, 0, $NotFound.Length)
        }
        $Response.OutputStream.Close()
    } catch {
        # continue loop
    }
}
