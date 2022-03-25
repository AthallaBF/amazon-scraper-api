const express = require("express");
const request = require("request-promise");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

const generateScraperUrl = (apiKey) => {
	`http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;
};
app.get("/", (req, res) => {
	res.send("ngopi");
});

// GET product info
app.get("/products/:productId", async (req, res) => {
	const { productId } = req.params;
	const { api_key } = req.query;
	try {
		const response = await request(
			`${generateScraperUrl(apiKey)}&url=https://www.amazon.com/dp/${productId}`
		);
		res.json(JSON.parse(response));
	} catch (error) {
		res.json(error.message);
	}
});

// GET product review
app.get("/products/:productId/reviews", async (req, res) => {
	const { productId } = req.params;
	const { api_key } = req.query;
	try {
		const response = await request(
			`${generateScraperUrl}&url=https://www.amazon.com/product-reviews/${productId}`
		);
		res.json(JSON.parse(response));
	} catch (error) {
		res.json(error.message);
	}
});

// GET offers info
app.get("/products/:productId/offers", async (req, res) => {
	const { productId } = req.params;
	const { api_key } = req.query;
	try {
		const response = await request(
			`${generateScraperUrl(
				apiKey
			)}&url=https://www.amazon.com/gp/offer-listing/${productId}`
		);
		res.json(JSON.parse(response));
	} catch (error) {
		res.json(error.message);
	}
});

// Get search items
app.get("/search/:searchQuery", async (req, res) => {
	const { searchQuery } = req.params;
	try {
		const response = await request(
			`${generateScraperUrl(
				apiKey
			)}&url=https://www.amazon.com/s?k=${searchQuery}`
		);
		res.json(JSON.parse(response));
	} catch (error) {
		res.json(error.message);
	}
});

app.listen(PORT, console.log(`server running on localhost ${PORT}`));
