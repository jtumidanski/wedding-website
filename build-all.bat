@echo off
setlocal enabledelayedexpansion

rem List of subdirectories to loop through
set "subdirectories=rsvp web"

rem Loop through each subdirectory
for %%d in (%subdirectories%) do (
    echo Building Docker image in %%d...
    cd %%d
    call docker-build.bat
    cd ..
)

endlocal
