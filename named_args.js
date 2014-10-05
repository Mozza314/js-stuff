function foo({ name:name, project:project}) {

    console.log(project);
    console.log(name);
}

foo({ name:'soubok', project:'jslibs' })
foo({ project:'jslibs', name:'soubok'})
