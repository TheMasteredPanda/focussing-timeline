# Standard Frontend Project Structure.
The standard frontend project structure I use in my projects. 

The 'build' directory where all the assets needed to form the website for production will be kept. The 'src' directory is where both scripts and styles that will be concatenated, minified, and cleaned up will be kept.

The point of structuring the project in such a way is allow for a clear separation of the production files and the development files. Once the website is complete, the build directory can be uploaded to the web server without the need to separate development files from the production files. This structure has the additional benefit of saving the developer's sanity by providing a structured way to store scripts and styles in a modular fashion, allowing for a cleaner project environment. 


## SASS Structure
The SASS structure (structured in the 'src/styles' directory) is meant to be entirely made up of SASS partials. The only sass file that will be interpreted into CSS and put into the build directory is the 'main.scss' file. While you could write all the SASS in this file, it wouldn't conform to the modular concept this structure employs. Therefore, you should be splitting your sass between a number of general sections. 


To demonstrate what I mean, I'll explain what I do. In a frontend web development project I will usually have four SASS sections: helpers, templates, layout, and base. Helpers would contain SASS stylesheets containing various useful mixins, display breakpoints for different devices, the primary, secondary, and tertiary colours of the website, and perhaps any plugin sass stylesheets. Templates would contain stylesheets to elements in the website that are not needed on every page, but are used in a a page or more (such as the dimensions for a video, or a horizontal slide of pictures). Layout is similar to templates, however this includes SASS stylesheets for elements of the website that will be used throughout the website, like a navbar or a footer. And lastly, base. Base contains everything that will effect the website globally. Like typography, dynamic container handling, &c.

Each directory would be dedicated to a section, each directory would contain a SASS partial importing all the other SASS partials in that directory. The SASS partial importing all the other SASS partials would then be imported into 'main.scss', thus giving access to all partials in that directory. The resulting stylesheet will be located in 'build/styles/main.css'.

## JavaScript Structure
The JavaScript Structure (structured in the 'src/scripts' directory) employs the same modular concept. Within the 'scripts' directory the JavaScript scripts can be structured in whatever way the developer sees fit to structure them. However, the only constraint is that the 'vendors' directory must not be deleted and cannot contain anything save for any third party libraries, APIs, or tools you will use in the scripts outside of that directory. 

All JavaScript within the 'scripts' directory will be bundled together. All vendors will be bundled at the top, and the scripts the developer writes will be bundled after. the resulting script will be located in 'build/scripts/main-min.js'.

## Extra Information
Both 'src' and 'build' directories are watched via the gulpfile.js script. To use this structure, you must download 'gulp' via npm. Once you have downloaded it, execute 'gulp' via the command line in the project once you've pulled the project from Github. This means any saved change to either directory will trigger, if gulp is running, tasks written in the gulpfile.js to execute, thus reloading the files served at 'localhost:5500'. 
