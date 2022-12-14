const express = require("express");
const mongoose=require('mongoose')
const bodyParser =require('body-parser')
const port = process.env.PORT || 5000;
const ejs=require('ejs')
const methodOverride =require('method-override')
const swaggerUi = require('swagger-ui-express')
swaggerDocument = require('./swagger.json');
const app = express();
//app.use(express.urlencoded({extended:false}))
app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(methodOverride('_method'))
app.set('view engine','ejs');

const UserRoute = require('./routes/user_cont_route')
app.use('/user',UserRoute)

const CompanionRoute = require('./routes/companion_cont_route')
app.use('/companion',CompanionRoute)

const dbConfig=require('./config/database.config');
const {router} = require("express/lib/application");


mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology:true
}).then(() => {
    console.log("Database Connected Successfully!!");
}).catch(err => {
    console.log('Could not connect to the database', err);
    process.exit();
});

app.use(express.static(__dirname+"/public"))

app.use("/", require("./routes/root"));
app.use("/login", require("./routes/login"));
app.use("/about", require("./routes/about"));
app.use("/signup", require("./routes/signup"));
app.use("/articles", require("./routes/article_cont_route"));
app.use("/chat", require("./routes/chat1"));
app.use("/chat2", require ("./routes/chat2"));
app.use("/companion", require("./routes/companion_cont_route"));

app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`)
);
