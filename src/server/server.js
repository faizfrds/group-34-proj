import express from "express";
import logger from "morgan";
import * as db from "./db.js";

const headerFields = { "Content-Type": "text/html" };

async function saveData(response, name, data) {
  if (name === undefined) {
    response.writeHead(400, headerFields);
    response.write("<h1>Counter Name Required</h1>");
    response.end();
  } else {
    try {
      await db.saveData(name, data);
      response.writeHead(200, headerFields);
      response.write("fdsfs");
      response.end();
    } catch (err) {
      response.writeHead(500, headerFields);
      response.write("<h1>Internal Server Error</h1>");
      response.write("<p>Unable to create counter</p>");
      response.write(`<p>This is likely a duplicate counter name!</p>`);
      response.end();
    }
  }
}

async function updateData(response, name, data) {
    try {
      const existingData = await db.loadData(name);
      const newData = {
        _id: existingData._id,
        _rev: existingData._rev,
        data: [...existingData.data, JSON.parse(data)]
      };
      await db.modifyData(newData);
      response.writeHead(200, headerFields);
      response.write(`<h1>Counter ${name} Updated</h1>`);
      response.end();
    } catch (err) {
      response.writeHead(404, headerFields);
      response.write(`<h1>Counter ${name} Not Found</h1>`);
      response.end();
    }
  }
  
async function getData(response, name) {
  try {
  const data = await db.getData(name);
  response.writeHead(200, headerFields);
  response.write(JSON.stringify(data));
  response.end();
  } catch (err) {
    response.writeHead(404, headerFields);
    response.write(`<h1>Counter ${name} Not dfasfafdas</h1>`);
    response.end();
  }
}

async function deleteData(response, name) {
  try {
   await db.deleteData(name);
  response.writeHead(200, headerFields);
  response.end();
  } catch (err) {
    response.writeHead(404, headerFields);
    response.write(`<h1>Counter ${name} Not dfasfafdas</h1>`);
    response.end();
  }
}

const app = express();
const port = 3000;
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// The following code handles static file requests for the client-side code.
// You do not need to modify this code. It serves the client-side files from
// the `src/client` directory.
app.use(express.static("src/client"));


const MethodNotAllowedHandler = async (request, response) => {
  response.status(405);
  response.type("text/plan");
  response.send("Method Not Allowed");
};

//routing methods
app
  .route("/create")
  .post(async (request, response) => {
    const options = request.query;
    console.log(options.name);
    const parsed = JSON.parse(options.data);
    saveData(response, options.name, parsed);
  })
  .all(MethodNotAllowedHandler);

app
  .route("/read")
  .get(async (request, response) => {
    const options = request.query;
    getData(response, options.name);
    console.log("HERE");
  })
  .all(MethodNotAllowedHandler);

app
  .route("/update")
  .put(async (request, response) => {
    console.log("updating in server")
    const options = request.query;
    updateData(response, options.name, options.data);
  })
  .all(MethodNotAllowedHandler);

app
  .route("/delete")
  .delete(async (request, response) => {
    const options = request.query;
    deleteData(response, options.name);
  })
  .all(MethodNotAllowedHandler);

// this should always be the last route
app.route("*").all(async (request, response) => {
  response.status(404).send(`Not found: ${request.path}`);
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
