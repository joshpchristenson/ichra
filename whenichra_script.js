document.addEventListener('DOMContentLoaded', () => {
    const csvUrl = 'PUF CA - FULL - County Score.csv'; // Path to your CSV file

    let countiesData;

    fetch(csvUrl)
        .then(response => response.text())
        .then(data => {
            console.log('CSV data loaded'); // Debugging
            countiesData = parseCSV(data);
            populatePicker(countiesData);
            setDefaultCounty();
            setupEventListeners();
        })
        .catch(error => console.error('Error loading data:', error));

    function parseCSV(data) {
        const rows = data.split('\n').slice(1);
        return rows.map(row => {
            const [
                county, bronzeACA, bronzeSHOP, silverACA, silverSHOP, 
                goldACA, goldSHOP, plansACA, plansSHOP, carriersACA, 
                carriersSHOP, networksACA, networksSHOP, platinumACA, 
                platinumSHOP, bronzeScore, silverScore, goldScore, 
                plansScore, carriersScore, networksScore, platinumScore, totalScore
            ] = row.split(',');
            return { 
                county: county.trim(), // Trim any whitespace
                bronzeACA, 
                bronzeSHOP, 
                silverACA, 
                silverSHOP, 
                goldACA, 
                goldSHOP, 
                plansACA, 
                plansSHOP, 
                carriersACA, 
                carriersSHOP, 
                networksACA, 
                networksSHOP, 
                platinumACA, 
                platinumSHOP, 
                scores: {
                    bronze: parseFloat(bronzeScore),
                    silver: parseFloat(silverScore),
                    gold: parseFloat(goldScore),
                    plans: parseFloat(plansScore),
                    carriers: parseFloat(carriersScore),
                    networks: parseFloat(networksScore),
                    platinum: parseFloat(platinumScore)
                },
                totalScore: parseFloat(totalScore)
            };
        });
    }

    function populatePicker(counties) {
        const picker = document.getElementById('county-picker');
        picker.innerHTML = counties.map(({ county }) => `<option value="${county}">${county}</option>`).join('');
    }

    function setDefaultCounty() {
        const picker = document.getElementById('county-picker');
        picker.value = 'San Francisco';
        const countyData = countiesData.find(({ county }) => county === 'San Francisco');
        if (countyData) {
            updateContent(countyData);
        } else {
            console.error('Default county data not found');
        }
    }

    function setupEventListeners() {
        const picker = document.getElementById('county-picker');
        picker.addEventListener('change', (event) => {
            const selectedCounty = event.target.value;
            const countyData = countiesData.find(({ county }) => county === selectedCounty);
            if (countyData) {
                updateContent(countyData);
            } else {
                console.error(`County data not found for: ${selectedCounty}`);
            }
        });
    }

    function updateContent(countyData) {
        if (!countyData) {
            console.error('County data is undefined');
            return;
        }

        const reactiveCopy = document.getElementById('reactive-copy');
            reactiveCopy.innerHTML = `
                <p class="total-score-label">Total Score</p>
                <p class="total-score-number">${countyData.totalScore}</p>
                <p class="conditional-text">${countyData.totalScore >= 75 ? 'Make the switch!' : 'Come back next year..'}</p>
            `;
            updateTable(countyData);
        }

    function updateTable(countyData) {
        document.getElementById('bronze-aca').textContent = countyData.bronzeACA;
        document.getElementById('bronze-shop').textContent = countyData.bronzeSHOP;
        document.getElementById('bronze-score').textContent = countyData.scores.bronze;

        document.getElementById('silver-aca').textContent = countyData.silverACA;
        document.getElementById('silver-shop').textContent = countyData.silverSHOP;
        document.getElementById('silver-score').textContent = countyData.scores.silver;

        document.getElementById('gold-aca').textContent = countyData.goldACA;
        document.getElementById('gold-shop').textContent = countyData.goldSHOP;
        document.getElementById('gold-score').textContent = countyData.scores.gold;

        document.getElementById('plans-aca').textContent = countyData.plansACA;
        document.getElementById('plans-shop').textContent = countyData.plansSHOP;
        document.getElementById('plans-score').textContent = countyData.scores.plans;

        document.getElementById('carriers-aca').textContent = countyData.carriersACA;
        document.getElementById('carriers-shop').textContent = countyData.carriersSHOP;
        document.getElementById('carriers-score').textContent = countyData.scores.carriers;

        document.getElementById('networks-aca').textContent = countyData.networksACA;
        document.getElementById('networks-shop').textContent = countyData.networksSHOP;
        document.getElementById('networks-score').textContent = countyData.scores.networks;

        document.getElementById('platinum-aca').textContent = countyData.platinumACA;
        document.getElementById('platinum-shop').textContent = countyData.platinumSHOP;
        document.getElementById('platinum-score').textContent = countyData.scores.platinum;
    }
});
