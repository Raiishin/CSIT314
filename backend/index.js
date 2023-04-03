import express from "express";
import cors from "cors";

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());

app.use(express.json());

app.listen(port, function () {
	console.log("Application Started at: " + port);
});
