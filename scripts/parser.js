axios.defaults.baseURL = "https://content-tools.tumo.world:4000/";

const parser = {
    dataFetch: async () =>
	{
		return dummyJson;
        let get_url = document.location.href;
		let url     = new URL(get_url);
		let _uid    = url.searchParams.get("_uid");

        return      axios.get(config.query_url + _uid);
	},
	getOutcomeText: async (text, impact) => {
		text = text.replaceAll("%{imp}", impact);
		return text;
	}
}

const dummyJson = {
	intro	: "Choisis-en cinq pour voir comment leur gaspillage alimentaire affecte l'environnement. Si tu peux, choisis ceux que tu a jetés cette semaine pour vérifier l'impact environnemental de ton propre gaspillage alimentaire.<br><br> L’impact environnemental est donné pour un kilogramme de chaque plat, ce qui te permet de mieux les comparer entre eux.",
	elements: [
		{
			name: "Une pizza à la viande",
			kg	: 8.7,
			msqr: 2.47,
			mj	: 50.54,
			impact: 0.8
		},
		{
			name: "Une quiche lorraine",
			kg	: 5.02,
			msqr: 3.82,
			mj	: 60.87,
			impact: 0.64
		},
		{
			name: "Tarte au fromage et aux tomates",
			kg	: 2.64,
			msqr: 2.55,
			mj	: 41.72,
			impact: 0.30
		},
		{
			name: "Crêpe ou galette fourrée béchamel fromage",
			kg	: 2.38,
			msqr: 1.34,
			mj	: 39.7,
			impact: 0.28
		},
		{
			name: "Poisson pané",
			kg	: 8.29,
			msqr: 1.48,
			mj	: 142.07,
			impact: 0.28
		},
		{
			name: "Chips de pommes de terre",
			kg	: 2.24,
			msqr: 1.158,
			mj	: 33.02,
			impact: 0.29
		},
		{
			name: "Un burrito au bœuf",
			kg	: 9.51,
			msqr: 2.91,
			mj	: 52.26,
			impact: 0.89
		},
		{
			name: "Des frites",
			kg	: 1.05,
			msqr: 1.48,
			mj	: 45.86,
			impact: 0.17
		},
		{
			name: "Un croque monsieur",
			kg	: 4.78,
			msqr: 2.93,
			mj	: 51.96,
			impact: 0.54
		},
		{
			name: "Un cheeseburger de fast food",
			kg	: 21.29,
			msqr: 4.54,
			mj	: 76.19,
			impact: 1.83
		},
		{
			name: "Une poêlée de légumes grillés",
			kg	: 2.18,
			msqr: 1.9,
			mj	: 42.4,
			impact: 0.25
		},
		{
			name: "Salade de pâtes végétarienne",
			kg	: 2.12,
			msqr: 1.53,
			mj	: 37.35,
			impact: 0.30
		},
		{
			name: "Ratatouille",
			kg	: 1.9,
			msqr: 3.3,
			mj	: 36.49,
			impact: 0.28
		},
		{
			name: "Pâtes fraîches farcies au fromage et aux légumes",
			kg	: 3.3,
			msqr: 2.36,
			mj	: 36.26,
			impact: 0.37
		},
		{
			name: "Lasagnes ou cannellonis aux légumes et fromage de chèvre",
			kg	: 2.57,
			msqr: 2.03,
			mj	: 38.03,
			impact: 0.31
		},
		{
			name: "Couscous royal",
			kg	: 3.84,
			msqr: 2.8,
			mj	: 41.29,
			impact: 0.47
		},
		{
			name: "Une soupe de légumes préemballée à réchauffer",
			kg	: 0.5,
			msqr: 1.05,
			mj	: 19.96,
			impact: 0.09
		},
		{
			name: "Des pommes",
			kg	: 0.28,
			msqr: 2.43,
			mj	: 7.78,
			impact: 0.06
		},
		{
			name: "Des bananes",
			kg	: 1.87,
			msqr: 8.95,
			mj	: 24.13,
			impact: 0.26
		},
		{
			name: "Un soda",
			kg	: 0.57,
			msqr: 2.5,
			mj	: 13.55,
			impact: 0.08
		},
		{
			name: "Un expresso",
			kg	: 0.56,
			msqr: 1.16,
			mj	: 6.42,
			impact: 0.13
		},
		{
			name: "Une boisson énergisante",
			kg	: 0.51,
			msqr: 0.48,
			mj	: 12.67,
			impact: 0.06
		},
		{
			name: "Du thé",
			kg	: 0.05,
			msqr: 0.64,
			mj	: 2.06,
			impact: 0.01
		}
	],
	outcome	: "Le score environnemental total de toute la nourriture que tu as gaspillée est de %{imp}. Ce score, appelé PEF pour Product Environmental Footprint, prend en compte les trois facteurs dont nous avons parlés (CO2 eq, l’eau et l’énergie nécessaire pour fabriquer, transformer,  transporter, distribuer et consommer le produit), ainsi que d’autres facteurs comme l'acidification des eaux et des sols, la formation de “mauvais ozone”, l’utilisation du sol, etc. Plus le PEF est élevé, plus la nourriture que tu as jetée a un impact global sur l’environnement. "
}