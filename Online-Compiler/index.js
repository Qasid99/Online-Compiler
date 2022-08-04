const express = require('express')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')
const fs = require('fs')
const os = require('os');
const e = require('express')
//const {exec} = require("child_process");
const port = 8000


app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/', (req, res) => {
    //console.log(req.body.Runcode);
    //console.log(req.body.mytext1);
    console.log(req.body.language);

    var mycodefile = req.body.mytext1;
    var langselect = req.body.language;
    var inputfrom = req.body.input1;
    console.log(inputfrom);


    if (langselect == "C") {
        fs.writeFileSync("Cprogram.c", mycodefile);

    }

    else if (langselect == "C++") {
        fs.writeFileSync("CPP.cpp", mycodefile);
        //const {exec} = require("child_process");

        const { exec } = require("child_process");

        exec(" g++ CPP.cpp -o obj.exe ", (error, stdout, stderr) => {
            if (error) {
               // console.log(`error: ${error.message}`);
                res.send(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log("compiled");
                return;
            }
            if (inputfrom == "") {
                exec("obj.exe", (error, stdout, stderr) => {
                    if (error) {
                        
                        console.log("messed up");

                    }
                    else if (stdout) {
                       //console.log(stdout);
                       var temp = `<!DOCTYPE html>
                       <html lang="en">
                       
                       <head>
                           <meta charset="UTF-8">
                           <meta http-equiv="X-UA-Compatible" content="IE=edge">
                           <meta name="viewport" content="width=device-width, initial-scale=1.0">
                           <title>Online Compiler</title>
                       </head>
                       
                       <body>
                           <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"
                               integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
                       
                           <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
                               integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
                               crossorigin="anonymous"></script>
                       
                       
                           <nav class="navbar navbar-expand-lg navbar-light bg-light">
                               <div class="container-fluid">
                                   <a class="navbar-brand" href="#">
                                       <h1>
                                           <h1> Online Compiler <span class="badge bg-secondary">
                                                   < />
                                               </span></h1>
                                       </h1>
                                   </a>
                                   <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                                       data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                                       aria-label="Toggle navigation">
                                       <span class="navbar-toggler-icon"></span>
                                   </button>
                                   <div class="collapse navbar-collapse" id="navbarSupportedContent">
                       
                                   </div>
                       
                                   <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                       
                                       <li class="nav-item">
                                           <a class="nav-link" href="#">
                                               <h3> Code Compile & Run</h3>
                                           </a>
                                       </li>
                       
                       
                                   </ul>
                       
                               </div>
                           </nav>
                       
                           <br>
                           <form method="post" action="">
                           <div class="container-fluid">
                               <select class="form-select  border-width=7" name="language" aria-label="Default select example mx-5">
                                   <option selected >${langselect}</option>
                                   <option name="lang" value="C">C</option>
                                   <option name="lang" value="C++">C++</option>
                                   
                       
                               </select>
                               <br>
                               
                                   <div class="row">
                                       <div class="col rows">
                                           <textarea input type="text" placeholder="// Write your code here " class="form-control" id="mytext1" name="mytext1"
                                               rows="15">${mycodefile}</textarea>
                                           <br>
                       
                                       
                                           <button type="submit" name="Runcode" id="Runcode" class="btn btn-secondary btn-primary">Run</button>
                                       </div>
                               
                               <div class="col">
                       
                                   <h3> <span class="badge bg-secondary">
                                           OUTPUT
                                       </span></h1>
                                   </h3>
                                   <br>
                               
                                   <textarea input type="text" class="form-control" id="exampleFormControlTextarea1" rows="8">${stdout}</textarea>
                       
                                   <br>
                                   <!-- Vertically centered scrollable modal -->
                                   <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal"
                                       data-bs-whatever="@mdo">Custom Input</button>
                       
                       
                                   <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                                       aria-hidden="true">
                                       <div class="modal-dialog">
                                           <div class="modal-content">
                       
                                               <div class="modal-body">
                                                   
                       
                                                       <div class="mb-3">
                                                           <label for="message-text" class="col-form-label">Input</label>
                                                           <textarea class="form-control" id="input1" name="input1" rows="7"></textarea>
                                                       </div>
                                                   </form>
                                               </div>
                                               <div class="modal-footer">
                                                   <button  class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                   <button  class="btn btn-primary">Ok</button>
                                               </div>
                                           </div>
                                       </div>
                                   </div>
                       
                               </div>
                           </div>
                       
                           </div>
                       
                       </body>
                       
                       </html>`;

                        res.send(`${temp}`);

                       //res.send(`OUTPUT:${stdout}`);

                    }
                    else
                        console.log("sucess");
                })


        }
   // console.log("over");
    });




    }//last


//console.log(mycodefile);

//res.send("data posted");
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});