Remove-Item ..\prod\js -Recurse -Force -ErrorAction Ignore
Remove-Item ..\prod\css -Recurse -Force -ErrorAction Ignore

Start-Process npm -ArgumentList "run", "build" -Wait -NoNewWindow