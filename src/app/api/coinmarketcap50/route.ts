export async function GET() {
    const coinmarket_cap_key = process.env.COINMARKETCAP_API_KEY;

    const url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=50&CMC_PRO_API_KEY=${coinmarket_cap_key}`;

    try {
        const res = await fetch(url)
        const data = await res.json()
        return new Response(JSON.stringify(data), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        })
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Error fetching data' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        })
    }
}
