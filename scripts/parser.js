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
			name: "A beef burritoburrito",
			kg	: 13.894,
			msqr: 5.4,
			mj	: 102
		},
		{
			name: "beef",
			kg	: 10.4,
			msqr: 3.4,
			mj	: 106
		},
		{
			name: "Sushi beef beef beefbeef",
			kg	: 15.6844,
			msqr: 6.4,
			mj	: 100
		},
		{
			name: "Pizza",
			kg	: 19.4,
			msqr: 8.4,
			mj	: 90
		},
		{
			name: "burger",
			kg	: 9.4,
			msqr: 5.4,
			mj	: 110
		}
	],
	outcome	: "The food you threw away was enough to waste XX kg of CO2eq, XX cubic meters of water, and XX MJ of electricity. If everyone in Europe threw away this much food every week for a year, they would warm the Earth X°C, fill X number of olympic sized swimming pools with wasted water, and power a lightbulb for XX hours."
}