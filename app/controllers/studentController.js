let Student = require('../models/Student');
let Portfolio = require('../models/Portfolio');
let Project = require('../models/Project');


let studentController = {
   
     createStudent:function(req, res){
        let student = new Student(req.body);

        student.save(function(err, student){
            if(err){
                res.send(err.message)
                console.log(err);
            }
            else{
                Portfolio.find({}, function(err,portfolios){
                if(err){
                res.send(err.message);
            }
                else{
            
                console.log('HOLA');
                console.log(student.name);
                req.session.user = student;
                res.render('studentPageL', {a:"yes",name: student.name, portfolio:student.portfolio,title:"tr",description:"bla", portfolios:portfolios});
               }
            }); 
            }
        }) 
      
    },
 
      getName:function(req, res){
        let student = new Student(req.body);
        // let username = req.body.username;
        // let password = req.body.password;

        Student.findOne({username: student.username, password: student.password},function(err, student){
            if(err){
                res.send(err.message)
                console.log(err);
            }
            else{ if(student == null){
                console.log("no matches");
            }
            else{
                console.log(student);
                console.log(student.name);
                res.render('studentPage', {name: student.name, portfolio:student.portfolio});
            }
        }
        })
    },

    getProfile:function(req,res){
        var student = req.session.user;
        let username = student.username;
        let password = student.password;
        Student.findOne({username:username, password:password},function(err,student){
            if(err){
                res.send(err.message);
            }
            if(student){
                       Portfolio.findOne({student: student}, function(err,p){
                         if(err){
                            res.send(err.message);
                            }
                if(!p){ 
                
                res.render('studentPageL', {a:"no",name: student.name, pp:" ",portfolio:student.portfolio,work:[],description:" "});
                }
                else{
                Project.find({student:student},function(err,works){
                    if(err) res.send(err.message);
               else{
                 // req.session.user = student;
                res.render('studentPageL', {a:"no",name: student.name, pp:p.profilePicture,portfolio:student.portfolio,work:works,description:p.description});
                 }
                 });
               }
           });
       }
            }); 

            },
      

    findStudent:function(req, res){
        let student = new Student(req.body);
        let username = req.body.username;
        let password = req.body.password;
        Student.findOne({username: username, password:password}, function(err,student){
            if(err){
                res.send(err.message);
            }
            if(!student){
                res.send('Incorrect username and/or password');
            }
            else{
                Portfolio.find({}, function(err,portfolios){
                if(err){
                res.send(err.message);
            }
                else{
                    console.log(student.name);
                    Portfolio.findOne({student: student}, function(err,p){
             if(err){
                res.send(err.message);
            }
                if(!p){ 
                console.log('HOLA');
                console.log(p);
                Project.find({student:student},function(err,works){
                    if(err) res.send(err.message);
                
                // console.log(student.name);
                req.session.user = student;
                res.render('studentPageL', {a:"no",name: student.name, portfolio:student.portfolio,work:works,description:"wrong", portfolios:portfolios});
                });
               } else{
                Project.find({student:student},function(err,works){
                    if(err) res.send(err.message);
               
                 req.session.user = student;
                res.render('studentPageL', {a:"no",name: student.name,pp:p.profilePicture, portfolio:student.portfolio,work:works,description:p.description, portfolios:portfolios});
                 });
               }
           })
       }
            }); 
            }
        }) 
      
    },

        getPortfolios:function(req, res){
        
        Portfolio.find(function(err,portfolio){
            if(err){
                res.send(err.message);
            }
            else{
                Project.find(function(err,works){
                    if(err) res.send(err.message);
                    else{
                        console.log(works);


                var totalPortfolios = portfolio.length,
                pageSize = 10,
                pageCount = Math.ceil(totalPortfolios/pageSize),
                currentPage = 1,
                portfoliosArrays = [], 
                portfoliosList = [];

   

    //split list into groups
    while (portfolio.length > 0) {
        portfoliosArrays.push(portfolio.splice(0, pageSize));
    }

    //set current page if specifed as get variable (eg: /?page=2)
    if (typeof req.query.page !== 'undefined') {
        currentPage = +req.query.page;
    }

    //show list of portfolios from group
    portfoliosList = portfoliosArrays[+currentPage - 1];
    
    if(typeof portfoliosList == 'undefined') portfoliosList = [];

    //render index.ejs view file
    res.render('index', {
        portfolio: portfoliosList,
        pageSize: pageSize,
        totalPortfolios: totalPortfolios,
        pageCount: pageCount,
        currentPage: currentPage,
        work:works
    });
}});

                    }
                });
              },
       
 getPortfoliosS:function(req, res){
        
        Portfolio.find(function(err,portfolio){
            if(err){
                res.send(err.message);
            }
            else{
                Project.find(function(err,works){
                    if(err) res.send(err.message);
                    else{
                        console.log(works);


                var totalPortfolios = portfolio.length,
                pageSize = 10,
                pageCount = Math.ceil(totalPortfolios/pageSize),
                currentPage = 1,
                portfoliosArrays = [], 
                portfoliosList = [];

   

    //split list into groups
    while (portfolio.length > 0) {
        portfoliosArrays.push(portfolio.splice(0, pageSize));
    }

    //set current page if specifed as get variable (eg: /?page=2)
    if (typeof req.query.page !== 'undefined') {
        currentPage = +req.query.page;
    }

    //show list of portfolios from group
    portfoliosList = portfoliosArrays[+currentPage - 1];
    if(typeof portfoliosList == 'undefined') portfoliosList = [];
    //render index.ejs view file
    res.render('studentsp', {
        portfolio: portfoliosList,
        pageSize: pageSize,
        totalPortfolios: totalPortfolios,
        pageCount: pageCount,
        currentPage: currentPage,
        work:works
    });
}});

                    }
                });
              },

       updatePortfolio:function(req,res){
        var student = req.session.user;
         let project = new Project({
            title: req.body.title,
            file: req.body.work,
            student: student
        });
         project.save(function(err, project){
            if(err){
                res.send(err.message)
                console.log(err);
            }
        });

         Portfolio.findOne({student:student}, function(err,portf){
            if(err) res.send(err.message);
         
            else{
                Portfolio.find({}, function(err,portfolios){
                    if(err) res.send(err.message);
                
                else{
        Project.find({student:req.session.user},function(err,works){
            if(err) res.send(err.message);
            Portfolio.update(
            { '_id' : portf._id}, 
            { $push: { 'work': works}},{upsert:true},
            function (err, result) {
            if (err) throw err;
            else  res.render('studentPageL', {a:"yes",name: portf.name,pp:portf.profilePicture, portfolio:"yes", work:works, description:portf.description, portfolios:portfolios});
        

        });
        });
    }
});
    }
        });


       },

       createPortfolio:function(req, res){
        
        var student = req.session.user;
        let project = new Project({
            title: req.body.title,
            file: req.body.work,
            student: student
        });

          project.save(function(err, project){
            if(err){
                res.send(err.message)
                console.log(err);
            }
            else{
                console.log('ma ana saved aho!');
                console.log(project);
            }});

        Project.find({student:req.session.user},function(err,works){
            if(err) res.send(err.message);
            console.log(req.session.user);

      
       let portfolio = new Portfolio({
            name:req.body.name,
            description: req.body.description,
            student: student,
            work:works
        }); 
            if(typeof req.file == "undefined"){
                console.log('ana fl then');
                portfolio.profilePicture = " ";
            }
            else{
                console.log('ana fl else');
                portfolio.profilePicture = req.file.filename;

            }
            //console.log(works);

           
            Student.update(
            { 'username' : student.username }, 
            { $set: { 'portfolio': "yes", 'name': req.body.name,}},
            function (err, result) {
            if (err) throw err;
           // console.log(result);
             
        });
           
            portfolio.save(function(err,portfolio){
                if(err) res.send(err.message);
               
            });
            Portfolio.find(function(err,portfolios){
            if(err){
                res.send(err.message);
            }
            else{
                console.log('Ana el soora'+req.body.name);
                res.render('refresh');
                // res.render('studentPageL', {a:"yes",pp:portfolio.profilePicture,name: portfolio.name, portfolio:"yes", work:works,description:req.body.description, portfolios:portfolios});
            }
        });
        });


            
        },

        addPic:function(req,res){
            console.log('Student:'+req.session.user.username);
             Portfolio.findOne({student:req.session.user},function(err,portfolio){
            if(err){
                res.send(err.message);
            }
            else{

                if(typeof req.file == "undefined"){
                console.log('ana fl then');
                 Portfolio.update({'student':req.session.user},{$set:{'profilePicture':" "}},function(err,result){
                    if(err) throw err;
                 });

                // portfolio.profilePicture = " ";
            }
            else{
                console.log('ana fl else'+req.file.filename);
                Portfolio.update({'student':req.session.user},{$set:{'profilePicture':req.file.filename}},function(err,result){
                    if(err) throw err;
                });

                // portfolio.profilePicture = req.file.filename;

            }

                Project.findOne({student:req.session.user},function(err,works){
                    if(err) res.send(err.message);
                    else{
                        console.log(works);
                        

            Portfolio.find(function(err,portfolios){
            if(err){
                res.send(err.message);
            }
            else{
                console.log(portfolio);
                res.render('refresh');

                // res.render('studentPageL', {a:"yes",pp:portfolio.profilePicture,name: portfolio.name, portfolio:"yes", work:works,description:req.body.description, portfolios:portfolios});

                    }

                });
              }
        });
                    }
                });
         },

        createPortfolioScreen:function(req, res){
        console.log('REQ'+req.body.name);
        var student = req.session.user;
        let project = new Project({
            title: req.body.title,
            student: student
        });
            if(typeof req.file == "undefined"){
                console.log('THEN PART');
                project.file = "";
            }
            else{
                console.log('ELSE PART');
                project.file = req.file.filename;
            }

          project.save(function(err, project){
            if(err){
                res.send(err.message)
                console.log(err);
            }
            else{
                console.log('ma ana saved aho!');
                console.log(project);
            }});

        Project.find({student:req.session.user},function(err,works){
            if(err) res.send(err.message);
            console.log(req.session.user);

      
       let portfolio = new Portfolio({
            name:req.body.name,
            description: req.body.description,
            student: student,
            work:works
        }); 
           
           
            Student.update(
            { 'username' : student.username }, 
            { $set: { 'portfolio': "yes", 'name': req.body.name,}},
            function (err, result) {
            if (err) throw err;
           // console.log(result);
             
        });
           
            portfolio.save(function(err,portfolio){
                if(err) res.send(err.message);
               
            });
            Portfolio.find(function(err,portfolios){
            if(err){
                res.send(err.message);
            }
            else{
                console.log('Name:'+req.session.user.username);
                console.log('Name1:'+req.body.name);
                res.render('profpic.ejs');
                // res.render('studentPageL', {a:"yes",pp:portfolio.profilePicture,name: portfolio.name, portfolio:"yes", work:works,description:req.body.description, portfolios:portfolios});
            }
        });
        });


            
        },

        refresh:function(req,res){
            var student = req.session.user;
            console.log('PP'+req.session.user);
            Portfolio.findOne({student:student},function(err,portfolio){
                if(err) throw err;
                else{
                    
                            Project.find({student:student},function(err,works){
                                if(err) throw err;
                                else{
                                    Portfolio.find(function(err,portfolios){
                                        if(err) throw err;
                                        else{
                             res.render('studentPageL',{a:"yes",pp:portfolio.profilePicture,name:portfolio.name,portfolio:"yes",work:works,description:portfolio.description,portfolios:portfolios});
 
                                        }
                                    });
                                }
                           
                    });

                }
            });


        }
    
}


module.exports = studentController;