# Files Organizer

Easily organize your cluttered desktop by moving files into their respective folders.

A pretty re-occuring problem is where you download bunch of files, and your "downloads" folder is cluttered and difficult to find what you want to find and navigate around. So I wrote a simple script that tries to organize those files into their respective folders.

# How to use
Install using
```
$ npm install -g files-organizer
```

Or just download the script and use it if you don't want to install it as a global package

# Use as global package
```sh
$ organizer --dir=[directory_path] 
```
 Or
 
 ```sh
 $ organize
 ```
 
 # Use as local package
 ```sh
$ node index --dir=[directory_path] 
```
 Or
 
 ```sh
 $ node index
 ```
 
 
 - default directory(--dir) is the desktop path
 
 
# Features one could add
- further sub-categorize folders into the dates, so create a folder for each month, or even days
- make a watcher, or a CRON job,  so that it watches for any file changes continuously or periodically



