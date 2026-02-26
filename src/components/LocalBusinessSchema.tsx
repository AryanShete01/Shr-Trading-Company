export default function LocalBusinessSchema() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": ["LocalBusiness", "HardwareStore", "HomeGoodsStore"],
        "name": "Shreeraj Trading Company",
        "image": "https://www.shreerajtradingcompany.com/images/logo.png",
        "@id": "https://www.shreerajtradingcompany.com",
        "url": "https://www.shreerajtradingcompany.com",
        "telephone": "+919922234646",
        "priceRange": "$$",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Akole-Sangamner Rd",
            "addressLocality": "Akole",
            "addressRegion": "Maharashtra",
            "postalCode": "422601",
            "addressCountry": "IN"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 19.5447, // Approx Akole latitude
            "longitude": 74.0084 // Approx Akole longitude
        },
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday"
            ],
            "opens": "09:00",
            "closes": "20:00"
        },
        "sameAs": [
            "https://www.facebook.com/shreerajtradingcompany",
            "https://www.instagram.com/shreerajtradingcompany"
        ]
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
