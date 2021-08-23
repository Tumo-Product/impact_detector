axios.defaults.baseURL = "https://blackboxbasic.herokuapp.com/";

const parser = {
    dataFetch: async () =>
	{
		return dummyJson;
        let get_url = document.location.href;
		let url     = new URL(get_url);
		let _uid    = url.searchParams.get("_uid");

        return      axios.get(config.query_url + _uid);
	}
}

const dummyJson = {
	intro	: "Choose 5 to see how food waste affects the environment more text maybe …",
	elements: [
		{
			name: "Lasagnes ou canelloni aux légumes et au fromage de chèvre, cuits",
			kg	: 2.57,
			msqr: 2.03,
			mj	: 38.03
		},
		{
			name: "Vegetable soup (Soupe aux légumes variés, préemballée à réchauffer)",
			kg	: 0.5,
			msqr: 1.05,
			mj	: 19.96
		},
		{
			name: "Crêpe ou Galette fourrée béchamel fromage",
			kg	: 2.38,
			msqr: 1.34,
			mj	: 39.7
		},
		{
			name: "Pizza",
			kg	: 8.7,
			msqr: 2.47,
			mj	: 50.54
		},
		{
			name: "Quiche lorraine",
			kg	: 5.02,
			msqr: 3.82,
			mj	: 60.87
		},
		{
			name: "Tomatoes and cheese tart",
			kg	: 2.64,
			msqr: 2.55,
			mj	: 41.72
		},
		{
			name: "Poisson pane, frit",
			kg	: 8.29,
			msqr: 1.48,
			mj	: 142.07
		}
	],
	outcome	: "The food you threw away was enough to waste XX kg of CO2eq, XX cubic meters of water, and XX MJ of electricity. If everyone in Europe threw away this much food every week for a year, they would warm the Earth X°C, fill X number of olympic sized swimming pools with wasted water, and power a lightbulb for XX hours."
}