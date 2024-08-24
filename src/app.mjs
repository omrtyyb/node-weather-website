import path from "path";
import express from "express";
import hbs from "hbs";
import { getLatLong } from "./utils/geocode.mjs";
import { fileURLToPath } from "url";
import { getWeather } from "./utils/forecast.mjs";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//setup handlebar engin and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

//app.com

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "tayeb ahmad omer",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    name: "About",
    content: "this is the page for about",
    title: "about",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    name: "Help",
    content: "this is the help page",
    title: "Help",
  });
});

app.get("/products", (req, res) => {
  console.log(req.query);
  if (req.query.search == "image") {
    res.send({
      product: ["image1", "image2", "image3"],
    });
  } else {
    res.send({
      product: [],
    });
  }
});
//weather
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "you must enter an address",
    });
  }

  getLatLong(req.query.address, (result, error) => {
    if (result) {
      const { lat, lon } = result.features[0].properties;
      const obj = { lat,lon};
      getWeather(obj,
        (response,err)=>{
          if(response){
            res.send(response)
          }else{
            res.send(err)
          }
        }
      )
    } else {
      res.send(error);
    }
  });

  // res.send({
  //   forecast:'It is snowing',
  //   location: 'Kabul',
  //   address: req.query.address
  // })
});

app.get("*", (req, res) => {
  res.render("error", {
    name: "Error",
    content: "404 not found",
  });
});
app.listen(3000, () => {
  console.log("server is running on port 3000");
});
